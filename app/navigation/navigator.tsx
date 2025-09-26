import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreditCard } from '../types';

import HomeScreen from '../screens/HomeScreen';
import AddCardScreen from '../screens/AddCardScreen';

export type RootStackParamList = {
  Home: undefined;
  AddCard: { card?: CreditCard } | undefined;
  CardDetails: { card: CreditCard };
  AddTransaction: { card: CreditCard };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddCard" component={AddCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}