import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const MenuCard = (props) => {
  return (
    <div className=" w-full lg:w-1/4 bg-white p-3 rounded-lg">
      <div>
        <img className=" rounded-xl" src={props.img} alt="img1" />
      </div>
      <div className=" p-2 mt-5">
        <div className=" flex flex-row justify-between">
          <h3 className=" font-semibold text-xl">{props.title}</h3>
          <h3 className=" font-semibold text-xl">{props.value}</h3>
        </div>
        <div className=" flex flex-row justify-between mt-3">
          <div className=" flex gap-2">
          <button className="px-3 text-sm border-2 border-purple-500 bg-purple-200 hover:text-white hover:bg-purple-500 transition-all rounded-lg">
              Hot
            </button>
            <button className="px-3 text-sm border-2 border-pink-500 bg-pink-200 hover:text-white hover:bg-pink-500 transition-all rounded-lg">
              Cold
            </button>
          </div>
          <span className="flex items-center bg-gray-400 px-3 py-2 rounded-full cursor-pointer">
            <FaShoppingCart size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
