import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  // State untuk menyimpan nilai input username
  const [username, setUsername] = useState("");
  // State untuk menyimpan nilai input password
  const [password, setPassword] = useState("");
  // State untuk menentukan apakah password ditampilkan atau tidak
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk mengganti tampilan password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fungsi untuk menangani login admin
  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah perilaku default dari form submit

    // Memeriksa login
    if (username === "admin" && password === "admin") {
      // Set status login ke local storage
      localStorage.setItem("isLoggedIn", true);
      setLoggedIn(true);
      // Redirect ke halaman AddMenuForm setelah login berhasil
      navigate("/addmenuform");
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-black bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Judul halaman */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tigh">
          Admin Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-200 px-10 py-10 rounded-lg">
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Input username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 bg-white p-2"
              />
            </div>
          </div>

          {/* Input password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 bg-white p-2"
              />
              {/* Tombol untuk mengganti tampilan password */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 top-1/2 transform -translate-y-1/2">
                <div
                  className="cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tombol untuk login */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
