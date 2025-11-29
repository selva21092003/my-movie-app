import axios from "axios";

const getBaseUrl = () => {
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/movie/967941/similar?api_key=${apiKey}&language=en-US&page=1`;
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
