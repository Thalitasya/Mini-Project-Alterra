import React, { useState } from "react";
import img1 from "../assets/img/menu1.jpg";
import img2 from "../assets/img/menu2.jpg";
import img3 from "../assets/img/menu3.jpg";
import img4 from "../assets/img/menu4.jpg";
import img5 from "../assets/img/menu5.jpg";
import img6 from "../assets/img/menu6.jpg";
import img7 from "../assets/img/menu7.jpg";
import img8 from "../assets/img/menu8.jpg";

import MenuCard from "../layouts/MenuCard";

const Menu = () => {
  const [menus, setMenus] = useState([
    { id: 1, img: img1, harga: "Espresso", product: "$2.99" },
    { id: 2, img: img2, harga: "Cappuccino", product: "$3.49" },
    { id: 3, img: img3, harga: "Latte", product: "$3.99" },
    { id: 4, img: img4, harga: "Americano", product: "$2.99" },
    { id: 5, img: img5, harga: "Macchiato", product: "$3.49" },
    { id: 6, img: img6, harga: "Doppio", product: "$2.99" },
    { id: 7, img: img7, harga: "Croissant", product: "$1.99" },
    { id: 8, img: img8, harga: "Donut", product: "$1.49" },
  ]);

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-white">
      <h1 className=" font-semibold text-center text-4xl mt-24 mb-8">
        Our Menu
      </h1>

      <div className=" flex flex-wrap pb-8 gap-8 justify-center">
        {menus.map((menu) => (
          <MenuCard key={menu.id} img={menu.img} title={menu.title} price={menu.price} />
        ))}
      </div>
    </div>
  );
};

export default Menu;