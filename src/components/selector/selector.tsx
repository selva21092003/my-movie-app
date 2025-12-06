import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { fetchMoviesBsedGenres } from "../../api/moviesApi";
import {
  addMovies,
  setGenresValue,
  setSearchValue,
} from "../../slices/movieSlice";

export default function Selector() {
  const dispatch = useDispatch();
  const [genresId, setGenresId] = React.useState("");
  const genreses = useSelector((state: RootState) => state.movie.genres);
  const genresValue = useSelector(
    (state: RootState) => state.movie.genresValue
  );

  const handleChange = async (event: SelectChangeEvent) => {
    setGenresId(event.target.value);
    dispatch(setSearchValue(null));
    dispatch(setGenresValue(event.target.value));
    const { results } = await fetchMoviesBsedGenres(event.target.value);
    dispatch(addMovies(results));
  };

  React.useEffect(() => {
    if (genresValue == null) {
      setGenresId("");
    }
  }, [genresValue]);

  return (
    <Box sx={{ minWidth: 120, borderColor: "white" }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{
            color: "white !important",
            "&.Mui-focused": {
              color: "white !important",
            },
          }}
          id="demo-simple-select-label"
        >
          Category
        </InputLabel>
        <Select
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genresId}
          label="genres"
          onChange={handleChange}
        >
          {genreses.map((genres) => (
            <MenuItem key={genres.id} value={genres.id}>
              {genres.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
