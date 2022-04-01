import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MovieListPlaceholder = () => {
  return (
    <FlatList
      style={styles.container}
      data={new Array(6)}
      renderItem={() => (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            minHeight={200}
            alignItems="center">
            <SkeletonPlaceholder.Item width={'50%'} paddingEnd={10}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={180}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={20}
                borderRadius={4}
                marginVertical={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={'50%'} paddingStart={10}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={180}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={20}
                borderRadius={4}
                marginVertical={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
    />
  );
};

export default MovieListPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
