import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  showMark?: boolean;
}

export function BrandLogo({ variant = 'light', showMark = true }: BrandLogoProps) {
  const titleColor = variant === 'dark' ? 'text-[#FCF8F1]' : 'text-[#6E141D]';
  const accentStroke = variant === 'dark' ? '#F3C45B' : '#D49B1A';
  const vesselFill = variant === 'dark' ? '#F3C45B' : '#6E141D';
  const leafFill = variant === 'dark' ? '#3B7A57' : '#2E6F40';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      {showMark && (
        <svg
          width="34"
          height="34"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* Traditional Tamil Kolam Outer Diamond Frame */}
          <rect
            x="20"
            y="2.5"
            width="24.75"
            height="24.75"
            rx="4"
            transform="rotate(45 20 2.5)"
            stroke={accentStroke}
            strokeWidth="1.6"
          />
          {/* Stylized Banana Leaf Arc */}
          <path
            d="M11 22.5C13.5 16.5 22.5 14 29 17.5C25.5 23.5 17 25.5 11 22.5Z"
            fill={leafFill}
            opacity="0.9"
          />
          {/* Traditional Brass Serving Bowl */}
          <path
            d="M10.5 23.5H29.5C28.8 28.2 24.8 31 20 31C15.2 31 11.2 28.2 10.5 23.5Z"
            fill={vesselFill}
          />
          {/* Sacred Flame / Aroma Spark Above Bowl */}
          <path
            d="M20 8.5C21.6 10.7 22 12.6 20 14.2C18 12.6 18.4 10.7 20 8.5Z"
            fill={accentStroke}
          />
        </svg>
      )}
      <span className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${titleColor}`}>
        Bharath Delights
      </span>
    </span>
  );
}
