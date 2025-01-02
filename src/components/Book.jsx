import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parse } from 'himalaya';

const Book = () => {
  const { isbn } = useParams();

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://isbndb.com/book/'+isbn)
    .then(res => res.text())
    .then((data) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(data, 'text/html')
      let fullTitle = doc.querySelector('title').textContent;

      // Remove the "| ISBNdb" part
      let bookTitle = fullTitle.split('|')[0].trim();
      let cleanTitle = bookTitle.replace(/\s*\(\d+\)$/, '').trim();

      document.querySelector('#title').innerHTML = cleanTitle;
      console.log(cleanTitle)
    })
    return;

  }, []);

  return (
    <div>
      <button onClick={() => window.location.href = '/scan'}>Scan</button>
      <h1 id='title'></h1>
    </div>
  );
};

export default Book;