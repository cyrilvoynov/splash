import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { format } from 'date-fns';
import { PoopEntry } from '../../hooks/usePoopStorage';

interface HistoryItemCardProps {
  entry: PoopEntry;
  onPress: () => void;
}

export const HistoryItemCard = ({ entry, onPress }: HistoryItemCardProps) => {
  const getTypeEmoji = (type: number) => {
    switch (type) {
      case 1:
        return '💩';
      case 2:
        return '💩';
      case 3:
        return '💩';
      case 4:
        return '💩';
      case 5:
        return '💩';
      case 6:
        return '💩';
      case 7:
        return '💩';
      default:
        return '💩';
    }
  };

  const getSizeLabel = (size: number) => {
    switch (size) {
      case 1:
        return 'Small';
      case 2:
        return 'Medium';
      case 3:
        return 'Large';
      default:
        return 'Medium';
    }
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{getTypeEmoji(entry.type)}</Text>
        <Text style={styles.date}>
          {format(new Date(entry.timestamp), 'MMM d, h:mm a')}
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>Type {entry.type}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Size:</Text>
          <Text style={styles.value}>{getSizeLabel(entry.size)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>
            {Math.floor(entry.duration / 60)}:
            {(entry.duration % 60).toString().padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.colorPreview} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 24,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  colorPreview: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 8,
    height: '100%',
    backgroundColor: '#8B4513',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
}); 