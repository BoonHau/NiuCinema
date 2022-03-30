import {createAsyncThunk} from '@reduxjs/toolkit';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const signInFirebaseWithEmailAndPassword = createAsyncThunk<
  FirebaseAuthTypes.UserCredential,
  {
    email: string;
    password: string;
  },
  {
    rejectValue: Error;
  }
>(
  'firebase/signInFirebaseWithEmailAndPassword',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

export default signInFirebaseWithEmailAndPassword;
