import {configureStore} from '@reduxjs/toolkit';
import {firebaseAuthSlice} from './slices';
import {logger} from 'redux-logger';
import {movieSearchSlice} from './slices/movieSearchSlice';

export const store = configureStore({
  reducer: {
    [firebaseAuthSlice.name]: firebaseAuthSlice.reducer,
    [movieSearchSlice.name]: movieSearchSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
