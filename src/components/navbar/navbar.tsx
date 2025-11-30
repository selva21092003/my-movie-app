import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Selector from "../selector/selector";
import { useDispatch, useSelector } from "react-redux";
import {
  setGenres,
  setGenresValue,
  setSearchValue,
} from "../../slices/movieSlice";
import { useEffect, useRef, useState } from "react";
import { fetchGenres } from "../../api/moviesApi";
import type { RootState } from "../../store/store";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const dispatch = useDispatch();
  let searchTimeout = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const searchValue = useSelector(
    (state: RootState) => state.movie.searchValue
  );

  const handleSearch = (e) => {
    clearTimeout(searchTimeout.current);
    setInputValue(e.target.value);
    dispatch(setGenresValue(null));
    searchTimeout.current = setTimeout(() => {
      dispatch(setSearchValue(e.target.value));
    }, 500);
  };

  const getGenres = async () => {
    const { genres } = await fetchGenres();
    dispatch(setGenres(genres));
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    if (searchValue == null) {
      setInputValue("");
    }
  }, [searchValue]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "gray" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Movies App
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={inputValue}
              placeholder="Search…"
              onChange={(e) => handleSearch(e)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Selector />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
