// Import React dan hooks yang diperlukan
import React, { createContext, useContext, useState } from "react";

// Membuat context untuk menyimpan status login
const AuthContext = createContext();

// Komponen AuthProvider untuk menyediakan status login kepada komponen-komponen di dalamnya
export const AuthProvider = ({ children }) => {
  // State untuk menyimpan status login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // Menyediakan nilai isLoggedIn dan setIsLoggedIn ke komponen-komponen di dalamnya
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook useAuth untuk mengakses nilai isLoggedIn dan setIsLoggedIn dari context AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
