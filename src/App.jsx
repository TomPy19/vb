import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scanner from './components/Scanner';
import Book from './components/Book';
import BookManager from './components/BookManager';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/scan" element={<Scanner />} />
        <Route path="/book/:isbn" element={<Book />} />
        <Route path="/books" element={<BookManager />} />
      </Routes>
    </Router>
  );
}

export default App;