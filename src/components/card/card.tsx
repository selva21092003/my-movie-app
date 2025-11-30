import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export default function MovieCard({ movie }) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="400"
        image={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
      />
      <CardContent>
        <Typography gutterBottom component="div">
          {movie.title}
          <div style={{display: 'flex',justifyContent: 'end'}}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
