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
  refTextInput?: LegacyRef<RNTextInput> | undefined;
} & RNTextInputProps &
  ThemeProps &
  StyledTextFontSizeProps &
  StyledTextFontFamilyProps;

export const TextInput = (
  props: TextInputProps,
): React.ReactElement<RNTextInput> => {
  // Get other text values
  const {refTextInput, style, ...rest} = props;

  // Get font size
  const fontSize = getFontSize(props);

  // Get font family
  const fontFamily = getFontFamily(props);

  return (
    <RNTextInput
      ref={refTextInput}
      style={[{fontFamily, fontSize}, style]}
      {...rest}
    />
  );
};
