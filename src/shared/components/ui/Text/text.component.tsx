import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {Colors, Typography} from '../../../constants';
import {useColorScheme} from '../../../hook';
import {ThemeProps} from '../../theme';

/** Font Size */
export type StyledTextFontSizeProps = {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  headline?: boolean;
  subhead1?: boolean;
  subhead2?: boolean;
  body?: boolean;
  callout?: boolean;
  footnote?: boolean;
  caption1?: boolean;
  caption2?: boolean;
};

/** Font Family */
export type StyledTextFontFamilyProps = {
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  regular?: boolean;
  light?: boolean;
};

/** Text Color */
export type StyledTextColorProps = {
  primaryTextColor?: boolean;
  secondaryTextColor?: boolean;
};

export type TextProps = RNTextProps &
  ThemeProps &
  StyledTextFontSizeProps &
  StyledTextFontFamilyProps &
  StyledTextColorProps;

export const Text = (props: TextProps): React.ReactElement<RNTextProps> => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  // Get other text values
  const {style, ...rest} = props;

  // Get font size
  const fontSize = getFontSize(props);

  // Get font family
  const fontFamily = getFontFamily(props);

  const color = getTextColor(colorScheme, props);

  // Return custom text with styles
  return <RNText style={[{fontSize, fontFamily, color}, style]} {...rest} />;
};

export const getFontSize = ({
  h1,
  h2,
  h3,
  h4,
  headline,
  subhead1,
  subhead2,
  body,
  callout,
  footnote,
  caption1,
  caption2,
}: StyledTextFontSizeProps): number => {
  var fontSize = Typography.body;
  if (h1) {
    fontSize = Typography.title1;
  }
  if (h2) {
    fontSize = Typography.title2;
  }
  if (h3) {
    fontSize = Typography.title3;
  }
  if (h4) {
    fontSize = Typography.title4;
  }
  if (headline) {
    fontSize = Typography.headline;
  }
  if (subhead1) {
    fontSize = Typography.subhead1;
  }
  if (subhead2) {
    fontSize = Typography.subhead2;
  }
  if (body) {
    fontSize = Typography.body;
  }
  if (callout) {
    fontSize = Typography.callout;
  }
  if (footnote) {
    fontSize = Typography.footnote;
  }
  if (caption1) {
    fontSize = Typography.caption1;
  }
  if (caption2) {
    fontSize = Typography.caption2;
  }
  return fontSize;
};

export const getFontFamily = ({
  bold,
  semibold,
  medium,
  regular,
  light,
}: StyledTextFontFamilyProps): string => {
  var fontFamily = 'Graphik-Regular';
  if (bold) {
    fontFamily = 'GraphikApp-Bold';
  }
  if (semibold) {
    fontFamily = 'Graphik-Semibold';
  }
  if (medium) {
    fontFamily = 'Graphik-Medium';
  }
  if (light) {
    fontFamily = 'GraphikApp-Light';
  }
  if (regular) {
    fontFamily = 'Graphik-Regular';
  }
  return fontFamily;
};

export const getTextColor = (
  colorScheme: 'light' | 'dark',
  {secondaryTextColor}: StyledTextColorProps,
): string => {
  var textColor = Colors[colorScheme].primaryTextColor;
  if (secondaryTextColor) {
    textColor = Colors[colorScheme].secondaryTextColor;
  }
  return textColor;
};
