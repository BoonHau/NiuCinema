import {
  FlatList,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, TextInput, View} from '../../shared/components/ui';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../shared/navigation';
import {Colors} from '../../shared/constants';
import {useColorScheme, useDeviceOrientation} from '../../shared/hook';
import {MovieListPlaceholder, MovieListItem} from './components';
import {useAppDispatch, useAppSelector} from '../../shared/hook/useApp';
import {getMovies} from '../../services';
import {ActionTypes, movieSearchActions} from '../../redux';
import {debounce} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import {ErrorView} from '../../shared/components/ui/ErrorView';

export type MovieListScreenProps = StackScreenProps<
  RootStackParamList,
  'MovieListScreen'
>;

const MovieListScreen = ({navigation}: MovieListScreenProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  // Variable that holds orientation status
  const orientation = useDeviceOrientation();

  // Variable that holds a new cached variable abortController in a useRef() hook
  const abortController = useRef<AbortController>();

  // Variable that holds useAppDispatch hook
  const dispatch = useAppDispatch();

  // Variable that holds login status
  const movieSearch = useAppSelector(state => state.movieSearch);

  // State management
  // useState that holds loading status
  const [isLoading, setLoading] = useState(true);

  // useState that holds whether search text input is focused
  const [isSearchFocused, setSearchFocused] = useState<boolean>(false);

  // useState that holds movie search query
  const [query, setQuery] = useState<string>('');

  // Function
  // Function that update query
  const actUpdateQuery = (text: string) => setQuery(text);

  // Function that handles user input debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    debounce(text => actUpdateQuery(text), 500),
    [],
  );

  // useEffect management
  // useFocusEffect that sets status bar style
  useFocusEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Colors[colorScheme].background);
    }
    StatusBar.setBarStyle(
      colorScheme === 'light' ? 'dark-content' : 'light-content',
    );
  });

  // useEffect that stops the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => {
      // Cancel debounced change handler
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  // useEffect that manages movie search callback
  useEffect(() => {
    // Firebase authentication state handler
    switch (movieSearch.status) {
      // Api status is pending
      case ActionTypes.REQUEST_PENDING:
        // Show loading indicator when calling api
        setLoading(true);
        break;

      // Api status is failure
      case ActionTypes.REQUEST_FAILED:
        // Dismiss loading indicator when calling api
        setLoading(false);
        break;

      // Api status is succeded
      case ActionTypes.REQUEST_SUCCEEDED:
        // Dismiss loading indicator when calling api
        setLoading(false);
        break;

      default:
        break;
    }
  }, [dispatch, movieSearch.status]);

  // useEffect that calls search movies api
  useEffect(() => {
    // If there is a pending fetch request with associated AbortController, abort
    if (abortController.current) {
      abortController.current.abort();
    }

    // Check if query is eempty
    if (query.length === 0) {
      // Clear movie list
      dispatch(movieSearchActions.reset());

      // Dismiss loading indicator
      setLoading(false);
    } else {
      // Assign a new AbortController for the latest fetch to our useRef variable
      // eslint-disable-next-line no-undef
      abortController.current = new AbortController();
      const {signal} = abortController.current;

      // Call api to get list
      dispatch(getMovies({search: query, signal: signal}));
    }

    // Clear any pending api
    return () => {
      // If there is a pending fetch request with associated AbortController, abort
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [dispatch, query, abortController]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.vwSearchTextInput,
            {
              borderColor: isSearchFocused
                ? Colors.primaryColor
                : Colors[colorScheme].systemGray3,
            },
          ]}>
          <TextInput
            medium
            autoFocus
            defaultValue={query}
            placeholder="Search movie ..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            numberOfLines={1}
            style={[
              styles.txtSearch,
              {color: Colors[colorScheme].primaryTextColor},
            ]}
            onChangeText={text => debouncedChangeHandler(text)}
            placeholderTextColor={Colors[colorScheme].systemGray3}
          />
        </View>
      </View>
      {
        <View style={styles.body}>
          {
            // Display loading if needed
            isLoading ? (
              <MovieListPlaceholder />
            ) : // Display error message if needed
            movieSearch.error ? (
              <ErrorView
                imageSource={require('../../assets/images/bg_no_data.png')}
                title={movieSearch.error.message}
              />
            ) : // Display movie list
            movieSearch.movies === undefined ||
              movieSearch.movies?.length === 0 ? (
              <ErrorView
                imageSource={require('../../assets/images/bg_no_data.png')}
                title={'Movie not found.'}
                onPress={() => Keyboard.dismiss()}
              />
            ) : (
              <FlatList
                style={styles.body}
                numColumns={2}
                data={movieSearch.movies ?? []}
                keyExtractor={item =>
                  // Append orientation to prevent android rendering issue
                  item.imdbID + orientation
                }
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                renderItem={({item, index}) => (
                  <MovieListItem
                    index={index}
                    item={item}
                    onPressPoster={() => {
                      // Navigate to movie details screen with an id
                      navigation.navigate('MovieDetailsScreen', {
                        id: item.imdbID,
                      });

                      // Dismiss keyboard
                      Keyboard.dismiss();

                      // Clear focus
                      setSearchFocused(false);
                    }}
                  />
                )}
              />
            )
          }
        </View>
      }
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  vwSearchTextInput: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.transparent,
    borderRadius: 50,
    marginHorizontal: 20,
    overflow: 'hidden',
    borderWidth: 2.5,
    paddingHorizontal: 20,
  },
  txtSearch: {
    flex: 1,
    height: '100%',
  },
});
