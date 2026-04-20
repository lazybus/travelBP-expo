import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { usePlaces } from '@/src/features/places/state/PlacesProvider';
import { usePlanner } from '@/src/features/planner/state/PlannerProvider';

export default function PlaceDetailScreen() {
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const { getPlaceById } = usePlaces();
  const { addStop, activeDay } = usePlanner();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const place = getPlaceById(placeId);

  if (!place) {
    return (
      <View style={[styles.emptyState, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Place not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: place.name }} />

      <View style={[styles.heroCard, { backgroundColor: colors.heroCard }]}> 
        <Text style={[styles.heroEyebrow, { color: colors.heroAccent }]}>{place.subcategory}</Text>
        <Text style={[styles.heroTitle, { color: colors.heroText }]}>{place.name}</Text>
        <Text style={[styles.heroCopy, { color: colors.heroSubtext }]}>{place.summary}</Text>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Planning snapshot</Text>
        <Text style={[styles.infoLine, { color: colors.text }]}>{place.hours}</Text>
        <Text style={[styles.infoLine, { color: colors.text }]}>{place.seasonality}</Text>
        <Text style={[styles.infoLine, { color: colors.text }]}>Party size: {place.partySize.min}-{place.partySize.max}</Text>
        <Text style={[styles.infoLine, { color: colors.text }]}>{place.address}</Text>
        <Text style={[styles.featuredNote, { color: colors.mutedText }]}>{place.featuredNote}</Text>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Amenities and cues</Text>
        <View style={styles.tagRow}>
          {place.amenities.concat(place.tags).map((item) => (
            <View key={item} style={[styles.tag, { backgroundColor: colors.tagBackground }]}> 
              <Text style={[styles.tagText, { color: colors.tagText }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>What the planner should know</Text>
        {place.planningNotes.map((note) => (
          <Text key={note} style={[styles.note, { color: colors.mutedText }]}>
            • {note}
          </Text>
        ))}
      </View>

      <Pressable
        onPress={() => addStop(place)}
        style={[styles.primaryButton, { backgroundColor: colors.heroCard }]}>
        <Text style={[styles.primaryButtonText, { color: colors.heroText }]}>Add to {activeDay?.title ?? 'current day'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    gap: 8,
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
  },
  heroCopy: {
    fontSize: 15,
    lineHeight: 22,
  },
  infoCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  infoLine: {
    fontSize: 14,
    lineHeight: 20,
  },
  featuredNote: {
    fontSize: 14,
    lineHeight: 20,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  note: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
});