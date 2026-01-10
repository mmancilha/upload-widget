import { UploadWidget } from "./components/upload-widget";
import { UploadWidgetMinimizedButton } from "./components/upload-widget-minimized-button";
import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";

export function App() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(true);

  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10">
      <Collapsible.Root open={isWidgetOpen} onOpenChange={setIsWidgetOpen}>
        <Collapsible.Content className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
          <UploadWidget onMinimize={() => setIsWidgetOpen(false)} />
        </Collapsible.Content>
      </Collapsible.Root>
      {!isWidgetOpen && (
        <UploadWidgetMinimizedButton onOpen={() => setIsWidgetOpen(true)} />
      )}
    </main>
  );
}
