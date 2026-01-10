import { useDropzone } from "react-dropzone";

export function UploadWidgetDropzone() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop(acceptedFiles) {
      console.log(acceptedFiles);
    },
  });

  return (
    <div className="px-5 flex flex-col gap-2.5">
      <div
        data-active={isDragActive}
        className="cursor-pointer text-zinc-400 bg-zinc-950 p-5 rounded-lg border border-zinc-700 border-dashed h-[140px] flex flex-col items-center justify-center gap-2 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500"
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        <span className="text-xs">Drag & drop your files here or</span>
        <span className="text-xs underline text-zinc-300">Choose files</span>
      </div>

      <span className="text-xs text-zinc-400">Only PNG and JPG (4mb max)</span>
    </div>
  );
}
