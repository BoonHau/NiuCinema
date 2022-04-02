export interface GetMovieDetailsResponseModel {
  Title: string | undefined;
  Year: string | undefined;
  Rated: string | undefined;
  Released: string | undefined;
  Runtime: string | undefined;
  Genre: string | undefined;
  Director: string | undefined;
  Writer: string | undefined;
  Actors: string | undefined;
  Plot: string | undefined;
  Language: string | undefined;
  Country: string | undefined;
  Awards: string | undefined;
  Poster: string | undefined;
  Ratings: Rating[] | undefined;
  Metascore: string | undefined;
  imdbRating: string | undefined;
  imdbVotes: string | undefined;
  imdbID: string | undefined;
  Type: string | undefined;
  DVD: string | undefined;
  BoxOffice: string | undefined;
  Production: string | undefined;
  Website: string | undefined;
  Response: string;
  Error: string | undefined;
}

export interface Rating {
  Source: string;
  Value: string;
}
