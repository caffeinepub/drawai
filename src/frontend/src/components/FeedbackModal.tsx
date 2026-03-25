import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in your name and message");
      return;
    }
    const subject = encodeURIComponent(`DRAWAI Feedback from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.open(
      `mailto:sasukewithsusanoooo@gmail.com?subject=${subject}&body=${body}`,
      "_blank",
    );
    toast.success("Opening your email client…");
    setName("");
    setEmail("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-[#151A22] border-white/10 text-white max-w-md"
        data-ocid="feedback.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            Share Your Feedback
          </DialogTitle>
          <DialogDescription className="text-white/50">
            Your feedback helps us improve DRAWAI!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="fb-name" className="text-white/70">
              Your Name *
            </Label>
            <Input
              id="fb-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              data-ocid="feedback.name.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fb-email" className="text-white/70">
              Email (optional)
            </Label>
            <Input
              id="fb-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              data-ocid="feedback.email.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fb-message" className="text-white/70">
              Message *
            </Label>
            <Textarea
              id="fb-message"
              placeholder="Tell us what you think…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
              data-ocid="feedback.message.textarea"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSend}
              className="flex-1 bg-gradient-to-r from-[#4FA7FF] to-[#7B3CFF] hover:opacity-90 text-white font-semibold"
              data-ocid="feedback.submit.button"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Feedback
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
              data-ocid="feedback.cancel.button"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
