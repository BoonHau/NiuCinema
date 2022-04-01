import {createSlice} from '@reduxjs/toolkit';
import {Search} from '../../model';
import {getMovies} from '../../services';
import {ActionTypes} from '../actionTypes';

export interface MovieSearchState {
  status: ActionTypes;
  error: Error | undefined;
  movies?: Search[] | undefined;
  totalResults?: string | undefined;
}

const initialState: MovieSearchState = {
  status: ActionTypes.REQUEST_IDLE,
  error: undefined,
  movies: undefined,
  totalResults: undefined,
};

export const movieSearchSlice = createSlice({
  name: 'movieSearch',
  initialState,
  reducers: {
    reset: state => {
      state.status = ActionTypes.REQUEST_IDLE;
      state.error = undefined;
      state.movies = undefined;
      state.totalResults = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMovies.pending, state => {
      state.status = ActionTypes.REQUEST_PENDING;
      state.error = undefined;
      state.movies = undefined;
      state.totalResults = undefined;
    });
    builder.addCase(getMovies.rejected, (state, {payload}) => {
      state.status = ActionTypes.REQUEST_FAILED;
      state.error = payload;
      state.movies = undefined;
      state.totalResults = undefined;
    });
    builder.addCase(getMovies.fulfilled, (state, {payload}) => {
      state.status = ActionTypes.REQUEST_SUCCEEDED;
      state.error = undefined;
      state.movies = payload.Search;
      state.totalResults = payload.totalResults;
    });
  },
});
