import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import type { RootState } from "../../store/store";
import { fetchMovies, searchMovies } from "../../api/moviesApi";
import { addMovies } from "../../slices/movieSlice";
import { useEffect } from "react";
import MovieCard from "../../components/card/card";

const Home = () => {
  let movies = useSelector((state: RootState) => state.movie.movies);
  const searchValue = useSelector(
    (state: RootState) => state.movie.searchValue
  );
  const dispatch = useDispatch();

  const setMoviesData = async () => {
    const { results } = await fetchMovies();
    dispatch(addMovies(results));
  };

  const getSearchMovies = async () => {
    if (searchValue!=null) {
      const { results } = await searchMovies(searchValue);
      if (results.length > 0) {
        dispatch(addMovies(results));
      } else {
        setMoviesData();
      }
    }
  };

  useEffect(() => {
    setMoviesData();
  }, []);

  useEffect(() => {
    getSearchMovies();
  }, [searchValue]);

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: "10px",
          marginTop: "100px",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px 30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Home;
