import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";
import opts from "../../../opts";
import css from "./MovieList.module.css";

const MovieList = ({movieList, typeToShow}) => {
    const location = useLocation();
    return (
        <>
            {typeToShow == "trending" && (
                <ul className={css["trending-list"]}>
                    {movieList.map(movie => {
                        // console.log(movie);
                        return (
                            <li key={movie.id}>
                                <div className={clsx(css.preview, movie.adult && css.adult)}>
                                    <Link to={`/movies/${movie.id}`} state={{from: location}}>
                                        <img src={opts.imagePath + movie.poster_path} alt={movie.title} />
                                        <h3>{movie.title}</h3>
                                        <div className="votes">{movie.vote_average}</div>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            {typeToShow == "search" && (
                <ul className={css["search-list"]}>
                    {movieList &&
                        movieList.map(movie => {
                            return (
                                <li key={movie.id}>
                                    <div className={clsx(css.preview, movie.adult && css.adult)}>
                                        <Link to={`/movies/${movie.id}`} state={{from: location}}>
                                            <h3>
                                                {movie.title} {movie.release_date && parseInt(movie.release_date)}
                                            </h3>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            )}
        </>
    );
};
export default MovieList;
