import React from "react";
import Search from "./Search"; // ✅ import your functional Search component

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="w-full px-2 sm:px-10 py-2  --color-light-200 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between ">

      {/* Left: Logo */}
     <div className="w-28 h-auto">
  <img src="/bingeLogo.png" alt="Binge Watch Logo" className="w-full h-auto object-contain" />
</div>

      {/* Center: Functional Search Component */}
      <div className="hidden md:flex w-1/2 flex items-center ">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* ✅ functional search bar */}
      </div>

      {/* Right: Navigation Links and Login Button */}
      <div className="flex items-center gap-6 text-light-100 text-sm sm:text-base font-medium">
        {/* <a href="#" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">Top Rated</a>
        <a href="#" className="hover:text-white transition">Trending</a> */}
        <button className="bg-light-100 text-dark-100 px-4 py-2 rounded hover:bg-white transition">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
