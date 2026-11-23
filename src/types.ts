export type PageRoute =
  | 'home'
  | 'menu'
  | 'about'
  | 'orders'
  | 'reviews'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'order-success';

export type FilterCategory =
  | 'All'
  | 'Vegetarian'
  | 'Non-Vegetarian'
  | 'Breakfast'
  | 'Meals'
  | 'Rice'
  | 'Biryani'
  | 'Snacks'
  | 'Sweets'
  | 'Beverages';

export type MenuSection =
  | 'Traditional Breakfast'
  | 'Traditional Tamil Nadu Foods'
  | 'Chettinad Specialities'
  | 'Biryani Varieties'
  | 'Rice Varieties'
  | 'Vegetarian Curries and Side Dishes'
  | 'Non-Vegetarian Dishes'
  | 'Parotta and Kothu Varieties'
  | 'Indo-Chinese Foods'
  | 'Snacks and Starters'
  | 'Sweets and Desserts'
  | 'Beverages';

export type PlateStyle =
  | 'idli'
  | 'dosa'
  | 'pongal'
  | 'meals'
  | 'rice'
  | 'biryani'
  | 'curry'
  | 'parotta'
  | 'noodles'
  | 'snack'
  | 'sweet'
  | 'beverage';

export interface Dish {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  section: MenuSection;
  filterCategories: Exclude<FilterCategory, 'All' | 'Vegetarian' | 'Non-Vegetarian'>[];
  isVeg: boolean;
  rating: number;
  image?: string;
  plateStyle: PlateStyle;
  popular?: boolean;
  specialOfTheDay?: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  houseNumber: string;
  streetName: string;
  area: string;
  city: string;
  district: string;
  pinCode: string;
  deliveryInstructions: string;
}

export type PaymentMethod =
  | 'Cash on Delivery'
  | 'GPay'
  | 'PhonePe'
  | 'Paytm'
  | 'UPI';

export interface Order {
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentNote: string;
  status: 'Order Received';
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
  isSample?: boolean;
}
