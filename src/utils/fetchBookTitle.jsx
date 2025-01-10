// Function to fetch book title and cover image using ISBN
export const fetchBookTitle = async (isbn) => {
  // Fetch the book data from the ISBNdb website using a proxy to bypass CORS restrictions
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://isbndb.com/book/' + isbn);
  
  // Parse the response text as HTML
  const data = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  
  // Extract the full title from the <title> tag
  let fullTitle = doc.querySelector('title').textContent;
  
  // Extract the cover image URL from the <object> tag's data attribute
  const cover = doc.querySelector('object').getAttribute('data');

  // Remove the "| ISBNdb" part from the title
  let bookTitle = fullTitle.split('|')[0].trim();
  
  // Remove any trailing numbers in parentheses from the title
  let cleanTitle = bookTitle.replace(/\s*\(\d+\)$/, '').trim();

  // Return the cleaned title and cover image URL
  return { title: cleanTitle, cover };
};