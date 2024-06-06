export interface FilmListScreenProps {}

export type FilmBackend = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type FilmsBackend = FilmBackend[];

export interface Film {
  id: number;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
}

export type Films = Film[];

export enum FilmLanguage {
  ALL = "all",
  FRENCH = "french",
}
