import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { createDefaultTrip } from '@/src/features/places/data/mock';
import { Place } from '@/src/features/places/domain/place';
import { Trip, TripDay, TripStop } from '@/src/features/planner/domain/trip';

const STORAGE_KEY = 'travelbp.planner.v1';

type PlannerContextValue = {
  trip: Trip;
  activeDay: TripDay | undefined;
  activeDayId: string;
  hasHydrated: boolean;
  setActiveDayId: (dayId: string) => void;
  updateTripTitle: (title: string) => void;
  setTravelers: (travelers: number) => void;
  addDay: () => void;
  updateDay: (dayId: string, patch: Partial<Pick<TripDay, 'title' | 'date'>>) => void;
  addStop: (place: Place, dayId?: string) => void;
  updateStop: (stopId: string, patch: Partial<Pick<TripStop, 'startTime' | 'durationMinutes' | 'notes'>>) => void;
  moveStop: (stopId: string, direction: -1 | 1) => void;
  removeStop: (stopId: string) => void;
};

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [trip, setTrip] = useState<Trip>(() => createDefaultTrip());
  const [activeDayId, setActiveDayIdState] = useState<string>(() => createDefaultTrip().days[0]?.id ?? '');
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted) {
          return;
        }

        if (stored) {
          const parsed = JSON.parse(stored) as { trip?: Trip; activeDayId?: string };
          if (parsed.trip?.days?.length) {
            setTrip(parsed.trip);
            setActiveDayIdState(parsed.activeDayId ?? parsed.trip.days[0].id);
          }
        }
      } finally {
        if (mounted) {
          setHasHydrated(true);
        }
      }
    }

    hydrate();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ trip, activeDayId }));
  }, [activeDayId, hasHydrated, trip]);

  useEffect(() => {
    if (!trip.days.length) {
      return;
    }

    const currentDayStillExists = trip.days.some((day) => day.id === activeDayId);
    if (!currentDayStillExists) {
      setActiveDayIdState(trip.days[0].id);
    }
  }, [activeDayId, trip.days]);

  const activeDay = trip.days.find((day) => day.id === activeDayId) ?? trip.days[0];

  const value = useMemo<PlannerContextValue>(
    () => ({
      trip,
      activeDay,
      activeDayId,
      hasHydrated,
      setActiveDayId: setActiveDayIdState,
      updateTripTitle: (title) => {
        setTrip((currentTrip) => ({ ...currentTrip, title }));
      },
      setTravelers: (travelers) => {
        const nextTravelers = Math.max(1, Math.min(20, travelers));
        setTrip((currentTrip) => ({ ...currentTrip, travelers: nextTravelers }));
      },
      addDay: () => {
        const nextIndex = trip.days.length + 1;
        const previousDay = trip.days[trip.days.length - 1];
        const nextDate = getNextDate(previousDay?.date);
        const newDay: TripDay = {
          id: `day-${Date.now()}`,
          title: `Day ${nextIndex}`,
          date: nextDate,
          stops: [],
        };

        setTrip((currentTrip) => ({
          ...currentTrip,
          days: [...currentTrip.days, newDay],
        }));
        setActiveDayIdState(newDay.id);
      },
      updateDay: (dayId, patch) => {
        setTrip((currentTrip) => ({
          ...currentTrip,
          days: currentTrip.days.map((day) => (day.id === dayId ? { ...day, ...patch } : day)),
        }));
      },
      addStop: (place, dayId) => {
        setTrip((currentTrip) => ({
          ...currentTrip,
          days: currentTrip.days.map((day) => {
            if (day.id !== (dayId ?? activeDayId)) {
              return day;
            }

            const lastStop = day.stops[day.stops.length - 1];
            const nextStop: TripStop = {
              id: `stop-${Date.now()}`,
              placeId: place.id,
              startTime: lastStop
                ? addMinutesToTime(lastStop.startTime, lastStop.durationMinutes + 20)
                : '09:00',
              durationMinutes: place.plannerMinutes,
              notes: place.featuredNote,
            };

            return {
              ...day,
              stops: [...day.stops, nextStop],
            };
          }),
        }));
      },
      updateStop: (stopId, patch) => {
        setTrip((currentTrip) => ({
          ...currentTrip,
          days: currentTrip.days.map((day) => ({
            ...day,
            stops: day.stops.map((stop) => (stop.id === stopId ? { ...stop, ...patch } : stop)),
          })),
        }));
      },
      moveStop: (stopId, direction) => {
        setTrip((currentTrip) => ({
          ...currentTrip,
          days: currentTrip.days.map((day) => {
            const stopIndex = day.stops.findIndex((stop) => stop.id === stopId);
            if (stopIndex < 0) {
              return day;
            }

            const nextIndex = stopIndex + direction;
            if (nextIndex < 0 || nextIndex >= day.stops.length) {
              return day;
            }

            const nextStops = [...day.stops];
            const [movingStop] = nextStops.splice(stopIndex, 1);
            nextStops.splice(nextIndex, 0, movingStop);

            return {
              ...day,
              stops: nextStops,
            };
          }),
        }));
      },
      removeStop: (stopId) => {
        setTrip((currentTrip) => ({
          ...currentTrip,
          days: currentTrip.days.map((day) => ({
            ...day,
            stops: day.stops.filter((stop) => stop.id !== stopId),
          })),
        }));
      },
    }),
    [activeDay, activeDayId, hasHydrated, trip]
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }

  return context;
}

function getNextDate(date: string | undefined) {
  if (!date) {
    return '';
  }

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  parsed.setDate(parsed.getDate() + 1);
  return parsed.toISOString().slice(0, 10);
}

function addMinutesToTime(time: string, minutesToAdd: number) {
  const [hoursString = '9', minutesString = '0'] = time.split(':');
  const hours = Number(hoursString);
  const minutes = Number(minutesString);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  const normalized = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const nextHours = String(Math.floor(normalized / 60)).padStart(2, '0');
  const nextMinutes = String(normalized % 60).padStart(2, '0');
  return `${nextHours}:${nextMinutes}`;
}