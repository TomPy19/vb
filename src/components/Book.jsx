import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parse } from 'himalaya';

const Book = () => {
  const { isbn } = useParams();

  useEffect(() => {
    // fetch('https://www.googleapis.com/books/v1/volumes?key=AIzaSyCNatiMLRWBGs9j7du6D2XqGp1SQF-8Xoc&q=isbn:' + isbn)
    // .then(res => res.json())
    // .then((data) => {
    //   if (data.totalItems === 0) {
        // document.querySelector('#title').innerHTML = 'No book found';
        fetch('https://cors-anywhere.herokuapp.com/https://isbndb.com/book/'+isbn)
        // .then(res => parse(res))
        .then((data) => {
          data = data.text()
          .then(res => parse(res))
          .then((data) => {
            let inforow = data[2].children[3].children[5].children[29].children[3].children[7].children[7].children[1].children[1].children[1].children[1].children[1]
            let table = inforow.children[3]
            let title = table.children[1].children[1].children[3].children[0].content
            console.log(inforow.children[1].children[3].attributes[2].value)
            document.querySelector('#title').innerHTML = title;
          })
        })
        return;
      // }
    //   console.log(data)
    //   document.querySelector('#title').innerHTML = data.items[0].volumeInfo.title;
    // })

  }, []);

  return (
    <div>
      <button onClick={() => window.location.href = '/scan'}>Scan</button>
      <h1 id='title'></h1>
    </div>
  );
};

export default Book;