import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MovieListScreen, SplashScreen} from '../../screens';
import MovieDetailsScreen from '../../screens/MovieDetailsScreen';
import {AuthenticationNavigator} from './AuthenticationNavigator';
// import {useColorScheme} from '../hook';

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthenticationNavigator: undefined;
  MovieListScreen: undefined;
  MovieDetailsScreen: undefined;
};

// A root stack navigator is used for displaying modals on top of all other content
const RootStack = createStackNavigator<RootStackParamList>();
export const RootNavigator = () => {
  // Variable that holds color scheme
  // const colorScheme = useColorScheme();

  return (
    <RootStack.Navigator initialRouteName="AuthenticationNavigator">
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="AuthenticationNavigator"
        component={AuthenticationNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MovieListScreen"
        component={MovieListScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MovieDetailsScreen"
        component={MovieDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
