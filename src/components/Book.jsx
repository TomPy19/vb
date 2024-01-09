import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Book = () => {
  const { isbn } = useParams();

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?key=AIzaSyCNatiMLRWBGs9j7du6D2XqGp1SQF-8Xoc&q=isbn:' + isbn)
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      document.querySelector('#title').innerHTML = data.items[0].volumeInfo.title;
    })

  }, []);

  return (
    <div>
      <h1 id='title'></h1>
    </div>
  );
};

export default Book;