import {useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {useSearchParams} from "react-router-dom";
import {searchMovie} from "../../api/getMovies";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("request") || "");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [typeToShow, setTypeToShow] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const request = e.target.elements.request.value;
        // console.log(request);
        if (request.trim() === "") {
            toast.error("Please enter search term!");
            return;
        }

        setSearch(request);
        const nextParams = request !== "" ? {request} : {};
        setSearchParams(nextParams);

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
                setTypeToShow("search");
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [search]);

    const sortedMovies = [...movieList].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    return (
        <div className={css.moviespage}>
            <SearchBar onSubmit={handleSubmit} />
            <Toaster position="top-right" />
            {isLoading && <Loader />}
            {error && <ErrorMsg>Error: {error.message}</ErrorMsg>}
            <div className="container">
                <MovieList movieList={sortedMovies} typeToShow={typeToShow} />
            </div>
        </div>
    );
};

export default MoviesPage;
