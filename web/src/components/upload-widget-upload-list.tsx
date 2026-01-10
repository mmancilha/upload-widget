import { UploadWidgetUploadItem } from "./upload-widget-upload-item";

export function UploadWidgetUploadList() {
  const hasFiles = true; // TODO: implementar lógica real

  return (
    <div className="px-5 flex flex-col gap-3">
      <h2 className="text-xs font-medium text-white">Uploaded files</h2>
      {hasFiles ? (
        <div className="h-48 overflow-y-auto flex flex-col gap-2">
          <UploadWidgetUploadItem />
        </div>
      ) : (
        <span className="text-xs text-zinc-400">No uploads added to the queue</span>
      )}
    </div>
  );
}
