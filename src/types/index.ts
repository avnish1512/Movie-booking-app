export type SeatType = 'standard' | 'recliner';
export type SeatStatus = 'available' | 'taken' | 'selected';
export type ShowtimeFormat = '2D' | 'IMAX';

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
}

export type ViewMode = 'map' | 'transitioning' | 'view3d' | 'booking';
export type CameraPerspective = 'pov' | 'auditorium';


