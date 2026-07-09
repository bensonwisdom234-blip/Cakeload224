import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trophy, Check, Send, Heart, User, Star } from "lucide-react";
import { BUSINESS_DATA } from "../data";

export default function InfluencerProgram() {
  const [handle, setHandle] = useState("");
  const [followers, setFollowers] = useState(500);
  const [pitch, setPitch] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple reward calculations based on followers
  const getAmbassadorTier = (count: number) => {
    if (count < 1000) {
      return {
        name: "Baker Buddy",
        reward: "Free 4-Pack per month + 10% follower discount code",
        description: "Great for local foodies and enthusiastic kitchen reviewers just getting started!",
        badgeColor: "bg-[#FFFBF2] text-[#2D1B08]"
      };
    } else if (count < 1000) {
      return {
        name: "Cinnamon Champion",
        reward: "Free 6-Pack per week + custom affiliate coupon",
        description: "Perfect for active Kansas City lifestyle, student, and local food bloggers.",
        badgeColor: "bg-white text-[#2D1B08]"
      };
    } else {
      return {
        name: "Golden Glaze Ambassador",
        reward: "Unlimited Dozen drops + private flavor testing panels",
        description: "Our highest VIP status. Get access to secret test batches and special drop priority.",
        badgeColor: "bg-[#D2691E] text-white"
      };
    }
  };

  const tier = getAmbassadorTier(followers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setHandle("");
    setFollowers(500);
    setPitch("");
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white border-2 border-[#2D1B08] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#2D1B08]" id="influencer-program-widget">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Info & Value Pitch */}
        <div className="lg:col-span-6 space-y-4">
          <span className="bold-tag">
            Ambassador Program
          </span>
          <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tight leading-none pt-2">
            Are You a KC Creator? Let’s Collaborate! 📸
          </h3>
          <p className="text-sm text-[#2D1B08]/80 leading-relaxed font-semibold">
            We love supporting our local Kansas City creators and food enthusiasts. If you love warm, gooey sweets and taking stunning content, we'd love to drop some fresh Cakeload rolls to your doorstep in exchange for honest social content!
          </p>
          
          <div className="space-y-3 pt-2">
            {[
              "Receive free fresh bakes before general drops",
              "Get exclusive affiliate codes for your audience",
              "Access private tasting boards for seasonal recipes",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-[#2D1B08]/85 uppercase tracking-wide">
                <span className="w-5 h-5 bg-[#FFFBF2] text-[#D2691E] border-2 border-[#2D1B08] shadow-[1px_1px_0px_0px_#2D1B08] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Calculator & Submission Form */}
        <div className="lg:col-span-6 bg-[#FFFBF2] border-2 border-[#2D1B08] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#2D1B08]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="influencer-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <h4 className="font-sans font-black text-[#2D1B08] text-base uppercase tracking-tight flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-[#D2691E] animate-pulse" />
                  Ambassador Eligibility Calculator
                </h4>

                <div className="space-y-3">
                  {/* Handle Input */}
                  <div>
                    <label className="block text-[9px] font-mono font-black uppercase text-[#2D1B08]/80 tracking-widest mb-1.5">
                      Your Social Handle
                    </label>
                    <input
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="e.g. @kansas_city_eats"
                      className="w-full bg-white border-2 border-[#2D1B08] px-3.5 py-2.5 text-xs text-[#2D1B08] placeholder:text-[#2D1B08]/40 focus:outline-none font-mono font-bold uppercase tracking-wider"
                    />
                  </div>

                  {/* Followers Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[9px] font-mono font-black uppercase text-[#2D1B08]/80 tracking-widest">
                        Follower Count
                      </label>
                      <span className="font-mono text-xs font-black text-[#2D1B08] bg-white border-2 border-[#2D1B08] px-2.5 py-0.5 shadow-[1px_1px_0px_0px_#2D1B08]">
                        {followers.toLocaleString()} followers
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={20000}
                      step={100}
                      value={followers}
                      onChange={(e) => setFollowers(Number(e.target.value))}
                      className="w-full h-2 bg-white border-2 border-[#2D1B08] rounded-none appearance-none cursor-pointer accent-[#D2691E]"
                    />
                  </div>

                  {/* Live Tier Preview Card */}
                  <div className="p-3.5 bg-white border-2 border-[#2D1B08] shadow-[2px_2px_0px_0px_#2D1B08] space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#2D1B08]/80">
                        Collaboration Tier:
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-none font-black border-2 border-[#2D1B08] uppercase tracking-wider shadow-[1px_1px_0px_0px_#2D1B08] ${tier.badgeColor}`}>
                        {tier.name}
                      </span>
                    </div>
                    <p className="text-xs font-sans font-black text-[#2D1B08] uppercase tracking-tight">
                      🎁 Reward: <span className="text-[#D2691E]">{tier.reward}</span>
                    </p>
                    <p className="text-[10px] text-[#2D1B08]/70 leading-relaxed font-bold">
                      {tier.description}
                    </p>
                  </div>

                  {/* Brief Pitch */}
                  <div>
                    <label className="block text-[9px] font-mono font-black uppercase text-[#2D1B08]/80 tracking-widest mb-1.5">
                      Why do you love cinnamon rolls?
                    </label>
                    <textarea
                      rows={2}
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      placeholder="e.g. Cinnamon rolls are my absolute favorite dessert, and my audience loves bakery highlights!"
                      className="w-full bg-white border-2 border-[#2D1B08] px-3.5 py-2.5 text-xs text-[#2D1B08] placeholder:text-[#2D1B08]/40 focus:outline-none font-mono font-bold uppercase tracking-wider resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-submit-influencer"
                  className="w-full flex items-center justify-center gap-2 bg-[#D2691E] hover:bg-[#2D1B08] text-white font-black py-3 border-2 border-[#2D1B08] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Ambassador Application
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="influencer-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4 space-y-4"
              >
                <div className="w-12 h-12 bg-emerald-500 text-white border-2 border-[#2D1B08] flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#2D1B08]">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-black text-[#2D1B08] uppercase tracking-tight">Application Compiled!</h4>
                  <p className="text-xs text-[#2D1B08]/85 font-bold mt-1.5 max-w-xs mx-auto">
                    We've registered your handle <strong className="text-[#D2691E]">{handle}</strong> at the <strong className="text-[#D2691E]">{tier.name}</strong> tier!
                  </p>
                </div>

                <div className="bg-white p-4 border-2 border-[#2D1B08] shadow-[2px_2px_0px_0px_#2D1B08] text-left text-[10px] font-mono text-[#2D1B08] space-y-1.5 select-all font-black uppercase tracking-wide leading-relaxed">
                  <p className="font-black border-b-2 border-[#2D1B08]/10 pb-1 mb-1.5 text-[#D2691E]">Copy & DM us on Instagram:</p>
                  <p>"Hey Cakeload! 🥐 I'm {handle} ({followers} followers) and I love what you're doing. I applied as a {tier.name} for your program. I'd love to share some of your gooey rolls with my audience! Let me know if you have slots available."</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-white hover:bg-[#FFFBF2] text-[#2D1B08] font-black text-xs py-2.5 border-2 border-[#2D1B08] shadow-[2px_2px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer transition-all uppercase tracking-wider"
                  >
                    Recalculate
                  </button>
                  <a
                    href={`https://instagram.com/${BUSINESS_DATA.socials.instagram || "cakeload.kc"}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#D2691E] hover:bg-white hover:text-[#2D1B08] text-white font-black text-xs py-2.5 border-2 border-[#2D1B08] shadow-[2px_2px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer transition-all uppercase tracking-wider"
                  >
                    <span>DM Cakeload</span>
                    <Send className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
