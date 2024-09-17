import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categoryproducts">Products</Link>
        </li>
        <li>
          <Link to="/customerinfo">Customer Info</Link>
        </li>
        <li>
          <Link to="/ordersbystatus">Orders By Status</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
