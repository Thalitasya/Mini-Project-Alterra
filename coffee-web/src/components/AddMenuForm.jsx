import { useState } from "react";
import { supabase } from "../components/Lib/helper/supabaseClient";

export default function AddMenuForm() {
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    setErrorMessage(null);

    try {
      // Upload gambar ke penyimpanan Supabase
      let imageUrl = null;
      if (image) {
        const { data, error } = await supabase.storage
          .from("menu-images")
          .upload(`menu-images/${image.name}`, image);
        if (error) {
          throw error;
        }

        imageUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
      }

      // Simpan data menu ke database Supabase bersama dengan URL gambar
      const { data: menuData, error: menuError } = await supabase
        .from("menu")
        .insert([
          {
            menu_name: menuName,
            price: parseFloat(price),
            image_url: imageUrl,
          },
        ]);

      if (menuError) {
        throw menuError;
      }

      // Reset form setelah berhasil menambahkan menu
      setMenuName("");
      setPrice("");
      setImage(null);
      alert("Menu added successfully!");
    } catch (error) {
      console.error("Error adding menu:", error.message);
      setErrorMessage("Failed to add menu. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="menuName"
              className="block text-gray-700 font-bold mb-2"
            >
              Menu Name
            </label>
            <input
              type="text"
              id="menuName"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isUploading}
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Adding..." : "Add Menu"}
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
