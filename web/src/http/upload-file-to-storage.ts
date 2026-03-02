import axios from "axios";

interface UploadFileToStorageParams {
  file: File;
  onProgress: (sizeInBytes: number) => void;
}

interface uploadFileToStorageOpts {
  signal?: AbortSignal;
}

export async function uploadFileToStorage(
  { file, onProgress }: UploadFileToStorageParams,
  opts?: uploadFileToStorageOpts
) {
  const data = new FormData();

  data.append("file", file);

  const baseUrl = import.meta.env.VITE_API_URL
  const uploadUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}/uploads`
    : `${typeof window !== "undefined" ? window.location.origin : ""}/api/uploads`

  const response = await axios.post<{ url: string }>(
    uploadUrl,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: opts?.signal,
      onUploadProgress(progressEvent) {
        onProgress(progressEvent.loaded);
      },
    }
  );

  return { url: response.data.url };
}
