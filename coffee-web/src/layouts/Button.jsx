import React from "react";

// Komponen Button adalah tombol yang dapat digunakan di berbagai bagian aplikasi
const Button = (props) => {
  return (
    <button className="px-6 py-1 border-2 border-gray-200 bg-gray-400 text-black hover:text-white hover:bg-gray-500 transition-all rounded-full">
      {props.title}{" "}
      {/* Menampilkan teks tombol yang diterima dari properti title */}
    </button>
  );
};

export default Button; // Ekspor komponen Button agar bisa digunakan di tempat lain
