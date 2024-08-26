import css from "./MovieDetailsPage.module.css";
import {useEffect, useRef, useState} from "react";
import {useLocation, useParams, NavLink, Outlet} from "react-router-dom";

import {GoBackBtn} from "../../components/GoBackBtn/GoBackBtn";
import {fetchById} from "../../api/getMovies";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const goBack = useRef(location?.state?.from ?? "/");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchById(movieId);
                // console.log(data);
                setMovie(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [movieId]);

    // console.log(movie);

    return (
        <div className={css.moviedetailspage}>
            <div className="container">
                <GoBackBtn path={goBack.current}>Back to list</GoBackBtn>
                {isLoading && <Loader />}
                {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
                {movie && <MovieDetails movie={movie} />}
                <h2>Aditional information</h2>
                <ul>
                    <li>
                        <NavLink to={`cast`}>Cast</NavLink>
                    </li>
                    <li>
                        <NavLink to={`reviews`}>Reviews</NavLink>
                    </li>
                </ul>
                <Outlet />
            </div>
        </div>
    );
};

export default MovieDetailsPage;
