import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="bg-blue-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Flex container for Logo and Search Bar */}
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="text-black font-roboto font-medium text-2xl mr-4">
            MedicineShop
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search for medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-l-md border"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">
              Search
            </button>
          </form>
        </div>

        {/* Links */}
        <div>
          <Link
            to="/cart"
            className="text-black text-lg font-lato mx-4 hover:text-blue-600 hover:underline transition duration-300 ease-in-out"
          >
            Cart
          </Link>
          <Link
            to="/admin"
            className="text-black text-lg font-lato hover:text-blue-600 hover:underline transition duration-300 ease-in-out"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
