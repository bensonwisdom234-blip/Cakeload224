import { motion } from "motion/react";
import { 
  Heart, Calendar, MapPin, Phone, MessageSquare, 
  Sparkles, Award, Star, Mail, ShieldAlert 
} from "lucide-react";
import { BUSINESS_DATA } from "../data";

export default function AboutAndContact() {
  const bentoItems = [
    {
      title: "24-Hour Cold Fermentation",
      desc: "Our brioche-style dough rises slowly in our cooling cell for a full 24 hours. This creates incredibly complex, sweet yeasty undertones and that signature pull-apart fluffy texture.",
      emoji: "🌾",
      color: "bg-[#FFFBF2]"
    },
    {
      title: "Glazed Hot-to-Order",
      desc: "Our velvet vanilla cream cheese frosting is spread while the rolls are roaring hot, melting into every spiral crevice for a gooey experience from first bite to last.",
      emoji: "🧁",
      color: "bg-white"
    },
    {
      title: "Madagascar Vanilla & Ceylon Cinnamon",
      desc: "No imitation powders here. We import rich Sri Lankan Ceylon cinnamon and real Madagascar vanilla beans to blend into our signature butter filling.",
      emoji: "✨",
      color: "bg-white"
    },
    {
      title: "Sourced Locally, Baked with Pride",
      desc: "We buy our premium high-fat butter, whole milk, and farm eggs directly from Missouri and Kansas family farms. Supporting local agriculture, one roll at a time.",
      emoji: "🥛",
      color: "bg-[#FFFBF2]"
    }
  ];

  return (
    <div className="space-y-16 py-8" id="about-and-contact-section">
      
      {/* SECTION: Owner Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 relative">
          <div className="aspect-square bg-[#FFFBF2] border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08] overflow-hidden relative">
            <div className="absolute inset-0 bg-[#2D1B08]/5 mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 right-6 bg-white border-2 border-[#2D1B08] p-4 shadow-[3px_3px_0px_0px_#2D1B08]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#D2691E] font-black block mb-1">Bakery Founder</span>
              <h5 className="font-sans font-black text-[#2D1B08] text-base uppercase tracking-tight">Chef Ben & Team</h5>
              <p className="text-xs text-[#2D1B08]/80 leading-relaxed mt-0.5 font-bold">Kansas City Home Bakers since 2024</p>
            </div>
            
            {/* Visual art background elements */}
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#2D1B08] space-y-3">
              <span className="text-7xl">👨‍🍳</span>
              <p className="font-sans uppercase tracking-tight font-black text-lg text-[#D2691E]">"CRAFTING SWEET MOMENTS"</p>
              <p className="font-serif italic text-sm text-[#2D1B08]/80 font-bold">One slow-risen roll at a time.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <span className="bold-tag">
            Our Narrative
          </span>
          <h3 className="font-sans text-3xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tight leading-none pt-2">
            The Story Behind Cakeload
          </h3>
          <p className="text-sm sm:text-base text-[#2D1B08]/80 leading-relaxed font-medium">
            Cakeload was born in the heart of Kansas City out of a pure, simple obsession: to find the perfect cinnamon roll. We found that too many rolls were dry, dense, or masked by synthetic frostings. Chef Ben set out to create a roll that is consistently **soft, gooey, and packed with real, natural flavor.**
          </p>
          <p className="text-sm text-[#2D1B08]/70 leading-relaxed font-medium">
            After months of testing flour hydration ratios and temperature controls, we cracked the formula. To keep our quality flawless, we chose to operate as a premium home bakery, creating small batches in limited weekly pre-order slots. When you order from Cakeload, you're not just buying a roll—you're securing a hand-rolled, carefully fermented morning treat.
          </p>
        </div>
      </div>

      {/* SECTION: Why Cakeload (Bento Grid) */}
      <div className="space-y-8" id="why-cakeload">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="bold-tag">
            The Cakeload Method
          </span>
          <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tight">
            Why We Do Things Differently
          </h3>
          <p className="text-xs sm:text-sm text-[#2D1B08]/80 leading-relaxed font-medium">
            No cutting corners. No cheap substitutions. Here is exactly what makes our handcrafted cinnamon rolls superior to standard bakeries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bentoItems.map((item, index) => (
            <div
              key={index}
              className={`p-6 bg-white border-2 border-[#2D1B08] shadow-[4px_4px_0px_0px_#2D1B08] flex flex-col justify-between space-y-4 ${item.color}`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={item.title}>
                    {item.emoji}
                  </span>
                  <h4 className="font-sans text-lg font-black text-[#2D1B08] uppercase tracking-tight leading-tight">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#2D1B08]/80 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: Contact Block */}
      <div className="bg-white border-2 border-[#2D1B08] shadow-[6px_6px_0px_0px_#2D1B08] p-6 sm:p-8" id="contact-block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Block */}
          <div className="space-y-4">
            <h4 className="font-sans text-xl font-black text-[#2D1B08] uppercase tracking-tight">
              Get in Touch with the Kitchen
            </h4>
            <p className="text-xs sm:text-sm text-[#2D1B08]/80 leading-relaxed font-medium">
              Have questions about catering, custom orders, birthday requests, or allergens? Drop us a text or send a DM and we'll respond as soon as we wash the flour off our hands.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3.5 text-xs sm:text-sm text-[#2D1B08]">
                <div className="w-9 h-9 bg-[#FFFBF2] border-2 border-[#2D1B08] flex items-center justify-center text-[#D2691E] shadow-[1px_1px_0px_0px_#2D1B08] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[9px] font-mono uppercase tracking-widest text-[#D2691E]">Pick Up Address:</strong>
                  <span className="font-bold">{BUSINESS_DATA.location.addressLine}, {BUSINESS_DATA.location.city}, {BUSINESS_DATA.location.state} {BUSINESS_DATA.location.zip}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-sm text-[#2D1B08]">
                <div className="w-9 h-9 bg-[#FFFBF2] border-2 border-[#2D1B08] flex items-center justify-center text-[#D2691E] shadow-[1px_1px_0px_0px_#2D1B08] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[9px] font-mono uppercase tracking-widest text-[#D2691E]">Direct Text Support:</strong>
                  <a href={`tel:${BUSINESS_DATA.phone}`} className="underline text-[#D2691E] font-black">{BUSINESS_DATA.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-sm text-[#2D1B08]">
                <div className="w-9 h-9 bg-[#FFFBF2] border-2 border-[#2D1B08] flex items-center justify-center text-[#D2691E] shadow-[1px_1px_0px_0px_#2D1B08] flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[9px] font-mono uppercase tracking-widest text-[#D2691E]">Instagram DM:</strong>
                  <a href={`https://instagram.com/${BUSINESS_DATA.socials.instagram}`} target="_blank" rel="noreferrer" className="underline text-[#D2691E] font-black">@{BUSINESS_DATA.socials.instagram || "cakeload"}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Schedule details & Home Bakery License warning */}
          <div className="bg-[#FFFBF2] border-2 border-[#2D1B08] p-5 flex flex-col justify-between space-y-4 shadow-[3px_3px_0px_0px_#2D1B08]">
            <div>
              <h5 className="font-sans text-xs font-black text-[#2D1B08] uppercase tracking-widest">
                Kitchen Hours & Pickups
              </h5>
              <div className="mt-4 space-y-2 text-xs text-[#2D1B08]/80 font-bold uppercase tracking-wide">
                <div className="flex justify-between border-b border-[#2D1B08]/10 pb-1">
                  <span>Sunday (Pickups):</span>
                  <span className="font-mono text-[#D2691E]">8am - 1pm</span>
                </div>
                <div className="flex justify-between border-b border-[#2D1B08]/10 pb-1">
                  <span>Mon - Wed (Prep):</span>
                  <span className="font-mono text-[#2D1B08]/60">Custom Slots</span>
                </div>
                <div className="flex justify-between border-b border-[#2D1B08]/10 pb-1">
                  <span>Thursday (Preorders):</span>
                  <span className="font-mono text-[#D2691E]">Close 11:59pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri - Sat (Baking):</span>
                  <span className="font-mono text-[#2D1B08]/60">Slow Ferment</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 border-2 border-[#2D1B08] flex gap-2.5 items-start">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <p className="text-[9px] text-[#2D1B08]/80 leading-relaxed font-bold uppercase tracking-wide">
                <strong>Kansas City Food Disclosure:</strong> Cakeload is operated under standard home kitchen cottage food regulations. All products are handmade in a private home kitchen not subject to state licensing or inspection. Contains wheat, dairy, and eggs. Baked with extreme love and safety!
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
