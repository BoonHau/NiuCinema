import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {MovieListScreen, MovieDetailsScreen} from '../../screens';
import {AuthenticationNavigator} from './AuthenticationNavigator';
import {View} from '../components/ui';
import {Platform} from 'react-native';
import {Colors} from '../constants';
// import {useColorScheme} from '../hook';

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthenticationNavigator: undefined;
  MovieListScreen: undefined;
  MovieDetailsScreen: {
    id: string;
  };
};

// A root stack navigator is used for displaying modals on top of all other content
const RootStack = createStackNavigator<RootStackParamList>();
export const RootNavigator = () => {
  // Variable that holds color scheme
  // const colorScheme = useColorScheme();

  return (
    <RootStack.Navigator
      initialRouteName="AuthenticationNavigator"
      screenOptions={{
        headerLeftContainerStyle: {
          paddingStart: Platform.OS === 'ios' ? 20 : 0,
        },
        headerBackImage: () => (
          <View>
            {Platform.OS === 'ios' ? (
              <FontAwesome5
                name={'chevron-left'}
                size={28}
                color={Colors.primaryColor}
              />
            ) : (
              <Feather
                name={'arrow-left'}
                size={34}
                color={Colors.primaryColor}
              />
            )}
          </View>
        ),
      }}>
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
          headerTitle: '',
          headerShown: false,
          headerBackTitle: ' ',
        }}
      />
    </RootStack.Navigator>
  );
};
