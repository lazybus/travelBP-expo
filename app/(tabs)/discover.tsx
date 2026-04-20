import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { PlaceFilters } from '@/src/features/places/components/PlaceFilters';
import { categoryLabels } from '@/src/features/places/services/filtering';
import { usePlaces } from '@/src/features/places/state/PlacesProvider';
import { usePlanner } from '@/src/features/planner/state/PlannerProvider';

export default function DiscoverScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { filteredPlaces, categoryOrder } = usePlaces();
  const { activeDay, addStop, trip } = usePlanner();

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Discover Bruce Peninsula</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>Curated places with the filters that matter when the peninsula gets busy.</Text>
      </View>

      <PlaceFilters />

      <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
        <Text style={[styles.summaryTitle, { color: colors.text }]}>
          {filteredPlaces.length} results for a party of {trip.travelers}
        </Text>
        <Text style={[styles.summaryCopy, { color: colors.mutedText }]}>
          Filters are shared with the map so you can switch surfaces without losing the planning lens.
        </Text>
      </View>

      {categoryOrder.map((category) => {
        const items = filteredPlaces.filter((place) => place.category === category);
        if (items.length === 0) {
          return null;
        }

        return (
          <View key={category} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{categoryLabels[category]}</Text>
            <View style={styles.cardStack}>
              {items.map((place) => (
                <View
                  key={place.id}
                  style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
                  <View style={styles.cardTopRow}>
                    <View style={styles.cardTitleWrap}>
                      <Text style={[styles.cardTitle, { color: colors.text }]}>{place.name}</Text>
                      <Text style={[styles.cardMeta, { color: colors.mutedText }]}>{place.town} · {place.area}</Text>
                    </View>
                    <View style={[styles.pill, { backgroundColor: colors.tagBackground }]}> 
                      <Text style={[styles.pillText, { color: colors.tagText }]}>{place.priceLabel}</Text>
                    </View>
                  </View>

                  <Text style={[styles.description, { color: colors.mutedText }]}>{place.summary}</Text>
                  <Text style={[styles.detailLine, { color: colors.text }]}>{place.subcategory} · {place.hours}</Text>

                  <View style={styles.infoRow}>
                    <Text style={[styles.infoText, { color: colors.text }]}>Party {place.partySize.min}-{place.partySize.max}</Text>
                    <Text style={[styles.infoText, { color: colors.text }]}>{place.seasonality}</Text>
                  </View>

                  <View style={styles.tagRow}>
                    {place.tags.slice(0, 4).map((tag) => (
                      <View key={tag} style={[styles.pill, { backgroundColor: colors.tagBackground }]}> 
                        <Text style={[styles.pillText, { color: colors.tagText }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.actionRow}>
                    <Pressable
                      onPress={() =>
                        router.push({ pathname: '/place/[placeId]', params: { placeId: place.id } })
                      }
                      style={[styles.primaryAction, { backgroundColor: colors.heroCard }]}> 
                      <Text style={[styles.primaryActionText, { color: colors.heroText }]}>View details</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => addStop(place)}
                      style={[styles.secondaryAction, { borderColor: colors.cardBorder }]}> 
                      <Text style={[styles.secondaryActionText, { color: colors.text }]}>Add to {activeDay?.title ?? 'day'}</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  summaryCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  summaryCopy: {
    fontSize: 13,
    lineHeight: 18,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  cardStack: {
    gap: 12,
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitleWrap: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  cardMeta: {
    fontSize: 13,
    lineHeight: 18,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  detailLine: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryAction: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryActionText: {
    fontSize: 13,
    fontWeight: '800',
  },
});