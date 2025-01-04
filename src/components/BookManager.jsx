import { useState, useEffect } from 'react';
import Scanner from './Scanner';
import { fetchBookTitle } from '../utils/fetchBookTitle';

function BookManager() {
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    setBooks(savedBooks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { isbn, title };
    const updatedBooks = [...books, newBook];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    setIsbn('');
    setTitle('');
  };

  const handleDelete = (isbnToDelete) => {
    const filteredBooks = books.filter(book => book.isbn !== isbnToDelete);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
    setBooks(filteredBooks);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'books.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDetected = async (isbn) => {
    setIsbn(isbn);
    const fetchedTitle = await fetchBookTitle(isbn);
    // console.log(fetchedTitle);
    setTitle(fetchedTitle);
  };

  return (
    <div>
      <Scanner onDetected={handleDetected} />
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
      <button onClick={handleExport}>Export Books</button>
      <ul>
        {books.map(book => (
          <li key={book.isbn}>
            {book.title} (ISBN: {book.isbn})
            <button onClick={() => handleDelete(book.isbn)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookManager;