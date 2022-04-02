import {
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from '../../shared/components/ui';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../shared/navigation';
import {useAppDispatch, useAppSelector} from '../../shared/hook/useApp';
import getMovieDetails from '../../services/getMovieDetails';
import {useColorScheme, useDeviceOrientation} from '../../shared/hook';
import {Colors} from '../../shared/constants';
import {ORIENTATION} from '../../shared/hook/useDeviceOrientation';
import {Rating} from 'react-native-ratings';
import {MovieDetailsPlaceholder, MovieDetailsSection} from './components.ts';
import {ActionTypes, movieDetailsActions} from '../../redux';
import {ErrorView} from '../../shared/components/ui/ErrorView';
import {isValidURL} from '../../utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');

export type MovieDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'MovieDetailsScreen'
>;

const MovieDetailsScreen = ({route, navigation}: MovieDetailsScreenProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  // Variable that holds top insets
  const {top, right} = useSafeAreaInsets();

  // Variable that holds current orientation status
  const orientation = useDeviceOrientation();

  // Variable that holds useAppDispatch hook
  const dispatch = useAppDispatch();

  // Variable that holds login status
  const movieDetails = useAppSelector(state => state.movieDetails);

  // State management
  const [isLoading, setLoading] = useState(true);

  // useEffect management
  // useEffect that manages api calling
  useEffect(() => {
    // Set status bar color
    StatusBar.setBarStyle(
      colorScheme === 'light' ? 'light-content' : 'dark-content',
    );

    // Android only
    // Set status bar background transparent
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Colors.transparent);
      StatusBar.setTranslucent(true);
    }

    // Call api to retrieve movie details
    dispatch(getMovieDetails({id: route.params.id}));
  }, [dispatch, route, colorScheme]);

  // useEffect that manages movie search callback
  useEffect(() => {
    // Firebase authentication state handler
    switch (movieDetails.status) {
      // Api status is pending
      case ActionTypes.REQUEST_PENDING:
        // Show loading indicator when calling api
        setLoading(true);
        break;

      // Api status is failure
      case ActionTypes.REQUEST_FAILED:
        // Dismiss loading indicator when calling api
        setLoading(false);

        // Reset api status
        dispatch(movieDetailsActions.reset());

        break;

      // Api status is succeded
      case ActionTypes.REQUEST_SUCCEEDED:
        // Dismiss loading indicator when calling api
        setLoading(false);

        // Reset api status
        dispatch(movieDetailsActions.reset());
        break;

      default:
        break;
    }
  }, [
    dispatch,
    navigation,
    movieDetails.status,
    movieDetails.details,
    orientation,
  ]);

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'bottom']}>
      {
        // Display loading if needed
        isLoading ? (
          <MovieDetailsPlaceholder />
        ) : // Display error message if needed
        movieDetails.error ? (
          <ErrorView
            title={'There is an error occurred.'}
            subtitle={
              movieDetails.error.message ??
              'Oops! Something went wrong. Please try later.'
            }
            imageSource={require('../../assets/images/bg_error.png')}
            containerStyles={{marginTop: 64}}
          />
        ) : (
          <ScrollView
            bounces={false}
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              {isValidURL(movieDetails.details?.Poster ?? '') ? (
                <Image
                  source={{
                    uri: movieDetails.details?.Poster,
                  }}
                  resizeMode="cover"
                  resizeMethod="resize"
                  style={[
                    styles.ivMoviePoster,
                    {backgroundColor: Colors[colorScheme].systemGray6},
                  ]}
                  blurRadius={5}
                />
              ) : (
                <View
                  style={[
                    styles.ivMoviePoster,
                    {backgroundColor: Colors[colorScheme].systemGray6},
                  ]}
                />
              )}
              <View
                style={{
                  position: 'absolute',
                  top: undefined,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: undefined,
                  height: undefined,
                  borderStyle: 'solid',
                  backgroundColor: Colors.transparent,
                  borderRightColor: Colors.transparent,
                  borderRightWidth:
                    orientation === ORIENTATION.LANDSCAPE ? height : width,
                  borderBottomWidth: 120,
                  borderBottomColor: Colors[colorScheme].background,
                  overflow: 'hidden',
                }}
              />
              <View style={[styles.vwSmallPoster]}>
                {isValidURL(movieDetails.details?.Poster ?? '') ? (
                  <Image
                    style={{flex: 1, borderRadius: 12}}
                    source={{uri: movieDetails.details?.Poster}}
                  />
                ) : (
                  <View style={{flex: 1, borderRadius: 12}} />
                )}
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.vwMovieTitleSection}>
                <View style={styles.vwRating} pointerEvents="none">
                  <Rating
                    style={{paddingVertical: 10}}
                    imageSize={18}
                    type="custom"
                    startingValue={
                      isNaN(Number(movieDetails.details?.imdbRating ?? '0'))
                        ? 0
                        : Number(movieDetails.details?.imdbRating ?? '0') / 2
                    }
                    ratingColor={Colors.primaryColor}
                    ratingBackgroundColor={Colors.primaryVariantColor}
                    tintColor={Colors[colorScheme].background}
                  />
                  <Text
                    semibold
                    headline
                    style={{color: Colors.primaryColor, marginStart: 10}}>
                    {movieDetails.details?.imdbRating
                      ? `${movieDetails.details?.imdbRating} / 10`
                      : ''}
                  </Text>
                  <Text
                    footnote
                    style={{
                      color: Colors[colorScheme].secondaryTextColor,
                      marginStart: 10,
                    }}>
                    {`${movieDetails.details?.imdbVotes ?? ''} Ratings`}
                  </Text>
                </View>
                <Text semibold h4 style={{lineHeight: 25, marginTop: 8}}>
                  {movieDetails.details?.Title ?? ''}{' '}
                  {movieDetails.details?.Year
                    ? `(${movieDetails.details?.Year})`
                    : ''}
                </Text>
                <Text
                  footnote
                  style={{
                    lineHeight: 25,
                    marginTop: 8,
                    color: Colors[colorScheme].secondaryTextColor,
                  }}>
                  {movieDetails.details?.Genre}
                </Text>
              </View>
              <MovieDetailsSection
                title="Plot Summary"
                description={movieDetails.details?.Plot ?? 'N/A'}
              />
              {movieDetails.details?.Ratings &&
              movieDetails.details?.Ratings.length > 0 ? (
                <View style={styles.vwOtherRating}>
                  <Text medium style={{paddingHorizontal: 20}}>
                    Other Ratings
                  </Text>
                  <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    decelerationRate={0}
                    snapToInterval={width * 0.65 + 20}
                    renderToHardwareTextureAndroid
                    data={movieDetails.details.Ratings}
                    keyExtractor={item => item.Source}
                    renderItem={({item, index}) => (
                      <View
                        style={[
                          styles.vwOtherRatingItem,
                          {
                            marginStart: index === 0 ? 20 : 0,
                            marginEnd:
                              index === movieDetails.details?.Ratings?.length
                                ? 0
                                : 20,
                            shadowColor:
                              colorScheme === 'light'
                                ? Colors.primaryColor
                                : Colors.transparent,
                            backgroundColor:
                              colorScheme === 'light'
                                ? Colors.light.background
                                : '#1B1B1B',
                            borderWidth: colorScheme === 'light' ? 0 : 2,
                          },
                        ]}>
                        <Text footnote medium numberOfLines={1}>
                          {item.Source}
                        </Text>
                        <View
                          style={{
                            marginTop: 16,
                            backgroundColor: Colors.transparent,
                          }}>
                          <Text
                            caption1
                            bold
                            style={{
                              flex: 1,
                              color: Colors.primaryColor,
                              textAlign: 'right',
                            }}
                            numberOfLines={1}>
                            {item.Value.replace('/', ' / ')}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              ) : (
                <></>
              )}
              <MovieDetailsSection
                title="Languages"
                description={movieDetails.details?.Language ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Actors"
                description={movieDetails.details?.Actors ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Directors"
                description={movieDetails.details?.Director ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Writers"
                description={movieDetails.details?.Writer ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Countries"
                description={movieDetails.details?.Country ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Awards"
                description={movieDetails.details?.Awards ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Box Office"
                description={movieDetails.details?.BoxOffice ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Production"
                description={movieDetails.details?.Production ?? 'N/A'}
              />
              <MovieDetailsSection
                title="Website"
                description={movieDetails.details?.Website ?? 'N/A'}
              />
            </View>
          </ScrollView>
        )
      }
      <View style={[styles.btnClose, {top: top + 10, right: right + 20}]}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <FontAwesome5 name="times" size={18} color={Colors.primaryColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  body: {
    paddingBottom: 20,
  },
  vwMoviePoster: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: width / 2,
    borderTopWidth: 100,
    borderRightColor: 'transparent',
    borderTopColor: 'red',
  },
  ivMoviePoster: {
    height: height * 0.4,
  },
  vwHeaderContent: {
    flexDirection: 'row',
  },
  vwSmallPoster: {
    width: width / 2.5,
    position: 'absolute',
    top: undefined,
    left: 25,
    bottom: 0,
    aspectRatio: 4 / 6,
    borderRadius: 12,
  },
  vwMovieTitleSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  vwRating: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 0,
  },
  vwOtherRating: {
    marginTop: 30,
  },
  vwOtherRatingItem: {
    marginBottom: 5,
    marginTop: 16,
    padding: 20,
    width: width * 0.65,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 4,
    borderColor: Colors.primaryColor,
  },
  btnClose: {
    ...StyleSheet.absoluteFillObject,
    width: 40,
    height: 40,
    borderRadius: 20,
    left: undefined,
    shadowColor: Colors.primaryColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
