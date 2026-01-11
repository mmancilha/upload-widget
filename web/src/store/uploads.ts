import { create } from "zustand";
import { enableMapSet } from "immer";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { uploadFileToStorage } from "../http/upload-file-to-storage";
import { CanceledError, AxiosError } from "axios";
import { useShallow } from "zustand/shallow";
import { compressImage } from "../utils/compress-image";

export type Upload = {
  name: string;
  file: File;
  abortController?: AbortController;
  status: "progress" | "success" | "error" | "canceled";
  originalSizeInBytes: number;
  compressedSizeInBytes?: number;
  uploadSizeInBytes: number;
  remoteUrl?: string;
  errorMessage?: string;
};

type UploadState = {
  uploads: Map<string, Upload>;
  addUploads: (files: File[], onValidationError?: (message: string) => void) => void;
  cancelUpload: (uploadId: string) => void;
  retryUpload: (uploadId: string) => void;
};

const MAXIMUM_FILE_SIZE_IN_BYTES = 1024 * 1024 * 4; // 4MB
const SUPPORTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validateFile(file: File): { valid: boolean; error?: string } {
  if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not supported. Only PNG, JPG, and WebP files are allowed.`,
    };
  }

  if (file.size > MAXIMUM_FILE_SIZE_IN_BYTES) {
    return {
      valid: false,
      error: `File "${file.name}" exceeds the maximum size of 4MB.`,
    };
  }

  return { valid: true };
}

enableMapSet();

type PersistedUpload = Omit<Upload, "file" | "abortController">;

export const useUploads = create<UploadState, [["zustand/immer", never], ["zustand/persist", { uploads: Map<string, Upload> }]]>(
  persist(
    immer((set, get) => {
    function updateUpload(uploadId: string, data: Partial<Upload>) {
      const upload = get().uploads.get(uploadId);

      if (!upload) {
        return;
      }

      set((state) => {
        state.uploads.set(uploadId, {
          ...upload,
          ...data,
        });
      });
    }

    async function processUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) {
        return;
      }

      const abortController = new AbortController();

      updateUpload(uploadId, {
        uploadSizeInBytes: 0,
        remoteUrl: undefined,
        compressedSizeInBytes: undefined,
        abortController,
        status: "progress",
        errorMessage: undefined,
      });

      try {
        const compressedFile = await compressImage({
          file: upload.file,
          maxWidth: 1000,
          maxHeight: 1000,
          quality: 0.8,
        });

        updateUpload(uploadId, { compressedSizeInBytes: compressedFile.size });

        const { url } = await uploadFileToStorage(
          {
            file: compressedFile,
            onProgress(sizeInBytes) {
              updateUpload(uploadId, {
                uploadSizeInBytes: sizeInBytes,
              });
            },
          },
          { signal: abortController.signal }
        );

        updateUpload(uploadId, {
          status: "success",
          remoteUrl: url,
        });
      } catch (err) {
        if (err instanceof CanceledError) {
          updateUpload(uploadId, {
            status: "canceled",
            errorMessage: undefined,
          });

          return;
        }

        let errorMessage = "An error occurred during upload.";

        if (err instanceof AxiosError) {
          errorMessage =
            err.response?.data?.message ||
            err.message ||
            "An error occurred during upload.";
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        updateUpload(uploadId, {
          status: "error",
          errorMessage,
        });
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) {
        return;
      }

      upload.abortController?.abort();

      set((state) => {
        state.uploads.set(uploadId, {
          ...upload,
          status: "canceled",
        });
      });
    }

    function retryUpload(uploadId: string) {
      processUpload(uploadId);
    }

    function addUploads(files: File[], onValidationError?: (message: string) => void) {
      for (const file of files) {
        const validation = validateFile(file);

        if (!validation.valid) {
          if (onValidationError && validation.error) {
            onValidationError(validation.error);
          }
          continue;
        }

        const uploadId = crypto.randomUUID();

        const upload: Upload = {
          name: file.name,
          file,
          status: "progress",
          originalSizeInBytes: file.size,
          uploadSizeInBytes: 0,
        };

        set((state) => {
          state.uploads.set(uploadId, upload);
        });

        processUpload(uploadId);
      }
    }

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
      retryUpload,
    };
  }),
  {
    name: "upload-widget-storage",
    partialize: (state) => {
      const successfulUploads = Array.from(state.uploads.entries())
        .filter(([_, upload]) => upload.status === "success")
        .map(([id, upload]) => [
          id,
          {
            name: upload.name,
            status: upload.status,
            originalSizeInBytes: upload.originalSizeInBytes,
            compressedSizeInBytes: upload.compressedSizeInBytes,
            uploadSizeInBytes: upload.uploadSizeInBytes,
            remoteUrl: upload.remoteUrl,
            errorMessage: upload.errorMessage,
          } as PersistedUpload,
        ]);

      return {
        uploads: successfulUploads.length > 0 ? successfulUploads : [],
      };
    },
    storage: {
      getItem: (name: string) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        try {
          const parsed = JSON.parse(str);
          if (parsed.state?.uploads) {
            const uploadsArray = Array.isArray(parsed.state.uploads)
              ? parsed.state.uploads
              : [];
            // Convert persisted uploads back to Upload format (without file, which is OK for success status)
            const uploadsMap = new Map(
              uploadsArray.map(([id, persistedUpload]: [string, PersistedUpload]) => [
                id,
                {
                  ...persistedUpload,
                  file: new File([], persistedUpload.name), // Dummy file for type compatibility
                } as Upload,
              ])
            );
            return {
              ...parsed,
              state: {
                ...parsed.state,
                uploads: uploadsMap,
              },
            };
          }
          return parsed;
        } catch {
          return null;
        }
      },
      setItem: (name: string, value: any) => {
        try {
          const uploadsValue = value.state?.uploads;
          const uploadsArray = uploadsValue instanceof Map
            ? Array.from(uploadsValue.entries())
            : Array.isArray(uploadsValue)
            ? uploadsValue
            : [];

          const serialized = {
            ...value,
            state: {
              ...value.state,
              uploads: uploadsArray,
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      },
      removeItem: (name: string) => {
        localStorage.removeItem(name);
      },
    },
  }
  )
);

export const usePendingUploads = () => {
  return useUploads(
    useShallow((store) => {
      const isThereAnyPendingUploads = Array.from(store.uploads.values()).some(
        (upload) => upload.status === "progress"
      );

      if (!isThereAnyPendingUploads) {
        return { isThereAnyPendingUploads, globalPercentage: 100 };
      }

      const { total, uploaded } = Array.from(store.uploads.values()).reduce(
        (acc, upload) => {
          if (upload.compressedSizeInBytes) {
            acc.uploaded += upload.uploadSizeInBytes;
          }

          acc.total +=
            upload.compressedSizeInBytes || upload.originalSizeInBytes;

          return acc;
        },
        { total: 0, uploaded: 0 }
      );

      const globalPercentage = Math.min(
        Math.round((uploaded * 100) / total),
        100
      );

      return { isThereAnyPendingUploads, globalPercentage };
    })
  );
};
