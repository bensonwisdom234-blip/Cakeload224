import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Check, Bell, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [list, setList] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setList((prev) => [...prev, email]);
    setEmail("");
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFFBF2] text-[#2D1B08] border-2 border-[#2D1B08] p-6 sm:p-10 relative overflow-hidden shadow-[6px_6px_0px_0px_#2D1B08]" id="newsletter-widget">
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 bg-[#D2691E] border-2 border-[#2D1B08] flex items-center justify-center text-white mx-auto shadow-[2px_2px_0px_0px_#2D1B08]">
          <Bell className="w-6 h-6" />
        </div>

        <div className="space-y-3">
          <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tight">
            Join the Baker's Mailing Club 🥐
          </h3>
          <p className="text-sm text-[#2D1B08]/80 leading-relaxed max-w-lg mx-auto font-medium">
            We only bake what our kitchen can handle. Sign up to get notified the exact minute our weekly preorder books open—before we sell out!
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="newsletter-form"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white border-2 border-[#2D1B08] text-[#2D1B08] px-4 py-3 text-sm placeholder:text-[#2D1B08]/40 focus:outline-none h-12 font-mono font-bold uppercase tracking-wider"
              />
              <button
                type="submit"
                id="btn-subscribe"
                className="bg-[#D2691E] hover:bg-[#2D1B08] hover:text-white text-white border-2 border-[#2D1B08] font-black text-xs uppercase tracking-widest px-6 py-3 shadow-[3px_3px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer transition-all flex items-center justify-center gap-1.5 h-12"
              >
                <span>Notify Me</span>
                <Send className="w-4 h-4" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="newsletter-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border-2 border-[#2D1B08] p-5 max-w-md mx-auto text-center space-y-3 shadow-[4px_4px_0px_0px_#2D1B08]"
            >
              <div className="w-10 h-10 bg-emerald-500 border-2 border-[#2D1B08] flex items-center justify-center text-white mx-auto shadow-[2px_2px_0px_0px_#2D1B08]">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-black text-[#2D1B08] text-sm uppercase tracking-wider">You’re on the VIP list!</h4>
              <p className="text-xs text-[#2D1B08]/80 max-w-xs mx-auto leading-relaxed font-semibold">
                We'll email you the second pre-orders go live, plus send you secret recipe reveals!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[10px] text-[#D2691E] hover:underline font-mono font-black uppercase tracking-widest cursor-pointer"
              >
                Sign up another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {list.length > 0 && (
          <p className="text-[10px] text-[#2D1B08]/60 font-mono font-bold uppercase tracking-wider">
            {list.length} subscriber{list.length > 1 ? "s" : ""} joined the list in this session!
          </p>
        )}
      </div>
    </div>
  );
}
