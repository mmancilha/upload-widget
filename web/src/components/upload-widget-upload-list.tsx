import { UploadWidgetUploadItem } from "./upload-widget-upload-item";

export function UploadWidgetUploadList() {
  return (
    <div className="px-3 flex flex-col gap-2">
      <h2 className="text-xs font-medium px-1">Uploaded files</h2>
      <div className="h-48 overflow-y-auto flex flex-col gap-2">
        <UploadWidgetUploadItem />
      </div>
    </div>
  );
}
