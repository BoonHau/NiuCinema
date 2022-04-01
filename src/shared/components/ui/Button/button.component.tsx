import React from 'react';
import {TouchableOpacity} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {Text, TextProps} from '../Text';
import {View, ViewProps} from '../View';

export type ButtonProps = {
  title: string;
  titleProps?: TextProps;
  containerProps?: ViewProps;
  isLoading?: boolean;
  loadingIndicatorSize?: number;
  onPress?: () => void;
  disabled?: boolean;
};

/**
 * Basic button writing.
 */
export const Button = (props: ButtonProps) => {
  const {
    title,
    titleProps,
    containerProps,
    isLoading,
    loadingIndicatorSize,
    onPress,
    disabled,
  } = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View {...containerProps}>
        {isLoading ? (
          <DotIndicator color="white" size={loadingIndicatorSize ?? 6} />
        ) : (
          <Text {...titleProps}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
