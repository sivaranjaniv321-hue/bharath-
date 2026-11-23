export const RESTAURANT_CONFIG = {
  name: 'Bharath Delights',
  tagline: 'Traditional Tamil Nadu Cuisine',
  // IMPORTANT: Replace this placeholder with your real restaurant WhatsApp number
  // in international format without '+' or spaces (e.g., '919876543210').
  whatsappNumberPlaceholder: '91XXXXXXXXXX',
  whatsappDisplayPlaceholder: '+91 XXXXX XXXXX (Restaurant WhatsApp Placeholder)',
  phoneDisplayPlaceholder: '+91 XXXXX XXXXX (Restaurant Phone Placeholder)',
  emailPlaceholder: 'orders@bharathdelights.example',
  addressPlaceholder: {
    line1: '[Restaurant Door No. & Street Name Placeholder]',
    line2: '[Area / Locality Placeholder]',
    cityState: '[City, Tamil Nadu — PIN Code Placeholder]',
  },
  openingHours: [
    { label: 'Morning Breakfast', time: '7:00 AM – 11:00 AM' },
    { label: 'Traditional Lunch & Meals', time: '11:30 AM – 3:30 PM' },
    { label: 'Evening Tiffin & Dinner', time: '4:30 PM – 10:30 PM' },
  ],
  deliveryFee: 40,
  freeDeliveryThreshold: 499,
  estimatedDeliveryTime: '35–45 mins (Configurable Local Estimate)',
  heroImage: '/src/assets/images/hero_tamil_feast_1795442490615.jpg',
};

export function calculateDeliveryCharge(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= RESTAURANT_CONFIG.freeDeliveryThreshold
    ? 0
    : RESTAURANT_CONFIG.deliveryFee;
}
