import { TruckSize, MoveType, MoveSize } from '@/types';

// Constants for base pricing
const BASE_PRICES = {
  studio: 400,
  small: 600,
  medium: 900,
  large: 1200,
};

// Constants for vehicle costs per mile
const VEHICLE_COST_PER_MILE = {
  cargo_van: 0.75,
  box_truck_small: 1.00,
  box_truck_medium: 1.25,
  box_truck_large: 1.50,
};

// Constants for multipliers
const COMMERCIAL_MULTIPLIER = 1.2;
const WEEKEND_MULTIPLIER = 1.15;
const PEAK_SEASON_MULTIPLIER = 1.1; // May through August
const RUSH_HOUR_MULTIPLIER = 1.15; // 7-9am, 4-7pm weekdays

/**
 * Calculate the straight-line distance between two coordinates in miles
 */
export function calculateDistance(
  originLat: number,
  originLng: number,
  destinationLat: number,
  destinationLng: number
): number {
  // Haversine formula to calculate distance between two points on Earth
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  const R = 3958.8; // Earth's radius in miles

  const dLat = toRadians(destinationLat - originLat);
  const dLng = toRadians(destinationLng - originLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(originLat)) *
      Math.cos(toRadians(destinationLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

/**
 * Get the appropriate truck size based on inventory size
 */
export function getTruckSize(moveSize: MoveSize): TruckSize {
  switch (moveSize) {
    case 'studio':
      return 'cargo_van';
    case 'small':
      return 'box_truck_small';
    case 'medium':
      return 'box_truck_medium';
    case 'large':
      return 'box_truck_large';
    default:
      return 'box_truck_medium';
  }
}

/**
 * Check if the move date is during peak season (May-August)
 */
export function isPeakSeason(moveDate: Date): boolean {
  const month = moveDate.getMonth(); // 0-indexed, 0 is January
  return month >= 4 && month <= 7; // May (4) through August (7)
}

/**
 * Check if the move date is on a weekend
 */
export function isWeekend(moveDate: Date): boolean {
  const day = moveDate.getDay();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
}

/**
 * Check if the move time is during rush hour
 */
export function isRushHour(moveDate: Date): boolean {
  const hours = moveDate.getHours();
  const day = moveDate.getDay();
  
  // Weekdays only (Monday = 1, Friday = 5)
  if (day >= 1 && day <= 5) {
    // Morning rush: 7-9 AM, Evening rush: 4-7 PM
    return (hours >= 7 && hours <= 9) || (hours >= 16 && hours <= 19);
  }
  
  return false;
}

/**
 * Calculate the estimated cost for a move
 */
export function calculateMovingCost(params: {
  moveType: MoveType;
  moveSize: MoveSize;
  distance: number;
  moveDate: Date;
  hasSpecialItems?: boolean;
  needsPacking?: boolean;
}): {
  basePrice: number;
  distanceCost: number;
  specialItemsCost: number;
  packingCost: number;
  timeFactorsCost: number;
  totalCost: number;
} {
  const {
    moveType,
    moveSize,
    distance,
    moveDate,
    hasSpecialItems = false,
    needsPacking = false,
  } = params;

  // Get base price from move size
  const basePrice = BASE_PRICES[moveSize] || 800;
  
  // Calculate distance cost
  const truckSize = getTruckSize(moveSize);
  const distanceCost = distance * VEHICLE_COST_PER_MILE[truckSize];
  
  // Calculate special items cost if applicable
  const specialItemsCost = hasSpecialItems ? 150 : 0;
  
  // Calculate packing cost if applicable
  const packingCost = needsPacking ? basePrice * 0.2 : 0; // 20% of base price
  
  // Calculate time-based factors
  let timeMultiplier = 1.0;
  
  if (isWeekend(moveDate)) {
    timeMultiplier *= WEEKEND_MULTIPLIER;
  }
  
  if (isPeakSeason(moveDate)) {
    timeMultiplier *= PEAK_SEASON_MULTIPLIER;
  }
  
  if (isRushHour(moveDate)) {
    timeMultiplier *= RUSH_HOUR_MULTIPLIER;
  }
  
  // Apply commercial multiplier if applicable
  const typeMultiplier = moveType === 'commercial' ? COMMERCIAL_MULTIPLIER : 1.0;
  
  // Calculate time factors cost
  const subtotal = basePrice + distanceCost + specialItemsCost + packingCost;
  const timeFactorsCost = subtotal * (timeMultiplier - 1);
  
  // Calculate total cost
  const totalBeforeType = subtotal + timeFactorsCost;
  const totalCost = totalBeforeType * typeMultiplier;
  
  return {
    basePrice,
    distanceCost,
    specialItemsCost,
    packingCost,
    timeFactorsCost,
    totalCost,
  };
}

/**
 * Generate a price range for estimate display
 */
export function generatePriceRange(cost: number): { min: number; max: number } {
  const min = Math.round(cost * 0.9);
  const max = Math.round(cost * 1.1);
  
  return { min, max };
} 