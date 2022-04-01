/* eslint-disable react-native/no-inline-styles */
import {Alert, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  TextInput,
  View,
} from '../../shared/components/ui';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../shared/navigation';
import {Colors} from '../../shared/constants';
import {useColorScheme, useDidMountEffect} from '../../shared/hook';
import {MovieListPlaceholder, MoviePosterItem} from './components';

import {useAppDispatch, useAppSelector} from '../../shared/hook/useApp';
import {getMovies} from '../../services';
import {ActionTypes} from '../../redux';
// import {useIsFocused} from '@react-navigation/native';
import {batch} from 'react-redux';

export type MovieListScreenProps = StackScreenProps<
  RootStackParamList,
  'MovieListScreen'
>;

const MovieListScreen = ({}: MovieListScreenProps) => {
  // Variable that holds useColorScheme hook
  const colorScheme = useColorScheme();

  // Variable that checks whether the current screen is focused
  // const isFocused = useIsFocused();

  // Variable that holds useAppDispatch hook
  const dispatch = useAppDispatch();

  // Variable that holds login status
  const movieSearch = useAppSelector(state => state.movieSearch);

  // State management
  // useState that holds loading status
  const [isLoading, setLoading] = useState(true);

  // useState that holds whether search text input is focused
  const [isSearchFocused, setSearchFocused] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');

  // useEffect management

  // useEffect that manages movie search callback
  useDidMountEffect(() => {
    // Firebase authentication state handler
    switch (movieSearch.status) {
      // Api status is pending
      case ActionTypes.REQUEST_PENDING:
        // Show loading indicator when calling api
        setLoading(true);
        break;

      // Api status is failure
      case ActionTypes.REQUEST_FAILED:
        // Displau error message
        Alert.alert(
          'Error',
          movieSearch.error?.message ??
            'Ops! Something went wrong. Please try later',
        );

        // Modify state in a single render update
        batch(() => {
          // Dismiss loading indicator when calling api
          setLoading(false);

          // Reset firebase auth status
          // dispatch(firebaseAuthActions.reset());
        });

        break;

      // Api status is succeded
      case ActionTypes.REQUEST_SUCCEEDED:
        // Alert.alert('Success', `${movieSearch.totalResults}`);
        // Modify state in a single render update
        batch(() => {
          // Dismiss loading indicator when calling api
          setLoading(false);
        });
        break;

      default:
        break;
    }
  }, [
    movieSearch.status,
    movieSearch.movies,
    movieSearch.totalResults,
    movieSearch.error,
  ]);

  // Function
  // Function that calls search movies api by user input

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
            autoFocus
            medium
            defaultValue={query}
            placeholder="Movie name"
            onFocus={() => setSearchFocused(true)}
            numberOfLines={1}
            style={styles.txtSearch}
            onChangeText={text => setQuery(text)}
            placeholderTextColor={Colors[colorScheme].systemGray2}
          />
        </View>
        <Button
          title="Search"
          onPress={() => dispatch(getMovies({search: 'Marvel'}))}
        />
      </View>
      {isLoading ? (
        <MovieListPlaceholder />
      ) : (
        <FlatList
          keyboardShouldPersistTaps="handled"
          style={styles.body}
          numColumns={2}
          data={movieSearch.movies ?? []}
          keyExtractor={item => item.imdbID}
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          renderItem={({item, index}) => (
            <MoviePosterItem index={index} item={item} />
          )}
        />
      )}
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
