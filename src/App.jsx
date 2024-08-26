// src/App.jsx
import "./App.css";

import {lazy, Suspense, useEffect, useRef, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {Navigate, Route, Routes} from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage to="/" />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
