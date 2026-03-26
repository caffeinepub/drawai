import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface CompletionScreenProps {
  gradient: string;
  onDrawAgain: () => void;
}

const CONFETTI_COLORS = [
  "#FFC247",
  "#FF7A3D",
  "#19C6FF",
  "#D44BFF",
  "#7B3CFF",
  "#4AFF91",
  "#FF6B9D",
  "#FFD700",
];

// Pre-generate static confetti data so keys are stable and meaningful
const CONFETTI_PIECES = Array.from({ length: 40 }, (_, i) => ({
  id: `cp-${i}`,
  left: `${(i * 2.5) % 100}%`,
  delay: `${(i * 0.13) % 3}s`,
  duration: `${2.5 + (i % 5) * 0.4}s`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  width: `${6 + (i % 4) * 3}px`,
  height: `${6 + (i % 3) * 4}px`,
  radius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "0",
}));

export function CompletionScreen({
  gradient,
  onDrawAgain,
}: CompletionScreenProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        backgroundImage: gradient,
        backgroundSize: "400% 400%",
        animation: "completion-gradient 6s ease infinite",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 10, 18, 0.6)" }}
      />

      {/* CSS Confetti particles */}
      <div className="confetti-container" aria-hidden="true">
        {CONFETTI_PIECES.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              background: piece.color,
              width: piece.width,
              height: piece.height,
              borderRadius: piece.radius,
            }}
          />
        ))}
      </div>

      {/* Sparkle orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-40 animate-float"
        style={{ background: "radial-gradient(circle, #FFC247, transparent)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-35 animate-float"
        style={{
          background: "radial-gradient(circle, #D44BFF, transparent)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute top-1/2 left-[20%] w-64 h-64 rounded-full blur-3xl opacity-30 animate-float"
        style={{
          background: "radial-gradient(circle, #19C6FF, transparent)",
          animationDelay: "0.8s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <Sparkles
            className="w-16 h-16 mx-auto text-yellow-300 drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 20px #FFC247)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.45,
            type: "spring",
            stiffness: 130,
            damping: 10,
          }}
        >
          <h1
            className="font-display font-extrabold tracking-widest mb-2"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              backgroundImage:
                "linear-gradient(135deg, #FFC247 0%, #FF7A3D 30%, #D44BFF 65%, #19C6FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(255,194,71,0.6))",
              animation: "dhanyavaadam-glow 2s ease-in-out infinite",
            }}
          >
            DHANYAVAADAM
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="text-white/90 text-2xl sm:text-3xl font-semibold mb-2 font-display"
        >
          ✨ You completed the tutorial!
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white/50 text-base mb-12"
        >
          ध​न्यवाद — Thank you for drawing with DRAWAI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: "spring" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onDrawAgain}
            size="lg"
            className="bg-white text-[#0E1117] hover:bg-yellow-50 font-bold text-lg px-12 py-7 rounded-full shadow-[0_0_40px_rgba(255,194,71,0.6)] hover:shadow-[0_0_60px_rgba(255,194,71,0.9)] transition-all"
            data-ocid="completion.draw_again.button"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Draw Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
