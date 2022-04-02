import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetMovieDetailsResponseModel} from '../model';

const getMovieDetails = createAsyncThunk<
  GetMovieDetailsResponseModel,
  {
    id: String;
  },
  {
    rejectValue: Error;
  }
>('gets/getMovieDetails', async ({id}, {rejectWithValue}) => {
  try {
    // Call api to retrieve movie list
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=6fc87060&i=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(
      // Convert data to a json object if succedded
      data => data.json(),
    );

    // Cast object to GetMovieDetailsResponseModel
    const responseModel: GetMovieDetailsResponseModel =
      response as GetMovieDetailsResponseModel;

    // Check if there is any error
    if (responseModel.Error || responseModel.Response === 'False') {
      return rejectWithValue(
        new Error(responseModel.Error ?? 'Oops! Something went wrong.'),
      );
    } else {
      // Return result in an object class
      return responseModel;
    }
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export default getMovieDetails;
