import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar"; // Komponen Navbar untuk menampilkan navigasi
import Home from "./components/Home"; // Komponen Home untuk halaman utama
import Menu from "./components/Menu"; // Komponen Menu untuk menampilkan daftar menu
import About from "./components/About"; // Komponen About untuk halaman informasi
import Footer from "./components/Footer"; // Komponen Footer untuk footer aplikasi
import ContactForm from "./components/ContactForm"; // Komponen ContactForm untuk formulir kontak
import AdminLogin from "./components/AdminLogin"; // Komponen AdminLogin untuk login admin
import Answerpage from "./components/Feedback_Customer"; // Komponen Answerpage untuk halaman tanggapan pelanggan
import CustomerService from "./components/CustomerService"; // Komponen CustomerService untuk layanan pelanggan
import AddMenuForm from "./components/AddMenuForm"; // Komponen AddMenuForm untuk menambahkan menu baru

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false); // State untuk status login

  return (
    <Router>
      <>
        {/* Menampilkan navbar */}
        <Navbar />
        {/* Menentukan navigasi dengan Routes */}
        <Routes>
          {/* Rute ke halaman utama */}
          <Route path="/" element={<Home />} />
          {/* Rute ke halaman menu */}
          <Route path="/menu" element={<Menu />} />
          {/* Rute ke halaman tentang */}
          <Route path="/about" element={<About />} />
          {/* Rute ke halaman kontak */}
          <Route path="/contact" element={<ContactForm />} />
          {/* Rute ke halaman admin, dengan meneruskan status login ke AdminLogin */}
          <Route
            path="/admin"
            element={<AdminLogin setLoggedIn={setLoggedIn} />}
          />
          {/* Rute ke halaman tanggapan pelanggan */}
          <Route
            path="/answer"
            element={
              isLoggedIn ? <Answerpage /> : <Navigate to="/admin" replace />
            }
          />
          {/* Rute ke halaman layanan pelanggan */}
          <Route path="/customerservice" element={<CustomerService />} />
          {/* Rute ke halaman penambahan menu baru */}
          <Route path="/addmenuform" element={<AddMenuForm />} />
        </Routes>
        {/* Menampilkan footer */}
        <Footer />
      </>
    </Router>
  );
}

export default App;
