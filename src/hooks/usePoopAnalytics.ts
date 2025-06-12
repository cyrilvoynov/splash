import { useMemo } from 'react';
import { PoopEntry } from './usePoopStorage';

interface Analytics {
  averageInterval: number;
  averageDuration: number;
  typeFrequency: { [key: number]: number };
  sizeFrequency: { [key: number]: number };
  colorFrequency: { [key: string]: number };
  totalEntries: number;
}

export const usePoopAnalytics = (entries: PoopEntry[]) => {
  const analytics = useMemo(() => {
    if (!entries.length) {
      return {
        averageInterval: 0,
        averageDuration: 0,
        typeFrequency: {},
        sizeFrequency: {},
        colorFrequency: {},
        totalEntries: 0,
      };
    }

    // Sort entries by timestamp
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Calculate average interval between entries (in hours)
    let totalInterval = 0;
    for (let i = 0; i < sortedEntries.length - 1; i++) {
      const current = new Date(sortedEntries[i].timestamp).getTime();
      const next = new Date(sortedEntries[i + 1].timestamp).getTime();
      totalInterval += (current - next) / (1000 * 60 * 60); // Convert to hours
    }
    const averageInterval =
      sortedEntries.length > 1
        ? totalInterval / (sortedEntries.length - 1)
        : 0;

    // Calculate average duration
    const averageDuration =
      entries.reduce((sum, entry) => sum + entry.duration, 0) / entries.length;

    // Calculate frequencies
    const typeFrequency: { [key: number]: number } = {};
    const sizeFrequency: { [key: number]: number } = {};
    const colorFrequency: { [key: string]: number } = {};

    entries.forEach((entry) => {
      // Type frequency
      typeFrequency[entry.type] = (typeFrequency[entry.type] || 0) + 1;

      // Size frequency
      sizeFrequency[entry.size] = (sizeFrequency[entry.size] || 0) + 1;

      // Color frequency
      colorFrequency[entry.color] = (colorFrequency[entry.color] || 0) + 1;
    });

    return {
      averageInterval,
      averageDuration,
      typeFrequency,
      sizeFrequency,
      colorFrequency,
      totalEntries: entries.length,
    };
  }, [entries]);

  const getTypePercentage = (type: number) => {
    return ((analytics.typeFrequency[type] || 0) / analytics.totalEntries) * 100;
  };

  const getSizePercentage = (size: number) => {
    return ((analytics.sizeFrequency[size] || 0) / analytics.totalEntries) * 100;
  };

  const getColorPercentage = (color: string) => {
    return ((analytics.colorFrequency[color] || 0) / analytics.totalEntries) * 100;
  };

  const getMostCommonType = () => {
    return Object.entries(analytics.typeFrequency).reduce(
      (max, [type, freq]) =>
        freq > (analytics.typeFrequency[max] || 0) ? Number(type) : max,
      0
    );
  };

  const getMostCommonSize = () => {
    return Object.entries(analytics.sizeFrequency).reduce(
      (max, [size, freq]) =>
        freq > (analytics.sizeFrequency[max] || 0) ? Number(size) : max,
      0
    );
  };

  const getMostCommonColor = () => {
    return Object.entries(analytics.colorFrequency).reduce(
      (max, [color, freq]) =>
        freq > (analytics.colorFrequency[max] || 0) ? color : max,
      ''
    );
  };

  return {
    ...analytics,
    getTypePercentage,
    getSizePercentage,
    getColorPercentage,
    getMostCommonType,
    getMostCommonSize,
    getMostCommonColor,
  };
}; 