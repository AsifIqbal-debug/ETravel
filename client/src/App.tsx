import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SearchPage from './pages/Search/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/visa" element={<Navigate to="/search?type=visa" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
