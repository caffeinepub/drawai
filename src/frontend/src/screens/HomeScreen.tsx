import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Heart,
  Sparkles,
  Star,
  Upload,
  Video,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";
import type { AppScreen } from "../App";

interface HomeScreenProps {
  heroGradient: string;
  onNavigate: (screen: AppScreen) => void;
  onFeedback: () => void;
}

export function HomeScreen({
  heroGradient,
  onNavigate,
  onFeedback,
}: HomeScreenProps) {
  const currentYear = new Date().getFullYear();

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
        style={{
          backgroundImage: heroGradient,
          backgroundSize: "300% 300%",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10, 12, 18, 0.65)" }}
        />

        {/* Animated orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float"
          style={{
            background: "radial-gradient(circle, #19C6FF, transparent)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float"
          style={{
            background: "radial-gradient(circle, #D44BFF, transparent)",
            animationDelay: "2s",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Tagline badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm font-medium text-white/80"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <em className="not-italic font-semibold text-white">
              "A real art is an explosion"
            </em>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl tracking-tight text-white mb-4 glow-text"
          >
            DRAW<span className="text-gradient">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Learn to draw anything — anime characters, humans, animals, origami,
            and more. Your AI-powered art learning companion.
          </motion.p>

          {/* Main option cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8"
          >
            {/* Insert & Draw */}
            <button
              type="button"
              onClick={() => onNavigate("insert-draw")}
              className="glass rounded-3xl p-8 text-left hover:bg-white/15 transition-all duration-300 group cursor-pointer animate-pulse-glow"
              data-ocid="home.insert_draw.button"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#19C6FF] to-[#2E6BFF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-glow">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-white mb-2">
                INSERT &amp; DRAW
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Upload any image and get a step-by-step drawing tutorial
                tailored to your reference.
              </p>
              <div className="mt-5 flex items-center gap-1 text-[#19C6FF] font-semibold text-sm">
                Start now{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Name & Draw */}
            <button
              type="button"
              onClick={() => onNavigate("name-draw")}
              className="glass rounded-3xl p-8 text-left hover:bg-white/15 transition-all duration-300 group cursor-pointer"
              data-ocid="home.name_draw.button"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B3CFF] to-[#D44BFF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-glow-purple">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-white mb-2">
                NAME &amp; DRAW
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Type any subject name and learn to draw it with AI-guided
                tutorials and Wikipedia references.
              </p>
              <div className="mt-5 flex items-center gap-1 text-[#D44BFF] font-semibold text-sm">
                Start now{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => onNavigate("generate-video")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-full px-6 gap-2"
              data-ocid="home.generate_video.button"
            >
              <Video className="w-4 h-4" />
              Generate Video
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-[#0E1117]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              WHAT YOU CAN LEARN
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              From anime to architecture — DRAWAI covers every style and subject
              imaginable.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-dark rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="font-display font-semibold text-lg text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-white/50 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Generate Video Promo */}
      <section className="py-20 px-4 bg-[#151A22]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(123,60,255,0.15), rgba(79,167,255,0.15))",
            }}
          >
            <Video className="w-12 h-12 mx-auto mb-4 text-[#4FA7FF]" />
            <h2 className="font-display font-bold text-3xl text-white mb-3">
              Generate Drawing Videos
            </h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Describe what you want to see and optionally attach a reference
              image. Get a detailed storyboard and video concept for your
              drawing journey.
            </p>
            <Button
              onClick={() => onNavigate("generate-video")}
              className="bg-gradient-to-r from-[#4FA7FF] to-[#7B3CFF] hover:opacity-90 text-white font-semibold rounded-full px-8"
              data-ocid="home.video_cta.button"
            >
              Try Generate Video
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0E1117] border-t border-white/5 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Sparkles className="w-4 h-4" />
            <span className="font-display font-bold text-white/70">DRAWAI</span>
          </div>
          <div className="flex items-center gap-1 text-white/30 text-sm">
            © {currentYear}. Built with{" "}
            <Heart className="w-3.5 h-3.5 mx-0.5 text-pink-500 fill-pink-500" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white/60 underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </div>
          <button
            type="button"
            onClick={onFeedback}
            className="text-white/40 hover:text-white/70 text-sm flex items-center gap-1 transition-colors"
            data-ocid="footer.feedback.button"
          >
            <Star className="w-3.5 h-3.5" /> Give Feedback
          </button>
        </div>
      </footer>
    </main>
  );
}

const FEATURE_CARDS = [
  {
    emoji: "🎌",
    title: "Anime Characters",
    desc: "Naruto, Goku, Demon Slayer — master manga and anime art styles step by step.",
  },
  {
    emoji: "👤",
    title: "Human Portraits",
    desc: "Learn facial proportions, expressions, and realistic shading techniques.",
  },
  {
    emoji: "🐾",
    title: "Animals & Wildlife",
    desc: "Draw lions, wolves, birds and every creature with accurate anatomy.",
  },
  {
    emoji: "🏛️",
    title: "Buildings & Landscapes",
    desc: "Architectural sketching, perspective drawing, and scenic compositions.",
  },
  {
    emoji: "🦢",
    title: "Origami Art",
    desc: "Paper-folding art — step-by-step guidance from basic to complex forms.",
  },
  {
    emoji: "🌺",
    title: "Flowers & Nature",
    desc: "Botanical illustration, floral patterns, and organic forms made easy.",
  },
];
