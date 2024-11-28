import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onSearch }) {
  
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (onSearch && searchQuery.trim()) {
  //     onSearch(searchQuery);
  //   }
  // };
  
  return (
    <nav className="bg-[#fdf2f2] p-4">
      <div className="container mx-32 flex justify-between items-center">
        {/* Flex container for Logo and Search Bar */}
        <div className="flex items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-black font-roboto font-medium text-lg mr-4"
          >
            MedicineShop
          </Link>

          {/* Search Bar */}
          {/* <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search for medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-1 text-sm rounded-l-md border w-40" // Adjusted padding and width
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-1 text-sm rounded-r-md" // Adjusted padding and text size
            >
              Search
            </button>
          </form> */}
        </div>

        {/* Links */}
        <div className="mx-60">
          <Link
            to="/cart"
            className="text-black text-base font-lato mx-4 hover:text-blue-600 hove:none transition duration-300 ease-in-out"
          >
            How to order medicines
          </Link>
          <Link
            to="/admin"
            className="text-black text-base font-lato mx-4 hover:text-blue-600 hove:none transition duration-300 ease-in-out"
          >
            Contact us
          </Link>
          <Link
            to="/admin"
            className="text-black text-base font-lato mx-4 hover:text-blue-600 hove:none transition duration-300 ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
