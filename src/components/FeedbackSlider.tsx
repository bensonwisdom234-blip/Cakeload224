import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquare, Plus, Check, Heart, User, Award } from "lucide-react";
import { BUSINESS_DATA } from "../data";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  platform: string;
  date: string;
  avatarInitials: string;
}

export default function FeedbackSlider() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev_01",
      name: "Megan S.",
      rating: 5,
      text: "Hands down the absolute best cinnamon rolls in Kansas City! The Star Spangled Strawberry Cheesecake flavor changed my life. They are so gooey and sweet but perfectly balanced.",
      platform: "Instagram DM",
      date: "2 days ago",
      avatarInitials: "MS"
    },
    {
      id: "rev_02",
      name: "Jason K.",
      rating: 5,
      text: "I picked up a dozen for my office meeting on Sunday and my team is still talking about it on Wednesday. Classic Cinnamon is perfect but that Caramel Pecan is outstanding. Real sticky goodness!",
      platform: "Text Message",
      date: "1 week ago",
      avatarInitials: "JK"
    },
    {
      id: "rev_03",
      name: "Clara V.",
      rating: 5,
      text: "We ordered a 4-pack for weekend brunch. Absolute heaven. Soft, fluffy dough with rich glaze that drips off. My kids devoured them in literally 2 minutes flat.",
      platform: "Facebook Post",
      date: "3 days ago",
      avatarInitials: "CV"
    }
  ]);

  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [newPlatform, setNewPlatform] = useState("Instagram DM");
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const initials = newName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      name: newName,
      rating: newRating,
      text: newText,
      platform: newPlatform,
      date: "Just now",
      avatarInitials: initials || "U"
    };

    setReviews([newReview, ...reviews]);
    setNewName("");
    setNewText("");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 py-8" id="feedback-slider-section">
      {/* Header and Social proof KPI */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#2D1B08] pb-8">
        <div className="max-w-xl space-y-4">
          <span className="bold-tag">
            Social Proof & Reviews
          </span>
          <h3 className="font-sans text-3xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tight">
            Loved by {BUSINESS_DATA.followers}+ Locals
          </h3>
          <p className="text-sm text-[#2D1B08]/80 font-medium leading-relaxed">
            See what our lovely KC neighbors are saying about our weekly fresh drops. We take pride in every single bake!
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="bg-[#FFFBF2] border-2 border-[#2D1B08] p-4 shadow-[3px_3px_0px_0px_#2D1B08] flex flex-col justify-center text-center">
            <span className="font-sans text-2xl font-black text-[#2D1B08]">155</span>
            <span className="text-[9px] font-mono uppercase font-black text-[#2D1B08]/80 mt-1 tracking-widest">IG Followers</span>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            id="btn-trigger-review-form"
            className="flex items-center gap-1.5 bg-[#D2691E] hover:bg-[#2D1B08] text-white font-black text-xs uppercase tracking-widest px-5 py-4 border-2 border-[#2D1B08] shadow-[3px_3px_0px_0px_#2D1B08] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Submission Form Modal/Panel */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-[#FFFBF2] border-2 border-[#2D1B08] shadow-[5px_5px_0px_0px_#2D1B08]"
            id="submit-review-form-panel"
          >
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-500 border-2 border-[#2D1B08] flex items-center justify-center text-white mx-auto shadow-[2px_2px_0px_0px_#2D1B08]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-sans text-lg font-black text-[#2D1B08] uppercase tracking-wide">Review Posted!</h4>
                <p className="text-xs text-[#2D1B08]/80 font-semibold">Thank you for sharing your sweet words with our neighborhood bakery!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-sans text-base font-black text-[#2D1B08] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-[#D2691E]" />
                  Leave your honest feedback
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-[#2D1B08]/80 mb-1 tracking-widest">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Benson W."
                      className="w-full bg-white border-2 border-[#2D1B08] px-3.5 py-2.5 text-xs font-semibold focus:outline-none placeholder-[#2D1B08]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-[#2D1B08]/80 mb-1 tracking-widest">Rating</label>
                    <div className="flex gap-2 items-center h-10 px-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="text-amber-500 focus:outline-none cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${newRating >= star ? "fill-amber-400 text-[#2D1B08]" : "text-gray-300"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-[#2D1B08]/80 mb-1 tracking-widest">Order Method</label>
                    <select
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value)}
                      className="w-full bg-white border-2 border-[#2D1B08] px-3.5 py-2.5 text-xs font-semibold focus:outline-none h-10 cursor-pointer"
                    >
                      <option>Instagram DM</option>
                      <option>Text Message</option>
                      <option>Facebook Post</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase text-[#2D1B08]/80 mb-1 tracking-widest">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Tell us about the texture, icing, sweetness, and your overall Cakeload experience..."
                    className="w-full bg-white border-2 border-[#2D1B08] px-3.5 py-2.5 text-xs font-semibold focus:outline-none resize-none placeholder-[#2D1B08]/40"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-white hover:bg-rose-100 text-[#2D1B08] border-2 border-[#2D1B08] font-black text-xs uppercase tracking-widest px-4 py-2.5 shadow-[2px_2px_0px_0px_#2D1B08] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btn-submit-review"
                    className="bg-[#D2691E] hover:bg-[#2D1B08] text-white border-2 border-[#2D1B08] font-black text-xs uppercase tracking-widest px-5 py-2.5 shadow-[2px_2px_0px_0px_#2D1B08] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer transition-all"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border-2 border-[#2D1B08] p-6 shadow-[5px_5px_0px_0px_#2D1B08] relative flex flex-col justify-between space-y-4 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
          >
            <div className="space-y-4">
              {/* Stars & Platform */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-[#2D1B08]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-[#2D1B08]" />
                  ))}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#2D1B08] bg-[#FFFBF2] border border-[#2D1B08] px-2.5 py-1 font-black shadow-[1px_1px_0px_0px_#2D1B08]">
                  {rev.platform}
                </span>
              </div>

              {/* Text content */}
              <p className="text-xs sm:text-sm text-[#2D1B08] italic leading-relaxed font-sans font-medium">
                "{rev.text}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="flex items-center gap-3 pt-4 border-t-2 border-[#2D1B08]/10">
              <div className="w-9 h-9 border-2 border-[#2D1B08] bg-[#FFFBF2] text-[#2D1B08] font-black text-xs flex items-center justify-center shadow-[1px_1px_0px_0px_#2D1B08]">
                {rev.avatarInitials}
              </div>
              <div>
                <span className="text-xs font-black text-[#2D1B08] uppercase tracking-wide block">{rev.name}</span>
                <span className="text-[9px] text-[#2D1B08]/60 font-mono font-bold block mt-0.5">{rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
