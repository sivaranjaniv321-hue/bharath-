import React from 'react';
import { ArrowRight, ExternalLink, MessageCircle, Package, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DishMedia } from '../components/DishMedia';
import { buildRestaurantWhatsAppUrl, formatOrderAddress } from '../utils/whatsapp';

export function MyOrdersPage() {
  const { orders, navigate, reorderOrder } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-1">
            Order History
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2C1A15]">
            My Orders
          </h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('menu')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E141D] hover:underline whitespace-nowrap cursor-pointer"
        >
          Order More Food
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-[#E5D9C8] rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[#F4ECE0] text-[#6E141D] flex items-center justify-center mx-auto mb-4">
            <Package className="w-7 h-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#2C1A15]">
            You haven&apos;t placed an order yet
          </h2>
          <p className="text-sm text-[#5C453E] mt-2 max-w-md mx-auto">
            Once you complete an order at checkout, your order number, items, and
            delivery summary will appear right here.
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
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const whatsappUrl = buildRestaurantWhatsAppUrl(order);
            return (
              <article
                key={order.orderNumber}
                className="bg-white border border-[#E5D9C8] rounded-2xl overflow-hidden"
              >
                <div className="bg-[#FCF8F1] border-b border-[#E5D9C8] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
                    <span className="font-bold text-[#2C1A15] tabular-nums">
                      {order.orderNumber}
                    </span>
                    <span className="text-[#665048]">·</span>
                    <span className="text-[#5C453E]">{order.createdAt}</span>
                    <span className="text-[#665048]">·</span>
                    <span className="font-semibold text-[#1B7A43]">
                      {order.status}
                    </span>
                  </div>
                  <span className="text-base font-bold text-[#6E141D] tabular-nums">
                    Total: ₹{order.grandTotal}
                  </span>
                </div>

                <div className="p-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map(({ dish, quantity }) => (
                      <div
                        key={dish.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-[#F0E6D8] bg-[#FCF8F1]/60"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E5D9C8] shrink-0">
                          <DishMedia
                            dish={dish}
                            aspectClass="aspect-square"
                            compact
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#2C1A15] truncate">
                            {dish.name}
                          </p>
                          <p className="text-xs text-[#665048] tabular-nums">
                            {quantity} × ₹{dish.price} = ₹{dish.price * quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#F0E6D8] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm text-[#5C453E]">
                    <div className="space-y-1">
                      <p>
                        <strong className="text-[#2C1A15]">Deliver to:</strong>{' '}
                        {order.customer.fullName} ({order.customer.mobileNumber}) —{' '}
                        {formatOrderAddress(order)}
                      </p>
                      <p>
                        <strong className="text-[#2C1A15]">Payment:</strong>{' '}
                        {order.paymentMethod} ({order.paymentNote})
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1B7A43] text-[#1B7A43] font-semibold text-xs hover:bg-[#1B7A43] hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp Order
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => reorderOrder(order)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-xs hover:bg-[#520D14] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
