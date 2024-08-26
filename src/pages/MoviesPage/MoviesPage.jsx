import {useEffect, useState} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import toast, {Toaster} from "react-hot-toast";
import css from "./MoviesPage.module.css";
import {searchMovie} from "../../api/getMovies";
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";

const MoviesPage = () => {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    const handleSubmit = e => {
        e.preventDefault();
        const request = e.target.elements.request.value;
        console.log(request);
        if (request.trim() === "") {
            toast.error("Please enter search term!");
            return;
        }
        setSearch(request);

        e.target.reset();
        setMovieList([]);
        setError(false);
        setLoading(true);
        setIsVisible(false);
        setIsEmpty(false);
    };
    useEffect(() => {
        if (!search) return;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await searchMovie(search);
                console.log(data);
                setMovieList(data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [search]);

    movieList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    return (
        <div className={css.moviespage}>
            <SearchBar onSubmit={handleSubmit} />
            <Toaster position="top-right" />
            <ul className={css["search-list"]}>
                {movieList &&
                    movieList.map(movie => {
                        // console.log(movie);
                        return (
                            <li key={movie.id}>
                                <div className={clsx(css.preview, movie.adult && css.adult)}>
                                    <Link to={`/movies/${movie.id}`} state={{from: location}}>
                                        <h3>
                                            {movie.title} ({parseInt(movie.release_date)})
                                        </h3>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default MoviesPage;
