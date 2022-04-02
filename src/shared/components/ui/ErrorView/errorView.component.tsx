import {Image, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants';
import {View} from '../View';
import {Text} from '../Text';

export type ErrorViewProps = {
  title?: string;
  subtitle?: string;
  containerStyles?: StyleProp<ViewStyle>;
};

export const ErrorView = ({
  title,
  subtitle,
  containerStyles,
}: ErrorViewProps) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyles])}>
      <View style={{flex: 0.5}}>
        <Image
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
          }}
          source={require('../../../../assets/images/bg_error_2.png')}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 0.5}}>
        {title && (
          <Text bold h4 style={styles.txtTitle}>
            {title}
          </Text>
        )}
        {subtitle && <Text style={styles.txtSubtitle}>{subtitle}</Text>}
      </View>
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
