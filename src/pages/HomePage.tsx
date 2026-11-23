import React, { useState } from 'react';
import { ArrowRight, Clock, MapPin, Phone, Star } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { MENU_ITEMS } from '../data/menuData';
import { DietaryMark } from '../components/DietaryMark';
import { FoodCard } from '../components/FoodCard';

export function HomePage() {
  const { navigate, goToMenuWithFilter, reviews } = useStore();
  const [heroImgError, setHeroImgError] = useState(false);

  const specialsOfTheDay = MENU_ITEMS.filter((d) => d.specialOfTheDay);
  const popularDishes = MENU_ITEMS.filter(
    (d) => d.popular && !d.specialOfTheDay
  ).slice(0, 6);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Welcome / Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center py-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6E141D] mb-3">
              Traditional South Indian Kitchen
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#2C1A15] leading-[1.12] [text-wrap:balance]">
              Taste the Tradition of Tamil Nadu
            </h1>
            <p className="text-base sm:text-lg text-[#5C453E] leading-relaxed mt-5 max-w-xl">
              Welcome to Bharath Delights. Every morning begins with stone-ground idli
              and dosa batter, freshly roasted Chettinad spices, fragrant seeraga samba
              biryani, and brass-tumbler filter coffee served with warm Tamil hospitality.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('menu')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors whitespace-nowrap cursor-pointer"
              >
                View Menu
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goToMenuWithFilter('Meals')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#D8CBB8] bg-white text-[#2C1A15] font-semibold text-sm hover:border-[#6E141D] hover:text-[#6E141D] transition-colors whitespace-nowrap cursor-pointer"
              >
                Explore Banana Leaf Meals
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5D9C8] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#5C453E]">
              <span>150+ Authentic Dishes</span>
              <span aria-hidden="true">·</span>
              <span>Pure Veg & Non-Veg Kitchen Sections</span>
              <span aria-hidden="true">·</span>
              <span>Freshly Prepared to Order</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-[#E5D9C8] bg-[#F4ECE0] shadow-sm">
              {!heroImgError ? (
                <img
                  src={RESTAURANT_CONFIG.heroImage}
                  alt="Authentic Tamil Nadu banana leaf feast at Bharath Delights"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <p className="font-display text-2xl font-bold text-[#6E141D]">
                    Bharath Delights
                  </p>
                  <p className="text-sm text-[#5C453E] mt-2">
                    Traditional Tamil Nadu Banana Leaf Feast
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Special Dishes of the Day */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#E5D9C8]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-1.5">
              Chef&apos;s Selection
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A15]">
              Special Dishes of the Day
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('menu')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6E141D] hover:underline whitespace-nowrap cursor-pointer"
          >
            Browse Full Menu
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialsOfTheDay.slice(0, 4).map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* Vegetarian & Non-Vegetarian Categories */}
      <section className="bg-[#F4ECE0] border-y border-[#E5D9C8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-1.5">
              Browse by Preference
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A15]">
              Vegetarian &amp; Non-Vegetarian Kitchens
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <DietaryMark isVeg={true} size="md" />
                  <span className="text-sm font-semibold text-[#1B7A43]">
                    Pure Vegetarian
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2C1A15]">
                  Traditional Tiffin, Banana Leaf Meals &amp; Sweets
                </h3>
                <p className="text-sm text-[#5C453E] mt-2 leading-relaxed">
                  Fluffy idlis, ghee roast dosas, ven pongal, full Tamil Nadu banana leaf
                  meals, variety rice, paneer curries, and traditional Mysore pak &amp; payasam.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => goToMenuWithFilter('Vegetarian')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6E141D] text-[#FCF8F1] text-sm font-semibold hover:bg-[#520D14] transition-colors cursor-pointer"
                >
                  View Vegetarian Dishes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <DietaryMark isVeg={false} size="md" />
                  <span className="text-sm font-semibold text-[#9E1C20]">
                    Non-Vegetarian Specialities
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2C1A15]">
                  Chettinad Roasts, Seeraga Samba Biryani &amp; Coastal Fry
                </h3>
                <p className="text-sm text-[#5C453E] mt-2 leading-relaxed">
                  Karaikudi Chettinad chicken, Dindigul and Ambur style biryanis, mutton
                  chukka, pan-seared seer fish fry, prawn masala, and Madurai kothu parotta.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => goToMenuWithFilter('Non-Vegetarian')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6E141D] text-[#FCF8F1] text-sm font-semibold hover:bg-[#520D14] transition-colors cursor-pointer"
                >
                  View Non-Vegetarian Dishes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#665048] mr-1">
              Quick Menu Sections:
            </span>
            {(
              [
                'Breakfast',
                'Meals',
                'Rice',
                'Biryani',
                'Snacks',
                'Sweets',
                'Beverages',
              ] as const
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => goToMenuWithFilter(cat)}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5D9C8] text-xs font-semibold text-[#2C1A15] hover:border-[#6E141D] hover:text-[#6E141D] transition-colors whitespace-nowrap cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Food Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-1.5">
              Guest Favorites
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A15]">
              Popular Food Items
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('menu')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6E141D] hover:underline whitespace-nowrap cursor-pointer"
          >
            See All {MENU_ITEMS.length} Dishes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* Customer Reviews Preview */}
      <section className="bg-white border-y border-[#E5D9C8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-1.5">
                Guest Feedback
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A15]">
                Customer Reviews
              </h2>
              <p className="text-xs text-[#665048] mt-1">
                Includes clearly labeled sample reviews for demonstration alongside your own submissions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('reviews')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6E141D] hover:underline whitespace-nowrap cursor-pointer"
            >
              Read &amp; Write Reviews
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#FCF8F1] border border-[#E5D9C8] rounded-xl p-6 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < review.rating
                              ? 'fill-[#D49B1A] text-[#D49B1A]'
                              : 'text-[#D8CBB8]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#665048]">
                      {review.isSample ? 'Sample Review' : review.date}
                    </span>
                  </div>
                  <p className="text-sm text-[#2C1A15] leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#6E141D]">
                  — {review.customerName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-[#FCF8F1] border border-[#E5D9C8] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#6E141D] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-lg font-semibold text-[#2C1A15]">
                Restaurant Location
              </h3>
              <p className="text-sm text-[#5C453E] mt-1">
                {RESTAURANT_CONFIG.addressPlaceholder.line1}
              </p>
              <p className="text-sm text-[#5C453E]">
                {RESTAURANT_CONFIG.addressPlaceholder.cityState}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#6E141D] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-lg font-semibold text-[#2C1A15]">
                Opening Hours
              </h3>
              <p className="text-sm text-[#5C453E] mt-1">
                Daily: 7:00 AM – 10:30 PM
              </p>
              <p className="text-xs text-[#665048] mt-0.5">
                Breakfast, Lunch Meals &amp; Dinner Tiffin
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#6E141D] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-lg font-semibold text-[#2C1A15]">
                Direct Inquiries
              </h3>
              <p className="text-sm text-[#5C453E] mt-1">
                {RESTAURANT_CONFIG.phoneDisplayPlaceholder}
              </p>
              <button
                type="button"
                onClick={() => navigate('contact')}
                className="text-sm font-semibold text-[#6E141D] hover:underline mt-1 cursor-pointer"
              >
                Contact &amp; Message Us →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
