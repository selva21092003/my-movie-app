import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import type { RootState } from "../../store/store";
import { fetchMovies } from "../../api/moviesApi";
import { addMovies } from "../../slices/movieSlice";
import { useEffect } from "react";
import MovieCard from "../../components/card/card";

const Home = () => {
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
