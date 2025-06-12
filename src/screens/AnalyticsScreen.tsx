import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { usePoopContext } from '../context/PoopContext';
import { usePoopAnalytics } from '../hooks/usePoopAnalytics';
import { PoopEntry } from '../hooks/usePoopStorage';

export const AnalyticsScreen = () => {
  const route = useRoute();
  const { entries } = usePoopContext();
  const analytics = usePoopAnalytics(entries);

  const selectedEntry = route.params?.entry as PoopEntry | undefined;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}h ${mins}m`
      : `${mins}m`;
  };

  const formatInterval = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    if (hours < 24) {
      return `${Math.round(hours)}h`;
    }
    return `${Math.round(hours / 24)}d`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        {selectedEntry && (
          <Text style={styles.subtitle}>
            Details for {new Date(selectedEntry.timestamp).toLocaleDateString()}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Total Entries</Text>
          <Text style={styles.statValue}>{analytics.totalEntries}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Average Duration</Text>
          <Text style={styles.statValue}>
            {formatDuration(analytics.averageDuration)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Average Interval</Text>
          <Text style={styles.statValue}>
            {formatInterval(analytics.averageInterval)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Common</Text>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Type</Text>
          <Text style={styles.statValue}>
            Type {analytics.getMostCommonType()} (
            {Math.round(
              analytics.getTypePercentage(analytics.getMostCommonType())
            )}
            %)
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Size</Text>
          <Text style={styles.statValue}>
            {analytics.getMostCommonSize() === 1
              ? 'Small'
              : analytics.getMostCommonSize() === 2
              ? 'Medium'
              : 'Large'}{' '}
            (
            {Math.round(
              analytics.getSizePercentage(analytics.getMostCommonSize())
            )}
            %)
          </Text>
        </View>
      </View>

      {selectedEntry && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entry Details</Text>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>
              {formatDuration(selectedEntry.duration)}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Type</Text>
            <Text style={styles.statValue}>Type {selectedEntry.type}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Size</Text>
            <Text style={styles.statValue}>
              {selectedEntry.size === 1
                ? 'Small'
                : selectedEntry.size === 2
                ? 'Medium'
                : 'Large'}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          Note: This data is for informational purposes only and should not be used
          as medical advice. Please consult your healthcare provider for any health
          concerns.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  disclaimer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 