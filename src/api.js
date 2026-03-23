const API_KEY = '68e094699525b18a70bab2f86b1fa706';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrending = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch trending movies');
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  if (!query) return [];
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to fetch search results');
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Poster+Available';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
