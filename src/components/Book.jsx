import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookTitle } from '../utils/fetchBookTitle';

const Book = () => {
  const { isbn: paramIsbn } = useParams();
  const [isbn, setIsbn] = useState(paramIsbn || '');
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    setBooks(savedBooks);
  }, []);

  useEffect(() => {
    if (isbn) {
      const getTitle = async () => {
        const cleanTitle = await fetchBookTitle(isbn);
        setTitle(cleanTitle);
      };

      getTitle();
    }
  }, [isbn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { isbn, title };
    const updatedBooks = [...books, newBook];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    setIsbn('');
    setTitle('');
  };

  return (
    <div>
      <button onClick={() => window.location.href = '/scan'}>Scan</button>
      <h1 id='title'>{title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='ISBN'
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type='submit'>Add Book</button>
      </form>
      <ul>
        {books.map(book => (
          <li key={book.isbn}>
            {book.title} (ISBN: {book.isbn})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Book;