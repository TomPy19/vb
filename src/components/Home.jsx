import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Book Manager</h1>
      <nav>
        <ul>
          <li><Link to="/scan">Scan a Book</Link></li>
          <li><Link to="/books">Manage Books</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;