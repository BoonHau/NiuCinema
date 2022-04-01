import React, {LegacyRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {ThemeProps} from '../../theme';
import {
  getFontFamily,
  getFontSize,
  StyledTextFontFamilyProps,
  StyledTextFontSizeProps,
} from '../Text/text.component';

export type TextInputProps = {
  ref?: LegacyRef<RNTextInput> | undefined;
} & RNTextInputProps &
  ThemeProps &
  StyledTextFontSizeProps &
  StyledTextFontFamilyProps;

export const TextInput = (
  props: TextInputProps,
): React.ReactElement<RNTextInput> => {
  // Get other text values
  const {ref, style, ...rest} = props;

  // Get font size
  const fontSize = getFontSize(props);

  // Get font family
  const fontFamily = getFontFamily(props);

  return (
    <RNTextInput ref={ref} style={[{fontFamily, fontSize}, style]} {...rest} />
  );
};
