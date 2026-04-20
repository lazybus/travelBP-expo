import { StyleSheet, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { Text } from '@/components/Themed';
import { Place } from '@/src/features/places/domain/place';

const INITIAL_REGION = {
  latitude: 45.17,
  longitude: -81.51,
  latitudeDelta: 0.48,
  longitudeDelta: 0.42,
};

type TravelMapProps = {
  places: Place[];
  onSelectPlace: (placeId: string) => void;
};

export default function TravelMap({ places, onSelectPlace }: TravelMapProps) {
  return (
    <View style={styles.wrapper}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.coordinates.latitude,
              longitude: place.coordinates.longitude,
            }}>
            <Callout onPress={() => onSelectPlace(place.id)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{place.name}</Text>
                <Text>{place.subcategory}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 340,
    borderRadius: 28,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  callout: {
    width: 180,
    paddingVertical: 6,
  },
  calloutTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
});