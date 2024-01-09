import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scanner from './components/Scanner';
import Book from './components/Book';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/scan" element={<Scanner />} />
        <Route path="/book/:isbn" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;