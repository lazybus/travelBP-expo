import React from 'react';

import { Place } from '@/src/features/places/domain/place';

type TravelMapProps = {
  places: Place[];
  onSelectPlace: (placeId: string) => void;
};

export default function TravelMap({ places, onSelectPlace }: TravelMapProps) {
  if (typeof window === 'undefined') {
    return <div style={fallbackStyle}>Loading map…</div>;
  }

  const { Map, Marker } = require('pigeon-maps') as typeof import('pigeon-maps');

  return (
    <div style={shellStyle}>
      <Map defaultCenter={[45.17, -81.51]} defaultZoom={9} height={340}>
        {places.map((place) => (
          <Marker
            key={place.id}
            width={42}
            anchor={[place.coordinates.latitude, place.coordinates.longitude]}
            onClick={() => {
              onSelectPlace(place.id);
              return false;
            }}
          />
        ))}
      </Map>
    </div>
  );
}

const shellStyle: React.CSSProperties = {
  height: 340,
  width: '100%',
  overflow: 'hidden',
  borderRadius: 28,
};

const fallbackStyle: React.CSSProperties = {
  height: 340,
  width: '100%',
  borderRadius: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#dcefe8',
  color: '#20594d',
  fontWeight: 700,
};