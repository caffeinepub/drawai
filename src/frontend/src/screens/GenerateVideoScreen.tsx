import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ChevronLeft,
  Play,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

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
];

function isInappropriate(text: string): boolean {
  const lower = text.toLowerCase();
  return INAPPROPRIATE_TERMS.some((t) => lower.includes(t));
}

type GenState = "idle" | "generating" | "done" | "error";

interface GenerateVideoScreenProps {
  onBack: () => void;
}

export function GenerateVideoScreen({ onBack }: GenerateVideoScreenProps) {
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [genState, setGenState] = useState<GenState>("idle");
  const [progress, setProgress] = useState(0);
  const [inappropriate, setInappropriate] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    if (isInappropriate(prompt)) {
      setInappropriate(true);
      return;
    }
    setInappropriate(false);
    setGenState("generating");
    setProgress(0);

    // Simulated progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          clearInterval(interval);
          setGenState("done");
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 300);
  };

  const storyboardFrames = [
    { label: "Frame 1: Establishing Shot", desc: `Wide view — ${prompt}` },
    {
      label: "Frame 2: Close-up",
      desc: "Close-up of the key subject. Hand begins drawing with light sketching motions.",
    },
    {
      label: "Frame 3: Progress",
      desc: "Drawing progresses. Basic shapes transform into detailed form.",
    },
    {
      label: "Frame 4: Details",
      desc: "Fine details added. Hatching, texture, and shading applied.",
    },
    {
      label: "Frame 5: Final Reveal",
      desc: "Completed drawing revealed with a flourish. Camera pulls back.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-[#0E1117]">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-white/40 hover:text-white/80 mb-8 transition-colors"
          data-ocid="generate_video.back.button"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A3D] to-[#D44BFF] flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl text-white mb-2">
              Generate Video
            </h1>
            <p className="text-white/50">
              Describe your drawing scene and get a detailed storyboard video
              concept.
            </p>
          </div>

          {genState !== "done" && (
            <div className="glass-dark rounded-2xl p-6 space-y-5">
              {/* Image upload */}
              <div>
                <p className="block text-white/70 text-sm font-medium mb-2">
                  Reference Image{" "}
                  <span className="text-white/30">(optional)</span>
                </p>
                <div
                  onClick={() => fileRef.current?.click()}
                  onKeyDown={(e) =>
                    e.key === "Enter" && fileRef.current?.click()
                  }
                  className="border border-dashed border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 hover:bg-white/3 transition-all flex items-center gap-3"
                  id="gen-upload"
                  data-ocid="generate_video.dropzone"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const reader = new FileReader();
                      reader.onload = (ev) =>
                        setImageFile(ev.target?.result as string);
                      reader.readAsDataURL(f);
                    }}
                  />
                  {imageFile ? (
                    <img
                      src={imageFile}
                      alt="Reference"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-white/30" />
                    </div>
                  )}
                  <div>
                    <p className="text-white/60 text-sm">
                      {imageFile ? "Image selected" : "Upload reference image"}
                    </p>
                    <p className="text-white/30 text-xs">JPG, PNG, WEBP</p>
                  </div>
                  {imageFile && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                      }}
                      className="ml-auto text-white/30 hover:text-white/60 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Prompt */}
              <div>
                <label
                  htmlFor="gen-prompt"
                  className="block text-white/70 text-sm font-medium mb-2"
                >
                  Video Prompt *
                </label>
                <Textarea
                  placeholder="e.g. Draw a majestic lion step by step in pencil sketch style, starting from basic circles to detailed fur..."
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    setInappropriate(false);
                  }}
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                  id="gen-prompt"
                  data-ocid="generate_video.prompt.textarea"
                />
                {inappropriate && (
                  <div
                    className="mt-2 flex items-center gap-2 text-red-400 text-sm"
                    data-ocid="generate_video.inappropriate.error_state"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Please keep content appropriate. DRAWAI is for everyone!
                  </div>
                )}
                <p className="text-white/20 text-xs mt-2">
                  ⚠️ This tool is for art and drawing content only. 18+ content
                  is not supported.
                </p>
              </div>

              {genState === "generating" && (
                <div data-ocid="generate_video.loading_state">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-[#FF7A3D] rounded-full animate-spin" />
                    Generating your video storyboard…
                  </div>
                  <Progress value={progress} className="h-2 bg-white/10" />
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || genState === "generating"}
                size="lg"
                className="w-full bg-gradient-to-r from-[#FF7A3D] to-[#D44BFF] hover:opacity-90 text-white font-bold rounded-xl"
                data-ocid="generate_video.generate.button"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {genState === "generating"
                  ? "Generating…"
                  : "Generate Video Concept"}
              </Button>
            </div>
          )}

          {/* Result */}
          {genState === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
              data-ocid="generate_video.success_state"
            >
              <div className="glass rounded-2xl p-6 border border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                  <Play className="w-5 h-5" />
                  Your video concept is ready!
                </div>
                <p className="text-white/60 text-sm">
                  Here's what your drawing video would show:
                </p>
              </div>

              {/* Prompt recap */}
              <div className="glass-dark rounded-2xl p-5">
                <p className="text-white/30 text-xs uppercase tracking-wide mb-2">
                  Your Prompt
                </p>
                <p className="text-white/80 text-sm italic">"{prompt}"</p>
              </div>

              {/* Storyboard frames */}
              <div>
                <p className="text-white/50 text-sm font-medium mb-3">
                  Storyboard Breakdown:
                </p>
                <div className="space-y-3">
                  {storyboardFrames.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-dark rounded-xl p-4 flex gap-4"
                      data-ocid={`generate_video.frame.item.${i + 1}`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF7A3D] to-[#D44BFF] flex items-center justify-center text-white font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-white/80 font-medium text-sm">
                          {f.label}
                        </p>
                        <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setGenState("idle");
                  setPrompt("");
                  setImageFile(null);
                }}
                variant="outline"
                className="w-full border-white/10 text-white hover:bg-white/10"
                data-ocid="generate_video.reset.button"
              >
                Generate Another
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
