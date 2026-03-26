import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
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

      <AnimatePresence mode="wait">
        {screen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <HomeScreen
              heroGradient={heroGradient}
              onNavigate={navigateTo}
              onFeedback={() => setFeedbackOpen(true)}
            />
          </motion.div>
        )}
        {screen === "name-draw" && (
          <motion.div
            key="name-draw"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <NameDrawScreen
              onNavigate={navigateTo}
              onBack={() => navigateTo("home")}
            />
          </motion.div>
        )}
        {screen === "insert-draw" && (
          <motion.div
            key="insert-draw"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <InsertDrawScreen
              onNavigate={navigateTo}
              onBack={() => navigateTo("home")}
            />
          </motion.div>
        )}
        {screen === "tutorial" && tutorialConfig && (
          <motion.div
            key="tutorial"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <TutorialScreen
              config={tutorialConfig}
              onComplete={() => navigateTo("completion")}
              onBack={() => navigateTo("home")}
            />
          </motion.div>
        )}
        {screen === "completion" && (
          <motion.div
            key="completion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CompletionScreen
              gradient={completionGradient}
              onDrawAgain={() => navigateTo("home")}
            />
          </motion.div>
        )}
        {screen === "generate-video" && (
          <motion.div
            key="generate-video"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <GenerateVideoScreen onBack={() => navigateTo("home")} />
          </motion.div>
        )}
      </AnimatePresence>

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
      <Toaster richColors position="top-right" />
    </div>
  );
}
