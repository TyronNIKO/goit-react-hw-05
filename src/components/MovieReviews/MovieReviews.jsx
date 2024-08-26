import {useParams} from "react-router-dom";
import css from "./MovieReviews.module.css";
import {useEffect, useState} from "react";
import {getMovieReviews} from "../../api/getMovies";

const MovieReviews = () => {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getMovieReviews(movieId);
                console.log(data);
                setReviews(data.results);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [movieId]);

    return (
        <div className={css.moviereviews}>
            <ul>
                {reviews &&
                    reviews.map(rewiev => {
                        return (
                            <li key={rewiev.id}>
                                <div className="review">
                                    <h3>{rewiev.author}</h3>
                                    <p>{rewiev.content}</p>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default MovieReviews;
