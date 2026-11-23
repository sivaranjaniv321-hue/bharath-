import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { DishMedia } from '../components/DishMedia';
import { CustomerDetails, Order, PaymentMethod } from '../types';

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  title: string;
  subtitle: string;
  isInstantOnlineDemo: boolean;
}[] = [
  {
    id: 'Cash on Delivery',
    title: 'Cash on Delivery',
    subtitle: 'Pay in cash when your order arrives at your doorstep.',
    isInstantOnlineDemo: false,
  },
  {
    id: 'GPay',
    title: 'GPay (Google Pay)',
    subtitle: 'Demo payment selection — pay on delivery or configure gateway.',
    isInstantOnlineDemo: true,
  },
  {
    id: 'PhonePe',
    title: 'PhonePe',
    subtitle: 'Demo payment selection — pay on delivery or configure gateway.',
    isInstantOnlineDemo: true,
  },
  {
    id: 'Paytm',
    title: 'Paytm',
    subtitle: 'Demo payment selection — pay on delivery or configure gateway.',
    isInstantOnlineDemo: true,
  },
  {
    id: 'UPI',
    title: 'UPI (Any UPI App)',
    subtitle: 'Demo payment selection — pay via QR/UPI at delivery or via gateway.',
    isInstantOnlineDemo: true,
  },
];

type FormErrors = Partial<Record<keyof CustomerDetails, string>>;

export function CheckoutPage() {
  const { cart, subtotal, deliveryCharge, grandTotal, navigate, placeOrder } =
    useStore();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    houseNumber: '',
    streetName: '',
    area: '',
    city: '',
    district: '',
    pinCode: '',
    deliveryInstructions: '',
  });
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('Cash on Delivery');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formErrorBanner, setFormErrorBanner] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#E5D9C8] rounded-2xl p-10 text-center">
          <h1 className="font-display text-3xl font-bold text-[#2C1A15]">
            No Items to Checkout
          </h1>
          <p className="text-sm text-[#5C453E] mt-2">
            Please add at least one dish to your cart before proceeding to checkout.
          </p>
          <button
            type="button"
            onClick={() => navigate('menu')}
            className="mt-6 px-6 py-3 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const updateField = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'mobileNumber' && sameAsMobile) {
        next.whatsappNumber = value;
      }
      return next;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === 'mobileNumber' && sameAsMobile && errors.whatsappNumber) {
      setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
    }
  };

  const handleSameAsMobileToggle = (checked: boolean) => {
    setSameAsMobile(checked);
    if (checked) {
      setCustomer((prev) => ({ ...prev, whatsappNumber: prev.mobileNumber }));
      setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{6}$/;

    if (!customer.fullName.trim() || customer.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!phoneRegex.test(customer.mobileNumber.replace(/\D/g, ''))) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    }
    if (!phoneRegex.test(customer.whatsappNumber.replace(/\D/g, ''))) {
      nextErrors.whatsappNumber = 'Enter a valid 10-digit WhatsApp number.';
    }
    if (!customer.houseNumber.trim()) {
      nextErrors.houseNumber = 'House / flat number is required.';
    }
    if (!customer.streetName.trim()) {
      nextErrors.streetName = 'Street name is required.';
    }
    if (!customer.area.trim()) {
      nextErrors.area = 'Area / locality is required.';
    }
    if (!customer.city.trim()) {
      nextErrors.city = 'City is required.';
    }
    if (!customer.district.trim()) {
      nextErrors.district = 'District is required.';
    }
    if (!pinRegex.test(customer.pinCode.trim())) {
      nextErrors.pinCode = 'Enter a valid 6-digit PIN code.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormErrorBanner(
        'Please complete all highlighted required delivery details before placing your order.'
      );
      return false;
    }

    setFormErrorBanner(null);
    return true;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanMobile = customer.mobileNumber.replace(/\D/g, '').slice(-10);
    const cleanWhatsapp = customer.whatsappNumber.replace(/\D/g, '').slice(-10);

    const now = new Date();
    const dateStamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}${String(now.getDate()).padStart(2, '0')}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);

    const paymentNote =
      paymentMethod === 'Cash on Delivery'
        ? 'Pay cash on delivery'
        : `Demo selection (${paymentMethod}) — payment not yet processed via gateway`;

    const order: Order = {
      orderNumber: `BD-${dateStamp}-${randomSuffix}`,
      createdAt: now.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: {
        ...customer,
        fullName: customer.fullName.trim(),
        mobileNumber: cleanMobile,
        whatsappNumber: cleanWhatsapp,
        houseNumber: customer.houseNumber.trim(),
        streetName: customer.streetName.trim(),
        area: customer.area.trim(),
        city: customer.city.trim(),
        district: customer.district.trim(),
        pinCode: customer.pinCode.trim(),
        deliveryInstructions: customer.deliveryInstructions.trim(),
      },
      items: cart.map((i) => ({ ...i })),
      subtotal,
      deliveryCharge,
      grandTotal,
      paymentMethod,
      paymentNote,
      status: 'Order Received',
      estimatedDelivery: RESTAURANT_CONFIG.estimatedDeliveryTime,
    };

    placeOrder(order);
  };

  const isDigitalSelected = paymentMethod !== 'Cash on Delivery';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
        type="button"
        onClick={() => navigate('cart')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E141D] hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </button>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-1">
          Delivery &amp; Payment
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2C1A15]">
          Checkout
        </h1>
      </div>

      {formErrorBanner && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-[#FDF2F2] border border-[#E5B4B4] text-sm text-[#8F1D22]"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{formErrorBanner}</p>
        </div>
      )}

      <form
        onSubmit={handleConfirmOrder}
        noValidate
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Customer Details + Payment Selection */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-[#2C1A15] mb-1">
              Customer &amp; Delivery Details
            </h2>
            <p className="text-xs text-[#665048] mb-6">
              All fields marked with <span className="text-[#9E1C20]">*</span> are
              required. Your mobile number is included in the restaurant order alert.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  Full Name <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] focus:outline-none ${
                    errors.fullName
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-[#9E1C20] mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  Mobile Number <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  value={customer.mobileNumber}
                  onChange={(e) =>
                    updateField('mobileNumber', e.target.value.replace(/\D/g, ''))
                  }
                  placeholder="10-digit mobile number"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] tabular-nums focus:outline-none ${
                    errors.mobileNumber
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.mobileNumber && (
                  <p className="text-xs text-[#9E1C20] mt-1">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="whatsappNumber"
                    className="block text-xs font-semibold text-[#2C1A15]"
                  >
                    WhatsApp Number <span className="text-[#9E1C20]">*</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-[#5C453E] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsMobile}
                      onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                      className="accent-[#6E141D]"
                    />
                    Same as mobile
                  </label>
                </div>
                <input
                  id="whatsappNumber"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  value={customer.whatsappNumber}
                  onChange={(e) => {
                    setSameAsMobile(false);
                    updateField(
                      'whatsappNumber',
                      e.target.value.replace(/\D/g, '')
                    );
                  }}
                  placeholder="10-digit WhatsApp number"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] tabular-nums focus:outline-none ${
                    errors.whatsappNumber
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.whatsappNumber && (
                  <p className="text-xs text-[#9E1C20] mt-1">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="houseNumber"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  House / Flat Number <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="houseNumber"
                  type="text"
                  required
                  value={customer.houseNumber}
                  onChange={(e) => updateField('houseNumber', e.target.value)}
                  placeholder="e.g. No. 14, Flat 2B"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] focus:outline-none ${
                    errors.houseNumber
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.houseNumber && (
                  <p className="text-xs text-[#9E1C20] mt-1">
                    {errors.houseNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="streetName"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  Street Name <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="streetName"
                  type="text"
                  required
                  value={customer.streetName}
                  onChange={(e) => updateField('streetName', e.target.value)}
                  placeholder="e.g. Anna Salai / Gandhi Road"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] focus:outline-none ${
                    errors.streetName
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.streetName && (
                  <p className="text-xs text-[#9E1C20] mt-1">
                    {errors.streetName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  Area / Locality <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="area"
                  type="text"
                  required
                  value={customer.area}
                  onChange={(e) => updateField('area', e.target.value)}
                  placeholder="e.g. Adyar / RS Puram"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] focus:outline-none ${
                    errors.area
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.area && (
                  <p className="text-xs text-[#9E1C20] mt-1">{errors.area}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  City <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="e.g. Chennai / Madurai"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] focus:outline-none ${
                    errors.city
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.city && (
                  <p className="text-xs text-[#9E1C20] mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  District <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="district"
                  type="text"
                  required
                  value={customer.district}
                  onChange={(e) => updateField('district', e.target.value)}
                  placeholder="e.g. Chennai / Coimbatore"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] focus:outline-none ${
                    errors.district
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.district && (
                  <p className="text-xs text-[#9E1C20] mt-1">
                    {errors.district}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pinCode"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  PIN Code <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="pinCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={customer.pinCode}
                  onChange={(e) =>
                    updateField('pinCode', e.target.value.replace(/\D/g, ''))
                  }
                  placeholder="6-digit PIN code"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-[#FCF8F1] tabular-nums focus:outline-none ${
                    errors.pinCode
                      ? 'border-[#9E1C20]'
                      : 'border-[#D8CBB8] focus:border-[#6E141D]'
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-xs text-[#9E1C20] mt-1">{errors.pinCode}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="deliveryInstructions"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  id="deliveryInstructions"
                  rows={2}
                  value={customer.deliveryInstructions}
                  onChange={(e) =>
                    updateField('deliveryInstructions', e.target.value)
                  }
                  placeholder="Landmark, gate code, spice preference, or call on arrival..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm focus:outline-none focus:border-[#6E141D]"
                />
              </div>
            </div>
          </section>

          {/* Payment Options */}
          <section className="bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-[#2C1A15] mb-1">
              Payment Method
            </h2>
            <p className="text-xs text-[#665048] mb-5">
              Select one payment option. We never ask for your UPI PIN, password,
              or banking credentials.
            </p>

            <div className="space-y-3" role="radiogroup" aria-label="Payment method">
              {PAYMENT_OPTIONS.map((option) => {
                const selected = paymentMethod === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-colors ${
                      selected
                        ? 'border-[#6E141D] bg-[#FCF8F1]'
                        : 'border-[#E5D9C8] bg-white hover:border-[#D49B1A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={selected}
                      onChange={() => setPaymentMethod(option.id)}
                      className="mt-1 accent-[#6E141D]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#2C1A15] inline-flex items-center gap-2">
                          {option.id === 'Cash on Delivery' ? (
                            <Wallet className="w-4 h-4 text-[#6E141D]" />
                          ) : option.id === 'UPI' ? (
                            <CreditCard className="w-4 h-4 text-[#6E141D]" />
                          ) : (
                            <Smartphone className="w-4 h-4 text-[#6E141D]" />
                          )}
                          {option.title}
                        </span>
                        {option.isInstantOnlineDemo && (
                          <span className="text-[11px] font-semibold text-[#6E141D]">
                            Demo Selection
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5C453E] mt-1">
                        {option.subtitle}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>

            {isDigitalSelected && (
              <div className="mt-4 p-4 rounded-xl bg-[#F4ECE0] border border-[#E5D9C8] text-xs text-[#5C453E] space-y-1.5">
                <p className="font-semibold text-[#2C1A15] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#6E141D]" />
                  Safe Demo Payment Notice ({paymentMethod})
                </p>
                <p>
                  No online payment has been charged yet. Live {paymentMethod} verification
                  requires connecting a real payment gateway (such as Razorpay or Cashfree)
                  with merchant keys. For this demo, confirming places your order with
                  &ldquo;{paymentMethod} (Demo Selection)&rdquo; so you can complete payment
                  upon delivery or verify via WhatsApp with the restaurant.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Complete Order Summary */}
        <aside className="lg:col-span-5 bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-7 space-y-5 sticky top-24">
          <h2 className="font-display text-xl font-bold text-[#2C1A15]">
            Complete Order Summary
          </h2>

          <div className="divide-y divide-[#F0E6D8] max-h-80 overflow-y-auto pr-1">
            {cart.map(({ dish, quantity }) => (
              <div
                key={dish.id}
                className="py-3 flex items-center justify-between gap-3"
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

          <div className="space-y-2.5 text-sm border-t border-[#E5D9C8] pt-4 tabular-nums">
            <div className="flex items-center justify-between text-[#5C453E]">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#2C1A15]">₹{subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-[#5C453E]">
              <span>Delivery Charge</span>
              <span className="font-semibold text-[#2C1A15]">
                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#5C453E]">
              <span>Payment Selected</span>
              <span className="font-semibold text-[#2C1A15]">
                {paymentMethod}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold text-[#2C1A15] border-t border-[#E5D9C8] pt-3">
              <span>Grand Total</span>
              <span className="text-[#6E141D]">₹{grandTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Confirm Order · ₹{grandTotal}
          </button>

          <p className="text-xs text-[#665048] leading-relaxed">
            After confirming, your formatted order details can be sent directly to
            Bharath Delights&apos; restaurant WhatsApp number (
            <span className="font-mono text-[11px]">
              {RESTAURANT_CONFIG.whatsappNumberPlaceholder}
            </span>
            ).
          </p>
        </aside>
      </form>
    </div>
  );
}
