import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '../model';
import firestore from '@react-native-firebase/firestore';

const signInWithUsernameAndPassword = createAsyncThunk<
  User,
  {
    username: string;
    password: string;
  },
  {
    rejectValue: Error;
  }
>(
  'firebase/signInWithUsernameAndPassword',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const data = await firestore()
        .collection('credentials')
        .where('username', '==', username)
        .where('password', '==', password)
        .get();
      if (data.size > 0) {
        return {username, password};
      } else {
        return rejectWithValue({
          name: 'Login failed',
          message: 'The username or password is incorrect!',
        });
      }
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

export default signInWithUsernameAndPassword;
