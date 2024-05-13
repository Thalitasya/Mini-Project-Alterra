import React, { useState, useEffect } from "react";
import MenuCard from "../layouts/MenuCard"; // Impor komponen MenuCard dari direktori layouts
import { supabase } from "../utils/supabase"; // Impor koneksi supabase dari utilitas supabase

// Komponen Menu adalah halaman yang menampilkan daftar menu kafe
const Menu = () => {
  const [menus, setMenus] = useState([]); // State untuk menyimpan daftar menu
  const [loading, setLoading] = useState(true); // State untuk menandai status loading

  useEffect(() => {
    fetchMenus(); // Memanggil fungsi fetchMenus saat komponen dimuat
  }, []);

  // Fungsi untuk mengambil daftar menu dari database Supabase
  const fetchMenus = async () => {
    try {
      const { data, error } = await supabase.from("menu").select("*"); // Memanggil API Supabase untuk mengambil data menu
      if (error) {
        throw error; // Melemparkan error jika terjadi kesalahan saat mengambil data
      }
      setMenus(data); // Mengatur state menus dengan data yang diambil dari API
      setLoading(false); // Mengubah status loading menjadi false setelah data berhasil diambil
    } catch (error) {
      console.error("Error fetching menus:", error.message); // Menampilkan pesan error jika terjadi kesalahan saat mengambil data
    }
  };

  // Menampilkan pesan loading jika data masih dimuat
  if (loading) {
    return <div>Loading...</div>;
  }

  // Menampilkan daftar menu
  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-semibold text-center mb-10 text-black">
        Our Menu
      </h1>
      {/* Menampilkan daftar menu dalam grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 text-black">
        {/* Melooping setiap menu dan menampilkan komponen MenuCard untuk setiap menu */}
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} /> // Menetapkan prop key dan menu untuk setiap MenuCard
        ))}
      </div>
    </div>
  );
};

export default Menu;
