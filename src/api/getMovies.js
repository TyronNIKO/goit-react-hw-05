import axios from "axios";
// import {transformCountriesData, transformCountryData} from "helpers";
import opts from "../../opts";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = opts.ACC_TOKEN;

export const getTrending = async () => {
    const {data} = await axios.get("/trending/movie/day?language=en-US");
    return data.results;
};
export const fetchById = async id => {
    const {data} = await axios.get(`/movie/${id}`);
    return data;
};
export const getMovieCast = async id => {
    const {data} = await axios.get(`/movie/${id}/credits?language=en-US`);
    return data.cast;
};
export const getMovieReviews = async id => {
    const {data} = await axios.get(`/movie/${id}/reviews?language=en-US&page=1`);
    return data;
};
export const searchMovie = async query => {
    const {data} = await axios.get(`/search/movie?query=${query}`);
    return data;
};
