import * as Progress from "@radix-ui/react-progress";

import { ImageUp, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function UploadWidgetUploadItem() {
  return (
    <div className="w-full p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-white" strokeWidth={1.5} />
          <span className="text-white">screenshot.png</span>
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span>3.6 mb</span>
          <div className="w-px h-2.5 bg-zinc-700" />
          <span>43% (12 sec left)</span>
        </span>
      </div>

      <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
        <Progress.Indicator
          className="bg-indigo-500 h-1"
          style={{ width: "43%" }}
        />
      </Progress.Root>

      <Button
        size="icon-sm"
        className="absolute top-4 right-4"
        variant="ghost"
      >
        <Trash2 className="size-3.5 text-white" strokeWidth={1.5} />
        <span className="sr-only">Remove file</span>
      </Button>
    </div>
  );
}
