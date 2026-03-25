import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  BookOpen,
  ChevronLeft,
  Search,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { AppScreen, DrawMode, TutorialConfig } from "../App";
import { useActor } from "../hooks/useActor";

const INAPPROPRIATE_TERMS = [
  "nude",
  "naked",
  "porn",
  "sex",
  "18+",
  "explicit",
  "xxx",
  "adult",
  "erotic",
  "nsfw",
  "lewd",
];

function isInappropriate(text: string): boolean {
  const lower = text.toLowerCase();
  return INAPPROPRIATE_TERMS.some((t) => lower.includes(t));
}

interface NameDrawScreenProps {
  onNavigate: (screen: AppScreen, config?: TutorialConfig) => void;
  onBack: () => void;
}

type Step = "input" | "mode" | "shade-choice";

export function NameDrawScreen({ onNavigate, onBack }: NameDrawScreenProps) {
  const { actor } = useActor();
  const [step, setStep] = useState<Step>("input");
  const [subject, setSubject] = useState("");
  const [wikiSummary, setWikiSummary] = useState("");
  const [wikiImageUrl, setWikiImageUrl] = useState("");
  const [wikiLoading, setWikiLoading] = useState(false);
  const [inappropriate, setInappropriate] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    if (isInappropriate(inputValue)) {
      setInappropriate(true);
      return;
    }
    setInappropriate(false);
    setSubject(inputValue.trim());
    setWikiLoading(true);
    try {
      const [summaryResult, wikiData] = await Promise.all([
        actor?.fetchWikipediaSummary(inputValue.trim()).catch(() => ""),
        fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(inputValue.trim())}`,
        )
          .then((r) => r.json())
          .catch(() => null),
      ]);
      setWikiSummary((summaryResult as string) ?? wikiData?.extract ?? "");
      setWikiImageUrl(wikiData?.thumbnail?.source ?? "");
    } catch {
      setWikiSummary("");
      setWikiImageUrl("");
    } finally {
      setWikiLoading(false);
    }
    setStep("mode");
  };

  const handleMode = (mode: "outline" | "shade") => {
    if (mode === "outline") {
      onNavigate("tutorial", {
        subject,
        mode: "outline",
        wikiSummary,
        imageUrl: wikiImageUrl,
      });
    } else {
      setStep("shade-choice");
    }
  };

  const handleShadeChoice = (mode: DrawMode) => {
    onNavigate("tutorial", {
      subject,
      mode,
      wikiSummary,
      imageUrl: wikiImageUrl,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-[#0E1117]">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          type="button"
          onClick={
            step === "input"
              ? onBack
              : () => setStep(step === "shade-choice" ? "mode" : "input")
          }
          className="flex items-center gap-1 text-white/40 hover:text-white/80 mb-8 transition-colors"
          data-ocid="name_draw.back.button"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {/* Step: Input */}
        {step === "input" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B3CFF] to-[#D44BFF] flex items-center justify-center mx-auto mb-4 shadow-glow-purple">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display font-bold text-4xl text-white mb-2">
                Name &amp; Draw
              </h1>
              <p className="text-white/50">
                Type anything you want to draw — from Naruto to a rose to the
                Eiffel Tower.
              </p>
            </div>

            <div className="glass-dark rounded-2xl p-6">
              <label
                htmlFor="subject-input"
                className="block text-white/70 text-sm font-medium mb-2"
              >
                What do you want to draw?
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Naruto, Tiger, Sunflower, Eiffel Tower…"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setInappropriate(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 flex-1"
                  id="subject-input"
                  data-ocid="name_draw.subject.input"
                />
                <Button
                  onClick={handleSearch}
                  disabled={!inputValue.trim() || wikiLoading}
                  className="bg-gradient-to-r from-[#7B3CFF] to-[#D44BFF] hover:opacity-90 text-white px-5"
                  data-ocid="name_draw.search.button"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {inappropriate && (
                <div
                  className="mt-3 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm"
                  data-ocid="name_draw.inappropriate.error_state"
                >
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Please keep content appropriate. DRAWAI is for everyone!
                </div>
              )}

              {wikiLoading && (
                <div
                  className="mt-4 text-white/40 text-sm flex items-center gap-2"
                  data-ocid="name_draw.wiki.loading_state"
                >
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                  Searching Wikipedia…
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-white/30 text-xs mb-3">Popular subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Naruto",
                    "Tiger",
                    "Rose",
                    "Human face",
                    "Dragon",
                    "Origami crane",
                  ].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setInputValue(s)}
                      className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-xs transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step: Mode */}
        {step === "mode" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-3xl text-white mb-2 text-center">
              Drawing: <span className="text-gradient">{subject}</span>
            </h1>

            {/* Wiki info */}
            <div className="glass-dark rounded-2xl p-5 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {wikiImageUrl ? (
                    <img
                      src={wikiImageUrl}
                      alt={subject}
                      className="w-20 h-20 rounded-xl object-contain bg-white/5"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center text-white/30 text-xs text-center px-1">
                      No image found
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <BookOpen className="w-3 h-3" />
                    Wikipedia
                  </div>
                  <p className="text-white/70 text-sm line-clamp-4">
                    {wikiSummary ||
                      `Learn to draw ${subject} with step-by-step guidance.`}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white/50 text-center mb-6">
              Choose your drawing style:
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleMode("shade")}
                className="glass rounded-2xl p-6 text-center hover:bg-white/15 transition-all group cursor-pointer"
                data-ocid="name_draw.shade.button"
              >
                <div className="text-4xl mb-3">✏️</div>
                <h3 className="font-display font-bold text-white text-lg mb-1">
                  Shade
                </h3>
                <p className="text-white/50 text-xs">
                  Pencil shading or full colour tutorial
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleMode("outline")}
                className="glass rounded-2xl p-6 text-center hover:bg-white/15 transition-all group cursor-pointer"
                data-ocid="name_draw.outline.button"
              >
                <div className="text-4xl mb-3">🖊️</div>
                <h3 className="font-display font-bold text-white text-lg mb-1">
                  Outline
                </h3>
                <p className="text-white/50 text-xs">
                  Learn to draw the perfect outline
                </p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step: Shade choice */}
        {step === "shade-choice" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-3xl text-white mb-2 text-center">
              Shade Style for <span className="text-gradient">{subject}</span>
            </h1>
            <p className="text-white/50 text-center mb-8">
              How do you want to shade your drawing?
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleShadeChoice("pencil")}
                className="glass rounded-2xl p-8 text-center hover:bg-white/15 transition-all cursor-pointer"
                data-ocid="name_draw.pencil.button"
              >
                <div className="text-5xl mb-4">✏️</div>
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Pencil Shading
                </h3>
                <p className="text-white/50 text-sm">
                  Black &amp; white pencil technique with detailed hatching and
                  value study
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleShadeChoice("colour")}
                className="glass rounded-2xl p-8 text-center hover:bg-white/15 transition-all cursor-pointer"
                data-ocid="name_draw.colour.button"
              >
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Colouring
                </h3>
                <p className="text-white/50 text-sm">
                  Full colour tutorial with vibrant hues and blending techniques
                </p>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
