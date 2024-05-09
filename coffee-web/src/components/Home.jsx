import React from "react";
import img from "../assets/img/home.png";
import Button from "../layouts/Button";

const Home = () => {
  const handleStoreLocationClick = () => {
    //  klik tombol "Store Location"
    console.log("Tombol Store Location diklik!");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:px-32 px-5 gap-10 bg-gradient-to-r from-gray-300 to-gray-100">
      <div className=" w-full lg:w-2/4 space-y-4 mt-14 lg:mt-0">
        <h1 className="font-semibold text-5xl text-center lg:text-start leading-tight">
          Start your day with a steaming cup of coffee
        </h1>
        <p>
          Boost your productivity and build your mood with a glass of coffee in
          the morning
        </p>

        <div className=" flex flex-row gap-6">
          <Button title="MORE MENU" />
        </div>
      </div>

      <div className="relative">
        <img src={img} alt="img" />

        <div className=" absolute bg-white px-8 py-2 top-5 right-0 rounded-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <h2 className=" font-semibold">14K</h2>
        </div>

        <div className=" absolute bg-white px-8 py-2 bottom-0 -left-10 rounded-full">
          <h2 className=" font-semibold">Cappuccino</h2>
        </div>
      </div>

  
      <div className="mt-4 text-center">
        <h3 className="font-semibold">Our Store Location:</h3>
        <p>Jl. Raya Blablabla No. 123, Surabaya</p>
      </div>

      
      <div className="mt-4">
        <img src="https://founterior.com/wp-content/uploads/2013/09/open-space-cafe-without-walls.jpg" alt="Map" className="rounded-lg"/>
      </div>
    </div>
  );
};

export default Home;
