import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  genres: [],
  searchValue: "",
  genresValue: "",
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setGenresValue: (state, action) => {
      state.genresValue = action.payload;
    },
  },
});

export const { addMovies, setSearchValue, setGenres, setGenresValue } = movieSlice.actions;
export default movieSlice.reducer;
