import { RESTAURANT_CONFIG } from '../config/restaurant';
import { Order } from '../types';

export function formatOrderAddress(order: Order): string {
  const c = order.customer;
  return `${c.houseNumber}, ${c.streetName}, ${c.area}, ${c.city}, ${c.district} - ${c.pinCode}`;
}

export function buildWhatsAppOrderMessage(order: Order): string {
  const itemLines = order.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.dish.name} x ${item.quantity} = ₹${(
          item.dish.price * item.quantity
        ).toFixed(0)} (₹${item.dish.price} each)`
    )
    .join('\n');

  const lines = [
    `*NEW ORDER — ${RESTAURANT_CONFIG.name.toUpperCase()}*`,
    `Order Number: ${order.orderNumber}`,
    `Order Status: ${order.status}`,
    ``,
    `*Customer Details*`,
    `Name: ${order.customer.fullName}`,
    `Customer Mobile: ${order.customer.mobileNumber}`,
    `Customer WhatsApp: ${order.customer.whatsappNumber}`,
    ``,
    `*Delivery Address*`,
    `${formatOrderAddress(order)}`,
    ...(order.customer.deliveryInstructions.trim()
      ? [`Instructions: ${order.customer.deliveryInstructions.trim()}`]
      : []),
    ``,
    `*Ordered Food Items*`,
    itemLines,
    ``,
    `*Bill Summary*`,
    `Subtotal: ₹${order.subtotal.toFixed(0)}`,
    `Delivery Charge: ${
      order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge.toFixed(0)}`
    }`,
    `*Total Amount: ₹${order.grandTotal.toFixed(0)}*`,
    `Payment Method: ${order.paymentMethod} (${order.paymentNote})`,
  ];

  return lines.join('\n');
}

export function buildRestaurantWhatsAppUrl(order: Order): string {
  const message = encodeURIComponent(buildWhatsAppOrderMessage(order));
  // Uses the fixed restaurant WhatsApp number, never the customer's number
  const targetNumber = RESTAURANT_CONFIG.whatsappNumberPlaceholder.replace(/[^0-9]/g, '');
  if (!targetNumber || targetNumber.length < 10) {
    // When placeholder '91XXXXXXXXXX' is still active, wa.me/?text= lets the user see
    // the exact pre-filled message, or we target the configured number once set.
    return `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      RESTAURANT_CONFIG.whatsappNumberPlaceholder
    )}&text=${message}`;
  }
  return `https://wa.me/${targetNumber}?text=${message}`;
}
