import {Dimensions, Image, Platform, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {Button, SafeAreaView, Text, View} from '../../shared/components/ui';
import {Colors, Layout} from '../../shared/constants';
import {useColorScheme} from '../../shared/hook';
import {AuthenticationStackParamList} from '../../shared/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

export type AuthenticationScreenProps = StackScreenProps<
  AuthenticationStackParamList,
  'AuthenticationScreen'
>;

const AuthenticationScreen = ({navigation}: AuthenticationScreenProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  // useEffect
  // useFocusEffect that sets status bar style
  useFocusEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Colors[colorScheme].background);
    }
    StatusBar.setBarStyle(
      colorScheme === 'light' ? 'dark-content' : 'light-content',
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.vwImgae}>
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
      </ScrollView>
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
            navigation.navigate('LoginScreen');
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
  vwImgae: {
    height: '45%',
    minHeight: height * 0.45,
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
