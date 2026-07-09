import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, Calendar, Clock, Sparkles, Sliders, ChevronDown } from "lucide-react";
import { BUSINESS_DATA } from "../data";

interface StatusBannerProps {
  orderStatus: string;
  setOrderStatus: (status: string) => void;
}

export default function StatusBanner({ orderStatus, setOrderStatus }: StatusBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showSimulator, setShowSimulator] = useState(false);

  // Live countdown to next Thursday at 23:59:59
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target: Next Thursday midnight (23:59:59)
      const currentDay = now.getDay(); // 0: Sun, 1: Mon, ... 3: Wed, 4: Thu, 5: Fri, 6: Sat
      let daysUntilThursday = (4 - currentDay + 7) % 7;
      
      // If today is Thursday and it's already past midnight, target next Thursday
      if (daysUntilThursday === 0 && now.getHours() >= 23 && now.getMinutes() >= 59) {
        daysUntilThursday = 7;
      }
      
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() + daysUntilThursday);
      targetDate.setHours(23, 59, 59, 999);

      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "open":
        return {
          bg: "bg-white border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08]",
          iconBg: "bg-emerald-500",
          accentColor: "text-emerald-600",
          title: "Pre-orders are LIVE! 🎉",
          description: "Freshly baked rolls will be available for pickup this Sunday. Claim your batch before the Thursday deadline!",
          icon: Sparkles
        };
      case "closed":
        return {
          bg: "bg-white border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08]",
          iconBg: "bg-rose-500",
          accentColor: "text-rose-600",
          title: "Pre-orders are closed for this week! ⏳",
          description: "We are sold out of this week's drop! Pre-orders for our next batch will open Sunday/Monday. Sign up for our newsletter below to get first dibs!",
          icon: AlertCircle
        };
      case "on_break":
        return {
          bg: "bg-white border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08]",
          iconBg: "bg-amber-500",
          accentColor: "text-amber-600",
          title: "The Bakers are on a short break! 😴",
          description: "We are currently resting our ovens to dream up new flavor profiles. We'll be back in action very soon!",
          icon: Calendar
        };
      case "holiday_special":
        return {
          bg: "bg-white border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08]",
          iconBg: "bg-[#D2691E]",
          accentColor: "text-[#D2691E]",
          title: "Holiday Pre-Order Extravaganza! 🎄✨",
          description: "Featuring a limited festive drop with premium seasonal toppings. Order early—these special slots go faster than standard drops!",
          icon: Sparkles
        };
      default:
        return {
          bg: "bg-white border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08]",
          iconBg: "bg-[#D2691E]",
          accentColor: "text-[#2D1B08]",
          title: "Welcome to Cakeload!",
          description: "Baked fresh and made to satisfy every craving.",
          icon: Sparkles
        };
    }
  };

  const config = getStatusConfig(orderStatus);
  const StatusIcon = config.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Simulator Toggle Control */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowSimulator(!showSimulator)}
          id="btn-toggle-simulator"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#2D1B08] bg-white hover:bg-[#2D1B08] hover:text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[2px_2px_0px_0px_#2D1B08]"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Simulate Store Cycle</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSimulator ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Simulator Control Panel */}
      <AnimatePresence>
        {showSimulator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6 bg-white border-2 border-[#2D1B08] p-5 shadow-[4px_4px_0px_0px_#2D1B08]"
            id="simulator-panel"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-black text-sm flex items-center gap-1.5 text-[#2D1B08] uppercase tracking-wider">
                  <Sliders className="w-4 h-4 text-[#D2691E]" />
                  Bakery Status Control Center
                </h4>
                <p className="text-xs text-[#2D1B08]/80 mt-0.5">
                  Home bakery sales operate in strict cycles. Toggle statuses to see how the landing page, alerts, and ordering process dynamically update.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {BUSINESS_DATA.orderModel.statusOptions.map((status) => (
                  <button
                    key={status}
                    id={`btn-set-status-${status}`}
                    onClick={() => setOrderStatus(status)}
                    className={`px-3 py-1.5 border-2 border-[#2D1B08] text-xs font-black transition-all cursor-pointer ${
                      orderStatus === status
                        ? "bg-[#D2691E] text-white shadow-[2px_2px_0px_0px_#2D1B08]"
                        : "bg-white hover:bg-[#2D1B08]/10 text-[#2D1B08]"
                    }`}
                  >
                    {status.replace("_", " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Status Banner */}
      <div className={`p-6 sm:p-8 ${config.bg} transition-all duration-300`}>
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 border-2 border-[#2D1B08] shadow-[2px_2px_0px_0px_#2D1B08] flex-shrink-0 text-white ${config.iconBg}`}>
              <StatusIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-sans text-lg sm:text-xl font-black uppercase tracking-tight ${config.accentColor}`}>
                {config.title}
              </h3>
              <p className="text-[#2D1B08] text-sm mt-1.5 max-w-2xl leading-relaxed font-medium">
                {config.description}
              </p>
              
              {/* Pickup info tags */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-[10px] font-black uppercase tracking-widest text-[#2D1B08]/70">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D2691E]" />
                  Orders Close: <strong className="text-[#2D1B08] underline decoration-[#D2691E] decoration-2">{BUSINESS_DATA.orderModel.cycle.ordersCloseBy}</strong>
                </span>
                <span className="hidden md:inline text-[#D2691E] font-black">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D2691E]" />
                  Pickup Day: <strong className="text-[#2D1B08] underline decoration-[#D2691E] decoration-2">{BUSINESS_DATA.orderModel.cycle.pickupDay}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Time Countdown Box (Only visible when active or holiday special) */}
          {(orderStatus === "open" || orderStatus === "holiday_special") && (
            <div className="flex-shrink-0 bg-[#FFFBF2] px-6 py-4 border-2 border-[#2D1B08] shadow-[3px_3px_0px_0px_#2D1B08] text-center">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#D2691E] block mb-2">
                Drop Deadline Countdown
              </span>
              <div className="flex items-center justify-center gap-2" id="countdown-timer">
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xl font-black text-[#2D1B08] w-8">{timeLeft.days}</span>
                  <span className="text-[9px] font-bold text-[#2D1B08]/60 uppercase">Days</span>
                </div>
                <span className="text-[#2D1B08] font-black -mt-3 text-lg">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xl font-black text-[#2D1B08] w-8">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-bold text-[#2D1B08]/60 uppercase">Hrs</span>
                </div>
                <span className="text-[#2D1B08] font-black -mt-3 text-lg">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xl font-black text-[#2D1B08] w-8">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-bold text-[#2D1B08]/60 uppercase">Min</span>
                </div>
                <span className="text-[#2D1B08] font-black -mt-3 text-lg">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xl font-black text-[#2D1B08] w-8">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-bold text-[#2D1B08]/60 uppercase">Sec</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
