import React, { useState } from "react";
import supabase from "./Supabaseclient";

export default function AddMenuForm() {
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuImage, setMenuImage] = useState(null);

  const handleMenuNameChange = (e) => {
    setMenuName(e.target.value);
  };

  const handleMenuPriceChange = (e) => {
    setMenuPrice(e.target.value);
  };

  const handleMenuImageChange = (e) => {
    const file = e.target.files[0];
    setMenuImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data menu yang diisi dan gambar yang diunggah
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Menu
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="Product"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Product"
                  id="Product"
                  autoComplete="given-name"
                  value={menuName}
                  onChange={handleMenuNameChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Harga"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Harga
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Harga"
                  id="Harga"
                  autoComplete="family-name"
                  value={menuPrice}
                  onChange={handleMenuPriceChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="menuImage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gambar Menu
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  name="menuImage"
                  id="menuImage"
                  onChange={handleMenuImageChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-6 sm:col-span-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
