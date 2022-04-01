import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {View} from '../../shared/components/ui';
import {ScrollView} from 'react-native-gesture-handler';

const MovieDetailsScreen = () => {
  return (
    <ScrollView bounces={false} style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg',
          }}
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.ivMovie}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 400,
  },
  ivMovie: {
    flex: 1,
  },
});
