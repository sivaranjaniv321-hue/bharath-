import React from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { DietaryMark } from '../components/DietaryMark';
import { DishMedia } from '../components/DishMedia';

export function CartPage() {
  const {
    cart,
    subtotal,
    deliveryCharge,
    grandTotal,
    updateQuantity,
    removeFromCart,
    navigate,
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#E5D9C8] rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[#F4ECE0] text-[#6E141D] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#2C1A15]">
            Your Cart is Empty
          </h1>
          <p className="text-sm sm:text-base text-[#5C453E] mt-2 max-w-md mx-auto leading-relaxed">
            Explore our freshly prepared idlis, crispy dosas, banana leaf meals,
            Chettinad specialities, and biryanis to start your order.
          </p>
          <button
            type="button"
            onClick={() => navigate('menu')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors cursor-pointer"
          >
            View Menu
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const remainingForFreeDelivery = Math.max(
    0,
    RESTAURANT_CONFIG.freeDeliveryThreshold - subtotal
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-1">
            Order Bag
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2C1A15]">
            Your Cart
          </h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('menu')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E141D] hover:underline whitespace-nowrap cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ dish, quantity }) => (
            <div
              key={dish.id}
              className="bg-white border border-[#E5D9C8] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-[#E5D9C8] shrink-0">
                  <DishMedia dish={dish} aspectClass="aspect-square" compact />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <DietaryMark isVeg={dish.isVeg} />
                    <span className="text-xs text-[#665048] truncate">
                      {dish.section}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#2C1A15]">
                    {dish.name}
                  </h2>
                  <p className="text-sm text-[#5C453E] tabular-nums mt-0.5">
                    ₹{dish.price} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F0E6D8]">
                <div className="inline-flex items-center border border-[#D8CBB8] rounded-lg bg-[#FCF8F1]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(dish.id, quantity - 1)}
                    className="p-2 text-[#2C1A15] hover:text-[#6E141D] transition-colors cursor-pointer"
                    aria-label={`Decrease ${dish.name} quantity`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-[#2C1A15] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(dish.id, quantity + 1)}
                    className="p-2 text-[#2C1A15] hover:text-[#6E141D] transition-colors cursor-pointer"
                    aria-label={`Increase ${dish.name} quantity`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right min-w-[72px] tabular-nums">
                  <p className="text-base font-bold text-[#2C1A15]">
                    ₹{dish.price * quantity}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(dish.id)}
                  aria-label={`Remove ${dish.name} from cart`}
                  title="Remove item"
                  className="p-2 rounded-lg text-[#665048] hover:text-[#9E1C20] hover:bg-[#FAF1EE] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Panel */}
        <aside className="lg:col-span-4 bg-white border border-[#E5D9C8] rounded-2xl p-6 space-y-5 sticky top-24">
          <h2 className="font-display text-xl font-bold text-[#2C1A15]">
            Order Summary
          </h2>

          {remainingForFreeDelivery > 0 ? (
            <p className="text-xs text-[#5C453E] bg-[#F4ECE0] rounded-lg px-3 py-2.5 tabular-nums">
              Add <strong>₹{remainingForFreeDelivery}</strong> more for free local
              delivery (orders ₹{RESTAURANT_CONFIG.freeDeliveryThreshold}+).
            </p>
          ) : (
            <p className="text-xs text-[#1B7A43] bg-[#EEF7F1] rounded-lg px-3 py-2.5 font-medium">
              Your order qualifies for free local delivery.
            </p>
          )}

          <div className="space-y-3 text-sm border-t border-[#E5D9C8] pt-4 tabular-nums">
            <div className="flex items-center justify-between text-[#5C453E]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#2C1A15]">₹{subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-[#5C453E]">
              <span>Delivery Charge</span>
              <span className="font-semibold text-[#2C1A15]">
                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-[#2C1A15] border-t border-[#E5D9C8] pt-3">
              <span>Grand Total</span>
              <span className="text-[#6E141D]">₹{grandTotal}</span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 px-5 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate('menu')}
              className="w-full py-3 px-5 rounded-lg border border-[#D8CBB8] text-[#2C1A15] font-semibold text-sm hover:border-[#6E141D] hover:text-[#6E141D] transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
