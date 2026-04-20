import { FeaturedCollection, Place, WeatherSnapshot } from '@/src/features/places/domain/place';
import { Trip, TripDay } from '@/src/features/planner/domain/trip';

export const weatherSnapshot: WeatherSnapshot = {
  temperatureC: 18,
  windKph: 27,
  waveRisk: 'Watch',
  summary: 'Bright morning with enough west wind to affect paddling and open-water boat departures.',
};

export const featuredCollections: FeaturedCollection[] = [
  {
    title: 'Red tape before scenery',
    subtitle: 'Permits and reservations',
    description: 'Parking at The Grotto, boat access to Flowerpot Island, and ferry timing should be visible before users commit the day plan.',
    tags: ['Parking passes', 'Boat tickets', 'Ferry timing'],
  },
  {
    title: 'Road-trip essentials',
    subtitle: 'Groceries, gas, and washrooms',
    description: 'Bruce Peninsula is beautiful, but gaps between services are real. Logistics belongs beside attractions, not buried in settings.',
    tags: ['EV chargers', 'Public washrooms', 'Foodland'],
  },
  {
    title: 'Weather-aware outings',
    subtitle: 'Wind and marine conditions',
    description: 'Boat tours, beaches, and paddling need a different confidence model than museums or markets.',
    tags: ['Wind', 'Marine forecast', 'Dark sky'],
  },
];

export const places: Place[] = [
  {
    id: 'place-grotto',
    slug: 'the-grotto',
    name: 'The Grotto',
    category: 'activity',
    subcategory: 'Hiking and swimming',
    town: 'Tobermory',
    area: 'Bruce Peninsula National Park',
    address: '469 Cyprus Lake Rd, Northern Bruce Peninsula, ON',
    summary: 'The anchor stop for first-time visitors, but only if timed parking is secured well in advance.',
    seasonality: 'Peak May-Oct',
    hours: 'Timed access with parking reservation windows; sunrise to dusk planning is safest.',
    priceLabel: 'Park fee',
    tags: ['Hiking', 'Advance parking required', 'Cliff edge'],
    amenities: ['Lookout access', 'Trailhead washrooms', 'Swimming cove'],
    featuredNote: 'Treat this as the day’s anchor stop and build around the reservation, not the other way around.',
    planningNotes: [
      'Timed parking should be secured before any surrounding dining or trail plans.',
      'The route includes uneven rock and cliff edges, so this is not a casual flip-flop stop.',
    ],
    bookingRequirement: 'Advance parking reservation',
    partySize: { min: 1, max: 8 },
    coordinates: { latitude: 45.245, longitude: -81.518 },
    dwellMinutes: 180,
    plannerMinutes: 180,
  },
  {
    id: 'place-flowerpot',
    slug: 'flowerpot-island',
    name: 'Flowerpot Island',
    category: 'activity',
    subcategory: 'Boat-access sightseeing',
    town: 'Tobermory',
    area: 'Fathom Five National Marine Park',
    address: 'Little Tub Harbour departures, Tobermory, ON',
    summary: 'Boat-access island with trails, coves, and one of the most reservation-sensitive day trips on the peninsula.',
    seasonality: 'Peak May-Oct',
    hours: 'Departure-driven; align the full day around the selected boat schedule.',
    priceLabel: 'Boat + park fee',
    tags: ['Boat tour', 'Paddling', 'Reservation sensitive'],
    amenities: ['Boat access', 'Island trails', 'Scenic lookouts'],
    featuredNote: 'Wind matters here. Boat departures can change faster than the weather app headline.',
    planningNotes: [
      'Boat or ferry timing should be confirmed before committing adjacent stops.',
      'Leave more buffer than normal because harbour loading and return times can drift.',
    ],
    bookingRequirement: 'Boat or ferry ticket',
    partySize: { min: 1, max: 10 },
    coordinates: { latitude: 45.334, longitude: -81.628 },
    dwellMinutes: 240,
    plannerMinutes: 240,
  },
  {
    id: 'place-princess',
    slug: 'princess-hotel',
    name: 'Princess Hotel',
    category: 'accommodation',
    subcategory: 'Hotel',
    town: 'Tobermory',
    area: 'Harbourfront',
    address: '45 Bay St, Tobermory, ON',
    summary: 'Historic in-town stay with walkable access to boat tours, dining, and sunset views.',
    seasonality: 'Open May-Oct',
    hours: 'Front desk and check-in timings vary by season; verify before late arrival.',
    priceLabel: '$$$',
    tags: ['Hotel', 'Harbour', 'Walkable'],
    amenities: ['Walkable harbour access', 'Private rooms', 'In-town basecamp'],
    featuredNote: 'Best used as a friction reducer for car-light evenings in Tobermory.',
    planningNotes: [
      'Good fit for users who want to reduce driving after checking in.',
      'Works well with dinner, boat tours, and sunset stops in the harbour area.',
    ],
    partySize: { min: 1, max: 4 },
    coordinates: { latitude: 45.253, longitude: -81.665 },
    dwellMinutes: 720,
    plannerMinutes: 45,
  },
  {
    id: 'place-cottage',
    slug: 'lions-head-shore-cottage',
    name: 'Lion’s Head Shore Cottage',
    category: 'accommodation',
    subcategory: 'Direct-booking cottage',
    town: 'Lion’s Head',
    area: 'Isthmus Bay',
    address: 'Bay shoreline area, Lion’s Head, ON',
    summary: 'A direct-booking cottage archetype for families who need bedrooms, outdoor space, and full kitchen logistics.',
    seasonality: 'Year-round',
    hours: 'Check-in and turnover timing should be confirmed directly with the host.',
    priceLabel: '$$$$',
    tags: ['Direct booking', 'Family', 'Cottage'],
    amenities: ['Full kitchen', 'Parking', 'Group-friendly bedrooms'],
    featuredNote: 'This is the type of listing that gives the app a local edge over standard booking surfaces.',
    planningNotes: [
      'Direct-booking inventory should be presented as a distinct value lane, not mixed invisibly into hotel results.',
      'Good fit for families and groups who need grocery and breakfast planning built in.',
    ],
    partySize: { min: 4, max: 8 },
    coordinates: { latitude: 44.989, longitude: -81.252 },
    dwellMinutes: 720,
    plannerMinutes: 45,
  },
  {
    id: 'place-bistro',
    slug: 'harbour-light-bistro',
    name: 'Harbour Light Bistro',
    category: 'food',
    subcategory: 'Dinner and patio',
    town: 'Tobermory',
    area: 'Little Tub Harbour',
    address: 'Harbour strip, Tobermory, ON',
    summary: 'Dinner-forward harbourfront spot where timing matters because seating compresses quickly on summer evenings.',
    seasonality: 'Open May-Oct',
    hours: 'Dinner service with seasonal shoulder-hour reductions.',
    priceLabel: '$$$',
    tags: ['Dinner', 'Patio', 'Reservation recommended'],
    amenities: ['Patio', 'Water views', 'Dinner-focused menu'],
    featuredNote: 'This is where itinerary timing starts to feel like a real calendar rather than a wishlist.',
    planningNotes: [
      'The later the arrival, the more likely the harbour wait time starts to distort the whole evening.',
      'Pair this with walkable accommodations or a light local loop, not a distant hike return.',
    ],
    bookingRequirement: 'Reservation recommended',
    partySize: { min: 1, max: 6 },
    coordinates: { latitude: 45.254, longitude: -81.665 },
    dwellMinutes: 90,
    plannerMinutes: 90,
  },
  {
    id: 'place-foodland',
    slug: 'tobermory-foodland',
    name: 'Tobermory Foodland',
    category: 'grocery',
    subcategory: 'Groceries',
    town: 'Tobermory',
    area: 'Highway 6',
    address: 'Highway 6, Tobermory, ON',
    summary: 'A core supply stop for cottages, campsites, picnic stock-ups, and last-minute trail food.',
    seasonality: 'Year-round reduced winter hours',
    hours: 'Extended seasonal summer hours; winter hours tighten early.',
    priceLabel: '$$',
    tags: ['Groceries', 'Trail snacks', 'Supply run'],
    amenities: ['Produce', 'Prepared snacks', 'Cooler restock'],
    featuredNote: 'Logistics stops like this keep the rest of the day from turning into emergency errands.',
    planningNotes: [
      'Best used near arrival or before heading deeper into the peninsula.',
      'Important for cottage and camping plans where breakfast and trail supplies matter.',
    ],
    partySize: { min: 1, max: 12 },
    coordinates: { latitude: 45.255, longitude: -81.664 },
    dwellMinutes: 35,
    plannerMinutes: 35,
  },
  {
    id: 'place-gas',
    slug: 'highway-6-gas-and-ev',
    name: 'Highway 6 Gas & EV Stop',
    category: 'logistics',
    subcategory: 'Fuel and charging',
    town: 'Miller Lake',
    area: 'Highway 6 corridor',
    address: 'Highway 6 corridor, Miller Lake, ON',
    summary: 'Important fuel and charging decision point before the upper peninsula narrows your options.',
    seasonality: 'Year-round',
    hours: 'Season-dependent service availability; do not assume late-night redundancy nearby.',
    priceLabel: 'Utility',
    tags: ['Gas', 'EV charger', 'Road trip'],
    amenities: ['Gas pumps', 'EV charging', 'Quick roadside stop'],
    featuredNote: 'This belongs in the itinerary if the vehicle range is even slightly uncertain.',
    planningNotes: [
      'Especially useful for EV users who need confidence before heading north.',
      'Pair with washroom or grocery logic when building longer arrival days.',
    ],
    partySize: { min: 1, max: 20 },
    coordinates: { latitude: 45.102, longitude: -81.375 },
    dwellMinutes: 15,
    plannerMinutes: 15,
  },
];

export const mapFilters = [
  'Food',
  'Activities',
  'Accommodations',
  'Groceries',
  'Gas & EV',
  'Open now',
  'Reservation required',
];

const trip: Trip = {
  id: 'trip-may-long-weekend',
  title: 'May long weekend base in Tobermory',
  travelers: 4,
  days: [],
};

const day: TripDay = {
  id: 'day-friday',
  title: 'Arrival + harbour evening',
  date: '2026-07-10',
  stops: [
    {
      id: 'stop-grocery',
      placeId: 'place-foodland',
      startTime: '15:30',
      durationMinutes: 35,
      notes: 'Grab breakfast basics, trail food, and extra water before checking in.',
    },
    {
      id: 'stop-checkin',
      placeId: 'place-princess',
      startTime: '16:30',
      durationMinutes: 45,
      notes: 'Check in, unload, and plan for a walkable dinner night to avoid more driving.',
    },
    {
      id: 'stop-dinner',
      placeId: 'place-bistro',
      startTime: '18:00',
      durationMinutes: 90,
      notes: 'Dinner reservation strongly recommended in peak season.',
    },
  ],
};

trip.days = [day];

export const plannerSnapshot = {
  trip,
  day,
  places,
};

export function createDefaultTrip(): Trip {
  return {
    ...trip,
    days: trip.days.map((tripDay) => ({
      ...tripDay,
      stops: tripDay.stops.map((stop) => ({ ...stop })),
    })),
  };
}

export function getPlaceById(placeId: string) {
  return places.find((place) => place.id === placeId);
}