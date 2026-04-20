import React from 'react';
import { Platform } from 'react-native';

import { Place } from '@/src/features/places/domain/place';

type TravelMapProps = {
  places: Place[];
  onSelectPlace: (placeId: string) => void;
};

const TravelMapComponent = (Platform.OS === 'web'
  ? require('./TravelMap.web').default
  : require('./TravelMap.native').default) as React.ComponentType<TravelMapProps>;

export default function TravelMap(props: TravelMapProps) {
  return <TravelMapComponent {...props} />;
}