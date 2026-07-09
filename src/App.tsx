import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Cake, Sparkles, Star, Calendar, 
  Clock, Heart, ShoppingBag, HeartHandshake, ChevronRight 
} from "lucide-react";

// Data & Types
import { BUSINESS_DATA, FLAVORS, PRICING_PACKAGES } from "./data";

// Components
import Navbar from "./components/Navbar";
import StatusBanner from "./components/StatusBanner";
import PreorderBuilder from "./components/PreorderBuilder";
import HowItWorks from "./components/HowItWorks";
import FeedbackSlider from "./components/FeedbackSlider";
import InfluencerProgram from "./components/InfluencerProgram";
import Newsletter from "./components/Newsletter";
import AboutAndContact from "./components/AboutAndContact";
import Footer from "./components/Footer";

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [orderStatus, setOrderStatus] = useState<string>("open");

  // Custom helper to switch to Menu page and smooth scroll directly to Preorder Builder
  const scrollToBuilder = () => {
    setActivePage("menu");
    setTimeout(() => {
      const builderElement = document.getElementById("preorder-builder-widget");
      if (builderElement) {
        builderElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      
      {/* GLOBAL NAVBAR */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        orderStatus={orderStatus} 
        scrollToBuilder={scrollToBuilder}
      />

      {/* PAGE CONTAINER */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 pb-12"
            >
              {/* SECTION: HERO BANNER */}
              <section id="hero-section" className="relative overflow-hidden py-16 sm:py-24 border-b-2 border-[#2D1B08]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Hero Text */}
                    <div className="lg:col-span-7 space-y-8 text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#2D1B08] bg-[#D2691E] text-white text-[10px] font-black uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Kansas City’s Gourmet Micro-Bakery</span>
                      </span>
                      
                      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#2D1B08] leading-[0.85]">
                        SOFT.<br/>GOOEY.<br/>FRESH.
                      </h1>
                      
                      <p className="text-base sm:text-lg text-[#2D1B08] leading-relaxed max-w-xl font-medium">
                        {BUSINESS_DATA.description} Freshly glazed and packed into limited weekly drops. Taste the difference slow-risen brioche dough makes.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button
                          onClick={scrollToBuilder}
                          id="btn-hero-order"
                          className="bold-button flex items-center justify-center gap-2 px-6 py-4 shadow-[4px_4px_0px_0px_#2D1B08] text-sm group"
                        >
                          <span>Build Pre-Order Box</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                          onClick={() => setActivePage("menu")}
                          id="btn-hero-menu"
                          className="bold-button-secondary flex items-center justify-center gap-2 px-6 py-4 shadow-[4px_4px_0px_0px_#2D1B08] text-sm"
                        >
                          Explore Weekly Flavors
                        </button>
                      </div>

                      {/* Hard status display badges */}
                      <div className="pt-6 flex flex-wrap gap-4 border-t-2 border-[#2D1B08]/10 max-w-xl">
                        <div className="border-2 border-[#2D1B08] bg-white p-4 flex flex-col gap-1 w-44 shadow-[2px_2px_0px_0px_#2D1B08]">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#2D1B08]/60">Current Status</span>
                          <span className="text-xl font-black text-emerald-600 uppercase italic">Orders Open</span>
                        </div>
                        <div className="border-2 border-[#2D1B08] bg-white p-4 flex flex-col gap-1 w-44 shadow-[2px_2px_0px_0px_#2D1B08]">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#2D1B08]/60">Pickup Day</span>
                          <span className="text-xl font-black uppercase italic text-[#D2691E]">Sunday</span>
                        </div>
                        <div className="border-2 border-[#2D1B08] bg-white p-4 flex flex-col gap-1 w-44 shadow-[2px_2px_0px_0px_#2D1B08]">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#2D1B08]/60">Ingredients</span>
                          <span className="text-xl font-black uppercase italic text-[#2D1B08]">100% Local</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Graphic */}
                    <div className="lg:col-span-5 relative" id="hero-image-container">
                      <div className="relative aspect-square bg-white border-4 border-[#2D1B08] shadow-[8px_8px_0px_0px_#2D1B08] overflow-hidden group">
                        <img
                          src="/src/assets/images/cakeload_hero_1783557140756.jpg"
                          alt="Gooey warm cinnamon rolls fresh out of the oven"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Live drop status watermark overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-[#2D1B08] px-4 py-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-emerald-500 animate-pulse border border-[#2D1B08]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#2D1B08]">Next Sunday's Drop</span>
                          </div>
                          <span className="text-[10px] font-mono uppercase bg-[#D2691E] text-white px-2 py-0.5 border border-[#2D1B08] font-black">
                            Limit: 40 Boxes
                          </span>
                        </div>
                      </div>

                      {/* Accent floaters */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#D2691E] border-2 border-[#2D1B08] flex items-center justify-center text-white text-lg shadow-[3px_3px_0px_0px_#2D1B08] animate-bounce">
                        🥐
                      </div>
                      <div className="absolute -bottom-4 -right-2 bg-[#FFFBF2] border-2 border-[#2D1B08] p-2.5 shadow-[4px_4px_0px_0px_#2D1B08] text-xs font-black text-[#2D1B08] flex items-center gap-1.5 rotate-3">
                        <Sparkles className="w-4 h-4 text-[#D2691E] animate-pulse" />
                        <span className="uppercase tracking-widest">Best in KC!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: STATUS BANNER */}
              <section id="status-banner-section">
                <StatusBanner orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
              </section>

              {/* SECTION: HOW IT WORKS */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <HowItWorks />
              </section>

              {/* SECTION: FLAVOR TEASER */}
              <section id="flavor-teaser-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-200/50 pb-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-700 bg-amber-100/50 px-2.5 py-1.5 rounded-full border border-amber-200/40">
                      Signature Highlights
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950">
                      Sneak Peek: On the Baking Board
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-900/70">
                      Our signature recipes and seasonal specials. Taste the sweet glaze dripping off every spin.
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePage("menu")}
                    id="btn-teaser-view-all"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 hover:underline transition-all"
                  >
                    <span>View Full Weekly Menu</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Grid showing top 3 flavors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FLAVORS.slice(0, 3).map((flavor) => {
                    const hasImage = !!flavor.image;
                    return (
                      <div
                        key={flavor.id}
                        className="bg-white rounded-2xl border border-amber-200/50 shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between h-full group"
                      >
                        <div>
                          {hasImage ? (
                            <div className="aspect-16/10 overflow-hidden bg-amber-50 relative border-b border-amber-100">
                              <img
                                src={flavor.image}
                                alt={flavor.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                              />
                              <span className="absolute top-3 left-3 bg-red-100 text-red-700 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                                Featured Seasonal Specialty
                              </span>
                            </div>
                          ) : (
                            <div className="h-2 bg-amber-500" />
                          )}
                          <div className="p-5 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif text-lg font-bold text-amber-950 leading-tight">
                                {flavor.emoji} {flavor.name}
                              </h4>
                              {flavor.seasonal && !hasImage && (
                                <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                                  SEASONAL
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-amber-900/75 leading-relaxed">
                              {flavor.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          <span className="text-[10px] font-mono text-amber-700/80 block uppercase tracking-wider">
                            Available in 4, 6 & 12 Packs
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION: SOCIAL PROOF */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <FeedbackSlider />
              </section>

              {/* SECTION: CALL TO ACTION (CTA) */}
              <section id="cta-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-10 -mt-10" />
                  <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                      Ready to experience gooey cinnamon heaven?
                    </h3>
                    <p className="text-amber-50/90 text-sm sm:text-base leading-relaxed">
                      Custom pre-order spots fill up quickly every week. Tap below to build your personal box and secure your Sunday morning drop.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <button
                        onClick={scrollToBuilder}
                        id="btn-cta-build"
                        className="bg-amber-950 hover:bg-amber-900 text-white font-semibold px-6 py-3.5 rounded-xl shadow text-sm transition-colors cursor-pointer"
                      >
                        Start Customizing Box
                      </button>
                      <button
                        onClick={() => {
                          setActivePage("about-contact");
                          setTimeout(() => {
                            const contactBlock = document.getElementById("contact-block");
                            if (contactBlock) contactBlock.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        id="btn-cta-contact"
                        className="bg-amber-600/50 hover:bg-amber-600 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 text-sm transition-colors"
                      >
                        Talk to the Bakers
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activePage === "menu" && (
            <motion.div
              key="menu-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 py-10"
            >
              {/* PAGE INTRO */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-700 bg-amber-100/50 px-3 py-1.5 rounded-full border border-amber-200/40">
                  The Weekly Drop
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-amber-950">
                  The Sweet Menu
                </h2>
                <p className="text-sm sm:text-base text-amber-900/70">
                  All rolls are handmade using organic flour, grass-fed butter, and rich spices. Rotating seasonal specials drop weekly!
                </p>
              </div>

              {/* SECTION: WEEKLY FLAVORS CATALOG */}
              <section id="weekly-flavors-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-amber-950 border-b border-amber-200/50 pb-4">
                  Weekly Rotating Flavors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FLAVORS.map((flavor) => {
                    const hasImage = !!flavor.image;
                    return (
                      <div
                        key={flavor.id}
                        className="bg-white rounded-2xl border border-amber-200/50 shadow-xs overflow-hidden flex flex-col justify-between h-full group hover:shadow-md transition-shadow"
                      >
                        <div>
                          {hasImage ? (
                            <div className="aspect-16/10 overflow-hidden bg-amber-50 border-b border-amber-100 relative">
                              <img
                                src={flavor.image}
                                alt={flavor.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                              />
                              <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                                Featured Drop
                              </span>
                            </div>
                          ) : (
                            <div className="h-2 bg-amber-600/30" />
                          )}
                          <div className="p-5 space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="font-serif text-base sm:text-lg font-bold text-amber-950 leading-tight">
                                {flavor.emoji} {flavor.name}
                              </h4>
                              {flavor.seasonal && (
                                <span className="text-[9px] bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold whitespace-nowrap uppercase tracking-wider font-mono">
                                  Seasonal
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-amber-900/75 leading-relaxed">
                              {flavor.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 pt-0 flex justify-between items-center text-[10px] text-amber-800/80 font-semibold uppercase tracking-wider font-mono border-t border-amber-50/50 mt-2">
                          <span>Glaze: Velvet Cream Cheese</span>
                          <span>Nut-Free Available</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION: PRICING CARD DECK */}
              <section id="pricing-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-amber-950 border-b border-amber-200/50 pb-4">
                  Pre-order Packages & Pricing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PRICING_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-2xl border border-amber-200/50 shadow-xs p-6 flex flex-col justify-between h-48 relative overflow-hidden"
                    >
                      {pkg.id === "price_6pack" && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
                      )}
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-xl font-bold text-amber-950">{pkg.label} Box</h4>
                          <span className="font-mono text-xl font-extrabold text-amber-950">
                            ${pkg.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-amber-900/60 mt-2 leading-relaxed">
                          {pkg.id === "price_dozen"
                            ? "Ultimate sharing pack. Loaded with high-fat butter, rich spice spirals, and dripping glaze."
                            : pkg.id === "price_6pk"
                            ? "The ultimate weekend treat. Mix and match up to 6 signature and seasonal flavors."
                            : "Delicious 4-pack sample box. Perfect to enjoy over a cozy Sunday morning coffee."}
                        </p>
                      </div>

                      <div className="border-t border-amber-200/30 pt-3">
                        {pkg.promo ? (
                          <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold animate-pulse">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{pkg.promo}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-800/80 uppercase">
                            Baking capacity strictly limited to 40 boxes weekly
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: PREORDER BUILDER (CTA) */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <PreorderBuilder orderStatus={orderStatus} />
              </section>
            </motion.div>
          )}

          {activePage === "about-contact" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 py-10"
            >
              {/* PAGE INTRO */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-700 bg-amber-100/50 px-3 py-1.5 rounded-full border border-amber-200/40">
                  Kitchen Story
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-amber-950">
                  About Cakeload KC
                </h2>
                <p className="text-sm sm:text-base text-amber-900/70">
                  We are a passionate family micro-bakery bringing warm, gooey cinnamon rolls to Kansas City. Find out what drives our craft.
                </p>
              </div>

              {/* CORE ABOUT & CONTACT COMPONENT */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AboutAndContact />
              </section>

              {/* SECTION: INFLUENCER PROGRAM */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <InfluencerProgram />
              </section>

              {/* SECTION: NEWSLETTER SIGNUP */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Newsletter />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
