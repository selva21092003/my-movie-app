import axios from "axios";

const getBaseUrl = () => {
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US&page=1`;
  return BASE_URL;
};

const getSearchBaseUrl = (query) => {
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&page=1`;
  return BASE_URL;
};

const getGenresBaseUrl = () => {
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  return BASE_URL;
};

const getDiscoverBaseUrl = (genreId) => {
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/discover/movie?page=1&with_genres=${genreId}&sort_by=popularity.desc&vote_count.gte=60&api_key=${apiKey}`;
  return BASE_URL;
};

export const fetchMovies = async () => {
  try {
    const { data } = await axios.get(getBaseUrl());
    return data;
  } catch (err) {
    return err;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await axios.get(getSearchBaseUrl(query));
    return data;
  } catch (err) {
    return err;
  }
};

export const fetchGenres = async () => {
  try {
    const { data } = await axios.get(getGenresBaseUrl());
    return data;
  } catch (err) {
    return err;
  }
};

export const fetchMoviesBsedGenres = async (genreId) => {
  try {
    const { data } = await axios.get(getDiscoverBaseUrl(genreId));
    return data;
  } catch (err) {
    return err;
  }
};
