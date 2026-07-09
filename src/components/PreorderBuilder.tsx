import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, Check, Copy, MessageSquare, Phone, 
  Sparkles, Info, Plus, Minus, ArrowRight, RotateCcw, 
  HelpCircle, Gift 
} from "lucide-react";
import { BUSINESS_DATA, PRICING_PACKAGES, FLAVORS, getPackageSize } from "../data";
import { PricingPackage, Flavor } from "../types";

interface PreorderBuilderProps {
  orderStatus: string;
}

export default function PreorderBuilder({ orderStatus }: PreorderBuilderProps) {
  const [step, setStep] = useState(1);
  const [selectedPack, setSelectedPack] = useState<PricingPackage>(PRICING_PACKAGES[0]);
  const [boxFlavors, setBoxFlavors] = useState<{ [flavorId: string]: number }>({});
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contactMethod, setContactMethod] = useState<"DM" | "text">("DM");
  const [contactHandle, setContactHandle] = useState("");
  const [pickupNote, setPickupNote] = useState("");
  const [copied, setCopied] = useState(false);

  // Calculate totals
  const maxRolls = getPackageSize(selectedPack.id);
  const currentRollsCount = (Object.values(boxFlavors) as number[]).reduce((sum, count) => sum + count, 0);

  const handleAddFlavor = (flavorId: string) => {
    if (currentRollsCount >= maxRolls) return;
    setBoxFlavors((prev) => ({
      ...prev,
      [flavorId]: (prev[flavorId] || 0) + 1,
    }));
  };

  const handleRemoveFlavor = (flavorId: string) => {
    if (!boxFlavors[flavorId]) return;
    setBoxFlavors((prev) => {
      const updated = { ...prev };
      if (updated[flavorId] <= 1) {
        delete updated[flavorId];
      } else {
        updated[flavorId]--;
      }
      return updated;
    });
  };

  const handleResetBox = () => {
    setBoxFlavors({});
  };

  const handlePackageSelect = (pkg: PricingPackage) => {
    setSelectedPack(pkg);
    setBoxFlavors({});
  };

  // Get active pricing
  const getSubtotal = () => {
    let price = selectedPack.price;
    if (couponApplied) {
      price = price * 0.9; // 10% discount
    }
    return price;
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SWEET10" || couponCode.toUpperCase() === "CAKELOAD") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code! Try 'SWEET10' or 'CAKELOAD' for a 10% discount.");
    }
  };

  // Compile visual grid list of current roll selection
  const getVisualBoxList = () => {
    const list: Flavor[] = [];
    Object.entries(boxFlavors).forEach(([id, count]) => {
      const flavor = FLAVORS.find((f) => f.id === id);
      if (flavor) {
        for (let i = 0; i < (count as number); i++) {
          list.push(flavor);
        }
      }
    });
    // Pad remaining slots
    const remainder = maxRolls - list.length;
    for (let i = 0; i < remainder; i++) {
      list.push({
        id: `empty-${i}`,
        name: "Empty Slot",
        emoji: "🕳️",
        description: "",
        seasonal: false,
      });
    }
    return list;
  };

  const compiledBoxList = getVisualBoxList();

  // Generate the preorder message
  const generateMessage = () => {
    const flavorLines = Object.entries(boxFlavors)
      .map(([id, count]) => {
        const flavor = FLAVORS.find((f) => f.id === id);
        return `   • ${count}x ${flavor?.emoji || "🥐"} ${flavor?.name}`;
      })
      .join("\n");

    const pickupDetail = pickupNote ? `\n• Notes: "${pickupNote}"` : "";
    const contactDetail = contactHandle ? `\n• My Contact: ${contactHandle}` : "";
    const couponDetail = couponApplied ? ` (SWEET10 applied - 10% OFF)` : "";

    return `Hi Cakeload! 🥐 I'd like to pre-order a box for this week's drop:

• Package: ${selectedPack.label} ($${getSubtotal().toFixed(2)}${couponDetail})
• Flavor Selection:
${flavorLines}
• Name: ${customerName || "Customer"} ${contactDetail}${pickupDetail}

Can't wait for Sunday morning pickup! 🤤`;
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSmsLink = () => {
    const phone = BUSINESS_DATA.phone.replace(/\s+/g, "");
    const text = encodeURIComponent(generateMessage());
    return `sms:${phone}?body=${text}`;
  };

  const getInstagramLink = () => {
    return `https://instagram.com/${BUSINESS_DATA.socials.instagram || "cakeload.kc"}`;
  };

  const isStoreClosed = orderStatus === "closed" || orderStatus === "on_break";

  return (
    <div className="bg-white border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08] overflow-hidden animate-fade-in" id="preorder-builder-widget">
      {/* Header Banner */}
      <div className="bg-[#FFFBF2] text-[#2D1B08] border-b-2 border-[#2D1B08] p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="bold-tag">
              Interactive Box Builder
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tight mt-3">
              Build Your Dream Pack
            </h3>
            <p className="text-[#2D1B08]/85 text-sm mt-1.5 font-bold">
              Select your quantity, mix-and-match flavors, and generate your direct booking message.
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 border-2 border-[#2D1B08] flex items-center justify-center text-xs font-black transition-all shadow-[1px_1px_0px_0px_#2D1B08] ${
                  step === num
                    ? "bg-[#D2691E] text-white scale-105"
                    : step > num
                    ? "bg-white text-[#2D1B08]/50"
                    : "bg-white text-[#2D1B08]/20"
                }`}
              >
                {step > num ? <Check className="w-3.5 h-3.5" /> : num}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* STEP 1: Choose Package Size */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="font-sans text-lg font-black text-[#2D1B08] uppercase tracking-tight flex items-center gap-1.5">
                <Gift className="w-5 h-5 text-[#D2691E]" />
                Step 1: Choose your package size
              </h4>
              <p className="text-[#2D1B08]/80 text-sm mt-1 font-semibold">
                Our rolls are packed in gourmet craft boxes. Select the perfect size to share (or keep all to yourself).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRICING_PACKAGES.map((pkg) => {
                const isSelected = selectedPack.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    id={`btn-select-package-${pkg.id}`}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`text-left p-5 bg-white border-2 border-[#2D1B08] transition-all relative flex flex-col justify-between h-40 shadow-[3px_3px_0px_0px_#2D1B08] cursor-pointer ${
                      isSelected
                        ? "bg-[#FFFBF2] ring-2 ring-[#D2691E] shadow-[5px_5px_0px_0px_#2D1B08]"
                        : "hover:bg-[#FFFBF2]/55"
                    }`}
                  >
                    <div className="w-full">
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-sans text-base sm:text-lg font-black text-[#2D1B08] uppercase tracking-tight">
                          {pkg.label}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 bg-[#D2691E] border-2 border-[#2D1B08] text-white flex items-center justify-center shadow-[1px_1px_0px_0px_#2D1B08] flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#2D1B08]/80 mt-1.5 font-bold leading-normal">
                        {pkg.id === "price_dozen" 
                          ? "Perfect for family brunches and special occasions." 
                          : pkg.id === "price_6pk" 
                          ? "Our most popular size. Great for a sweet weekend." 
                          : "A delightful taste of our main creations."}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-[#2D1B08]/10 w-full flex items-baseline justify-between">
                      <span className="font-mono text-xl font-black text-[#2D1B08]">
                        ${pkg.price.toFixed(2)}
                      </span>
                      {pkg.promo && (
                        <span className="text-[9px] bg-rose-50 text-[#D2691E] border border-[#2D1B08] px-2.5 py-0.5 font-black uppercase tracking-wider animate-pulse">
                          PROMO
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                id="btn-step1-next"
                className="flex items-center gap-2 bg-[#D2691E] hover:bg-[#2D1B08] text-white font-black px-6 py-3 border-2 border-[#2D1B08] shadow-[3px_3px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer transition-all uppercase tracking-widest text-xs"
              >
                <span>Customize Flavors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Flavor Mix & Match */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-sans text-lg font-black text-[#2D1B08] uppercase tracking-tight flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-[#D2691E]" />
                  Step 2: Customize Box Flavors
                </h4>
                <p className="text-[#2D1B08]/80 text-sm mt-1 font-semibold">
                  You have selected a <strong className="text-[#D2691E] uppercase">{selectedPack.label}</strong>. Choose precisely which flavors go into your box.
                </p>
              </div>
              <button
                onClick={handleResetBox}
                id="btn-reset-box"
                className="inline-flex items-center gap-1 text-xs font-black text-[#2D1B08] bg-white border-2 border-[#2D1B08] px-2.5 py-1.5 shadow-[1.5px_1.5px_0px_0px_#2D1B08] hover:shadow-[0.5px_0.5px_0px_0px_#2D1B08] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer transition-all uppercase tracking-wider"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Box
              </button>
            </div>

            {/* Core Split: Selection List and Live Box Graphics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Flavor Options List */}
              <div className="lg:col-span-7 space-y-4 max-h-[460px] overflow-y-auto pr-2">
                {FLAVORS.map((flavor) => {
                  const currentQty = boxFlavors[flavor.id] || 0;
                  const isMaxReached = currentRollsCount >= maxRolls;

                  return (
                    <div
                      key={flavor.id}
                      className={`p-3.5 bg-white border-2 border-[#2D1B08] flex items-center justify-between gap-3 transition-all shadow-[2px_2px_0px_0px_#2D1B08] ${
                        currentQty > 0
                          ? "bg-[#FFFBF2] border-2 border-[#D2691E]"
                          : "hover:border-[#D2691E]/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl flex-shrink-0" role="img" aria-label={flavor.name}>
                          {flavor.emoji}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-sans font-black text-[#2D1B08] text-sm sm:text-base uppercase tracking-tight">
                              {flavor.name}
                            </span>
                            {flavor.seasonal && (
                              <span className="text-[9px] bg-[#FFFBF2] text-[#2D1B08] border border-[#2D1B08] px-1.5 py-0.5 font-black uppercase tracking-wider">
                                Seasonal
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#2D1B08]/80 mt-1 font-bold leading-relaxed line-clamp-2">
                            {flavor.description}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => handleRemoveFlavor(flavor.id)}
                          id={`btn-minus-flavor-${flavor.id}`}
                          disabled={currentQty === 0}
                          className={`w-7 h-7 bg-white border-2 border-[#2D1B08] flex items-center justify-center text-[#2D1B08] shadow-[1px_1px_0px_0px_#2D1B08] cursor-pointer transition-all ${
                            currentQty > 0
                              ? "hover:bg-red-50"
                              : "opacity-30 cursor-not-allowed shadow-none"
                          }`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 font-mono font-black text-center text-[#2D1B08] text-sm">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleAddFlavor(flavor.id)}
                          id={`btn-plus-flavor-${flavor.id}`}
                          disabled={isMaxReached}
                          className={`w-7 h-7 bg-white border-2 border-[#2D1B08] flex items-center justify-center text-[#2D1B08] shadow-[1px_1px_0px_0px_#2D1B08] cursor-pointer transition-all ${
                            !isMaxReached
                              ? "hover:bg-emerald-50"
                              : "opacity-30 cursor-not-allowed shadow-none"
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Graphic Live Box Preview */}
              <div className="lg:col-span-5 bg-[#FFFBF2] border-2 border-[#2D1B08] p-5 flex flex-col justify-between shadow-[3px_3px_0px_0px_#2D1B08]">
                <div>
                  <h5 className="font-sans font-black text-[#2D1B08] text-sm flex items-center justify-between uppercase tracking-tight">
                    <span>Box composition</span>
                    <span className="font-mono text-xs text-[#D2691E] font-bold">
                      {currentRollsCount} / {maxRolls} Rolls
                    </span>
                  </h5>
                  
                  {/* Visual Box Container */}
                  <div className="mt-4 bg-white border-2 border-dashed border-[#2D1B08] p-4">
                    <div className={`grid gap-3.5 ${maxRolls === 4 ? "grid-cols-2" : "grid-cols-3"}`}>
                      {compiledBoxList.map((roll, index) => {
                        const isEmpty = roll.name === "Empty Slot";
                        return (
                          <motion.div
                            key={roll.id + "-" + index}
                            className={`aspect-square border-2 flex flex-col items-center justify-center p-2 relative shadow-[1px_1px_0px_0px_#2D1B08] ${
                              isEmpty 
                                ? "bg-white border-dashed border-[#2D1B08]/40" 
                                : "bg-[#FFFBF2] border-[#2D1B08]"
                            }`}
                            whileHover={{ scale: isEmpty ? 1 : 1.03 }}
                          >
                            <span className={`${isEmpty ? "text-xl opacity-20 animate-pulse" : "text-3xl"}`}>
                              {roll.emoji}
                            </span>
                            <span className="text-[9px] text-[#2D1B08]/80 font-black text-center truncate w-full mt-1.5 uppercase tracking-wide">
                              {isEmpty ? "Add Roll" : roll.name.split(" ")[0]}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-[#2D1B08]/10 space-y-4">
                  {currentRollsCount < maxRolls ? (
                    <div className="flex items-start gap-2 bg-rose-50 p-3.5 border-2 border-[#2D1B08] shadow-[1px_1px_0px_0px_#2D1B08]">
                      <Info className="w-4.5 h-4.5 text-[#D2691E] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2D1B08]/80 leading-relaxed font-semibold">
                        Please select <strong className="text-[#2D1B08]">{maxRolls - currentRollsCount}</strong> more roll{maxRolls - currentRollsCount > 1 ? "s" : ""} to complete your {selectedPack.label} box.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 bg-emerald-50 p-3.5 border-2 border-[#2D1B08] shadow-[1px_1px_0px_0px_#2D1B08]">
                      <Check className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-800 leading-relaxed font-bold">
                        Your gourmet box is fully loaded! Ready to finalize.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      id="btn-step2-back"
                      className="flex-1 bg-white hover:bg-[#FFFBF2] text-[#2D1B08] font-black py-3 border-2 border-[#2D1B08] text-center text-sm shadow-[2px_2px_0px_0px_#2D1B08] hover:shadow-[0.5px_0.5px_0px_0px_#2D1B08] hover:translate-x-[1.5px] hover:translate-y-[1.5px] cursor-pointer transition-all uppercase tracking-widest text-xs"
                    >
                      Change Size
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      id="btn-step2-next"
                      disabled={currentRollsCount < maxRolls}
                      className={`flex-1 flex items-center justify-center gap-1.5 font-black py-3 border-2 border-[#2D1B08] text-center text-sm shadow-[2px_2px_0px_0px_#2D1B08] hover:shadow-[0.5px_0.5px_0px_0px_#2D1B08] hover:translate-x-[1.5px] hover:translate-y-[1.5px] transition-all uppercase tracking-widest text-xs ${
                        currentRollsCount === maxRolls
                          ? "bg-[#D2691E] hover:bg-[#2D1B08] text-white cursor-pointer"
                          : "bg-gray-100 text-[#2D1B08]/30 cursor-not-allowed shadow-none"
                      }`}
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Customer Details */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="font-sans text-lg font-black text-[#2D1B08] uppercase tracking-tight flex items-center gap-1.5">
                <Info className="w-5 h-5 text-[#D2691E]" />
                Step 3: Provide Pickup & Contact Info
              </h4>
              <p className="text-[#2D1B08]/80 text-sm mt-1 font-semibold">
                Because we are an artisanal home bakery, all orders are baked fresh specifically for Sunday morning pickups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono font-black uppercase text-[#2D1B08] tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="input-customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Benson Wisdom"
                    className="w-full bg-white border-2 border-[#2D1B08] px-4 py-3 text-sm text-[#2D1B08] placeholder:text-[#2D1B08]/40 focus:outline-none font-sans font-semibold uppercase tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-black uppercase text-[#2D1B08] tracking-widest mb-1.5">
                    Preferred Booking Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="btn-contact-dm"
                      onClick={() => setContactMethod("DM")}
                      className={`flex items-center justify-center gap-1.5 py-3 border-2 border-[#2D1B08] text-xs font-black uppercase tracking-wider transition-all shadow-[1.5px_1.5px_0px_0px_#2D1B08] cursor-pointer ${
                        contactMethod === "DM"
                          ? "bg-[#FFFBF2] border-[#D2691E] shadow-[2.5px_2.5px_0px_0px_#2D1B08]"
                          : "bg-white hover:bg-[#FFFBF2]/30"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-[#D2691E]" />
                      Instagram DM
                    </button>
                    <button
                      type="button"
                      id="btn-contact-text"
                      onClick={() => setContactMethod("text")}
                      className={`flex items-center justify-center gap-1.5 py-3 border-2 border-[#2D1B08] text-xs font-black uppercase tracking-wider transition-all shadow-[1.5px_1.5px_0px_0px_#2D1B08] cursor-pointer ${
                        contactMethod === "text"
                          ? "bg-[#FFFBF2] border-[#D2691E] shadow-[2.5px_2.5px_0px_0px_#2D1B08]"
                          : "bg-white hover:bg-[#FFFBF2]/30"
                      }`}
                    >
                      <Phone className="w-4 h-4 text-[#D2691E]" />
                      Text Message
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-black uppercase text-[#2D1B08] tracking-widest mb-1.5">
                    {contactMethod === "DM" ? "Your Instagram Handle" : "Your Phone Number"}
                  </label>
                  <input
                    type="text"
                    id="input-contact-handle"
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    placeholder={contactMethod === "DM" ? "e.g. @bensonwisdom" : "e.g. +1 913-XXX-XXXX"}
                    className="w-full bg-white border-2 border-[#2D1B08] px-4 py-3 text-sm text-[#2D1B08] placeholder:text-[#2D1B08]/40 focus:outline-none font-sans font-semibold tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-black uppercase text-[#2D1B08] tracking-widest mb-1.5 flex items-center justify-between">
                    <span>Special Pickup Notes</span>
                    <span className="text-[9px] text-[#2D1B08]/60 lowercase italic">pickup timing or allergies</span>
                  </label>
                  <textarea
                    id="input-pickup-note"
                    value={pickupNote}
                    onChange={(e) => setPickupNote(e.target.value)}
                    rows={2}
                    placeholder="e.g. Will pick up around 10:30 AM on Sunday, please make extra gooey!"
                    className="w-full bg-white border-2 border-[#2D1B08] px-4 py-3 text-sm text-[#2D1B08] placeholder:text-[#2D1B08]/40 focus:outline-none font-sans font-semibold resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Promotional Coupon & Order Summary */}
              <div className="bg-[#FFFBF2] border-2 border-[#2D1B08] p-5 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_#2D1B08]">
                <div>
                  <h5 className="font-sans font-black text-[#2D1B08] text-sm uppercase tracking-tight">
                    Apply Promo / Coupon
                  </h5>
                  <div className="flex gap-2.5 mt-2">
                    <input
                      type="text"
                      id="input-coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. SWEET10"
                      className="flex-1 bg-white border-2 border-[#2D1B08] px-3.5 py-2 text-xs text-[#2D1B08] uppercase placeholder:text-[#2D1B08]/40 focus:outline-none font-mono font-bold tracking-wider"
                    />
                    <button
                      type="button"
                      id="btn-apply-coupon"
                      onClick={applyCoupon}
                      className="bg-white hover:bg-[#FFFBF2] text-[#2D1B08] border-2 border-[#2D1B08] font-black px-4 py-2 text-xs transition-all shadow-[2px_2px_0px_0px_#2D1B08] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[10px] text-emerald-700 font-bold mt-2 flex items-center gap-1 uppercase tracking-wide">
                      <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
                      SWEET10 Promo Applied (10% OFF!)
                    </p>
                  )}
                  <p className="text-[9px] text-[#2D1B08]/60 mt-2 font-bold uppercase tracking-widest">
                    💡 Hint: use SWEET10 or CAKELOAD.
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-[#2D1B08]/10 space-y-2.5">
                  <h5 className="font-sans font-black text-[#2D1B08] text-xs uppercase tracking-widest">
                    Summary Breakdown
                  </h5>
                  <div className="space-y-1.5 text-xs text-[#2D1B08]/85 font-bold uppercase tracking-wide">
                    <div className="flex justify-between">
                      <span>{selectedPack.label} box:</span>
                      <span className="font-mono text-[#2D1B08]">${selectedPack.price.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Promo Code SWEET10:</span>
                        <span className="font-mono">-${(selectedPack.price * 0.1).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#2D1B08] font-black border-t-2 border-[#2D1B08]/10 pt-1.5 text-sm uppercase tracking-wide">
                      <span>Estimated Total:</span>
                      <span className="font-mono text-[#D2691E]">${getSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-2">
                  <button
                    onClick={() => setStep(2)}
                    id="btn-step3-back"
                    className="flex-1 bg-white hover:bg-[#FFFBF2] text-[#2D1B08] font-black py-3 border-2 border-[#2D1B08] text-center text-sm shadow-[2px_2px_0px_0px_#2D1B08] cursor-pointer transition-all uppercase tracking-widest text-xs"
                  >
                    Adjust Flavors
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    id="btn-step3-next"
                    disabled={!customerName.trim()}
                    className={`flex-1 flex items-center justify-center gap-1.5 font-black py-3 border-2 border-[#2D1B08] text-center text-sm shadow-[2px_2px_0px_0px_#2D1B08] cursor-pointer transition-all uppercase tracking-widest text-xs ${
                      customerName.trim()
                        ? "bg-[#D2691E] hover:bg-[#2D1B08] text-white"
                        : "bg-gray-100 text-[#2D1B08]/30 cursor-not-allowed shadow-none"
                    }`}
                  >
                    <span>Generate Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Review, Copy & Send */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="font-sans text-lg font-black text-[#2D1B08] uppercase tracking-tight flex items-center gap-1.5">
                <Check className="w-5 h-5 text-emerald-600" />
                Step 4: Copy Order & Book!
              </h4>
              <p className="text-[#2D1B08]/80 text-sm mt-1 font-semibold">
                Your order is fully constructed! Follow the instructions below to submit your order directly.
              </p>
            </div>

            {/* Simulated Live Booking Status Warning */}
            {isStoreClosed && (
              <div className="p-4 bg-rose-50 border-2 border-[#2D1B08] flex items-start gap-3 shadow-[2px_2px_0px_0px_#2D1B08]">
                <Info className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-700 text-sm block font-sans uppercase tracking-tight">Note: Pre-orders are currently offline</strong>
                  <p className="text-[#2D1B08]/80 text-xs mt-1.5 leading-relaxed font-semibold uppercase tracking-wide">
                    The bakery's pre-orders are currently {orderStatus.replace("_", " ")}. Although you can copy the text below or test send it to see how the booking pipeline behaves, we are not taking live bookings right now. Feel free to preview!
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Message Code Display */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-[9px] font-mono font-black text-[#2D1B08]/80 uppercase tracking-widest">
                    Generated Preorder Message
                  </span>
                  <button
                    onClick={handleCopyMessage}
                    id="btn-copy-preorder"
                    className="flex items-center gap-1 text-xs font-black text-[#D2691E] hover:text-[#2D1B08] transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-[#2D1B08] text-white p-5 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner border-2 border-[#2D1B08] select-all font-semibold">
                    {generateMessage()}
                  </pre>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-[#2D1B08]/95 border-2 border-[#2D1B08] flex flex-col items-center justify-center text-center p-4"
                    >
                      <div className="w-12 h-12 bg-emerald-500 text-white border-2 border-[#2D1B08] flex items-center justify-center mb-2 shadow-[2px_2px_0px_0px_#2D1B08]">
                        <Check className="w-6 h-6" />
                      </div>
                      <h5 className="font-sans font-black text-white text-base uppercase tracking-tight">Copied to Clipboard!</h5>
                      <p className="text-[#FFFBF2] text-xs mt-1.5 font-semibold uppercase tracking-wide max-w-xs leading-relaxed">
                        The message is ready. Simply paste it directly into your DM or text application!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Booking Actions Guide */}
              <div className="md:col-span-5 bg-[#FFFBF2] border-2 border-[#2D1B08] p-5 flex flex-col justify-between space-y-6 shadow-[4px_4px_0px_0px_#2D1B08]">
                <div>
                  <h5 className="font-sans font-black text-[#2D1B08] text-sm uppercase tracking-tight">
                    How to finalize pre-order:
                  </h5>
                  <ol className="mt-3.5 text-xs text-[#2D1B08]/80 space-y-3.5 pl-4 list-decimal leading-relaxed font-semibold uppercase tracking-wide">
                    <li>
                      Click <strong>Copy Message</strong> to copy your formatted roll configuration.
                    </li>
                    <li>
                      Choose your preferred order channel below to send us the pre-order details.
                    </li>
                    <li>
                      Our baker will reply confirming your total and slot details (usually within 1-2 hours).
                    </li>
                    <li>
                      Pick up your fresh, gooey cinnamon rolls on <strong>Sunday</strong>!
                    </li>
                  </ol>
                </div>

                <div className="space-y-3">
                  {contactMethod === "DM" ? (
                    <a
                      href={getInstagramLink()}
                      target="_blank"
                      rel="noreferrer"
                      id="btn-send-dm"
                      onClick={handleCopyMessage}
                      className="w-full flex items-center justify-center gap-2 bg-[#D2691E] hover:bg-[#2D1B08] text-white border-2 border-[#2D1B08] font-black py-3.5 text-center text-sm shadow-[3px_3px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-widest"
                    >
                      <MessageSquare className="w-4.5 h-4.5" />
                      Copy & Send Instagram DM
                    </a>
                  ) : (
                    <a
                      href={getSmsLink()}
                      id="btn-send-sms"
                      onClick={handleCopyMessage}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-[#2D1B08] hover:text-white text-white border-2 border-[#2D1B08] font-black py-3.5 text-center text-sm shadow-[3px_3px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-widest"
                    >
                      <Phone className="w-4.5 h-4.5" />
                      Copy & Send Text Message
                    </a>
                  )}

                  <button
                    onClick={() => setStep(3)}
                    id="btn-step4-back"
                    className="w-full bg-white hover:bg-[#FFFBF2] text-[#2D1B08] font-black py-2.5 border-2 border-[#2D1B08] text-center text-xs transition-colors uppercase tracking-widest shadow-[2px_2px_0px_0px_#2D1B08] cursor-pointer"
                  >
                    Edit Contact Info
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
