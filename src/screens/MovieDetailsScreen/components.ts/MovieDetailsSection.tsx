import {} from 'react-native';
import React from 'react';
import {useColorScheme} from '../../../shared/hook';
import {View, Text} from '../../../shared/components/ui';
import {Colors} from '../../../shared/constants';

const MovieDetailsSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  return (
    <View style={{marginTop: 30, paddingHorizontal: 20}}>
      <Text medium>{title}</Text>
      <Text
        footnote
        style={{
          lineHeight: 25,
          marginTop: 8,
          color: Colors[colorScheme].secondaryTextColor,
        }}>
        {description}
      </Text>
    </View>
  );
};

export default MovieDetailsSection;
