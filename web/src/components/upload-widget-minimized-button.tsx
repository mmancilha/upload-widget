import { Upload } from "lucide-react";
import { Button } from "./ui/button";

interface UploadWidgetMinimizedButtonProps {
  onOpen: () => void;
}

export function UploadWidgetMinimizedButton({
  onOpen,
}: UploadWidgetMinimizedButtonProps) {
  return (
    <Button
      variant="default"
      size="icon"
      className="fixed bottom-4 right-4 rounded-full shadow-lg"
      onClick={onOpen}
    >
      <Upload className="size-4" />
    </Button>
  );
}
