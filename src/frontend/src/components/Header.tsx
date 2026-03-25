import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Palette, Video, Wand2 } from "lucide-react";
import type { AppScreen } from "../App";

interface HeaderProps {
  onNavigate: (screen: AppScreen) => void;
  onFeedback: () => void;
  currentScreen: AppScreen;
}

export function Header({ onNavigate, onFeedback, currentScreen }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
          data-ocid="header.link"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#19C6FF] to-[#7B3CFF] flex items-center justify-center shadow-glow animate-pulse-glow">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-gradient transition-all">
            DRAWAI
          </span>
        </button>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentScreen === "home"
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
            data-ocid="nav.home.link"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate("name-draw")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentScreen === "name-draw"
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
            data-ocid="nav.tutorials.link"
          >
            <Wand2 className="w-4 h-4" />
            Tutorials
          </button>
          <button
            type="button"
            onClick={() => onNavigate("generate-video")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentScreen === "generate-video"
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
            data-ocid="nav.generate.link"
          >
            <Video className="w-4 h-4" />
            Generate Video
          </button>
        </nav>

        {/* Actions */}
        <Button
          onClick={onFeedback}
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10 hover:text-white gap-1.5"
          data-ocid="header.feedback.button"
        >
          <MessageSquare className="w-4 h-4" />
          Feedback
        </Button>
      </div>
    </header>
  );
}
