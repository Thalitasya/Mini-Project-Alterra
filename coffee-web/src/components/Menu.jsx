import React, { useState, useEffect } from "react";
import MenuCard from "../layouts/MenuCard";
import { supabase } from "./Lib/helper/supabaseClient";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, [refreshData]);

  async function fetchMenus() {
    try {
      const { data, error } = await supabase.from("menu").select("*");
      if (error) {
        throw error;
      }
      setMenus(data);
    } catch (error) {
      console.error("Error fetching menus:", error.message);
    }
  }

  const handleRefreshData = () => {
    setRefreshData(!refreshData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-white">
      <h1 className="font-semibold text-center text-4xl mt-24 mb-8">Our Menu</h1>
      <div className="flex flex-wrap pb-8 gap-8 justify-center">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} onRefreshData={handleRefreshData} />
        ))}
      </div>
    </div>
  );
};

export default Menu;