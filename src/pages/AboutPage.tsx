import React, { useState } from 'react';
import { ArrowRight, Award, Flame, Leaf, ShieldCheck } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Fresh Market Ingredients',
    description:
      'Every morning starts with farm-fresh vegetables, tender drumsticks, freshly grated coconut, and hand-picked curry leaves without artificial preservatives.',
  },
  {
    icon: Flame,
    title: 'Traditional Slow Cooking',
    description:
      'From stone-ground idli batter fermented naturally overnight to hand-roasted Chettinad spices and slow-simmered seeraga samba biryani, nothing is rushed.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean Kitchen & Pure Oils',
    description:
      'We cook with pure cow ghee, cold-pressed sesame oil (nallennai), and groundnut oil in dedicated vegetarian and non-vegetarian kitchen sections.',
  },
  {
    icon: Award,
    title: 'Warm Tamil Hospitality',
    description:
      'Inspired by traditional Tamil Virundhu culture, we package every meal cleanly so it arrives hot, aromatic, and ready to enjoy with family.',
  },
];

export function AboutPage() {
  const { navigate } = useStore();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
      {/* Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-2">
            Our Story
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#2C1A15] leading-tight [text-wrap:balance]">
            Celebrating the Culinary Heritage of Tamil Nadu
          </h1>
          <p className="text-base text-[#5C453E] leading-relaxed mt-5">
            At <strong>Bharath Delights</strong>, food is more than a meal—it is a
            celebration of Tamil Nadu&apos;s diverse regions. From the soft idlis and
            crisp ghee roast dosas of Chennai tiffin halls to the aromatic spice blends
            of Karaikudi Chettinad kitchens and Dindigul biryani pots, our chefs prepare
            each dish with deep respect for tradition.
          </p>
          <p className="text-base text-[#5C453E] leading-relaxed mt-4">
            Whether you are ordering a comforting bowl of curd rice, a festive banana
            leaf full meal, or Madurai-style kothu parotta for dinner, we bring authentic
            home-crafted flavor directly to your table.
          </p>
          <div className="mt-7">
            <button
              type="button"
              onClick={() => navigate('menu')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors cursor-pointer"
            >
              Explore Our Menu
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="h-full min-h-[260px] rounded-2xl overflow-hidden border border-[#E5D9C8] bg-[#F4ECE0]">
            {!imgError ? (
              <img
                src={RESTAURANT_CONFIG.heroImage}
                alt="Traditional Tamil Nadu feast prepared by Bharath Delights"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 text-center">
                <p className="font-display text-2xl font-bold text-[#6E141D]">
                  Bharath Delights Heritage Kitchen
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Food Philosophy */}
      <section className="bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-10">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-2">
            Our Food Philosophy
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A15]">
            Why Guests Choose Bharath Delights
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#FCF8F1] border border-[#E5D9C8] rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#6E141D] text-[#FCF8F1] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#2C1A15]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#5C453E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
