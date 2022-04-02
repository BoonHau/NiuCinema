import {configureStore} from '@reduxjs/toolkit';
import {firebaseAuthSlice} from './slices';
import {logger} from 'redux-logger';
import {movieSearchSlice} from './slices/movieSearchSlice';
import {movieDetailsSlice} from './slices/movieDetailsSlice';

export const store = configureStore({
  reducer: {
    [firebaseAuthSlice.name]: firebaseAuthSlice.reducer,
    [movieSearchSlice.name]: movieSearchSlice.reducer,
    [movieDetailsSlice.name]: movieDetailsSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
