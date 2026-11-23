import React from 'react';

interface DietaryMarkProps {
  isVeg: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function DietaryMark({
  isVeg,
  showLabel = false,
  size = 'sm',
}: DietaryMarkProps) {
  const boxSize = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const innerSize = size === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5';

  return (
    <span className="inline-flex items-center gap-1.5 shrink-0">
      <span
        className={`${boxSize} inline-flex items-center justify-center border rounded-[3px] shrink-0 ${
          isVeg
            ? 'border-[#1B7A43] bg-white'
            : 'border-[#9E1C20] bg-white'
        }`}
        aria-label={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
        title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
      >
        {isVeg ? (
          <span className={`${innerSize} rounded-full bg-[#1B7A43]`} />
        ) : (
          <span
            className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#9E1C20]"
          />
        )}
      </span>
      {showLabel && (
        <span
          className={`text-xs font-medium ${
            isVeg ? 'text-[#1B7A43]' : 'text-[#9E1C20]'
          }`}
        >
          {isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
        </span>
      )}
    </span>
  );
}
