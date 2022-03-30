import React from 'react';
import {View as RNView, ViewProps as RNViewProps} from 'react-native';
import {useThemeColor} from '../../../hook';
import {ThemeProps} from '../../theme';

export type ViewProps = RNViewProps & ThemeProps;

export const View = (props: ViewProps): React.ReactElement<RNViewProps> => {
  const {style, lightColor, darkColor, ...others} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return <RNView {...others} style={[{backgroundColor}, style]} />;
};
