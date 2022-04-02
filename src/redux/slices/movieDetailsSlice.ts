import {createSlice} from '@reduxjs/toolkit';
import {GetMovieDetailsResponseModel} from '../../model';
import getMovieDetails from '../../services/getMovieDetails';
import {ActionTypes} from '../actionTypes';

export interface MovieDetailsState {
  status: ActionTypes;
  details: GetMovieDetailsResponseModel | undefined;
  error: Error | undefined;
}

const initialState: MovieDetailsState = {
  status: ActionTypes.REQUEST_IDLE,
  error: undefined,
  details: undefined,
};

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    reset: state => {
      state.status = ActionTypes.REQUEST_IDLE;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMovieDetails.pending, state => {
      state.status = ActionTypes.REQUEST_PENDING;
      state.error = undefined;
      state.details = undefined;
    });
    builder.addCase(getMovieDetails.rejected, (state, {payload}) => {
      state.status = ActionTypes.REQUEST_FAILED;
      state.error = payload;
      state.details = undefined;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, {payload}) => {
      state.status = ActionTypes.REQUEST_SUCCEEDED;
      state.error = undefined;
      state.details = payload;
    });
  },
});

export const movieDetailsActions = movieDetailsSlice.actions;
