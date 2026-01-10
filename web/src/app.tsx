import { UploadWidget } from "./components/upload-widget";
import { UploadWidgetMinimizedButton } from "./components/upload-widget-minimized-button";
import { useState } from "react";

export function App() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(true);

  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10">
      {isWidgetOpen && (
        <UploadWidget onClose={() => setIsWidgetOpen(false)} />
      )}
      <UploadWidgetMinimizedButton
        isWidgetOpen={isWidgetOpen}
        onOpenWidget={() => setIsWidgetOpen(true)}
      />
    </main>
  );
}
