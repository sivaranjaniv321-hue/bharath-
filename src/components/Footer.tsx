import React from 'react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const { navigate, goToMenuWithFilter } = useStore();

  return (
    <footer className="bg-[#2C1A15] text-[#F5EDE0] border-t border-[#4A332D] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <BrandLogo variant="dark" />
            <p className="text-sm text-[#D6C7B8] mt-3 leading-relaxed">
              Authentic Tamil Nadu cuisine prepared fresh every day with cold-pressed
              oils, roasted whole spices, and time-honored South Indian recipes.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-[#F3C45B] mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-[#E5D9C8]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('home')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('menu')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('orders')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('reviews')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-[#F3C45B] mb-3">
              Popular Categories
            </h3>
            <ul className="space-y-2 text-sm text-[#E5D9C8]">
              <li>
                <button
                  type="button"
                  onClick={() => goToMenuWithFilter('Breakfast')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Traditional Breakfast
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToMenuWithFilter('Meals')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Banana Leaf & Tamil Meals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToMenuWithFilter('Biryani')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Seeraga Samba Biryani
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToMenuWithFilter('Sweets')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Sweets & Desserts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToMenuWithFilter('Beverages')}
                  className="hover:text-[#F3C45B] transition-colors cursor-pointer"
                >
                  Filter Coffee & Beverages
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-[#F3C45B] mb-3">
              Hours & Contact
            </h3>
            <div className="space-y-2 text-sm text-[#D6C7B8]">
              <p>{RESTAURANT_CONFIG.addressPlaceholder.line1}</p>
              <p>{RESTAURANT_CONFIG.addressPlaceholder.cityState}</p>
              <p>Phone: {RESTAURANT_CONFIG.phoneDisplayPlaceholder}</p>
              <p>WhatsApp: {RESTAURANT_CONFIG.whatsappDisplayPlaceholder}</p>
              <p className="pt-1 text-[#F5EDE0]">Open Daily: 7:00 AM – 10:30 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#4A332D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#C7B6A6]">
          <p>© {new Date().getFullYear()} Bharath Delights. All rights reserved.</p>
          <p>
            Online ordering demo — configure your live restaurant WhatsApp number & payment gateway before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
