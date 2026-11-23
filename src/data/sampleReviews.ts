import { Review } from '../types';

// Clearly marked sample reviews for demonstration only.
// No fake "verified purchase" claims are made.
export const INITIAL_SAMPLE_REVIEWS: Review[] = [
  {
    id: 'sample-1',
    customerName: 'Aravind Sundaram',
    rating: 5,
    text: 'The Tamil Nadu Full Meals on banana leaf tasted wonderfully homestyle—especially the drumstick sambar and semiya payasam. Packaging arrived neatly sealed.',
    date: 'Sample Review',
    isSample: true,
  },
  {
    id: 'sample-2',
    customerName: 'Meenakshi Rajagopal',
    rating: 5,
    text: 'Ordered Masala Dosa, Ven Pongal, and Filter Coffee for Sunday breakfast. Everything arrived warm, crisp, and not overly oily.',
    date: 'Sample Review',
    isSample: true,
  },
  {
    id: 'sample-3',
    customerName: 'Karthik Subramanian',
    rating: 5,
    text: 'Chettinad Chicken and Seeraga Samba Chicken Biryani have authentic roasted spice depth without heavy food coloring.',
    date: 'Sample Review',
    isSample: true,
  },
  {
    id: 'sample-4',
    customerName: 'Priya Venkatesh',
    rating: 4,
    text: 'Crispy Medu Vada and fresh coconut chutney were delicious. Love how easy it is to browse Vegetarian options separately.',
    date: 'Sample Review',
    isSample: true,
  },
];
