import React from "react";
import homeImage from "../assets/img/home.png"; // Impor gambar rumah dari direktori aset
import { Link as RouterLink } from "react-router-dom"; // Impor tautan sebagai RouterLink dari react-router-dom

// Komponen Home adalah halaman beranda dari situs web
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:px-28 px-8 gap-8 bg-gradient-to-r from-gray-300 to-gray-100 text-black">
      {/* Bagian pertama: Judul dan deskripsi */}
      <div className="w-full lg:w-2/4 space-y-4 mt-14 lg:mt-0">
        <h1 className="font-semibold text-5xl text-center lg:text-start leading-tight text-10xl">
          Welcome to LatiThara Cafe
        </h1>
        <p>
          Boost your productivity and build your mood with a glass of coffee in
          the morning
        </p>

        {/* Tombol tautan menu */}
        <div className="mt-4 py-8">
          <RouterLink
            to="/menu"
            className="flex-row bg-gradient-to-r from-purple-100 to-purple-300 text-black py-3 px-2 rounded-[20%]"
          >
            More Menu
          </RouterLink>
        </div>
      </div>

      {/* Bagian kedua: Gambar kafe dan informasi */}
      <div className="relative">
        <img src={homeImage} alt="Cafe" style={{ width: "500px" }} />

        {/* Informasi tambahan pada gambar */}
        <div className="absolute bg-white px-8 py-2 top-5 right-0 rounded-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <h2 className="font-semibold">14K</h2>
        </div>

        <div className="absolute bg-white px-8 py-2 bottom-0 -left-10 rounded-full">
          <h2 className="font-semibold">Cappuccino</h2>
        </div>
      </div>

      {/* Bagian ketiga: Lokasi toko */}
      <div className="mt-4">
        <img
          src="https://founterior.com/wp-content/uploads/2013/09/open-space-cafe-without-walls.jpg"
          alt="Map"
          className="rounded-lg"
        />
        <div className="mt-10 text-center">
          <h3 className="font-semibold">Our Store Location:</h3>
          <p>Jl. Raya Mawar No. 123, Surabaya</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
