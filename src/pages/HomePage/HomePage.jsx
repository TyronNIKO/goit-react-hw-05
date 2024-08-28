import {useEffect, useState} from "react";
import {getTrending} from "../../api/getMovies";

import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

import css from "./HomePage.module.css";

const HomePage = () => {
    const [movieList, setMovieList] = useState([]);
    const [typeToShow, setTypeToShow] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getTrending();
                // console.log(data);
                setMovieList(data);
                setTypeToShow("trending");
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
                {isLoading && <Loader />}
                {error && <ErrorMsg>{error.message}</ErrorMsg>}
                <MovieList movieList={movieList} typeToShow={typeToShow} />
            </div>
        </div>
    );
};

export default HomePage;
