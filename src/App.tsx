import { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import { fetchMovies } from "./api/moviesApi";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "./slices/movieSlice";
import type { RootState } from "./store/store";

function App() {
  const movies = useSelector((state: RootState) => state.movie.movies);
  const dispatch = useDispatch();

  const setMoviesData = async () => {
    const { results } = await fetchMovies();
    dispatch(addMovies(results));
  };

  useEffect(() => {
    setMoviesData();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
