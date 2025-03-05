// Move related types
export type MoveType = 'residential' | 'commercial';
export type MoveSize = 'studio' | 'small' | 'medium' | 'large';
export type TruckSize = 'cargo_van' | 'box_truck_small' | 'box_truck_medium' | 'box_truck_large';
export type MoveStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

// Address and location types
export interface AddressDetails {
  fullAddress: string;
  streetNumber?: string;
  route?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// Tracking types
export interface TrackingUpdate {
  timestamp: string;
  status: string;
  message: string;
}

export interface TrackingDetails {
  id: string;
  status: MoveStatus;
  customer: string;
  fromAddress: string;
  toAddress: string;
  fromCoordinates?: Coordinates;
  toCoordinates?: Coordinates;
  scheduledDate: string;
  estimatedArrival?: string;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  updates: TrackingUpdate[];
}

// Cost estimation types
export interface MovingCostParams {
  moveType: MoveType;
  moveSize: MoveSize;
  distance: number;
  moveDate: Date;
  hasSpecialItems?: boolean;
  needsPacking?: boolean;
}

export interface MovingCostEstimate {
  basePrice: number;
  distanceCost: number;
  specialItemsCost: number;
  packingCost: number;
  timeFactorsCost: number;
  totalCost: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

// Form data types
export interface EstimateFormData {
  moveType: MoveType;
  fromAddress: string;
  fromCoordinates?: Coordinates;
  toAddress: string;
  toCoordinates?: Coordinates;
  moveSize: MoveSize;
  moveDate: string;
  moveTime?: string;
  hasSpecialItems: boolean;
  needsPacking: boolean;
  fullName: string;
  email: string;
  phone: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
} 