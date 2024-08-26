import {useParams} from "react-router-dom";
import css from "./MovieReviews.module.css";
import {useEffect, useState} from "react";
import {getMovieReviews} from "../../api/getMovies";
import Loader from "../Loader/Loader";
import {ErrorMessage} from "formik";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar} from "swiper/modules";
import "swiper/swiper-bundle.css";
import opts from "../../../opts";

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
                // console.log(data);
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
            {isLoading && <Loader />}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <ul></ul>
            <Swiper modules={[Navigation, Pagination, Scrollbar]} navigation scrollbar loop={true} autoplay={{delay: 3000}} spaceBetween={50} slidesPerView={1}>
                {reviews &&
                    reviews.map(rewiev => {
                        return (
                            <SwiperSlide key={rewiev.id}>
                                <div className={css.review}>
                                    <div className={css.info}>
                                        {rewiev.author_details.avatar_path && (
                                            <div className={css.avatar}>
                                                <img src={opts.imagePath + rewiev.author_details.avatar_path} />
                                            </div>
                                        )}
                                        <h3>{rewiev.author}</h3>
                                    </div>
                                    <p>{rewiev.content}</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};

export default MovieReviews;
