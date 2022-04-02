export interface GetMoviesResponseModel {
  Search: Search[] | undefined;
  totalResults: string | undefined;
  Response: string;
  Error: string | undefined;
}

export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string;
}

export enum Type {
  Movie = 'movie',
}
