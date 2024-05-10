// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiCoffeescript } from "react-icons/si";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";

const Navbar = ({ setLoggedIn }) => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="fixed w-full z-10">
      <div>
        <div className="flex justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-purple-100 to-purple-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>
              <SiCoffeescript size={25} />
            </span>
            <h1 className="text-xl font-semibold">Latithara Cafe</h1>
          </div>

          <nav className="hidden md:flex items-center text-lg font-medium gap-8">
            <Link to="/" className="group relative inline-block cursor-pointer hover:text-gray-500 text-base">Home</Link>
            <Link to="/menu" className="group relative inline-block cursor-pointer hover:text-gray-700 text-base">Menu</Link>
            <Link to="/about" className="group relative inline-block cursor-pointer hover:text-gray-600 text-base">About Us</Link>
            <Link to="/contact" className="group relative inline-block cursor-pointer hover:text-gray-600 text-base">Contact Us</Link>
            <Link to="/customerservice" className="group relative inline-block cursor-pointer hover:text-gray-600 text-base">Customer Services</Link>
            <Link to="/answer" className="group relative inline-block cursor-pointer hover:text-gray-600 text-base">Answers</Link>
            <Link to="/admin" className="group relative inline-block cursor-pointer hover:text-gray-600 lg:inline-block text-base">Admin</Link>
          </nav>

          <div className="md:hidden flex items-center">
            {menu ? <AiOutlineClose size={25} onClick={handleChange} /> : <AiOutlineMenuUnfold size={25} onClick={handleChange} />}
          </div>
        </div>

        <div className={` ${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-white text-black left-0 top-16 font-semibold text-base text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}>
          <Link to="/" className="hover:text-pink-500 transition-all cursor-pointer text-base" onClick={closeMenu}>Home</Link>
          <Link to="/menu" className="hover:text-pink-500 transition-all cursor-pointer text-base" onClick={closeMenu}>Menu</Link>
          <Link to="/about" className="hover:text-pink-500 transition-all cursor-pointer text-base" onClick={closeMenu}>About Us</Link>
          <Link to="/contact" className="hover:text-pink-500 transition-all cursor-pointer text-base" onClick={closeMenu}>Contact Us</Link>
          <Link to="/customerservice" className="hover:text-pink-500 transition-all cursor-pointer text-base" onClick={closeMenu}>Customer Services</Link>
          <Link to="/answer" className="hover:text-pink-500 transition-all cursor-pointer text-base" onClick={closeMenu}>Answers</Link>
          <Link to="/admin" className="hover:text-pink-500 transition-all cursor-pointer text-base" onClick={closeMenu}>Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
