import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookTitle } from '../utils/fetchBookTitle';

const Book = () => {
  const { isbn } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const getTitle = async () => {
      const cleanTitle = await fetchBookTitle(isbn);
      setTitle(cleanTitle);
    };

    getTitle();
  }, [isbn]);

  return (
    <div>
      <button onClick={() => window.location.href = '/scan'}>Scan</button>
      <h1 id='title'>{title}</h1>
    </div>
  );
};

export default Book;