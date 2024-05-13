import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiCoffeescript } from "react-icons/si";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";

// Komponen Navbar
const Navbar = ({ setLoggedIn }) => {
  const [menu, setMenu] = useState(false); // State untuk menentukan apakah menu dropdown terbuka atau tertutup

  // Fungsi untuk mengubah status menu dropdown
  const toggleMenu = () => {
    setMenu(!menu);
  };

  // Fungsi untuk menutup menu dropdown
  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="w-full mx-auto">
      {/* Bagian atas Navbar */}
      <div className="flex justify-between p-5 lg:px-8 px-5 bg-gradient-to-r from-purple-100 to-purple-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* Logo dan nama kafe */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-yellow-900">
            <SiCoffeescript size={25} /> 
          </span>
          <h1 className="text-xl font-semibold text-black">Latithara Cafe</h1> 
        </div>

        {/* Navigasi desktop */}
        <nav className="hidden md:flex items-center text-lg font-medium gap-6 text-black">
          {/* Link-menu */}
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
          {/* Link-link lainnya */}
          <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink>
          <NavLink to="/customerservice" onClick={closeMenu}>Customer Services</NavLink>
          <NavLink to="/answer" onClick={closeMenu}>Feedback Customer</NavLink>
          <NavLink to="/admin">Admin Login</NavLink>
        </nav>

        {/* Tombol menu dropdown untuk tampilan mobile */}
        <div className="md:hidden flex items-center">
          {menu ? (
            <AiOutlineClose size={25} onClick={toggleMenu} className="text-black" />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={toggleMenu} className="text-black" />
          )}
        </div>
      </div>
      {/* Menu dropdown untuk tampilan mobile */}
      <div className={` ${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-white text-black left-0 top-16 font-semibold text-base text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}>
        {/* Link-menu untuk tampilan mobile */}
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
        {/* Link-link lainnya untuk tampilan mobile */}
        <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink>
        <NavLink to="/customerservice" onClick={closeMenu}>Customer Services</NavLink>
        <NavLink to="/answer" onClick={closeMenu}>Feedback Customer</NavLink>
        <NavLink to="/admin" onClick={closeMenu}>Admin Login</NavLink>
      </div>
    </div>
  );
};

// Komponen NavLink untuk membuat link dengan perilaku tertentu
const NavLink = ({ to, children, onClick }) => {
  return (
    <Link to={to} className="group relative inline-block cursor-pointer hover:text-gray-600 text-base" onClick={onClick}>
      {children}
    </Link>
  );
};

export default Navbar;
