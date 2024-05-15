import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import AdminLogin from "./components/AdminLogin";
import Answerpage from "./components/Feedback_Customer";
import CustomerService from "./components/CustomerService";
import AddMenuForm from "./components/AddMenuForm";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false); // Inisialisasi status login

  return (
    <Router>
      <>
        {/* Komponen Navbar */}
        <Navbar />
        <Routes>
          {/* Rute untuk halaman-halaman */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          {/* Meneruskan setLoggedIn ke AdminLogin */}
          <Route path="/admin" element={<AdminLogin setLoggedIn={setLoggedIn} />} />
          {/* Rute untuk halaman feedback customer */}
          <Route
            path="/answer"
            element={
              isLoggedIn ? <Answerpage /> : <Navigate to="/admin" replace />
            }
          />
          <Route path="/customerservice" element={<CustomerService />} />
          <Route path="/addmenuform" element={<AddMenuForm />} />
        </Routes>
        {/* Komponen Footer */}
        <Footer />
      </>
    </Router>
  );
}

export default App;
