import {useEffect, useMemo, useState} from "react";
import css from "./MovieCast.module.css";
import {useParams} from "react-router-dom";
import {getMovieCast} from "../../api/getMovies";

import Loader from "../Loader/Loader";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

const imagePath = "https://image.tmdb.org/t/p/original";

const MovieCast = () => {
    const {movieId} = useParams();
    const [cast, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getMovieCast(movieId);
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

    const haveImage = useMemo(() => {
        return cast ? cast.filter(person => person.profile_path) : [];
    }, [cast]);

    return (
        <div className={css.moviecast}>
            {isLoading && <Loader />}
            {error && <ErrorMsg>Error: {error.message}</ErrorMsg>}
            <ul>
                {haveImage.map(person => {
                    return (
                        <li key={person.id}>
                            <div className="char">
                                <img src={imagePath + person.profile_path} alt={person.name} />
                                <p>{person.name}</p>
                                <p>
                                    <strong>{person.character}</strong>
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MovieCast;
