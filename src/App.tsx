// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import NowShowing from './pages/NowShowing/index.tsx';
import ComingSoon from './pages/ComingSoon/index.tsx';
import MovieDetail from './pages/MovieDetail/index.tsx';
import Login from './pages/UserAccess/Login.tsx';
import Register from './pages/UserAccess/Register.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/now-showing" element={<NowShowing />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
