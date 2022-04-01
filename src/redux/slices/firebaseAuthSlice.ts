import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../model';
import {signInWithUsernameAndPassword} from '../../services';
import signUpWithUsernameAndPassword from '../../services/signUpWithUsernameAndPassword';
import {ActionTypes} from '../actionTypes';

export interface FirebaseAuthState {
  status: ActionTypes;
  user: User | undefined;
  error: Error | undefined;
}

const initialState: FirebaseAuthState = {
  status: ActionTypes.REQUEST_IDLE,
  user: undefined,
  error: undefined,
};

export const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {
    reset: state => {
      state.status = ActionTypes.REQUEST_IDLE;
      state.user = undefined;
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    /*
     * Login Service
     */
    builder.addCase(signInWithUsernameAndPassword.pending, state => {
      state.status = ActionTypes.REQUEST_PENDING;
      state.user = undefined;
      state.error = undefined;
    });
    builder.addCase(
      signInWithUsernameAndPassword.rejected,
      (state, {payload}) => {
        state.status = ActionTypes.REQUEST_FAILED;
        state.user = undefined;
        state.error = payload;
      },
    );
    builder.addCase(
      signInWithUsernameAndPassword.fulfilled,
      (state, {payload}) => {
        state.status = ActionTypes.REQUEST_SUCCEEDED;
        state.user = payload;
        state.error = undefined;
      },
    );
    /*
     * Sign Up Service
     */
    builder.addCase(signUpWithUsernameAndPassword.pending, state => {
      state.status = ActionTypes.REQUEST_PENDING;
      state.user = undefined;
      state.error = undefined;
    });
    builder.addCase(
      signUpWithUsernameAndPassword.rejected,
      (state, {payload}) => {
        state.status = ActionTypes.REQUEST_FAILED;
        state.user = undefined;
        state.error = payload;
      },
    );
    builder.addCase(
      signUpWithUsernameAndPassword.fulfilled,
      (state, {payload}) => {
        state.status = ActionTypes.REQUEST_SUCCEEDED;
        state.user = payload;
        state.error = undefined;
      },
    );
  },
});

export const firebaseAuthActions = firebaseAuthSlice.actions;
