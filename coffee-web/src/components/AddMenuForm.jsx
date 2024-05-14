import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi URL dan kunci anonim Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AddMenuForm = () => {
  // State untuk menyimpan daftar menu, harga, gambar, menyimpan file yang dipilih, menu yang diedit
  const [menus, setMenus] = useState([]);
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);

  //Untuk memuat daftar menu saat komponen dimuat
  useEffect(() => {
    fetchMenus();
  }, []);

  // Fungsi untuk mengambil daftar menu dari Supabase
  const fetchMenus = async () => {
    try {
      //Mengambil data dari tabel menu di supabase
      const { data, error } = await supabase.from("menu").select("*");
      //Check apakah ada error saat mengambil data
      if (error) {
        //Jika error akan muncul ke konsol
        console.error("Error fetching menus:", error.message);
      } else {
        // Jika tidak ada error, mengatur data yang diambil ke dalam state menus
        setMenus(data);
      }
    } catch (error) {
      // Menangani kesalahan yang terjadi di luar konteks Supabase (misalnya masalah jaringan)
      console.error("Error fetching menus:", error.message);
    }
  };

  // Fungsi handle file gambar ketika di upload ke supabase berupa file
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Mengatur array file yang dipilih ke dalam state selectedFiles
    setSelectedFiles(files);
    // Membuat URL objek untuk setiap file yang dipilih dan menyimpannya dalam array urls
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault(); //Mencegah saat reload halaman

    try {
      // Jika sedang mengedit menu yang ada
      if (editingMenu) {
        // Mengunggah file gambar yang dipilih
        const uploadPromises = selectedFiles.map(async (file) => {
          const { data, error: uploadError } = await supabase.storage
            .from("image_menu")
            .upload(`${productName}-${Date.now()}`, file); // Mengunggah file ke Supabase Storage

          if (uploadError) {
            // Jika terjadi kesalahan saat mengunggah
            console.error("Error uploading file:", uploadError.message);
          } else {
            // Mengembalikan URL publik dari gambar yang diunggah
            return `${supabaseUrl}/storage/v1/object/public/image_menu/${data.path}`;
          }
        });

        // Menunggu semua file selesai diunggah
        const imageUrls = await Promise.all(uploadPromises);
        // Menyiapkan objek menu yang diperbarui
        const updatedMenu = {
          ...editingMenu,
          product_name: productName,
          images: imageUrls[0], // Menggunakan URL gambar pertama
          price: parseFloat(price),
        };

        // Memperbarui menu di database
        const { error: updateError } = await supabase
          .from("menu")
          .update(updatedMenu)
          .eq("id", editingMenu.id);

        if (updateError) {
          // Jika terjadi kesalahan saat memperbarui
          console.error("Error updating menu:", updateError.message);
        } else {
          // Mengatur ulang state editingMenu jika berhasil
          setEditingMenu(null);
        }
      } else {
        // Jika menambahkan menu baru
        // Mengunggah file gambar yang dipilih
        const uploadPromises = selectedFiles.map(async (file) => {
          const { data, error: uploadError } = await supabase.storage
            .from("image_menu")
            .upload(`${productName}-${Date.now()}`, file);

          if (uploadError) {
            // Jika terjadi kesalahan saat mengunggah
            console.error("Error uploading file:", uploadError.message);
          } else {
            // Mengembalikan URL publik dari gambar yang diunggah
            return `${supabaseUrl}/storage/v1/object/public/image_menu/${data.path}`;
          }
        });

        // Menunggu semua file selesai diunggah
        const imageUrls = await Promise.all(uploadPromises);
        // Menyisipkan menu baru ke database
        const { error: insertError } = await supabase.from("menu").insert([
          {
            product_name: productName,
            images: imageUrls[0], // Menggunakan URL gambar pertama
            price: parseFloat(price), // Mengonversi harga menjadi angka
          },
        ]);

        if (insertError) {
          // Jika terjadi kesalahan saat menyisipkan
          console.error("Error inserting menu:", insertError.message);
        }
      }

      // Mengatur ulang state form setelah pengiriman berhasil
      setProductName("");
      setImages([]);
      setPrice("");
      setSelectedFiles([]);
      fetchMenus(); // Memperbarui daftar menu
    } catch (error) {
      // Menangani kesalahan umum saat pengiriman form
      console.error("Error handling form submission:", error.message);
    }
  };

  // Fungsi untuk menangani penghapusan menu
  const handleDelete = async (id, imagePath) => {
    try {
      // Menghapus menu dari database berdasarkan ID
      const { error: deleteError } = await supabase
        .from("menu")
        .delete()
        .eq("id", id);

      if (deleteError) {
        // Jika terjadi kesalahan saat menghapus menu
        console.error("Error deleting menu:", deleteError.message);
      } else {
        // Mengambil nama file dari path URL
        const filename = imagePath.split("/").pop();
        // Menghapus file gambar dari storage
        const { error: removeError } = await supabase.storage
          .from("image_menu")
          .remove([filename]);

        if (removeError) {
          // Jika terjadi kesalahan saat menghapus file gambar
          console.error(
            "Error removing file from storage:",
            removeError.message
          );
        } else {
          fetchMenus(); // Memperbarui daftar menu
        }
      }
    } catch (error) {
      // Menangani kesalahan umum saat penghapusan menu dan file terkait
      console.error("Error deleting menu and associated file:", error.message);
    }
  };

  // Fungsi untuk menangani pengeditan menu
  const handleEdit = (menu) => {
    setEditingMenu(menu);
    // Mengatur state form dengan data menu yang akan diedit
    setProductName(menu.product_name);
    setImages([menu.images]);
    setPrice(menu.price.toString());
  };

  // Fungsi untuk membatalkan pengeditan
  const handleCancelEdit = () => {
    // Mengatur ulang state form
    setEditingMenu(null);
    setProductName("");
    setImages([]);
    setPrice("");
  };

  return (
    <div className="bg-white w-full min-h-screen p-10">
      <div className="mx-auto max-w-4xl text-black bg-white">
        <h1 className="mt-4 mb-4 font-bold text-2xl text-center">
          Daftar Menu
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-4 mt-8 p-10 bg-gray-200 rounded-lg"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nama Produk"
              className="p-2 border border-gray-300 rounded bg-white"
            />
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileChange(e)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Harga"
              className="p-2 border border-gray-300 rounded bg-white"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
              >
                {editingMenu ? "Perbarui" : "Kirim"}
              </button>
              {editingMenu && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </form>
        <table className="w-full mb-[30%] rounded-lg bg-gray-200 mx-auto ">
          <thead>
            <tr className="border-b border-black text-center">
              <th className="px-4 py-2">Nama Produk</th>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr
                key={menu.id}
                className="border-b hover:bg-gray-100 transition-colors duration-300 mb-2 border-black"
              >
                <td className="px-4 py-2 font-semibold text-center">
                  {menu.product_name}
                </td>
                <td className="px-4 py-2 flex justify-center items-center">
                  <img
                    src={menu.images}
                    alt={menu.product_name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2 font-semibold text-center">
                  Rp {menu.price.toLocaleString()}
                </td>
                <td>
                  <div className="bg-gray-200">
                    <button
                      onClick={() => handleEdit(menu)}
                      className="bg-green-200 py-2 px-8 rounded-l-lg hover:bg-green-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id, menu.images)}
                      className="bg-red-500 py-2 px-4 rounded-r-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddMenuForm;
