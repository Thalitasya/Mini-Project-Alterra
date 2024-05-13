import React from "react";

// Komponen Footer merupakan bagian bawah dari halaman web, menyediakan informasi kontak dan tautan
const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-300 text-black mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        {/* Bagian pertama: Deskripsi Cafe */}
        <div className="w-full md:w-1/4">
          <h1 className="font-semibold text-xl pb-4">Latithara Cafe</h1>
          <p className="text-sm">
            Welcome to our coffee haven! Explore our aromatic brews, savor
            artisanal flavors, and discover the perfect roast to elevate your
            daily ritual.
          </p>
        </div>
        {/* Bagian kedua: Tautan */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              Menu
            </a>
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              About Us
            </a>
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              Products
            </a>
            {/* Tambahkan link untuk formulir kontak */}
            <a
              className="hover:text-white transition-all cursor-pointer hidden lg:inline-block"
              href="#contact"
            >
              Contact Us
            </a>
          </nav>
        </div>
        {/* Bagian ketiga: Menu */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              Cappuccino
            </a>
            <a
              className="hover:text-gray-500 transition-all cursor-pointer"
              href="/"
            >
              Latte
            </a>
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              Americano
            </a>
          </nav>
        </div>
        {/* Bagian keempat: Kontak */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              Latithara Cafe@email.com
            </a>
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              +84 958 248 966
            </a>
            <a
              className="hover:text-white transition-all cursor-pointer"
              href="/"
            >
              Social media
            </a>
          </nav>
        </div>
      </div>
      {/* Bagian bawah: Hak Cipta */}
      <div>
        <p className="text-center py-4">
          @copyright developed by
          <span className="text-backgroundColor"> {/* Latithara */}</span>| All
          rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
