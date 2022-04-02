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
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={'50%'}
              paddingEnd={10}
              marginVertical={10}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                borderRadius={12}
                aspectRatio={4 / 6}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={'50%'}
              paddingStart={10}
              marginVertical={10}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                borderRadius={12}
                aspectRatio={4 / 6}
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
