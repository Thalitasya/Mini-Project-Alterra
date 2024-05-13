import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase"; // Mengimpor instance Supabase

// Komponen MenuPage digunakan untuk menampilkan daftar menu dari database Supabase
const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]); // State untuk menyimpan daftar menu

  // Menggunakan useEffect untuk mengambil data menu dari Supabase saat komponen dimuat
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Mengambil data menu dari tabel "menu" menggunakan Supabase client
        const { data: menuItems, error } = await supabase.from("menu").select();

        // Memperbarui state menuItems dengan data yang diperoleh
        if (error) {
          throw error;
        }
        setMenuItems(menuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error.message);
      }
    };
    fetchMenuItems(); // Memanggil fungsi fetchMenuItems saat komponen dimuat
  }, []); // Array kosong sebagai dependensi, menjadikan efek ini dijalankan sekali saat komponen dimuat

  return (
    <div>
      {/* Judul halaman */}
      <h1>Menu</h1>
      {/* Tabel untuk menampilkan daftar menu */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Gambar</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {/* Menggunakan map untuk menampilkan setiap item menu */}
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_name}</td>
              <td>
                {/* Menampilkan gambar menu */}
                <img src={item.images} alt={item.product_name} width="100" />
              </td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuPage; // Ekspor komponen MenuPage untuk digunakan di aplikasi lain
