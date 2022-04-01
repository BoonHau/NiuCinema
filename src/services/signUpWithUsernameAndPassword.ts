import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '../model';
import firestore from '@react-native-firebase/firestore';

const signUpWithUsernameAndPassword = createAsyncThunk<
  User,
  {
    username: string;
    password: string;
  },
  {
    rejectValue: Error;
  }
>(
  'firebase/signUpWithUsernameAndPassword',
  async ({username, password}, {rejectWithValue}) => {
    try {
      const data = await firestore()
        .collection('credentials')
        .where('username', '==', username)
        .get();

      // Check whether username has been taken
      if (data.size > 0) {
        // Return error if username has been taken
        return rejectWithValue({
          name: 'Error',
          message: 'The username has already been taken',
        });
      } else {
        // Update firestore users if username has not been taken
        await firestore().collection('credentials').add({
          username: username,
          password: password,
        });

        // Return user credentials
        return {username, password};
      }
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

export default signUpWithUsernameAndPassword;
