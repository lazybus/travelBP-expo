import { ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { featuredCollections, weatherSnapshot } from '@/src/features/places/data/mock';
import { usePlaces } from '@/src/features/places/state/PlacesProvider';
import { getPlannerWarnings } from '@/src/features/planner/services/validation';
import { usePlanner } from '@/src/features/planner/state/PlannerProvider';

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { allPlaces } = usePlaces();
  const { trip, activeDay } = usePlanner();
  const warnings = getPlannerWarnings(trip, activeDay, allPlaces);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.heroCard, { backgroundColor: colors.heroCard }]}> 
        <Text style={[styles.eyebrow, { color: colors.heroAccent }]}>Bruce Peninsula today</Text>
        <Text style={[styles.title, { color: colors.heroText }]}>Build a trip that survives Bruce logistics.</Text>
        <Text style={[styles.subtitle, { color: colors.heroSubtext }]}>
          Weather, wind, permits, and timing all in one place before your day gets crowded.
        </Text>
        <View style={styles.conditionRow}>
          <View style={[styles.conditionChip, { backgroundColor: colors.heroChip }]}>
            <Text style={[styles.conditionValue, { color: colors.heroText }]}>{weatherSnapshot.temperatureC}°C</Text>
            <Text style={[styles.conditionLabel, { color: colors.heroSubtext }]}>Air</Text>
          </View>
          <View style={[styles.conditionChip, { backgroundColor: colors.heroChip }]}>
            <Text style={[styles.conditionValue, { color: colors.heroText }]}>{weatherSnapshot.windKph} km/h</Text>
            <Text style={[styles.conditionLabel, { color: colors.heroSubtext }]}>Wind</Text>
          </View>
          <View style={[styles.conditionChip, { backgroundColor: colors.heroChip }]}>
            <Text style={[styles.conditionValue, { color: colors.heroText }]}>{weatherSnapshot.waveRisk}</Text>
            <Text style={[styles.conditionLabel, { color: colors.heroSubtext }]}>Water</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Daily focus</Text>
        <Text style={[styles.sectionCaption, { color: colors.mutedText }]}>What needs attention first</Text>
      </View>

      <View style={styles.grid}>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.metricValue, { color: colors.text }]}>{trip.days.length}</Text>
          <Text style={[styles.metricLabel, { color: colors.mutedText }]}>Trip days planned</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.metricValue, { color: colors.text }]}>{activeDay?.stops.length ?? 0}</Text>
          <Text style={[styles.metricLabel, { color: colors.mutedText }]}>{activeDay?.title ?? 'Current day'} stops</Text>
        </View>
      </View>

      <View style={[styles.noticeCard, { backgroundColor: colors.warningSurface, borderColor: colors.warningBorder }]}> 
        <Text style={[styles.noticeTitle, { color: colors.warningText }]}>Planner warnings</Text>
        {warnings.map((warning) => (
          <Text key={warning} style={[styles.noticeText, { color: colors.warningText }]}>
            • {warning}
          </Text>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured lanes</Text>
        <Text style={[styles.sectionCaption, { color: colors.mutedText }]}>Travel planning built for Bruce Peninsula reality</Text>
      </View>

      {featuredCollections.map((collection) => (
        <View
          key={collection.title}
          style={[styles.collectionCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
          <View style={styles.collectionHeader}>
            <Text style={[styles.collectionTitle, { color: colors.text }]}>{collection.title}</Text>
            <Text style={[styles.collectionMeta, { color: colors.mutedText }]}>{collection.subtitle}</Text>
          </View>
          <Text style={[styles.collectionDescription, { color: colors.mutedText }]}>
            {collection.description}
          </Text>
          <View style={styles.tagRow}>
            {collection.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.tagBackground }]}> 
                <Text style={[styles.tagText, { color: colors.tagText }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
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
  heroCard: {
    borderRadius: 28,
    padding: 24,
    gap: 12,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  conditionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  conditionChip: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 4,
  },
  conditionValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  conditionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  sectionCaption: {
    fontSize: 14,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    gap: 8,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
  noticeCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
  },
  collectionCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  collectionHeader: {
    gap: 4,
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  collectionMeta: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  collectionDescription: {
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
});
