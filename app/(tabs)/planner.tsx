import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { usePlaces } from '@/src/features/places/state/PlacesProvider';
import { getPlannerWarnings, getTripSummary } from '@/src/features/planner/services/validation';
import { usePlanner } from '@/src/features/planner/state/PlannerProvider';

export default function PlannerScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { allPlaces } = usePlaces();
  const {
    trip,
    activeDay,
    activeDayId,
    hasHydrated,
    setActiveDayId,
    updateTripTitle,
    setTravelers,
    addDay,
    updateDay,
    addStop,
    updateStop,
    moveStop,
    removeStop,
  } = usePlanner();
  const summary = getTripSummary(trip, activeDay, allPlaces);
  const warnings = getPlannerWarnings(trip, activeDay, allPlaces);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.headerCard, { backgroundColor: colors.heroCard }]}> 
        <Text style={[styles.overline, { color: colors.heroAccent }]}>{hasHydrated ? 'Saved locally on device' : 'Loading planner'}</Text>
        <TextInput
          value={trip.title}
          onChangeText={updateTripTitle}
          style={[styles.tripTitleInput, { color: colors.heroText, borderColor: colors.heroChip }]}
          placeholder="Trip title"
          placeholderTextColor={colors.heroSubtext}
        />
        <Text style={[styles.subtitle, { color: colors.heroSubtext }]}>
          {summary.stopCount} stops · {summary.estimatedHours} hours planned · {summary.driveMinutes} minutes driving
        </Text>
        <View style={styles.travelerRow}>
          <Pressable onPress={() => setTravelers(trip.travelers - 1)} style={[styles.travelerButton, { backgroundColor: colors.heroChip }]}> 
            <Text style={[styles.travelerButtonText, { color: colors.heroText }]}>-</Text>
          </Pressable>
          <Text style={[styles.travelerCount, { color: colors.heroText }]}>{trip.travelers} travelers</Text>
          <Pressable onPress={() => setTravelers(trip.travelers + 1)} style={[styles.travelerButton, { backgroundColor: colors.heroChip }]}> 
            <Text style={[styles.travelerButtonText, { color: colors.heroText }]}>+</Text>
          </Pressable>
          <Pressable onPress={addDay} style={[styles.addDayButton, { borderColor: colors.heroAccent }]}> 
            <Text style={[styles.addDayText, { color: colors.heroText }]}>Add day</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.daySelectorRow}>
        {trip.days.map((day) => (
          <Pressable
            key={day.id}
            onPress={() => setActiveDayId(day.id)}
            style={[
              styles.dayChip,
              {
                backgroundColor: activeDayId === day.id ? colors.heroCard : colors.tagBackground,
              },
            ]}>
            <Text style={[styles.dayChipText, { color: activeDayId === day.id ? colors.heroText : colors.tagText }]}>{day.title}</Text>
          </Pressable>
        ))}
      </View>

      {activeDay ? (
        <View style={[styles.dayEditor, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
          <Text style={[styles.editorTitle, { color: colors.text }]}>Current day</Text>
          <TextInput
            value={activeDay.title}
            onChangeText={(title) => updateDay(activeDay.id, { title })}
            placeholder="Day title"
            placeholderTextColor={colors.mutedText}
            style={[styles.dayInput, { borderColor: colors.cardBorder, color: colors.text }]}
          />
          <TextInput
            value={activeDay.date}
            onChangeText={(date) => updateDay(activeDay.id, { date })}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.mutedText}
            style={[styles.dayInput, { borderColor: colors.cardBorder, color: colors.text }]}
          />
        </View>
      ) : null}

      {activeDay?.stops.map((stop, index) => {
        const place = allPlaces.find((entry) => entry.id === stop.placeId);
        if (!place) {
          return null;
        }

        return (
          <View key={stop.id} style={[styles.stopCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
            <View style={styles.stopTop}>
              <TextInput
                value={stop.startTime}
                onChangeText={(startTime) => updateStop(stop.id, { startTime })}
                style={[styles.stopTimeInput, { color: colors.text, borderColor: colors.cardBorder }]}
              />
              <View style={styles.durationControls}>
                <Pressable
                  onPress={() => updateStop(stop.id, { durationMinutes: Math.max(15, stop.durationMinutes - 15) })}
                  style={[styles.durationButton, { borderColor: colors.cardBorder }]}> 
                  <Text style={[styles.durationButtonText, { color: colors.text }]}>-15</Text>
                </Pressable>
                <Text style={[styles.stopDuration, { color: colors.mutedText }]}>{stop.durationMinutes} min</Text>
                <Pressable
                  onPress={() => updateStop(stop.id, { durationMinutes: stop.durationMinutes + 15 })}
                  style={[styles.durationButton, { borderColor: colors.cardBorder }]}> 
                  <Text style={[styles.durationButtonText, { color: colors.text }]}>+15</Text>
                </Pressable>
              </View>
            </View>
            <Text style={[styles.stopTitle, { color: colors.text }]}>{place.name}</Text>
            <Text style={[styles.stopMeta, { color: colors.mutedText }]}>
              {place.subcategory} · {place.town} · {place.bookingRequirement ?? 'No advance booking'}
            </Text>
            <TextInput
              value={stop.notes}
              onChangeText={(notes) => updateStop(stop.id, { notes })}
              multiline
              placeholder="Notes for this stop"
              placeholderTextColor={colors.mutedText}
              style={[styles.notesInput, { borderColor: colors.cardBorder, color: colors.text }]}
            />
            <View style={styles.stopActions}>
              <Pressable
                onPress={() => moveStop(stop.id, -1)}
                disabled={index === 0}
                style={[styles.stopActionButton, { borderColor: colors.cardBorder, opacity: index === 0 ? 0.4 : 1 }]}> 
                <Text style={[styles.stopActionText, { color: colors.text }]}>Move up</Text>
              </Pressable>
              <Pressable
                onPress={() => moveStop(stop.id, 1)}
                disabled={index === activeDay.stops.length - 1}
                style={[
                  styles.stopActionButton,
                  { borderColor: colors.cardBorder, opacity: index === activeDay.stops.length - 1 ? 0.4 : 1 },
                ]}> 
                <Text style={[styles.stopActionText, { color: colors.text }]}>Move down</Text>
              </Pressable>
              <Pressable onPress={() => removeStop(stop.id)} style={[styles.stopActionButton, { borderColor: colors.cardBorder }]}> 
                <Text style={[styles.stopActionText, { color: colors.text }]}>Remove</Text>
              </Pressable>
            </View>
          </View>
        );
      })}

      {activeDay && activeDay.stops.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No stops yet</Text>
          <Text style={[styles.emptyCopy, { color: colors.mutedText }]}>Add places from Discover, the map, or the detail screens to build this day.</Text>
        </View>
      ) : null}

      <View style={[styles.quickAddCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}> 
        <Text style={[styles.editorTitle, { color: colors.text }]}>Quick add</Text>
        <View style={styles.quickAddRow}>
          {allPlaces.slice(0, 4).map((place) => (
            <Pressable
              key={place.id}
              onPress={() => addStop(place)}
              style={[styles.quickAddChip, { backgroundColor: colors.tagBackground }]}> 
              <Text style={[styles.quickAddText, { color: colors.tagText }]}>{place.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.warningCard, { backgroundColor: colors.warningSurface, borderColor: colors.warningBorder }]}> 
        <Text style={[styles.warningTitle, { color: colors.warningText }]}>Trip-fit checks</Text>
        {warnings.map((warning) => (
          <Text key={warning} style={[styles.warningText, { color: colors.warningText }]}>
            • {warning}
          </Text>
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
    gap: 16,
  },
  headerCard: {
    borderRadius: 28,
    padding: 22,
    gap: 8,
  },
  overline: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  tripTitleInput: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  travelerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travelerButtonText: {
    fontSize: 18,
    fontWeight: '800',
  },
  travelerCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  addDayButton: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addDayText: {
    fontSize: 12,
    fontWeight: '800',
  },
  daySelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dayChipText: {
    fontSize: 12,
    fontWeight: '800',
  },
  dayEditor: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  editorTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  dayInput: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  stopCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  stopTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  stopTimeInput: {
    minWidth: 94,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '800',
  },
  durationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  durationButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  durationButtonText: {
    fontSize: 12,
    fontWeight: '800',
  },
  stopDuration: {
    fontSize: 13,
    fontWeight: '700',
  },
  stopTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  stopMeta: {
    fontSize: 13,
    lineHeight: 18,
  },
  notesInput: {
    minHeight: 92,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: 'top',
  },
  stopActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stopActionButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  stopActionText: {
    fontSize: 12,
    fontWeight: '800',
  },
  emptyCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 6,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  emptyCopy: {
    fontSize: 14,
    lineHeight: 20,
  },
  quickAddCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  quickAddRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickAddChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  quickAddText: {
    fontSize: 12,
    fontWeight: '800',
  },
  warningCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 8,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
  },
});