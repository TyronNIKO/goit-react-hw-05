import clsx from "clsx";
import css from "./MovieDetails.module.css";

const imagePath = "https://image.tmdb.org/t/p/original";

const MovieDetails = ({movie}) => {
    console.log(movie);

    return (
        <div className={clsx(css.moviedetails, movie.adult && css.adult)}>
            <img src={imagePath + movie.poster_path} alt={movie.title} />
            <div className={css.info}>
                <h3 className={css.title}>{`${movie.title} (${parseInt(movie.release_date)})`}</h3>
                <div className={css.score}>User score: {movie.vote_average * 10}% </div>
                <h4 className={css.title}>Overview</h4>
                <p>{movie.overview}</p>
                <h4 className={css.title}>Genres</h4>
                <p>{movie.genres.map(genre => genre.name).join(" ")}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
