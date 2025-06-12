import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { PoopFormScreen } from '../screens/PoopFormScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="PoopForm"
        component={PoopFormScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}; 