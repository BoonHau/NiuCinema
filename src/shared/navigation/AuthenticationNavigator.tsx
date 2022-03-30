import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthenticationScreen, LoginScreen, SignUpScreen} from '../../screens';
import {getFontFamily, View} from '../components/ui';
import {Colors} from '../constants';
import {useColorScheme} from '../hook';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {Platform} from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
// import Feather from 'react-native-vector-icons/dist/Feather';

export type AuthenticationStackParamList = {
  AuthenticationScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

// A root stack navigator is often used for displaying modals on top of all other content
const AuthenticationStack =
  createStackNavigator<AuthenticationStackParamList>();
export const AuthenticationNavigator = () => {
  // Variable that holds color scheme
  const colorScheme = useColorScheme();

  return (
    <AuthenticationStack.Navigator
      initialRouteName="AuthenticationScreen"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: getFontFamily({semibold: true}),
          color: Colors[colorScheme].primaryTextColor,
        },
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitle: '',
        headerTintColor: Colors.primaryColor,
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
      <AuthenticationStack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthenticationStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: true,
        }}
      />
      <AuthenticationStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: true,
        }}
      />
    </AuthenticationStack.Navigator>
  );
};
