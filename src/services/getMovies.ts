import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetMoviesResponseModel} from '../model';

const getMovies = createAsyncThunk<
  GetMoviesResponseModel,
  {
    search: string;
    signal: AbortSignal;
  },
  {
    rejectValue: Error;
  }
>('gets/getMovies', async ({search, signal}, {rejectWithValue}) => {
  try {
    // Call api to retrieve movie list
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=6fc87060&s=${search}&type=Movie`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      },
    ).then(
      // Convert data to a json object if succedded
      data => data.json(),
    );

    // Cast json to GetMoviesResponseModel
    const responseModel: GetMoviesResponseModel =
      response as GetMoviesResponseModel;

    // Check if there is any error
    if (responseModel.Error || responseModel.Response === 'False') {
      return rejectWithValue(
        new Error(responseModel.Error ?? 'Oops! Something went wrong.'),
      );
    } else {
      // Return result in object class
      return responseModel;
    }
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export default getMovies;
