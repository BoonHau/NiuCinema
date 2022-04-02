import {
  FirebaseAuthState,
  firebaseAuthSlice,
  firebaseAuthActions,
} from './firebaseAuthSlice';

import {
  MovieDetailsState,
  movieDetailsSlice,
  movieDetailsActions,
} from './movieDetailsSlice';

import {
  MovieSearchState,
  movieSearchSlice,
  movieSearchActions,
} from './movieSearchSlice';

export {
  firebaseAuthSlice,
  firebaseAuthActions,
  movieDetailsSlice,
  movieDetailsActions,
  movieSearchSlice,
  movieSearchActions,
};

export type {FirebaseAuthState, MovieDetailsState, MovieSearchState};
