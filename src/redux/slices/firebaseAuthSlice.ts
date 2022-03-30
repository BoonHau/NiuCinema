import {createSlice} from '@reduxjs/toolkit';
import {signInFirebaseWithEmailAndPassword} from '../../services';
import {ActionType} from '../actionTypes';

export interface FirebaseAuthState {
  status: ActionType;
}

const initialState: FirebaseAuthState = {
  status: ActionType.REQUEST_IDLE,
};

export const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signInFirebaseWithEmailAndPassword.pending, state => {
      state.status = ActionType.REQUEST_PENDING;
    });
    builder.addCase(
      signInFirebaseWithEmailAndPassword.rejected,
      (state, {}) => {
        state.status = ActionType.REQUEST_PENDING;
      },
    );
    builder.addCase(
      signInFirebaseWithEmailAndPassword.fulfilled,
      (state, {}) => {
        state.status = ActionType.REQUEST_SUCCEEDED;
      },
    );
  },
});

export const firebaseAuthActions = firebaseAuthSlice.actions;
