import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { INITIAL_SAMPLE_REVIEWS } from '../data/sampleReviews';
import { calculateDeliveryCharge } from '../config/restaurant';
import {
  CartItem,
  Dish,
  FilterCategory,
  Order,
  PageRoute,
  Review,
} from '../types';

const MENU_BY_ID = new Map(MENU_ITEMS.map((d) => [d.id, d]));

function hydrateDish(dish: Dish): Dish {
  return MENU_BY_ID.get(dish.id) ?? dish;
}

const CART_STORAGE_KEY = 'bharath_delights_cart_v1';
const ORDERS_STORAGE_KEY = 'bharath_delights_orders_v1';
const REVIEWS_STORAGE_KEY = 'bharath_delights_reviews_v1';

interface StoreContextValue {
  route: PageRoute;
  navigate: (route: PageRoute) => void;
  goToMenuWithFilter: (category: FilterCategory, focusSearch?: boolean) => void;
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  addToCart: (dish: Dish, quantity?: number) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;
  getItemQuantity: (dishId: string) => number;
  selectedDish: Dish | null;
  openDishModal: (dish: Dish) => void;
  closeDishModal: () => void;
  activeFilter: FilterCategory;
  setActiveFilter: (cat: FilterCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  shouldFocusSearch: boolean;
  clearFocusSearch: () => void;
  orders: Order[];
  lastCompletedOrder: Order | null;
  placeOrder: (order: Order) => void;
  reorderOrder: (order: Order) => void;
  reviews: Review[];
  addReview: (customerName: string, rating: number, text: string) => void;
  toastMessage: string | null;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const VALID_ROUTES: PageRoute[] = [
  'home',
  'menu',
  'about',
  'orders',
  'reviews',
  'contact',
  'cart',
  'checkout',
  'order-success',
];

function getInitialRoute(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '') as PageRoute;
  if (VALID_ROUTES.includes(hash) && hash !== 'order-success') {
    return hash;
  }
  return 'home';
}

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<PageRoute>(getInitialRoute);
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadStorage<CartItem[]>(CART_STORAGE_KEY, []).map((item) => ({
      ...item,
      dish: hydrateDish(item.dish),
    }))
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadStorage<Order[]>(ORDERS_STORAGE_KEY, []).map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        dish: hydrateDish(item.dish),
      })),
    }))
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadStorage<Review[]>(REVIEWS_STORAGE_KEY, INITIAL_SAMPLE_REVIEWS)
  );
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore storage quota errors
    }
  }, [reviews]);

  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash.replace('#', '') as PageRoute;
      if (VALID_ROUTES.includes(next)) {
        setRoute(next);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const navigate = (nextRoute: PageRoute) => {
    setRoute(nextRoute);
    window.location.hash = nextRoute === 'home' ? '' : nextRoute;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToMenuWithFilter = (category: FilterCategory, focusSearch = false) => {
    setActiveFilter(category);
    setShouldFocusSearch(focusSearch);
    navigate('menu');
  };

  const clearFocusSearch = () => setShouldFocusSearch(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const addToCart = (dish: Dish, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { dish, quantity }];
    });
    showToast(`Added ${quantity} x ${dish.name} to cart`);
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.dish.id === dishId ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((i) => i.dish.id !== dishId));
  };

  const clearCart = () => setCart([]);

  const getItemQuantity = (dishId: string): number => {
    return cart.find((i) => i.dish.id === dishId)?.quantity ?? 0;
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0),
    [cart]
  );

  const deliveryCharge = useMemo(
    () => calculateDeliveryCharge(subtotal),
    [subtotal]
  );

  const grandTotal = subtotal + deliveryCharge;

  const openDishModal = (dish: Dish) => setSelectedDish(dish);
  const closeDishModal = () => setSelectedDish(null);

  const placeOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setLastCompletedOrder(order);
    setCart([]);
    navigate('order-success');
  };

  const reorderOrder = (order: Order) => {
    setCart((prev) => {
      const next = [...prev];
      for (const orderedItem of order.items) {
        const idx = next.findIndex((i) => i.dish.id === orderedItem.dish.id);
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + orderedItem.quantity,
          };
        } else {
          next.push({ ...orderedItem });
        }
      }
      return next;
    });
    showToast(`Added items from ${order.orderNumber} to cart`);
    navigate('cart');
  };

  const addReview = (customerName: string, rating: number, text: string) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      customerName: customerName.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      isSample: false,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you for sharing your review!');
  };

  return (
    <StoreContext.Provider
      value={{
        route,
        navigate,
        goToMenuWithFilter,
        cart,
        cartCount,
        subtotal,
        deliveryCharge,
        grandTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        selectedDish,
        openDishModal,
        closeDishModal,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
        shouldFocusSearch,
        clearFocusSearch,
        orders,
        lastCompletedOrder,
        placeOrder,
        reorderOrder,
        reviews,
        addReview,
        toastMessage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}
