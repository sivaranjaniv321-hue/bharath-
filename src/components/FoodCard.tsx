import React from 'react';
import { Minus, Plus, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Dish } from '../types';
import { DietaryMark } from './DietaryMark';
import { DishMedia } from './DishMedia';

interface FoodCardProps {
  dish: Dish;
}

export function FoodCard({ dish }: FoodCardProps) {
  const { openDishModal, addToCart, updateQuantity, getItemQuantity } = useStore();
  const quantityInCart = getItemQuantity(dish.id);

  return (
    <article className="group bg-white border border-[#E5D9C8] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={() => openDishModal(dish)}
        className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E141D] cursor-pointer"
        aria-label={`View details for ${dish.name}`}
      >
        <DishMedia dish={dish} aspectClass="aspect-square" />
      </button>

      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <DietaryMark isVeg={dish.isVeg} />
              <span className="text-xs text-[#665048] truncate">
                {dish.section}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C1A15] tabular-nums shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#D49B1A] text-[#D49B1A]" />
              {dish.rating.toFixed(1)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => openDishModal(dish)}
            className="text-left w-full cursor-pointer focus-visible:outline-none focus-visible:underline"
          >
            <h3 className="font-display text-lg font-semibold text-[#2C1A15] leading-snug group-hover:text-[#6E141D] transition-colors">
              {dish.name}
            </h3>
          </button>

          <p className="text-sm text-[#665048] mt-1 line-clamp-2 leading-relaxed">
            {dish.shortDescription}
          </p>
        </div>

        <div className="pt-2 border-t border-[#F0E6D8] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-base font-bold text-[#2C1A15]">
              ₹{dish.price}
            </span>
            {dish.originalPrice && (
              <span className="text-xs text-[#8C776E] line-through">
                ₹{dish.originalPrice}
              </span>
            )}
            {dish.discountPercent && (
              <span className="text-xs font-semibold text-[#6E141D]">
                {dish.discountPercent}% off
              </span>
            )}
          </div>

          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(dish, 1)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#6E141D] text-[#FCF8F1] hover:bg-[#520D14] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B1A]"
            >
              Add
            </button>
          ) : (
            <div className="inline-flex items-center border border-[#6E141D] rounded-lg overflow-hidden bg-[#FCF8F1] shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(dish.id, quantityInCart - 1)}
                className="p-2 text-[#6E141D] hover:bg-[#6E141D] hover:text-white transition-colors cursor-pointer"
                aria-label={`Decrease ${dish.name} quantity`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2.5 text-xs font-bold text-[#2C1A15] tabular-nums">
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(dish.id, quantityInCart + 1)}
                className="p-2 text-[#6E141D] hover:bg-[#6E141D] hover:text-white transition-colors cursor-pointer"
                aria-label={`Increase ${dish.name} quantity`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
