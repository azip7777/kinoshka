
export interface Film {
  poster: string;
  title: string;
  year: number;
  director: string;
  rating: number;
}

export interface FilmWithUrl extends Film {
  letterboxdUrl: string;
}
