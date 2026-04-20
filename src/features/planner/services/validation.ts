import { Place } from '@/src/features/places/domain/place';
import { Trip, TripDay } from '@/src/features/planner/domain/trip';

const DEFAULT_DRIVE_MINUTES = 18;

export function getPlannerWarnings(trip: Trip, day: TripDay | undefined, places: Place[]) {
  if (!day) {
    return ['Add a trip day to begin planning.'];
  }

  const warnings: string[] = [];
  const stopPlaces = day.stops
    .map((stop) => places.find((place) => place.id === stop.placeId))
    .filter((place): place is Place => Boolean(place));

  const requiresParking = stopPlaces.some(
    (place) => place.bookingRequirement === 'Advance parking reservation'
  );
  const requiresBoat = stopPlaces.some((place) => place.bookingRequirement === 'Boat or ferry ticket');
  const oversizedParty = stopPlaces.some((place) => trip.travelers > place.partySize.max);

  if (requiresParking) {
    warnings.push('At least one stop requires advance parking. Surface this before users lock the day.');
  }

  if (requiresBoat) {
    warnings.push('Flowerpot-style outings should warn about boat departure windows and wind cancellations.');
  }

  if (oversizedParty) {
    warnings.push('One or more places do not fit the current party size and should be filtered or flagged.');
  }

  if (getTripSummary(trip, day, places).estimatedHours > 9) {
    warnings.push('This day is packed past a realistic Bruce Peninsula pace once traffic and parking delays are included.');
  }

  if (warnings.length === 0) {
    warnings.push('This sample day fits the current constraints and leaves room for actual travel friction.');
  }

  return warnings;
}

export function getTripSummary(trip: Trip, day: TripDay | undefined, places: Place[]) {
  if (!day) {
    return {
      travelerCount: trip.travelers,
      stopCount: 0,
      driveMinutes: 0,
      estimatedHours: 0,
      mappedPlaces: places.length,
    };
  }

  const dwellMinutes = day.stops.reduce((total, stop) => total + stop.durationMinutes, 0);
  const driveMinutes = Math.max(day.stops.length - 1, 0) * DEFAULT_DRIVE_MINUTES;
  const estimatedHours = Math.round(((dwellMinutes + driveMinutes) / 60) * 10) / 10;

  return {
    travelerCount: trip.travelers,
    stopCount: day.stops.length,
    driveMinutes,
    estimatedHours,
    mappedPlaces: places.length,
  };
}