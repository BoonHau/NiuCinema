/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from '../../shared/components/ui';
import {Colors, Layout} from '../../shared/constants';
import {useColorScheme, useDidMountEffect} from '../../shared/hook';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthenticationStackParamList} from '../../shared/navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getUserLoginValidation} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../shared/hook/useApp';
import {signInWithUsernameAndPassword} from '../../services';

import {batch} from 'react-redux';
import {firebaseAuthActions} from '../../redux/slices';
import {ActionTypes} from '../../redux';
import {useIsFocused} from '@react-navigation/native';

export type LoginScreenProps = StackScreenProps<
  AuthenticationStackParamList,
  'LoginScreen'
>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  // Variable that checks whether the current screen is focused
  const isFocused = useIsFocused();

  // Variable that holds useAppDispatch hook
  const dispatch = useAppDispatch();

  // Variable that holds login status
  const firebaseAuth = useAppSelector(state => state.firebaseAuth);

  // Common variables
  // Value that holds scroll view reference
  const refScrollView = useRef<ScrollView>(null);

  // Value that holds password text input reference
  const refTextInputPassword = useRef<RNTextInput>(null);

  // State management
  // useState that holds username
  const [strUsername, setUsername] = useState<string | undefined>(undefined);

  // useState that holds password
  const [strPassword, setPassword] = useState<string | undefined>(undefined);

  // useState that holds loading status
  const [isLoading, setLoading] = useState<boolean>(false);

  // useState that holds which field is on focus
  const [focus, setFocus] = useState<'username' | 'password' | undefined>(
    undefined,
  );

  // useEffect management
  // useDidMountEffect that only tracks when the first render is done
  useDidMountEffect(() => {
    // Check whether current scrren is focused
    if (!isFocused) {
      // Do nothing if is not focused
      return;
    }

    // Firebase authentication state handler
    switch (firebaseAuth.status) {
      // Api status is pending
      case ActionTypes.REQUEST_PENDING:
        // Show loading indicator when calling api
        setLoading(true);
        break;

      // Api status is failure
      case ActionTypes.REQUEST_FAILED:
        // Displau error message
        Alert.alert(
          'Error',
          firebaseAuth.error?.message ??
            'Ops! Something went wrong. Please try later',
        );

        // Modify state in a single render update
        batch(() => {
          // Dismiss loading indicator when calling api
          setLoading(false);

          // Reset firebase auth status
          dispatch(firebaseAuthActions.reset());
        });

        break;

      // Api status is succeded
      case ActionTypes.REQUEST_SUCCEEDED:
        // Clear navigation stack and navigate to movie list screen
        navigation.getParent()?.reset({
          index: 0,
          routes: [{name: 'MovieListScreen'}],
        });

        // Modify state in a single render update
        batch(() => {
          // Dismiss loading indicator when calling api
          setLoading(false);

          // Reset firebase auth status
          dispatch(firebaseAuthActions.reset());
        });
        break;

      default:
        break;
    }
  }, [firebaseAuth.user, firebaseAuth.error]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={['left', 'right', 'bottom']}
      pointerEvents={isLoading ? 'none' : 'auto'}>
      <ScrollView ref={refScrollView} style={styles.body}>
        <Text bold h3 style={styles.txtTitle}>
          Welcome back 👋
        </Text>
        <Text
          style={[
            styles.txtSubtitle,
            {
              color: Colors[colorScheme].secondaryTextColor,
            },
          ]}>
          I am so happy to see you again. You can continue to login for more
          features.
        </Text>
        <View style={{marginVertical: 24}}>
          <View
            style={[
              styles.vwTextInput,
              {
                borderColor:
                  focus === 'username'
                    ? Colors.primaryColor
                    : Colors[colorScheme].systemGray6,
              },
            ]}>
            <TextInput
              placeholder="Email"
              medium
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              selectionColor={Colors.primaryColor}
              defaultValue={strUsername}
              onSubmitEditing={() => refTextInputPassword.current?.focus()}
              onChangeText={text => setUsername(text)}
              onFocus={() => setFocus('username')}
              onBlur={() => setFocus(undefined)}
              style={[
                styles.txtInput,
                {backgroundColor: Colors[colorScheme].systemGray6},
              ]}
            />
          </View>
          <View
            style={[
              styles.vwTextInput,
              {
                borderColor:
                  focus === 'password'
                    ? Colors.primaryColor
                    : Colors[colorScheme].systemGray6,
              },
            ]}>
            <TextInput
              placeholder="Password"
              medium
              secureTextEntry
              returnKeyType="done"
              autoCapitalize="none"
              selectionColor={Colors.primaryColor}
              defaultValue={strPassword}
              onSubmitEditing={() => refTextInputPassword.current?.focus()}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setFocus('password');
              }}
              onBlur={() => setFocus(undefined)}
              style={[
                styles.txtInput,
                {backgroundColor: Colors[colorScheme].systemGray6},
              ]}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Login"
          titleProps={{
            medium: true,
            style: {color: Colors[colorScheme].background},
          }}
          isLoading={isLoading}
          disabled={isLoading}
          containerProps={{
            style: Layout.button.default,
          }}
          onPress={() => {
            // Check user login validation
            const result = getUserLoginValidation(strUsername, strPassword);
            switch (result.success) {
              // Valid inputs handler
              case true:
                strUsername && strPassword
                  ? dispatch(
                      signInWithUsernameAndPassword({
                        username: strUsername,
                        password: strPassword,
                      }),
                    )
                  : Alert.alert(
                      'Error',
                      'Ops! Something went wrong. Please try later.',
                    );
                break;
              // Invalid inputs handler
              default:
                Alert.alert(
                  'Error',
                  result.message ??
                    'Ops! Something went wrong. Please try later.',
                );
                break;
            }
          }}
        />
        <View style={styles.vwFootnote}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text medium style={{color: Colors.primaryColor}}>
              {' Sign up '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
  },
  txtTitle: {color: Colors.primaryColor, marginTop: 30},
  txtSubtitle: {
    marginTop: 16,
    lineHeight: 25,
  },
  vwTextInput: {
    height: 55,
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 16,
    overflow: 'hidden',
  },
  txtInput: {
    flex: 1,
    paddingHorizontal: 20,
  },
  vwFootnote: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'center',
  },
});
