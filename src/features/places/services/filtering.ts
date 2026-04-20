import { Place, PlaceCategory } from '@/src/features/places/domain/place';

export type PlaceFilters = {
  search: string;
  categories: PlaceCategory[];
  town: string;
  bookingRequiredOnly: boolean;
  fitPartyOnly: boolean;
  yearRoundOnly: boolean;
};

export const defaultPlaceFilters: PlaceFilters = {
  search: '',
  categories: [],
  town: 'All',
  bookingRequiredOnly: false,
  fitPartyOnly: false,
  yearRoundOnly: false,
};

export const categoryOrder: PlaceCategory[] = [
  'accommodation',
  'food',
  'activity',
  'grocery',
  'logistics',
];

export const categoryLabels: Record<PlaceCategory, string> = {
  accommodation: 'Stay',
  food: 'Eat',
  activity: 'Do',
  grocery: 'Stock up',
  logistics: 'Logistics',
};

export function filterPlaces(places: Place[], filters: PlaceFilters, travelers: number) {
  const query = filters.search.trim().toLowerCase();

  return places.filter((place) => {
    const matchesQuery =
      query.length === 0 ||
      [place.name, place.summary, place.town, place.area, place.subcategory, ...place.tags, ...place.amenities]
        .join(' ')
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(place.category);

    const matchesTown = filters.town === 'All' || place.town === filters.town;

    const matchesBooking = !filters.bookingRequiredOnly || Boolean(place.bookingRequirement);

    const matchesParty = !filters.fitPartyOnly || travelers <= place.partySize.max;

    const matchesSeason =
      !filters.yearRoundOnly || place.seasonality.toLowerCase().includes('year-round');

    return (
      matchesQuery &&
      matchesCategory &&
      matchesTown &&
      matchesBooking &&
      matchesParty &&
      matchesSeason
    );
  });
}

export function getAvailableTowns(places: Place[]) {
  return ['All', ...Array.from(new Set(places.map((place) => place.town))).sort()];
}