import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import { HomeScreen } from './src/screens/HomeScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { AnalyticsScreen } from './src/screens/AnalyticsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { PoopContextProvider } from './src/context/PoopContext';

const Tab = createBottomTabNavigator();

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <NavigationContainer>
      <PoopContextProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: {
              backgroundColor: '#FFF',
              borderTopColor: '#EEE',
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>🏠</Text>
              ),
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📖</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📊</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>⚙️</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </PoopContextProvider>
    </NavigationContainer>
  );
} 