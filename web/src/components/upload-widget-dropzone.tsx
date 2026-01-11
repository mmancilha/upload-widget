import { useDropzone } from "react-dropzone";
import CircularProgressBar from "./ui/circular-progress-bar";
import { motion } from "motion/react";
import { usePendingUploads, useUploads } from "../store/uploads";
import { useState, useEffect } from "react";

export function UploadWidgetDropzone() {
  const addUploads = useUploads((store) => store.addUploads);
  const amountOfUploads = useUploads((store) => store.uploads.size);
  const { isThereAnyPendingUploads, globalPercentage } = usePendingUploads();
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (validationError) {
      const timer = setTimeout(() => {
        setValidationError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [validationError]);

  const handleValidationError = (message: string) => {
    setValidationError(message);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    onDrop(acceptedFiles) {
      setValidationError(null);
      addUploads(acceptedFiles, handleValidationError);
    },
    onDropRejected(fileRejections) {
      const rejection = fileRejections[0];
      if (rejection) {
        const error = rejection.errors[0];
        if (error.code === "file-invalid-type") {
          handleValidationError(
            `File type is not supported. Only PNG, JPG, and WebP files are allowed.`
          );
        } else if (error.code === "file-too-large") {
          handleValidationError(
            `File "${rejection.file.name}" exceeds the maximum size of 4MB.`
          );
        } else {
          handleValidationError(error.message || "File was rejected.");
        }
      }
    },
  });
  return (
    <motion.div
      className="px-3 flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        data-active={isDragActive}
        className="cursor-pointer text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500"
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        {isThereAnyPendingUploads ? (
          <div className="flex flex-col gap-2.5 items-center">
            <CircularProgressBar
              progress={globalPercentage}
              size={56}
              strokeWidth={4}
            />
            <span className="text-xs">
              Uploading {amountOfUploads} files...
            </span>
          </div>
        ) : (
          <>
            <span className="text-xs">Drop your files here or</span>
            <span className="text-xs underline">click to open picker</span>
          </>
        )}
      </div>

      <span className="text-xxs text-zinc-400">
        Only PNG, JPG, and WebP files are supported.
      </span>

      {validationError && (
        <span className="text-xxs text-red-400 animate-in fade-in duration-200">
          {validationError}
        </span>
      )}
    </motion.div>
  );
}
