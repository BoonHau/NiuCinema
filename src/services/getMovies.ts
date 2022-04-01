import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetMoviesResponseModel} from '../model';

const getMovies = createAsyncThunk<
  GetMoviesResponseModel,
  {
    search: String;
  },
  {
    rejectValue: Error;
  }
>('gets/getMovies', async ({search}, {rejectWithValue}) => {
  try {
    // Call api to retrieve movie list
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=6fc87060&s=${search}&type=Movie`,
      {
        method: 'GET',
      },
    ).then(
      // Convert data to json if succedded
      data => data.json(),
    );

    // Convert json to an object class
    const responseModel: GetMoviesResponseModel =
      response as GetMoviesResponseModel;

    // Return result in object class
    return responseModel;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export default getMovies;
