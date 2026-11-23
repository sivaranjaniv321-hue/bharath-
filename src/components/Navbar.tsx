import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';
import { BrandLogo } from './BrandLogo';

const NAV_LINKS: { label: string; route: PageRoute }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Menu', route: 'menu' },
  { label: 'About Us', route: 'about' },
  { label: 'My Orders', route: 'orders' },
  { label: 'Reviews', route: 'reviews' },
  { label: 'Contact', route: 'contact' },
];

export function Navbar() {
  const { route, navigate, cartCount, goToMenuWithFilter } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (target: PageRoute) => {
    setMobileOpen(false);
    navigate(target);
  };

  const handleSearchClick = () => {
    setMobileOpen(false);
    goToMenuWithFilter('All', true);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCF8F1]/95 backdrop-blur-sm border-b border-[#E5D9C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E141D] rounded-md"
          aria-label="Bharath Delights Home"
        >
          <BrandLogo variant="light" />
        </button>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((item) => {
            const active = route === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNavClick(item.route)}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  active
                    ? 'text-[#6E141D] border-[#6E141D]'
                    : 'text-[#4A332D] border-transparent hover:text-[#6E141D] hover:border-[#D49B1A]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSearchClick}
            aria-label="Search menu dishes"
            title="Search Menu"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#2C1A15] hover:bg-[#F4ECE0] hover:text-[#6E141D] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('cart')}
            aria-label={`Shopping Cart, ${cartCount} items`}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#6E141D] text-[#FCF8F1] hover:bg-[#520D14] transition-colors text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#D49B1A] text-[#2C1A15] text-xs font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-[#2C1A15] hover:bg-[#F4ECE0] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E5D9C8] bg-[#FCF8F1] px-4 py-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const active = route === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#6E141D] text-[#FCF8F1]'
                      : 'text-[#2C1A15] hover:bg-[#F4ECE0]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
