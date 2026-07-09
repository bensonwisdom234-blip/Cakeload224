import { Cake, Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { BUSINESS_DATA } from "../data";

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#FFFBF2] text-[#2D1B08] border-t-4 border-[#2D1B08] mt-16 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActivePage("home")} id="footer-logo">
              <div className="w-8 h-8 bg-[#D2691E] border-2 border-[#2D1B08] flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#2D1B08]">
                <Cake className="w-4 h-4" />
              </div>
              <span className="font-sans text-xl font-black uppercase tracking-tight text-[#2D1B08]">
                {BUSINESS_DATA.name}
              </span>
            </div>
            <p className="text-xs text-[#2D1B08]/85 max-w-sm leading-relaxed font-semibold">
              {BUSINESS_DATA.tagline}. Baked fresh to order in Kansas City, MO, focusing on slow-fermented, hand-rolled, gooey perfection.
            </p>
            <div className="flex gap-3 text-[#2D1B08]">
              <a href={`https://instagram.com/${BUSINESS_DATA.socials.instagram || "cakeload"}`} target="_blank" rel="noreferrer" className="w-8 h-8 border-2 border-[#2D1B08] bg-white flex items-center justify-center hover:bg-[#D2691E] hover:text-white transition-all shadow-[2px_2px_0px_0px_#2D1B08]">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`https://facebook.com/${BUSINESS_DATA.socials.facebook || "cakeload"}`} target="_blank" rel="noreferrer" className="w-8 h-8 border-2 border-[#2D1B08] bg-white flex items-center justify-center hover:bg-[#D2691E] hover:text-white transition-all shadow-[2px_2px_0px_0px_#2D1B08]">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-sans font-black text-xs uppercase tracking-widest text-[#D2691E]">
              Explore Pages
            </h5>
            <div className="flex flex-col gap-2.5 text-[10px] font-black uppercase tracking-widest text-[#2D1B08]/80">
              <button onClick={() => setActivePage("home")} className="text-left hover:text-[#D2691E] cursor-pointer transition-colors">
                Home Landing
              </button>
              <button onClick={() => setActivePage("menu")} className="text-left hover:text-[#D2691E] cursor-pointer transition-colors">
                The Weekly Menu
              </button>
              <button onClick={() => setActivePage("about-contact")} className="text-left hover:text-[#D2691E] cursor-pointer transition-colors">
                Our Story & Contact
              </button>
            </div>
          </div>

          {/* Column 3: Quick Pickup Contact */}
          <div className="space-y-3">
            <h5 className="font-sans font-black text-xs uppercase tracking-widest text-[#D2691E]">
              Pick Up Details
            </h5>
            <div className="space-y-2 text-[10px] font-black uppercase tracking-widest text-[#2D1B08]/80">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D2691E] mt-0.5 flex-shrink-0" />
                <span>{BUSINESS_DATA.location.addressLine}, Kansas City, MO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D2691E] flex-shrink-0" />
                <span>{BUSINESS_DATA.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="pt-8 mt-8 border-t-2 border-[#2D1B08]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] text-[#2D1B08]/60 font-mono font-black uppercase tracking-widest">
          <span>&copy; {year} Cakeload KC. All rights reserved.</span>
          <span className="text-center sm:text-right">Made for gooey cinnamon roll lovers everywhere. Cottage Bakery Regulated.</span>
        </div>
      </div>
    </footer>
  );
}
