export const fetchBookTitle = async (isbn) => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://isbndb.com/book/' + isbn);
  const data = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  let fullTitle = doc.querySelector('title').textContent;
  const cover = doc.querySelector('object').getAttribute('data');

  // Remove the "| ISBNdb" part
  let bookTitle = fullTitle.split('|')[0].trim();
  let cleanTitle = bookTitle.replace(/\s*\(\d+\)$/, '').trim();

  return { title: cleanTitle, cover };
};