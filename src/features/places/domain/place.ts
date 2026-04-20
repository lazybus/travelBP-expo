export type PlaceCategory =
  | 'accommodation'
  | 'food'
  | 'activity'
  | 'grocery'
  | 'logistics';

export type BookingRequirement =
  | 'Advance parking reservation'
  | 'Boat or ferry ticket'
  | 'Reservation recommended'
  | 'Seasonal walk-in only';

export type Place = {
  id: string;
  slug: string;
  name: string;
  category: PlaceCategory;
  subcategory: string;
  town: string;
  area: string;
  address: string;
  summary: string;
  seasonality: string;
  hours: string;
  priceLabel: string;
  tags: string[];
  amenities: string[];
  featuredNote: string;
  planningNotes: string[];
  bookingRequirement?: BookingRequirement;
  partySize: {
    min: number;
    max: number;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  dwellMinutes: number;
  plannerMinutes: number;
};

export type FeaturedCollection = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

export type WeatherSnapshot = {
  temperatureC: number;
  windKph: number;
  waveRisk: 'Calm' | 'Watch' | 'Unsafe';
  summary: string;
};