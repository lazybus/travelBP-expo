export type TripStop = {
  id: string;
  placeId: string;
  startTime: string;
  durationMinutes: number;
  notes: string;
};

export type TripDay = {
  id: string;
  title: string;
  date: string;
  stops: TripStop[];
};

export type Trip = {
  id: string;
  title: string;
  travelers: number;
  days: TripDay[];
};