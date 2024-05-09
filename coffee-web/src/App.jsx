import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import AdminLogin from "./components/Admin";
import Answerpage from "./components/Answerpage";
import CustomerService from "./components/CustomerService";
import AddMenuForm from "./components/AddMenuForm";


function App() {

  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/answer" element={<Answerpage />} />
          <Route path="/customerservice" element={<CustomerService />} />
          <Route path="/addmenuform" element={<AddMenuForm />} />

        </Routes>
        <Footer />
    </Router>
    </>
  );
}

export default App;





















// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Menu from "./components/Menu";
// import About from "./components/About";
// import Footer from "./components/Footer";
// import ContactForm from "./components/ContactForm";
// import AdminLogin from "./components/AdminLogin";
// import Answerpage from "./components/Answerpage";

// import MenuForm from "./components/MenuForm";



// // const App = () => {
// //   const [submittedData, setSubmittedData] = useState(null);

// //   const handleFormSubmit = (data) => {
//     // Menyimpan data formulir yang dikirimkan pengguna
//     setSubmittedData(data);
//   };

  // return (
    // <div>
    //   <Navbar />
    //   <div id="home">
    //     <Home />
        
    //   </div>
    //   <div id="menu">
    //     <Menu />
    //   </div>
    //   <div id="about">
    //     <About />
    //   </div>
    //   <div id="contact">
    //     <ContactForm onSubmit={handleFormSubmit} />
    //   </div>
    //   {submittedData && (
    //     <div id="answer">
    //       <Answerpage />
    //     </div>
    //   )}
    //   <div id="adminlogin">
    //     <AdminLogin />
    //   </div>
    //   <Footer />
    // </div>
//   );
// };

// export default App;
