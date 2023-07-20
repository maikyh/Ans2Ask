import React from "react";
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import { ChakraProvider } from '@chakra-ui/react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const LazyAsk = React.lazy(() => import('./components/Ask/Ask'));
const LazyRegister = React.lazy(() => import('./components/Register/Register'));
const LazyLogin = React.lazy(() => import('./components/Login/Login'));
const LazyHome = React.lazy(() => import('./components/Home/Home'));
const LazySearchResults = React.lazy(() => import('./components/SearchResults/SearchResults'));
const LazyQuestionDetails = React.lazy(() => import('./components/QuestionDetails/QuestionDetails'));
const LazyUserProfile = React.lazy(() => import('./components/UserProfile/UserProfile'));

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState(() => {
    // Retrieve the user data from storage or set it to null if not found
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleSetSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <ChakraProvider>
        <UserContext.Provider value={{ user, updateUser }}>
          <BrowserRouter>
            <main>
              <Routes>
                <Route 
                  path="/register" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyRegister />
                    </Suspense>
                  }
                />
                <Route 
                  path="/login" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyLogin />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/home" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyHome handleSetSearchQuery={handleSetSearchQuery} />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/search" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazySearchResults searchQuery={searchQuery} handleSetSearchQuery={handleSetSearchQuery} />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/ask" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyAsk handleSetSearchQuery={handleSetSearchQuery} />
                    </Suspense>
                  } />
                <Route 
                  path="/question/:id" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyQuestionDetails handleSetSearchQuery={handleSetSearchQuery} />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/user/:id" 
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyUserProfile handleSetSearchQuery={handleSetSearchQuery} />
                    </Suspense>
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