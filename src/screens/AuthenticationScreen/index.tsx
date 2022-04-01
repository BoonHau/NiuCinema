import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {Button, SafeAreaView, Text, View} from '../../shared/components/ui';
import {Colors, Layout} from '../../shared/constants';
import {useColorScheme} from '../../shared/hook';
import {AuthenticationStackParamList} from '../../shared/navigation';
import {StackScreenProps} from '@react-navigation/stack';

export type AuthenticationScreenProps = StackScreenProps<
  AuthenticationStackParamList,
  'AuthenticationScreen'
>;

const AuthenticationScreen = ({navigation}: AuthenticationScreenProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/bg_watching_movie.png')}
          style={styles.ivBackground}
          resizeMode="contain"
        />
      </View>
      <View style={styles.body}>
        <Text h3 bold style={styles.txtTitle}>
          Access more with an{'\n'}account
        </Text>
        <Text
          style={[
            styles.txtSubtitle,
            {color: Colors[colorScheme].secondaryTextColor},
          ]}>
          Login to an account so you could access more features
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Login"
          titleProps={{
            medium: true,
            style: {
              color: Colors[colorScheme].background,
            },
          }}
          containerProps={{style: Layout.button.default}}
          onPress={() => {
            // navigation.navigate('LoginScreen');
            // Clear navigation stack and navigate to movie list screen
            navigation.getParent()?.reset({
              index: 0,
              routes: [{name: 'MovieListScreen'}],
            });
          }}
        />
        <Button
          title="Sign up"
          titleProps={{
            medium: true,
            style: {
              color: Colors.primaryColor,
            },
          }}
          containerProps={{
            style: [
              Layout.button.default,
              {
                marginTop: 12,
                borderWidth: 2,
                borderColor: Colors.primaryColor,
                backgroundColor: Colors.transparent,
              },
            ],
          }}
          onPress={() => navigation.navigate('SignUpScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: '45%',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
  },
  ivBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  txtTitle: {
    lineHeight: 30,
    textAlign: 'center',
    color: Colors.primaryColor,
  },
  txtSubtitle: {
    lineHeight: 25,
    marginTop: 12,
    textAlign: 'center',
  },
});
