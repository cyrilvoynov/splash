import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList>;
  PoopForm: undefined;
};

export type TabParamList = {
  Home: undefined;
  History: undefined;
  Analytics: undefined;
  Settings: undefined;
}; 