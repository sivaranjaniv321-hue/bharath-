import React, { useEffect, useMemo, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  FILTER_CATEGORIES,
  MENU_ITEMS,
  MENU_SECTIONS,
} from '../data/menuData';
import { FoodCard } from '../components/FoodCard';

export function MenuPage() {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    shouldFocusSearch,
    clearFocusSearch,
  } = useStore();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (shouldFocusSearch) {
      searchInputRef.current?.focus();
      clearFocusSearch();
    }
  }, [shouldFocusSearch, clearFocusSearch]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((dish) => {
      // Category filter check
      let matchesCategory = true;
      if (activeFilter === 'Vegetarian') {
        matchesCategory = dish.isVeg;
      } else if (activeFilter === 'Non-Vegetarian') {
        matchesCategory = !dish.isVeg;
      } else if (activeFilter !== 'All') {
        matchesCategory = dish.filterCategories.includes(activeFilter);
      }

      if (!matchesCategory) return false;

      if (!query) return true;
      return (
        dish.name.toLowerCase().includes(query) ||
        dish.shortDescription.toLowerCase().includes(query) ||
        dish.section.toLowerCase().includes(query)
      );
    });
  }, [activeFilter, searchQuery]);

  const isGroupedView = activeFilter === 'All' && searchQuery.trim() === '';

  const groupedSections = useMemo(() => {
    if (!isGroupedView) return [];
    return MENU_SECTIONS.map((section) => ({
      section,
      items: filteredItems.filter((item) => item.section === section),
    })).filter((group) => group.items.length > 0);
  }, [filteredItems, isGroupedView]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title */}
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-2">
          Bharath Delights Kitchen
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2C1A15]">
          Traditional Tamil Nadu &amp; South Indian Menu
        </h1>
        <p className="text-sm sm:text-base text-[#5C453E] mt-2 leading-relaxed">
          Click any dish to view full culinary details and select quantities, or add
          directly to your cart.
        </p>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="mt-8 bg-white border border-[#E5D9C8] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-[#665048] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes by name (e.g. Masala Dosa, Chettinad, Biryani, Filter Coffee)..."
              aria-label="Search food by name"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm text-[#2C1A15] placeholder:text-[#8C776E] focus:outline-none focus:border-[#6E141D]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#665048] hover:text-[#6E141D] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#5C453E] tabular-nums shrink-0">
            Showing <strong className="text-[#2C1A15]">{filteredItems.length}</strong> of{' '}
            {MENU_ITEMS.length} dishes
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div
          className="flex flex-wrap items-center gap-2 pt-1"
          role="tablist"
          aria-label="Menu category filters"
        >
          {FILTER_CATEGORIES.map((category) => {
            const active = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(category)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#6E141D] text-[#FCF8F1]'
                    : 'bg-[#FCF8F1] text-[#2C1A15] border border-[#E5D9C8] hover:border-[#6E141D] hover:text-[#6E141D]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Content */}
      {filteredItems.length === 0 ? (
        <div className="mt-12 bg-white border border-[#E5D9C8] rounded-2xl p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-[#2C1A15]">
            No dishes found
          </h2>
          <p className="text-sm text-[#5C453E] mt-2">
            No menu items matched &ldquo;{searchQuery}&rdquo; in {activeFilter}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#6E141D] text-[#FCF8F1] text-sm font-semibold hover:bg-[#520D14] transition-colors cursor-pointer"
          >
            Reset Search &amp; Filters
          </button>
        </div>
      ) : isGroupedView ? (
        <div className="mt-10 space-y-14">
          {groupedSections.map(({ section, items }) => (
            <section key={section} aria-labelledby={`section-${section}`}>
              <div className="flex items-baseline justify-between gap-4 border-b border-[#E5D9C8] pb-3 mb-6">
                <h2
                  id={`section-${section}`}
                  className="font-display text-2xl font-bold text-[#2C1A15]"
                >
                  {section}
                </h2>
                <span className="text-xs font-medium text-[#665048] tabular-nums shrink-0">
                  {items.length} {items.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((dish) => (
                  <FoodCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}
