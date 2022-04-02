import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {ColorSchemeName} from 'react-native';
import {RootNavigator} from './RootNavigator';
import {Colors} from '../constants';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={
        colorScheme === 'dark'
          ? {
              ...DarkTheme,
              colors: {
                ...DarkTheme.colors,
                primary: Colors.primaryColor,
                background: Colors.dark.background,
                card: Colors.dark.background,
              },
            }
          : {
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                primary: Colors.primaryColor,
                background: Colors.light.background,
                card: Colors.light.background,
              },
            }
      }>
      <RootNavigator />
    </NavigationContainer>
  );
}
