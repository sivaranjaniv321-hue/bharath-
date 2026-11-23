import React, { useEffect, useState } from 'react';
import { Dish, PlateStyle } from '../types';

interface DishMediaProps {
  dish: Dish;
  aspectClass?: string;
  className?: string;
  compact?: boolean;
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) % 10000;
  }
  return hash;
}

const STUDIO_BACKDROPS = [
  'from-[#FCF8F1] via-[#F7EFE2] to-[#EFE2CE]',
  'from-[#FAF5EA] via-[#F4EAD8] to-[#EADCC5]',
  'from-[#FDF9F2] via-[#F6EDE0] to-[#EDE0CC]',
  'from-[#F9F4E9] via-[#F2E7D6] to-[#E8DAC4]',
];

const CULINARY_STYLE_LABELS: Record<PlateStyle, string> = {
  idli: 'Steamed Tiffin Kitchen',
  dosa: 'Cast-Iron Tawa Griddled',
  pongal: 'Slow-Simmered Ghee Craft',
  meals: 'Banana Leaf Tradition',
  rice: 'Tempered Ponni & Basmati',
  biryani: 'Aromatic Dum Kitchen',
  curry: 'Roasted Spice Gravy',
  parotta: 'Hand-Layered Flaky Tawa',
  noodles: 'High-Flame Wok Tossed',
  snack: 'Crisp Savoury Kettle',
  sweet: 'Traditional Halwai Craft',
  beverage: 'Fresh Brew & Chiller',
};

export function DishMedia({
  dish,
  aspectClass = 'aspect-square',
  className = '',
  compact = false,
}: DishMediaProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [dish.id, dish.image]);

  if (dish.image && !imgError) {
    return (
      <div
        className={`relative overflow-hidden bg-[#F7F1E5] ${aspectClass} ${className}`}
      >
        <img
          src={dish.image}
          alt={`${dish.name} served neatly at Bharath Delights`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const seed = hashString(dish.id + dish.name);
  const backdrop = STUDIO_BACKDROPS[seed % STUDIO_BACKDROPS.length];
  const rimAccent = dish.isVeg ? '#1B7A43' : '#6E141D';
  const styleLabel = CULINARY_STYLE_LABELS[dish.plateStyle];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${backdrop} flex flex-col items-center justify-center p-4 text-center ${aspectClass} ${className}`}
      role="img"
      aria-label={`${dish.name} — Bharath Delights menu presentation`}
    >
      {/* Traditional South Indian stoneware plate framing */}
      <div
        className={`relative rounded-full bg-[#FFFDFA] shadow-sm border border-[#DFCFAE] flex flex-col items-center justify-center ${
          compact ? 'w-14 h-14 p-1' : 'w-4/5 max-w-[206px] aspect-square p-5'
        }`}
      >
        <div
          className="absolute inset-2.5 rounded-full border opacity-30 pointer-events-none"
          style={{ borderColor: '#D49B1A' }}
        />

        {compact ? (
          <span className="font-display text-xs font-bold text-[#6E141D]">
            {dish.name
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('')}
          </span>
        ) : (
          <div className="relative z-10 px-2 flex flex-col items-center">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: rimAccent }}
            >
              {dish.isVeg ? 'Pure Veg' : 'Non-Veg'}
            </span>
            <p className="font-display text-sm sm:text-base font-bold text-[#2C1A15] leading-snug mt-1.5 line-clamp-2">
              {dish.name}
            </p>
            <div className="w-8 h-px bg-[#D49B1A]/60 my-2" aria-hidden="true" />
            <span className="text-[10px] font-medium text-[#665048] leading-tight line-clamp-1">
              {styleLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
