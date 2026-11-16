export type SeatType = 'standard' | 'recliner';
export type SeatStatus = 'available' | 'taken' | 'selected';
export type ShowtimeFormat = '2D' | 'IMAX' | '4DX' | 'Dolby Cinema';

export interface SeatMetrics {
  distanceToScreen: number; // in meters (e.g. 6.3)
  fieldOfView: number; // in degrees (e.g. 86)
  offsetFromCenter: number; // in meters (e.g. 2.2)
  offsetSide: 'left' | 'right' | 'centre';
}

export interface SeatData {
  id: string; // e.g. "B4"
  row: string; // "A" - "I"
  number: number; // 1 - 13
  section: 'left' | 'center' | 'right';
  type: SeatType;
  status: SeatStatus;
  price: number;
  tag: 'UP CLOSE' | 'SWEET SPOT' | 'FULL PICTURE';
  metrics: SeatMetrics;
}

export interface Showtime {
  id: string;
  time: string;
  format: ShowtimeFormat;
  date: string;
  hall: string;
  cinema: string;
  price?: number;
  status?: 'available' | 'filling_fast' | 'almost_full';
}

export type ViewMode = 'map' | 'transitioning' | 'view3d' | 'booking';
export type CameraPerspective = 'pov' | 'auditorium';

export interface CastMember {
  name: string;
  role: string;
  image: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  poster: string;
  backdrop: string;
  rating: number; // e.g. 8.9
  votes: string; // e.g. "48.5K votes"
  genres: string[];
  duration: string; // e.g. "2h 46m"
  certification: string; // e.g. "UA 16+"
  languages: string[]; // e.g. ["English", "Hindi"]
  formats: ShowtimeFormat[];
  releaseDate: string; // e.g. "Fri, 14 Nov"
  synopsis: string;
  director: string;
  cast: CastMember[];
  isTrending?: boolean;
  isComingSoon?: boolean;
}

export interface CinemaVenue {
  id: string;
  name: string;
  location: string;
  distance: string; // e.g. "1.2 km away"
  amenities: string[]; // e.g. ["4K Laser", "Dolby Atmos", "Recliners", "Gourmet F&B"]
  formats: ShowtimeFormat[];
  showtimes: Showtime[];
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'combos' | 'popcorn' | 'beverages' | 'snacks';
  image: string;
  isVeg: boolean;
  badge?: string; // e.g. "Bestseller", "District Special"
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discount: number; // e.g. 5.00
  type: 'flat' | 'percentage';
  description: string;
  minAmount: number;
}

export interface DistrictCity {
  id: string;
  name: string;
  state: string;
  popular?: boolean;
}

export interface BookingPass {
  id: string;
  bookingRef: string;
  movie: Movie;
  cinema: CinemaVenue;
  showtime: Showtime;
  seats: SeatData[];
  fnbItems: CartItem[];
  ticketTotal: number;
  fnbTotal: number;
  discountAmount: number;
  convenienceFee: number;
  finalTotal: number;
  bookingTimestamp: string;
  qrCodeData: string;
  status: 'confirmed' | 'cancelled';
}

export interface DistrictEvent {
  id: string;
  title: string;
  artist: string;
  category: 'Comedy' | 'Music' | 'Festival' | 'Dining';
  date: string;
  venue: string;
  price: number;
  image: string;
  badge?: string;
}

export type DistrictScreen =
  | 'discovery'      // Home screen with movie cards & banners
  | 'movie_details'  // Movie synopsis, cast, date selector, cinemas & showtimes
  | 'seating'        // 2D & 3D Interactive Cinema Seating experience
  | 'fnb'            // Food & Beverages snacks add-on
  | 'checkout'       // Order summary, coupon code, payment
  | 'confirmation'   // Confirmed ticket pass with confetti
  | 'my_passes'      // Digital ticket wallet
  | 'events';        // District lifestyle & live events
