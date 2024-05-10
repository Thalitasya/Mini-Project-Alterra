import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const MenuCard = ({ menu, onRefreshData }) => {
  const handleRefresh = () => {
    onRefreshData();
  };

  return (
    <div className="w-full lg:w-1/4 bg-gray-400 p-3 rounded-lg">
      <div>
        <img
          className="rounded-xl"
          src={`https://sksjsvotnzydxcjfanxn.supabase.co/storage/v1/object/public/${menu.image_url}`}
          alt={menu.menu_name}
        />
      </div>
      <div className="p-2 mt-5">
        <div className="flex flex-row justify-between">
          <h3 className="font-semibold text-xl">{menu.menu_name}</h3>
          <h3 className="font-semibold text-xl">{menu.price}</h3>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <span
            className="flex items-center bg-white px-3 py-2 rounded-full cursor-pointer"
            onClick={handleRefresh}
          >
            <FaShoppingCart size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;