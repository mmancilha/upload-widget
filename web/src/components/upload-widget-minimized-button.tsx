import * as Collapsible from "@radix-ui/react-collapsible";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { UploadWidget } from "./upload-widget";

interface UploadWidgetMinimizedButtonProps {
  isWidgetOpen: boolean;
  onOpenWidget: () => void;
}

export function UploadWidgetMinimizedButton({
  isWidgetOpen,
  onOpenWidget,
}: UploadWidgetMinimizedButtonProps) {
  if (isWidgetOpen) return null;

  return (
    <Button
      variant="default"
      size="icon"
      className="fixed bottom-4 right-4 rounded-full shadow-lg"
      onClick={onOpenWidget}
    >
      <Upload className="size-4" />
    </Button>
  );
}
