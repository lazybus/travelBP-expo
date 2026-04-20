import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { categoryLabels } from '@/src/features/places/services/filtering';
import { usePlaces } from '@/src/features/places/state/PlacesProvider';

export function PlaceFilters() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const {
    filters,
    towns,
    categoryOrder,
    setSearch,
    toggleCategory,
    setTown,
    toggleBookingRequired,
    toggleFitPartyOnly,
    toggleYearRoundOnly,
    resetFilters,
  } = usePlaces();

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={filters.search}
        onChangeText={setSearch}
        placeholder="Search trails, patios, gas, groceries, ferries..."
        placeholderTextColor={colors.mutedText}
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            color: colors.text,
          },
        ]}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {categoryOrder.map((category) => {
          const selected = filters.categories.includes(category);
          return (
            <FilterChip
              key={category}
              label={categoryLabels[category]}
              selected={selected}
              onPress={() => toggleCategory(category)}
            />
          );
        })}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {towns.map((town) => (
          <FilterChip
            key={town}
            label={town}
            selected={filters.town === town}
            onPress={() => setTown(town)}
          />
        ))}
      </ScrollView>

      <View style={styles.rowWrap}>
        <FilterChip
          label="Reservations"
          selected={filters.bookingRequiredOnly}
          onPress={toggleBookingRequired}
        />
        <FilterChip
          label="Fits party"
          selected={filters.fitPartyOnly}
          onPress={toggleFitPartyOnly}
        />
        <FilterChip
          label="Year-round"
          selected={filters.yearRoundOnly}
          onPress={toggleYearRoundOnly}
        />
        <Pressable
          onPress={resetFilters}
          style={[styles.resetButton, { borderColor: colors.cardBorder }]}>
          <Text style={[styles.resetText, { color: colors.text }]}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FilterChip({
  label,
  onPress,
  selected,
}: {
  label: string;
  onPress: () => void;
  selected: boolean;
}) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.heroCard : colors.tagBackground,
          borderColor: selected ? colors.heroCard : colors.cardBorder,
        },
      ]}>
      <Text style={[styles.chipText, { color: selected ? colors.heroText : colors.tagText }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  searchInput: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
  },
  row: {
    gap: 8,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '800',
  },
  resetButton: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '800',
  },
});