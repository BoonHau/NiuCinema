import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants';
import {View} from '../View';
import {Text} from '../Text';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export type ErrorViewProps = {
  title?: string;
  subtitle?: string;
  imageSource?: ImageSourcePropType;
  containerStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const ErrorView = ({
  title,
  subtitle,
  imageSource,
  containerStyles,
  onPress,
}: ErrorViewProps) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyles])}>
      <TouchableWithoutFeedback
        style={{width: '100%', height: '100%'}}
        onPress={onPress}>
        <View style={{flex: 1}}>
          {imageSource ? (
            <View style={{flex: 0.5}}>
              <Image
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                }}
                source={imageSource}
                resizeMode="contain"
              />
            </View>
          ) : (
            <></>
          )}
          <View style={{flex: 0.5}}>
            {title && (
              <Text bold h4 style={styles.txtTitle}>
                {title}
              </Text>
            )}
            {subtitle && <Text style={styles.txtSubtitle}>{subtitle}</Text>}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  txtTitle: {
    color: Colors.primaryColor,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  txtSubtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
