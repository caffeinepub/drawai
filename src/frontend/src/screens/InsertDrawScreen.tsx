import { Button } from "@/components/ui/button";
import { ChevronLeft, ImageIcon, Play, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import type { AppScreen, TutorialConfig } from "../App";

interface InsertDrawScreenProps {
  onNavigate: (screen: AppScreen, config?: TutorialConfig) => void;
  onBack: () => void;
}

export function InsertDrawScreen({
  onNavigate,
  onBack,
}: InsertDrawScreenProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleStartTutorial = () => {
    if (!uploadedImage) return;
    const subject = fileName.replace(/\.[^.]+$/, "") || "Uploaded Image";
    onNavigate("tutorial", {
      subject,
      mode: "outline",
      uploadedImage,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-[#0E1117]">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-white/40 hover:text-white/80 mb-8 transition-colors"
          data-ocid="insert_draw.back.button"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#19C6FF] to-[#2E6BFF] flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl text-white mb-2">
              Insert &amp; Draw
            </h1>
            <p className="text-white/50">
              Upload an image and we'll guide you through drawing it step by
              step.
            </p>
          </div>

          {/* Upload area */}
          {!uploadedImage ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onKeyDown={(e) =>
                e.key === "Enter" && fileInputRef.current?.click()
              }
              onClick={() => fileInputRef.current?.click()}
              className={`glass-dark rounded-3xl p-12 text-center cursor-pointer transition-all border-2 border-dashed ${
                isDragging
                  ? "border-[#19C6FF]/60 bg-white/10"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5"
              }`}
              data-ocid="insert_draw.dropzone"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={(e) =>
                  e.target.files?.[0] && handleFile(e.target.files[0])
                }
                className="hidden"
              />
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-white/30" />
              <p className="text-white/70 font-medium mb-1">
                Drop your image here
              </p>
              <p className="text-white/30 text-sm">or click to browse</p>
              <p className="text-white/20 text-xs mt-3">
                Supports JPG, PNG, GIF, WEBP
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-[#19C6FF] to-[#2E6BFF] hover:opacity-90 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                data-ocid="insert_draw.upload.button"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="glass-dark rounded-2xl overflow-hidden">
                <img
                  src={uploadedImage}
                  alt="Uploaded reference"
                  className="w-full max-h-80 object-contain"
                />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <ImageIcon className="w-4 h-4" />
                    <span className="truncate max-w-xs">{fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedImage(null);
                      setFileName("");
                    }}
                    className="text-white/30 hover:text-white/70 text-xs transition-colors"
                    data-ocid="insert_draw.remove.button"
                  >
                    Change
                  </button>
                </div>
              </div>

              <Button
                onClick={handleStartTutorial}
                size="lg"
                className="w-full bg-gradient-to-r from-[#19C6FF] to-[#2E6BFF] hover:opacity-90 text-white font-bold text-lg py-6 rounded-2xl shadow-glow"
                data-ocid="insert_draw.start_tutorial.button"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Drawing Tutorial
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
