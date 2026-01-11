import { UploadWidget } from "./components/upload-widget";
import { Linkedin, Github } from "lucide-react";

export function App() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center p-10 relative">
      <UploadWidget />

      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 pb-6 text-xs text-zinc-400">
        <span>Made with ❤️ by Maycon Mancilha • Software Engineer • 2026</span>
        <div className="flex items-center gap-2 ml-2">
          <a
            href="https://www.linkedin.com/in/mayconmancilha/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" strokeWidth={1.5} />
          </a>
          <a
            href="https://github.com/mmancilha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </footer>
    </main>
  );
}
