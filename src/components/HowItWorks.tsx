import { Calendar, Package, Utensils, Sparkles, MapPin, Smile } from "lucide-react";
import { BUSINESS_DATA } from "../data";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "The Weekly Drop",
      subtitle: BUSINESS_DATA.orderModel.cycle.ordersOpen,
      desc: "Our menu opens up with signature and rotating seasonal flavors. Batches are strictly limited to what we can handcraft that week.",
      icon: Sparkles,
      color: "bg-[#FFFBF2] text-[#D2691E] border-[#2D1B08]",
    },
    {
      num: "02",
      title: "Books Close",
      subtitle: `By ${BUSINESS_DATA.orderModel.cycle.ordersCloseBy}`,
      desc: "We close pre-orders by Thursday (or earlier if we sell out!) to source our fresh ingredients and start our 24-hour dough fermentation.",
      icon: Calendar,
      color: "bg-rose-100 text-rose-700 border-[#2D1B08]",
    },
    {
      num: "03",
      title: "Sunday Pickup",
      subtitle: BUSINESS_DATA.orderModel.cycle.pickupDay,
      desc: `Pick up your warm, glazed-to-order cinnamon rolls at our Kansas City location (${BUSINESS_DATA.location.addressLine}). Made specifically for your sweet morning.`,
      icon: Package,
      color: "bg-emerald-100 text-emerald-700 border-[#2D1B08]",
    },
  ];

  return (
    <div className="space-y-12 py-8" id="how-it-works-section">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="bold-tag">
          The Bakery Lifecycle
        </span>
        <h3 className="font-sans text-3xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tight">
          How Pre-Ordering Works
        </h3>
        <p className="text-sm sm:text-base text-[#2D1B08]/80 font-medium leading-relaxed">
          We are a handcrafted micro-bakery. Baking in limited weekly drops ensures every single roll is soft, gooey, and packed with maximum flavor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div
              key={index}
              className="bg-white border-2 border-[#2D1B08] p-6 shadow-[5px_5px_0px_0px_#2D1B08] relative overflow-hidden group"
            >
              {/* Giant absolute number back */}
              <span className="absolute right-4 top-4 font-mono text-7xl font-black text-[#2D1B08]/10 select-none pointer-events-none group-hover:scale-105 transition-transform duration-300">
                {step.num}
              </span>

              <div className="flex flex-col h-full justify-between space-y-4">
                <div className="space-y-4">
                  <div className={`w-12 h-12 border-2 border-[#2D1B08] flex items-center justify-center shadow-[2px_2px_0px_0px_#2D1B08] ${step.color}`}>
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xl font-black text-[#2D1B08] uppercase tracking-tight">
                      {step.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#D2691E] font-black block mt-1.5 uppercase tracking-widest">
                      {step.subtitle}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2D1B08]/80 leading-relaxed font-medium pt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bento-style pickup banner */}
      <div className="bg-[#FFFBF2] border-2 border-[#2D1B08] p-6 shadow-[5px_5px_0px_0px_#2D1B08] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 border-2 border-[#2D1B08] bg-[#D2691E]/10 text-[#D2691E] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_#2D1B08]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-sans text-base font-black text-[#2D1B08] uppercase tracking-wide">
              Pick Up Details & Directions
            </h5>
            <p className="text-xs text-[#2D1B08]/80 mt-1.5 leading-relaxed font-medium">
              Our rolls are picked up from <strong>{BUSINESS_DATA.location.addressLine}, {BUSINESS_DATA.location.city}, {BUSINESS_DATA.location.state}</strong>. We'll send you precise directions and maps link in our confirmation message once your booking text/DM is confirmed!
            </p>
          </div>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            BUSINESS_DATA.location.addressLine + ", " + BUSINESS_DATA.location.city + ", " + BUSINESS_DATA.location.state
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 bg-white hover:bg-[#2D1B08] hover:text-white text-[#2D1B08] border-2 border-[#2D1B08] font-black text-xs uppercase tracking-widest px-5 py-3 transition-all whitespace-nowrap shadow-[3px_3px_0px_0px_#2D1B08] hover:shadow-[1px_1px_0px_0px_#2D1B08] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
        >
          View on Google Maps 🗺️
        </a>
      </div>
    </div>
  );
}
