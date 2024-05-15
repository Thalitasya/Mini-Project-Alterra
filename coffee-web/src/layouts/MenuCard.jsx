import React from "react";

// Komponen MenuCard digunakan untuk menampilkan detail dari sebuah menu
const MenuCard = ({ menu }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      {/* Gambar menu */}
      <img
        className="w-full h-72 object-cover"
        src={menu.images} // URL gambar menu dari properti menu.images
        alt={menu.product_name} // Nama menu sebagai teks alternatif
      />
      <div className="px-6 py-4 bg-gray-200">
        {/* Nama menu */}
        <div className="font-bold text-xl mb-2">{menu.product_name}</div>
        {/* Harga menu */}
        <p className="text-gray-700 text-base">Harga: Rp. {menu.price}</p>
      </div>
    </div>
  );
};

export default MenuCard; 
