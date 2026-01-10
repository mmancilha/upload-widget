import { UploadWidgetUploadItem } from "./upload-widget-upload-item";

export function UploadWidgetUploadList() {
  return (
    <div className="px-3 h-48 overflow-y-auto flex flex-col gap-2">
      <UploadWidgetUploadItem />
    </div>
  );
}
