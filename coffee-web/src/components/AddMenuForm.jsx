import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi URL dan kunci anonim Supabase
const supabaseUrl = "https://sksjsvotnzydxcjfanxn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc2pzdm90bnp5ZHhjamZhbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNjE3NDMsImV4cCI6MjAzMDczNzc0M30.MNUSc9iuL2-pyi0Vk8syeZzke9g6X2sZ8HrupWfZ7Hk"; // Ganti dengan kunci anonim Supabase Anda
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AddMenuForm = () => {
  // State untuk menyimpan daftar menu
  const [menus, setMenus] = useState([]);
  // State untuk menyimpan nama produk yang sedang dimasukkan
  const [productName, setProductName] = useState("");
  // State untuk menyimpan URL gambar yang dipilih
  const [images, setImages] = useState([]);
  // State untuk menyimpan harga produk yang dimasukkan
  const [price, setPrice] = useState("");
  // State untuk menyimpan file yang dipilih
  const [selectedFiles, setSelectedFiles] = useState([]);
  // State untuk menyimpan menu yang sedang diedit
  const [editingMenu, setEditingMenu] = useState(null);

  //  Untuk memuat daftar menu saat komponen dimuat
  useEffect(() => {
    fetchMenus();
  }, []);

  // Fungsi untuk mengambil daftar menu dari Supabase
  const fetchMenus = async () => {
    try {
      const { data, error } = await supabase.from("menu").select("*");
      if (error) {
        console.error("Error fetching menus:", error.message);
      } else {
        setMenus(data);
      }
    } catch (error) {
      console.error("Error fetching menus:", error.message);
    }
  };

  // Fungsi untuk menangani perubahan file yang dipilih
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle editing existing menu
      if (editingMenu) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const { data, error: uploadError } = await supabase.storage
            .from("image_menu")
            .upload(`${productName}-${Date.now()}`, file);

          if (uploadError) {
            console.error("Error uploading file:", uploadError.message);
          } else {
            return `${supabaseUrl}/storage/v1/object/public/image_menu/${data.path}`;
          }
        });

        const imageUrls = await Promise.all(uploadPromises);
        const updatedMenu = {
          ...editingMenu,
          product_name: productName,
          images: imageUrls[0],
          price: parseFloat(price),
        };

        const { error: updateError } = await supabase
          .from("menu")
          .update(updatedMenu)
          .eq("id", editingMenu.id);

        if (updateError) {
          console.error("Error updating menu:", updateError.message);
        } else {
          setEditingMenu(null);
        }
      } else {
        // Handle adding new menu
        const uploadPromises = selectedFiles.map(async (file) => {
          const { data, error: uploadError } = await supabase.storage
            .from("image_menu")
            .upload(`${productName}-${Date.now()}`, file);

          if (uploadError) {
            console.error("Error uploading file:", uploadError.message);
          } else {
            return `${supabaseUrl}/storage/v1/object/public/image_menu/${data.path}`;
          }
        });

        const imageUrls = await Promise.all(uploadPromises);

        const { error: insertError } = await supabase.from("menu").insert([
          {
            product_name: productName,
            images: imageUrls[0],
            price: parseFloat(price),
          },
        ]);

        if (insertError) {
          console.error("Error inserting menu:", insertError.message);
        }
      }

      // Reset form state after successful form submission
      setProductName("");
      setImages([]);
      setPrice("");
      setSelectedFiles([]);
      fetchMenus();
    } catch (error) {
      console.error("Error handling form submission:", error.message);
    }
  };

  // Fungsi untuk menangani penghapusan menu
  const handleDelete = async (id, imagePath) => {
    try {
      const { error: deleteError } = await supabase
        .from("menu")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Error deleting menu:", deleteError.message);
      } else {
        const filename = imagePath.split("/").pop();
        const { error: removeError } = await supabase.storage
          .from("image_menu")
          .remove([filename]);

        if (removeError) {
          console.error(
            "Error removing file from storage:",
            removeError.message
          );
        } else {
          fetchMenus();
        }
      }
    } catch (error) {
      console.error("Error deleting menu and associated file:", error.message);
    }
  };

  // Fungsi untuk menangani pengeditan menu
  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setProductName(menu.product_name);
    setImages([menu.images]);
    setPrice(menu.price.toString());
  };

  // Fungsi untuk membatalkan pengeditan
  const handleCancelEdit = () => {
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
