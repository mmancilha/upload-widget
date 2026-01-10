import { Minimize2 } from "lucide-react";
import { Button } from "./ui/button";

interface UploadWidgetHeaderProps {
  onMinimize: () => void;
}

export function UploadWidgetHeader({ onMinimize }: UploadWidgetHeaderProps) {
  return (
    <div className="w-full p-4 py-2 bg-white/2 border-zinc-800 border-b flex items-center justify-between">
      <span className="text-sm font-medium">Upload files</span>
      <Button variant="ghost" size="icon" onClick={onMinimize}>
        <Minimize2 strokeWidth={1.5} className="size-4" />
      </Button>
    </div>
  );
}
