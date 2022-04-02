import {Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Search} from '../../../model';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../shared/constants';
import {Text, View} from '../../../shared/components/ui';
import {isValidURL} from '../../../utils';
import {useColorScheme} from '../../../shared/hook';

export type MovieListItemProps = {
  index: number;
  item: Search;
  onPressPoster: () => void;
};

export const MovieListItem = ({
  index,
  item,
  onPressPoster,
}: MovieListItemProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          marginEnd: index % 2 === 0 ? 10 : 0,
          marginStart: index % 2 === 0 ? 0 : 10,
        },
      ]}>
      <Pressable onPress={onPressPoster}>
        <View style={styles.vwMoviePoster}>
          {isValidURL(item.Poster) ? (
            <Image
              style={{
                flex: 1,
                borderRadius: 12,
              }}
              source={{uri: item.Poster}}
            />
          ) : (
            <></>
          )}
          <View style={styles.vwMoviePosterContent}>
            <LinearGradient
              style={{flex: 1}}
              colors={
                colorScheme === 'light'
                  ? [Colors.transparent, Colors.transparent, Colors.black]
                  : [
                      Colors.transparent,
                      Colors.transparent,
                      Colors.transparent,
                      Colors.primaryColor,
                    ]
              }
            />
            <Text
              medium
              caption1
              style={styles.txtMoviePosterTitle}
              numberOfLines={2}>
              {item.Title}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginVertical: 10,
  },
  vwMoviePoster: {
    flex: 1,
    aspectRatio: 4 / 6,
    borderRadius: 12,
    shadowColor: Colors.primaryColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  vwMoviePosterContent: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    backgroundColor: Colors.transparent,
    overflow: 'hidden',
  },
  txtMoviePosterTitle: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    lineHeight: 20,
    color: Colors.white,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});
