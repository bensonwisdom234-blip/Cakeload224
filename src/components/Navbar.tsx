import { motion } from "motion/react";
import { Cake, ShoppingBag, Send, Menu, X, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { BUSINESS_DATA } from "../data";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  orderStatus: string;
  scrollToBuilder: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  orderStatus,
  scrollToBuilder,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", slug: "home" },
    { label: "Menu", slug: "menu" },
    { label: "About & Contact", slug: "about-contact" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-emerald-500 text-white border-2 border-[#2D1B08]";
      case "closed":
        return "bg-rose-500 text-white border-2 border-[#2D1B08]";
      case "on_break":
        return "bg-amber-500 text-white border-2 border-[#2D1B08]";
      case "holiday_special":
        return "bg-[#D2691E] text-white border-2 border-[#2D1B08]";
      default:
        return "bg-amber-500 text-white border-2 border-[#2D1B08]";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Orders Open";
      case "closed":
        return "Orders Closed";
      case "on_break":
        return "On Break";
      case "holiday_special":
        return "Holiday Special";
      default:
        return status;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFBF2]/95 backdrop-blur-md border-b-2 border-[#2D1B08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => { setActivePage("home"); setIsOpen(false); }} 
            className="flex items-center gap-2.5 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-10 h-10 border-2 border-[#2D1B08] bg-[#D2691E] flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#2D1B08] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_#2D1B08] transition-all">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans text-2xl font-black tracking-tighter uppercase text-[#2D1B08] block leading-none">
                {BUSINESS_DATA.name}.
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#D2691E] font-bold block mt-0.5">
                {BUSINESS_DATA.category}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-2">
              {navItems.map((item) => (
                <button
                  key={item.slug}
                  id={`nav-tab-${item.slug}`}
                  onClick={() => setActivePage(item.slug)}
                  className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                    activePage === item.slug
                      ? "text-white font-black z-10"
                      : "text-[#2D1B08]/80 hover:text-[#2D1B08]"
                  }`}
                >
                  {item.label}
                  {activePage === item.slug && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-[#2D1B08] border-2 border-[#2D1B08] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider italic ${getStatusColor(orderStatus)}`}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {getStatusLabel(orderStatus)}
              </span>

              {/* Order Button */}
              <button
                onClick={scrollToBuilder}
                id="btn-nav-order"
                className="bold-button px-5 py-2.5 text-xs flex items-center gap-2 shadow-[3px_3px_0px_0px_#2D1B08] hover:shadow-[4px_4px_0px_0px_#2D1B08]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>DM TO ORDER</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider italic ${getStatusColor(orderStatus)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {getStatusLabel(orderStatus)}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="btn-mobile-menu"
              className="p-2 border-2 border-[#2D1B08] bg-white text-[#2D1B08] hover:bg-[#FFFBF2]"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b-2 border-[#2D1B08] bg-[#FFFBF2] px-4 py-4 space-y-3"
          id="mobile-menu-container"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.slug}
                id={`mobile-nav-${item.slug}`}
                onClick={() => {
                  setActivePage(item.slug);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activePage === item.slug
                    ? "bg-[#2D1B08] text-white font-black"
                    : "text-[#2D1B08] hover:bg-[#2D1B08]/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t-2 border-[#2D1B08]/10 flex flex-col gap-3">
            <button
              onClick={() => {
                scrollToBuilder();
                setIsOpen(false);
              }}
              id="btn-mobile-order"
              className="bold-button w-full flex items-center justify-center gap-2 py-3 text-sm shadow-[3px_3px_0px_0px_#2D1B08]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>DM TO ORDER</span>
            </button>
            
            <div className="flex justify-center gap-6 py-2 text-[#2D1B08]/70">
              <a href={`https://instagram.com/${BUSINESS_DATA.socials.instagram}`} target="_blank" rel="noreferrer" className="hover:text-[#D2691E] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={`https://facebook.com/${BUSINESS_DATA.socials.facebook}`} target="_blank" rel="noreferrer" className="hover:text-[#D2691E] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
