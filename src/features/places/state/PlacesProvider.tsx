import React, { createContext, useContext, useMemo, useState } from 'react';

import { places } from '@/src/features/places/data/mock';
import { Place, PlaceCategory } from '@/src/features/places/domain/place';
import {
    categoryOrder,
    defaultPlaceFilters,
    filterPlaces,
    getAvailableTowns,
    PlaceFilters,
} from '@/src/features/places/services/filtering';
import { usePlanner } from '@/src/features/planner/state/PlannerProvider';

type PlacesContextValue = {
  allPlaces: Place[];
  filteredPlaces: Place[];
  filters: PlaceFilters;
  towns: string[];
  categoryOrder: PlaceCategory[];
  setSearch: (search: string) => void;
  toggleCategory: (category: PlaceCategory) => void;
  setTown: (town: string) => void;
  toggleBookingRequired: () => void;
  toggleFitPartyOnly: () => void;
  toggleYearRoundOnly: () => void;
  resetFilters: () => void;
  getPlaceById: (placeId: string) => Place | undefined;
};

const PlacesContext = createContext<PlacesContextValue | null>(null);

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<PlaceFilters>(defaultPlaceFilters);
  const { trip } = usePlanner();

  const filteredPlaces = useMemo(
    () => filterPlaces(places, filters, trip.travelers),
    [filters, trip.travelers]
  );

  const towns = useMemo(() => getAvailableTowns(places), []);

  const value = useMemo<PlacesContextValue>(
    () => ({
      allPlaces: places,
      filteredPlaces,
      filters,
      towns,
      categoryOrder,
      setSearch: (search) => setFilters((current) => ({ ...current, search })),
      toggleCategory: (category) => {
        setFilters((current) => ({
          ...current,
          categories: current.categories.includes(category)
            ? current.categories.filter((value) => value !== category)
            : [...current.categories, category],
        }));
      },
      setTown: (town) => setFilters((current) => ({ ...current, town })),
      toggleBookingRequired: () => {
        setFilters((current) => ({
          ...current,
          bookingRequiredOnly: !current.bookingRequiredOnly,
        }));
      },
      toggleFitPartyOnly: () => {
        setFilters((current) => ({
          ...current,
          fitPartyOnly: !current.fitPartyOnly,
        }));
      },
      toggleYearRoundOnly: () => {
        setFilters((current) => ({
          ...current,
          yearRoundOnly: !current.yearRoundOnly,
        }));
      },
      resetFilters: () => setFilters(defaultPlaceFilters),
      getPlaceById: (placeId) => places.find((place) => place.id === placeId),
    }),
    [filteredPlaces, filters, towns]
  );

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
}

export function usePlaces() {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error('usePlaces must be used within a PlacesProvider');
  }

  return context;
}