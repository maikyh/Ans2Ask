import React from "react";
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import { ChakraProvider } from '@chakra-ui/react';
import PersonalizedFallback from "./components/PersonalizedFallback/PersonalizedFallback";
import { url, MAX_TIME, nothingInLocalStorage } from "./utils/Constants.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

const LazyAsk = React.lazy(() => import('./components/Ask/Ask'));
const LazyRegister = React.lazy(() => import('./components/Register/Register'));
const LazyLogin = React.lazy(() => import('./components/Login/Login'));
const LazyForgotPassword = React.lazy(() => import('./components/ForgotPassword/ForgotPassword'));
const LazyHome = React.lazy(() => import('./components/Home/Home'));
const LazySearchResults = React.lazy(() => import('./components/SearchResults/SearchResults'));
const LazyQuestionDetails = React.lazy(() => import('./components/QuestionDetails/QuestionDetails'));
const LazyUserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [images, setImages] = useState([]);

    //User
    const [user, setUser] = useState(() => {
        // Retrieve the user data from storage or set it to null if not found
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    //Dark mode
    const [darkMode, setDarkMode] = useState(() => {
        // Retrieve the user data from storage or set it to null if not found
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode ? JSON.parse(storedDarkMode) : true;
    });

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const updateDarkMode = (newDarkMode) => {
        setDarkMode(newDarkMode);
    };

    const handleSetSearchQuery = (query) => {
        setSearchQuery(query);
    };

    const removeImagesFromLocalStorage = () => {
        localStorage.removeItem('images');
    };

    useEffect(() => {
        // Save the user data to storage whenever the user state changes
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        // Save the user data to storage whenever the user state changes
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    //Images
    useEffect(() => {
        const cachedImages = localStorage.getItem('images');
        if (cachedImages && cachedImages.length > nothingInLocalStorage) {
            setImages(JSON.parse(cachedImages));
        }
        else {
            const fetchImages = async () => {
                const response = await fetch(url + '/images');
                const data = await response.json();
                setImages(data.resources);
            };

            fetchImages();
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem('images');
        localStorage.setItem('images', JSON.stringify(images));
        const timer = setTimeout(() => removeImagesFromLocalStorage(), MAX_TIME);
        return () => clearTimeout(timer);
    }, [images])

    //Dark/Light mode
    useEffect(() => {
        if (darkMode) {
            document.body.style.backgroundColor = '#1A202C';
        }
        else {
            document.body.style.backgroundColor = '';
        }
    }, [darkMode]);

    return (
        <div className="app">
            <ChakraProvider>
                <UserContext.Provider value={{ user, updateUser, darkMode, updateDarkMode }}>
                    <BrowserRouter>
                        <main>
                            <Routes>
                                <Route
                                    path="/register"
                                    element={
                                        <Suspense fallback={<PersonalizedFallback />}>
                                            <LazyRegister />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="/login"
                                    element={
                                        <Suspense fallback={<PersonalizedFallback />}>
                                            <LazyLogin />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="/recover"
                                    element={
                                        <Suspense fallback={<PersonalizedFallback />}>
                                            <LazyForgotPassword />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="/home"
                                    element={
                                        <ProtectedRoute element={
                                            <Suspense fallback={<PersonalizedFallback />}>
                                                <LazyHome images={images} handleSetSearchQuery={handleSetSearchQuery} />
                                            </Suspense>
                                        } />
                                    }
                                />
                                <Route
                                    path="/search"
                                    element={
                                        <ProtectedRoute element={
                                            <Suspense fallback={<PersonalizedFallback />}>
                                                <LazySearchResults images={images} searchQuery={searchQuery} handleSetSearchQuery={handleSetSearchQuery} />
                                            </Suspense>
                                        } />
                                    }
                                />
                                <Route
                                    path="/ask"
                                    element={
                                        <ProtectedRoute element={
                                            <Suspense fallback={<PersonalizedFallback />}>
                                                <LazyAsk images={images} handleSetSearchQuery={handleSetSearchQuery} />
                                            </Suspense>
                                        } />
                                    } />
                                <Route
                                    path="/question/:id"
                                    element={
                                        <ProtectedRoute element={
                                            <Suspense fallback={<PersonalizedFallback />}>
                                                <LazyQuestionDetails images={images} handleSetSearchQuery={handleSetSearchQuery} />
                                            </Suspense>
                                        } />
                                    }
                                />
                                <Route
                                    path="/user/:id"
                                    element={
                                        <ProtectedRoute element={
                                            <Suspense fallback={<PersonalizedFallback />}>
                                                <LazyUserProfile images={images} handleSetSearchQuery={handleSetSearchQuery} />
                                            </Suspense>
                                        } />
                                    }
                                />
                                <Route
                                    path="/*"
                                    element={
                                        <ProtectedRoute element={
                                            <Suspense fallback={<PersonalizedFallback />}>
                                                <LazyLogin />
                                            </Suspense>
                                        } />
                                    }
                                />
                            </Routes>
                        </main>
                    </BrowserRouter>
                </UserContext.Provider>
            </ChakraProvider>
        </div>
    );
}