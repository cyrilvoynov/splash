import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HistoryItemCard } from '../components/history/HistoryItemCard';
import { usePoopContext } from '../context/PoopContext';
import { PoopEntry } from '../hooks/usePoopStorage';

export const HistoryScreen = () => {
  const navigation = useNavigation();
  const { entries, isLoading } = usePoopContext();

  const handleEntryPress = (entry: PoopEntry) => {
    navigation.navigate('Analytics', { entry });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </Text>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryItemCard entry={item} onPress={() => handleEntryPress(item)} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No entries yet</Text>
            <Text style={styles.emptySubtext}>
              Your splash history will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
  },
}); 