import React from 'react';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {height} = Dimensions.get('window');

const MovieDetailsPlaceholder = () => {
  return (
    <ScrollView
      bounces={false}
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item height={height * 0.4} />
          <SkeletonPlaceholder.Item
            width={'60%'}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginRight={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginRight={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={'75%'}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginRight={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={100}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginRight={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginEnd={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={100}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginRight={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginEnd={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={200}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginRight={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={25}
            marginTop={20}
            marginLeft={20}
            marginEnd={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default MovieDetailsPlaceholder;
