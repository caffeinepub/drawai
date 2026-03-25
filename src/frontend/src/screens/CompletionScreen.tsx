import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface CompletionScreenProps {
  gradient: string;
  onDrawAgain: () => void;
}

export function CompletionScreen({
  gradient,
  onDrawAgain,
}: CompletionScreenProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: gradient,
        backgroundSize: "400% 400%",
        animation: "completion-gradient 6s ease infinite",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10, 12, 18, 0.55)" }}
      />

      {/* Sparkle orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-30 animate-float"
        style={{ background: "radial-gradient(circle, #FFC247, transparent)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-25 animate-float"
        style={{
          background: "radial-gradient(circle, #D44BFF, transparent)",
          animationDelay: "1.5s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Sparkles className="w-12 h-12 mx-auto text-yellow-300 animate-float" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl text-white mb-4 animate-dhanyavaadam tracking-wide"
        >
          DHANYAVAADAM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-white/70 text-xl sm:text-2xl mb-3"
        >
          You completed the tutorial!
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/40 text-base mb-10"
        >
          ध​न्यवाद — Thank you for drawing with DRAWAI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            onClick={onDrawAgain}
            size="lg"
            className="bg-white text-[#0E1117] hover:bg-white/90 font-bold text-lg px-10 py-6 rounded-full shadow-glow-gold"
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
