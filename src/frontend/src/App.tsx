import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { FeedbackModal } from "./components/FeedbackModal";
import { Header } from "./components/Header";
import { CompletionScreen } from "./screens/CompletionScreen";
import { GenerateVideoScreen } from "./screens/GenerateVideoScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InsertDrawScreen } from "./screens/InsertDrawScreen";
import { NameDrawScreen } from "./screens/NameDrawScreen";
import { TutorialScreen } from "./screens/TutorialScreen";

export type DrawMode = "pencil" | "colour" | "outline";
export type AppScreen =
  | "home"
  | "name-draw"
  | "insert-draw"
  | "tutorial"
  | "completion"
  | "generate-video";

export interface TutorialConfig {
  subject: string;
  mode: DrawMode;
  imageUrl?: string;
  wikiSummary?: string;
  uploadedImage?: string;
}

const HERO_GRADIENTS = [
  "linear-gradient(135deg, #19C6FF 0%, #2E6BFF 30%, #7B3CFF 60%, #D44BFF 100%)",
  "linear-gradient(135deg, #FF7A3D 0%, #FFC247 35%, #D44BFF 70%, #7B3CFF 100%)",
  "linear-gradient(135deg, #19C6FF 0%, #7B3CFF 50%, #FF7A3D 100%)",
  "linear-gradient(135deg, #D44BFF 0%, #7B3CFF 30%, #2E6BFF 65%, #19C6FF 100%)",
  "linear-gradient(135deg, #FFC247 0%, #FF7A3D 25%, #D44BFF 60%, #2E6BFF 100%)",
  "linear-gradient(135deg, #2E6BFF 0%, #19C6FF 30%, #FFC247 65%, #FF7A3D 100%)",
  "linear-gradient(135deg, #7B3CFF 0%, #D44BFF 40%, #FF7A3D 70%, #FFC247 100%)",
  "linear-gradient(135deg, #19C6FF 0%, #2E6BFF 20%, #D44BFF 50%, #FF7A3D 80%, #FFC247 100%)",
];

function pickRandomGradient(exclude?: string): string {
  const options = exclude
    ? HERO_GRADIENTS.filter((g) => g !== exclude)
    : HERO_GRADIENTS;
  return options[Math.floor(Math.random() * options.length)];
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [tutorialConfig, setTutorialConfig] = useState<TutorialConfig | null>(
    null,
  );
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [heroGradient] = useState(() => pickRandomGradient());
  const [completionGradient, setCompletionGradient] = useState<string>("");

  const navigateTo = useCallback(
    (s: AppScreen, config?: TutorialConfig) => {
      if (s === "completion") {
        setCompletionGradient(pickRandomGradient(heroGradient));
      }
      if (config) setTutorialConfig(config);
      setScreen(s);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [heroGradient],
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Header
        onNavigate={navigateTo}
        onFeedback={() => setFeedbackOpen(true)}
        currentScreen={screen}
      />

      {screen === "home" && (
        <HomeScreen
          heroGradient={heroGradient}
          onNavigate={navigateTo}
          onFeedback={() => setFeedbackOpen(true)}
        />
      )}
      {screen === "name-draw" && (
        <NameDrawScreen
          onNavigate={navigateTo}
          onBack={() => navigateTo("home")}
        />
      )}
      {screen === "insert-draw" && (
        <InsertDrawScreen
          onNavigate={navigateTo}
          onBack={() => navigateTo("home")}
        />
      )}
      {screen === "tutorial" && tutorialConfig && (
        <TutorialScreen
          config={tutorialConfig}
          onComplete={() => navigateTo("completion")}
          onBack={() => navigateTo("home")}
        />
      )}
      {screen === "completion" && (
        <CompletionScreen
          gradient={completionGradient}
          onDrawAgain={() => navigateTo("home")}
        />
      )}
      {screen === "generate-video" && (
        <GenerateVideoScreen onBack={() => navigateTo("home")} />
      )}

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
      <Toaster richColors position="top-right" />
    </div>
  );
}
