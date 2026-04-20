import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import TravelMap from '@/src/features/map/components/TravelMap';
import { PlaceFilters } from '@/src/features/places/components/PlaceFilters';
import { usePlaces } from '@/src/features/places/state/PlacesProvider';

export default function MapScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { filteredPlaces } = usePlaces();

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
        <Text style={[styles.title, { color: colors.text }]}>Map mode</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>Filter once, then scan the peninsula spatially. Marker taps open the same detail view used in Discover.</Text>
      </View>

      <PlaceFilters />

      <TravelMap
        places={filteredPlaces}
        onSelectPlace={(placeId: string) =>
          router.push({ pathname: '/place/[placeId]', params: { placeId } })
        }
      />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Visible places</Text>
        {filteredPlaces.map((place) => (
          <View key={place.id} style={[styles.rowCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
            <View style={styles.rowTop}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>{place.name}</Text>
              <Text style={[styles.rowMeta, { color: colors.mutedText }]}>
                {place.coordinates.latitude.toFixed(3)}, {place.coordinates.longitude.toFixed(3)}
              </Text>
            </View>
            <Text style={[styles.rowCopy, { color: colors.mutedText }]}>{place.subcategory} · {place.tags.slice(0, 3).join(' · ')}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  hero: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  rowCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  rowTop: {
    gap: 4,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  rowMeta: {
    fontSize: 13,
  },
  rowCopy: {
    fontSize: 13,
    lineHeight: 18,
  },
});