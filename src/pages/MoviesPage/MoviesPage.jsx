import {useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import toast, {Toaster} from "react-hot-toast";
import css from "./MoviesPage.module.css";
import {searchMovie} from "../../api/getMovies";
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {ErrorMessage} from "formik";

const MoviesPage = () => {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const location = useLocation();

    const handleSubmit = e => {
        e.preventDefault();
        const request = e.target.elements.request.value;
        // console.log(request);
        if (request.trim() === "") {
            toast.error("Please enter search term!");
            return;
        }
        setSearch(request);

        e.target.reset();
        setMovieList([]);
        setError(false);
        setIsLoading(true);
    };

    useEffect(() => {
        if (!search) return;
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await searchMovie(search);
                // console.log(data);
                if (!data.results.length) {
                    toast.error("No such movies found");
                    return;
                }
                setMovieList(data.results);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [search]);

    movieList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    return (
        <div className={css.moviespage}>
            <SearchBar onSubmit={handleSubmit} />
            <Toaster position="top-right" />
            {isLoading && <Loader />}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <div className="container">
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
            </div>
        </div>
    );
};

export default MoviesPage;
