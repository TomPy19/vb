import { useState, useEffect, useMemo } from 'react';
import Scanner from './Scanner';
import { fetchBookTitle } from '../utils/fetchBookTitle';

function BookManager() {
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    setBooks(savedBooks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = { isbn, title, cover };
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
      setEditIndex(null);
    } else {
      const newBook = { isbn, title, cover };
      const updatedBooks = [...books, newBook];
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
    }
    setIsbn('');
    setTitle('');
    setCover('');
  };

  const handleDelete = (isbnToDelete) => {
    const filteredBooks = books.filter(book => book.isbn !== isbnToDelete);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
    setBooks(filteredBooks);
  };

  const handleEdit = (isbnToEdit) => {
    const bookToEdit = books.find(book => book.isbn === isbnToEdit);
    const index = books.findIndex(book => book.isbn === isbnToEdit);
    setEditIndex(index);
    setIsbn(bookToEdit.isbn);
    setTitle(bookToEdit.title);
    setCover(bookToEdit.cover);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setIsbn('');
    setTitle('');
    setCover('');
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
    const { title, cover } = await fetchBookTitle(isbn);
    setTitle(title);
    setCover(cover);
  };

  const handleSearch = async () => {
    if (isbn) {
      const { title, cover } = await fetchBookTitle(isbn);
      setTitle(title);
      setCover(cover);
    }
  };

  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => a.title.localeCompare(b.title));
  }, [books]);

  const memoizedScanner = useMemo(() => {
    return <Scanner onDetected={handleDetected} />;
  }, []);

  return (
    <div>
      {memoizedScanner}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='ISBN'
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button type='button' onClick={handleSearch}>Search</button>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Cover Image URL'
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <button type='submit'>{editIndex !== null ? 'Save Changes' : 'Add Book'}</button>
        {editIndex !== null && <button type='button' onClick={handleCancel}>Cancel</button>}
      </form>
      <button onClick={handleExport}>Export Books</button>
      <ul>
        {sortedBooks.map((book) => (
          <li key={book.isbn}>
            <img src={book.cover} alt={book.title} width="50" style={{ paddingRight: '10px' }} />
            {book.title} (ISBN: {book.isbn})
            <button onClick={() => handleEdit(book.isbn)}>Edit</button>
            <button onClick={() => handleDelete(book.isbn)}>Delete</button>
            <button onClick={() => window.open(`https://isbndb.com/book/${book.isbn}`, '_blank')}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookManager;