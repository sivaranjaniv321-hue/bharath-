import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Home,
  Info,
  MessageCircle,
  Package,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { DishMedia } from '../components/DishMedia';
import {
  buildRestaurantWhatsAppUrl,
  buildWhatsAppOrderMessage,
  formatOrderAddress,
} from '../utils/whatsapp';

export function OrderSuccessPage() {
  const { lastCompletedOrder, navigate } = useStore();
  const [copied, setCopied] = useState(false);

  // Guard: never display success page unless an order was actually submitted
  if (!lastCompletedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#E5D9C8] rounded-2xl p-10 text-center">
          <h1 className="font-display text-3xl font-bold text-[#2C1A15]">
            No Recent Order Found
          </h1>
          <p className="text-sm text-[#5C453E] mt-2">
            Please place an order through Checkout to view your order confirmation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('menu')}
              className="px-5 py-2.5 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors cursor-pointer"
            >
              Browse Menu
            </button>
            <button
              type="button"
              onClick={() => navigate('orders')}
              className="px-5 py-2.5 rounded-lg border border-[#D8CBB8] text-[#2C1A15] font-semibold text-sm hover:border-[#6E141D] transition-colors cursor-pointer"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const order = lastCompletedOrder;
  const whatsappUrl = buildRestaurantWhatsAppUrl(order);
  const whatsappMessage = buildWhatsAppOrderMessage(order);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored if clipboard permissions restricted
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="bg-white border border-[#E5D9C8] rounded-2xl overflow-hidden shadow-sm">
        {/* Top Confirmation Header */}
        <div className="bg-[#6E141D] text-[#FCF8F1] p-6 sm:p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#D49B1A] text-[#2C1A15] flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Thank you for ordering from Bharath Delights!
          </h1>
          <p className="text-sm sm:text-base text-[#F5EDE0] mt-1.5">
            Your order has been received.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Order Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#FCF8F1] border border-[#E5D9C8] rounded-xl p-4 sm:p-5">
            <div>
              <p className="text-xs text-[#665048]">Order Number</p>
              <p className="text-sm font-bold text-[#2C1A15] mt-0.5 tabular-nums">
                {order.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#665048]">Customer Name</p>
              <p className="text-sm font-bold text-[#2C1A15] mt-0.5">
                {order.customer.fullName}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#665048]">Order Status</p>
              <p className="text-sm font-bold text-[#1B7A43] mt-0.5">
                {order.status}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#665048]">Estimated Delivery</p>
              <p className="text-sm font-bold text-[#2C1A15] mt-0.5">
                {order.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#E5D9C8] rounded-xl p-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#665048] mb-2">
                Delivery Address &amp; Contact
              </h2>
              <p className="text-sm font-semibold text-[#2C1A15]">
                {order.customer.fullName}
              </p>
              <p className="text-sm text-[#5C453E] mt-1 leading-relaxed">
                {formatOrderAddress(order)}
              </p>
              <p className="text-xs text-[#5C453E] mt-2 tabular-nums">
                Mobile: {order.customer.mobileNumber} · WhatsApp:{' '}
                {order.customer.whatsappNumber}
              </p>
              {order.customer.deliveryInstructions && (
                <p className="text-xs text-[#665048] mt-1.5">
                  Note: {order.customer.deliveryInstructions}
                </p>
              )}
            </div>

            <div className="border border-[#E5D9C8] rounded-xl p-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#665048] mb-2">
                Payment &amp; Total Amount
              </h2>
              <p className="text-sm font-semibold text-[#2C1A15]">
                {order.paymentMethod}
              </p>
              <p className="text-xs text-[#5C453E] mt-0.5">{order.paymentNote}</p>
              <div className="mt-3 pt-3 border-t border-[#F0E6D8] space-y-1 text-sm tabular-nums">
                <div className="flex justify-between text-[#5C453E]">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-[#5C453E]">
                  <span>Delivery Charge</span>
                  <span>
                    {order.deliveryCharge === 0
                      ? 'FREE'
                      : `₹${order.deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-[#6E141D] text-base pt-1">
                  <span>Total Amount</span>
                  <span>₹{order.grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div>
            <h2 className="font-display text-xl font-bold text-[#2C1A15] mb-3">
              Ordered Food Items
            </h2>
            <div className="border border-[#E5D9C8] rounded-xl divide-y divide-[#F0E6D8]">
              {order.items.map(({ dish, quantity }) => (
                <div
                  key={dish.id}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E5D9C8] shrink-0">
                      <DishMedia dish={dish} aspectClass="aspect-square" compact />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#2C1A15] truncate">
                        {dish.name}
                      </p>
                      <p className="text-xs text-[#665048] tabular-nums">
                        ₹{dish.price} × {quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#2C1A15] tabular-nums shrink-0">
                    ₹{dish.price * quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Restaurant Notification Box */}
          <div className="bg-[#F4ECE0] border border-[#E5D9C8] rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-2.5">
              <MessageCircle className="w-5 h-5 text-[#1B7A43] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-lg font-bold text-[#2C1A15]">
                  Send Order to Bharath Delights on WhatsApp
                </h2>
                <p className="text-xs text-[#5C453E] mt-0.5 leading-relaxed">
                  Click below to open WhatsApp with your complete pre-filled order
                  message addressed to the fixed restaurant WhatsApp placeholder (
                  <span className="font-mono">
                    {RESTAURANT_CONFIG.whatsappNumberPlaceholder}
                  </span>
                  ). Your mobile number ({order.customer.mobileNumber}) is included in
                  the message.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B7A43] text-white text-sm font-semibold hover:bg-[#145E33] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp &amp; Send Order
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#D8CBB8] text-[#2C1A15] text-sm font-semibold hover:border-[#6E141D] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1B7A43]" />
                    Copied Order Message
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Message Text
                  </>
                )}
              </button>
            </div>

            <div className="flex items-start gap-2 pt-2 text-[11px] text-[#665048]">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <p>
                Note: A browser website opens WhatsApp with a pre-filled message for
                the customer to send. Automatic silent background WhatsApp delivery
                requires connecting the WhatsApp Business Cloud API with a backend
                server.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 pt-2 border-t border-[#E5D9C8]">
            <button
              type="button"
              onClick={() => navigate('orders')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4" />
              View My Orders
            </button>

            <button
              type="button"
              onClick={() => navigate('home')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#D8CBB8] text-[#2C1A15] font-semibold text-sm hover:border-[#6E141D] hover:text-[#6E141D] transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
