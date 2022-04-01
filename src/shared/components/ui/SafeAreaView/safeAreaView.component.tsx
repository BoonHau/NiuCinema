import React from 'react';
import {useThemeColor} from '../../../hook';
import {ThemeProps} from '../../theme';
import {
  SafeAreaView as RNSafeAreaView,
  NativeSafeAreaViewProps,
} from 'react-native-safe-area-context';

export type SafeAreaViewProps = NativeSafeAreaViewProps & ThemeProps;

export const SafeAreaView = (
  props: SafeAreaViewProps,
): React.ReactElement<NativeSafeAreaViewProps> => {
  const {style, lightColor, darkColor, ...others} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return <RNSafeAreaView {...others} style={[{backgroundColor}, style]} />;
};
