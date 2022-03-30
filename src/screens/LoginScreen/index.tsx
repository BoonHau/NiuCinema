/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, TextInput as RNTextInput} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from '../../shared/components/ui';
import {Colors, Layout} from '../../shared/constants';
import {useColorScheme} from '../../shared/hook';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthenticationStackParamList} from '../../shared/navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type LoginScreenProps = StackScreenProps<
  AuthenticationStackParamList,
  'LoginScreen'
>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  // Common variables
  // Value that holds scroll view reference
  const refScrollView = useRef<ScrollView>(null);

  // Value that holds password text input reference
  const refTextInputPassword = useRef<RNTextInput>(null);

  // State management
  // useState that holds email
  const [strEmail, setEmail] = useState<string | undefined>(undefined);

  // useState that holds password
  const [strPassword, setPassword] = useState<string | undefined>(undefined);

  // useState that holds loading status
  const [isLoading, setLoading] = useState<boolean>(false);

  // useState that holds which field is on focus
  const [focus, setFocus] = useState<'email' | 'password' | undefined>(
    undefined,
  );

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
                  focus === 'email'
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
              selectionColor={Colors.primaryColor}
              defaultValue={strEmail}
              onSubmitEditing={() => refTextInputPassword.current?.focus()}
              onChangeText={text => setEmail(text)}
              onFocus={() => setFocus('email')}
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
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 3000);
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
