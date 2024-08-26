import {useEffect, useState} from "react";
import {getTrending} from "../../api/getMovies";
import {Link, useLocation} from "react-router-dom";
import clsx from "clsx";
import css from "./HomePage.module.css";

const imagePath = "https://image.tmdb.org/t/p/original";

const HomePage = () => {
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getTrending();
                console.log(data);
                setMovieList(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={css.homepage}>
            <div className="container">
                <h1>Trending today</h1>
                <ul className={css["trending-list"]}>
                    {movieList.map(movie => {
                        // console.log(movie);
                        return (
                            <li key={movie.id}>
                                <div className={clsx(css.preview, movie.adult && css.adult)}>
                                    <Link to={`/movies/${movie.id}`} state={{from: location}}>
                                        <img src={imagePath + movie.poster_path} alt={movie.title} />
                                        <h3>{movie.title}</h3>
                                        <div className="votes">{movie.vote_average}</div>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
