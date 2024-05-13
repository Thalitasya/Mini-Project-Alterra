import React, { useState } from "react";
import { Link } from "react-router-dom"; // Impor komponen Link dari react-router-dom
import { SiCoffeescript } from "react-icons/si"; // Impor ikon dari react-icons
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai"; // Impor ikon dari react-icons

// Komponen Navbar adalah navigasi di bagian atas halaman
const Navbar = ({ setLoggedIn }) => {
  const [menu, setMenu] = useState(false); // State untuk menentukan apakah menu dropdown terbuka atau tertutup

  // Fungsi untuk mengubah status menu dropdown
  const handleChange = () => {
    setMenu(!menu); // Mengubah nilai state menu menjadi kebalikan dari nilai sebelumnya
  };

  // Fungsi untuk menutup menu dropdown
  const closeMenu = () => {
    setMenu(false); // Mengatur nilai state menu menjadi false
  };

  return (
    <div className="w-full mx-auto">
      {/* Bagian atas Navbar */}
      <div className="flex justify-between p-5 lg:px-8 px-5 bg-gradient-to-r from-purple-100 to-purple-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* Logo dan nama kafe */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-yellow-900">
            <SiCoffeescript size={25} /> {/* Ikon kopi */}
          </span>
          <h1 className="text-xl font-semibold text-black">Latithara Cafe</h1>{" "}
          {/* Nama kafe */}
        </div>

        {/* Navigasi desktop */}
        <nav className="hidden md:flex items-center text-lg font-medium gap-6 text-black">
          {/* Link-menu */}
          <Link
            to="/"
            className="group relative inline-block cursor-pointer hover:text-gray-600 text-base"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="group relative inline-block cursor-pointer hover:text-gray-600 text-base"
          >
            Menu
          </Link>
          {/* Link-link lainnya */}
          <Link
            to="/about"
            className="group relative inline-block cursor-pointer hover:text-gray-600 text-base"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="group relative inline-block cursor-pointer hover:text-gray-600 text-base"
          >
            Contact Us
          </Link>
          <Link
            to="/customerservice"
            className="group relative inline-block cursor-pointer hover:text-gray-600 text-base"
          >
            Customer Services
          </Link>
          <Link
            to="/answer"
            className="group relative inline-block cursor-pointer hover:text-gray-600 text-base"
          >
            Feedback Customer
          </Link>
          <Link
            to="/admin"
            className="group relative inline-block cursor-pointer hover:text-gray-600 lg:inline-block text-base"
          >
            Admin Login
          </Link>
        </nav>

        {/* Tombol menu dropdown untuk tampilan mobile */}
        <div className="md:hidden flex items-center">
          {menu ? ( // Jika menu terbuka, tampilkan ikon close, jika tidak, tampilkan ikon menu
            <AiOutlineClose size={25} onClick={handleChange} />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
          )}
        </div>
      </div>
      {/* Menu dropdown untuk tampilan mobile */}
      <div
        className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } lg:hidden flex flex-col absolute bg-white text-black left-0 top-16 font-semibold text-base text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
      >
        {/* Link-menu untuk tampilan mobile */}
        <Link
          to="/"
          className="hover:text-gray-600 transition-all cursor-pointer text-base"
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/menu"
          className="hover:text-gray-600 transition-all cursor-pointer text-base"
          onClick={closeMenu}
        >
          Menu
        </Link>
        {/* Link-link lainnya untuk tampilan mobile */}
        <Link
          to="/about"
          className="hover:text-gray-600 transition-all cursor-pointer text-base"
          onClick={closeMenu}
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="hover:text-gray-600 transition-all cursor-pointer text-base"
          onClick={closeMenu}
        >
          Contact Us
        </Link>
        <Link
          to="/customerservice"
          className="hover:text-gray-600 transition-all cursor-pointer text-base"
          onClick={closeMenu}
        >
          Customer Services
        </Link>
        <Link
          to="/answer"
          className="hover:text-gray-600 transition-all cursor-pointer text-base"
          onClick={closeMenu}
        >
          Feedback Customer
        </Link>
        <Link
          to="/admin"
          className="hover:text-gray-600 transition-all cursor-pointer text-base"
          onClick={closeMenu}
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
