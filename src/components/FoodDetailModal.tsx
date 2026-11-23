import React, { useEffect, useState } from 'react';
import { Minus, Plus, Star, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DietaryMark } from './DietaryMark';
import { DishMedia } from './DishMedia';

export function FoodDetailModal() {
  const { selectedDish, closeDishModal, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [selectedDish?.id]);

  useEffect(() => {
    if (!selectedDish) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDishModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedDish, closeDishModal]);

  if (!selectedDish) return null;

  const handleAdd = () => {
    addToCart(selectedDish, quantity);
    closeDishModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="food-modal-title"
      onClick={closeDishModal}
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-[#E5D9C8] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeDishModal}
          aria-label="Close food details"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/95 border border-[#E5D9C8] flex items-center justify-center text-[#2C1A15] hover:bg-[#FCF8F1] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:col-span-5 bg-[#F7F1E5]">
          <DishMedia
            dish={selectedDish}
            aspectClass="aspect-[4/5]"
            className="h-full"
          />
        </div>

        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <DietaryMark isVeg={selectedDish.isVeg} showLabel size="md" />
              <span className="text-xs text-[#665048]">·</span>
              <span className="text-xs font-medium text-[#665048]">
                {selectedDish.section}
              </span>
              <span className="text-xs text-[#665048]">·</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C1A15] tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#D49B1A] text-[#D49B1A]" />
                {selectedDish.rating.toFixed(1)}
              </span>
            </div>

            <h2
              id="food-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A15]"
            >
              {selectedDish.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-3 tabular-nums">
              <span className="text-2xl font-bold text-[#6E141D]">
                ₹{selectedDish.price}
              </span>
              {selectedDish.originalPrice && (
                <span className="text-sm text-[#8C776E] line-through">
                  ₹{selectedDish.originalPrice}
                </span>
              )}
              {selectedDish.discountPercent && (
                <span className="text-xs font-semibold text-[#6E141D]">
                  Save {selectedDish.discountPercent}%
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#5C453E] leading-relaxed mt-4">
              {selectedDish.fullDescription}
            </p>
          </div>

          <div className="pt-5 border-t border-[#E5D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#2C1A15]">Quantity</span>
              <div className="inline-flex items-center border border-[#D8CBB8] rounded-lg bg-[#FCF8F1]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-[#2C1A15] hover:text-[#6E141D] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[#2C1A15] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-[#2C1A15] hover:text-[#6E141D] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="px-6 py-3 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors whitespace-nowrap cursor-pointer tabular-nums"
            >
              Add to Cart · ₹{selectedDish.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
