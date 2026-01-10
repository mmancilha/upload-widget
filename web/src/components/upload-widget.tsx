import * as Collapsible from "@radix-ui/react-collapsible";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import { useState } from "react";

interface UploadWidgetProps {
  onClose?: () => void;
}

export function UploadWidget({ onClose }: UploadWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleMinimize = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Content className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
        <div className="bg-zinc-900 w-full overflow-hidden max-w-[360px] rounded-xl shadow-shape">
          <UploadWidgetHeader onMinimize={handleMinimize} />

          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />

            <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />

            <UploadWidgetUploadList />
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
