import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx"; // Mengimpor komponen App sebagai titik masuk utama aplikasi
import "./index.css"; // Mengimpor file CSS untuk styling

// Menggunakan ReactDOM.createRoot untuk membuat root dari aplikasi dan me-render App ke dalamnya
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Me-render komponen App */}
  </React.StrictMode>
);
