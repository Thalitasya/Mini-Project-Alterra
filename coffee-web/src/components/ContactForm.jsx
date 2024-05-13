import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "../layouts/Button";

// Membuat koneksi dengan Supabase menggunakan URL dan kunci anonim
const supabase = createClient(
  "https://sksjsvotnzydxcjfanxn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc2pzdm90bnp5ZHhjamZhbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNjE3NDMsImV4cCI6MjAzMDczNzc0M30.MNUSc9iuL2-pyi0Vk8syeZzke9g6X2sZ8HrupWfZ7Hk"
);

const ContactForm = () => {
  // State untuk menyimpan nilai input nama
  const [name, setName] = useState("");
  // State untuk menyimpan nilai input email
  const [email, setEmail] = useState("");
  // State untuk menyimpan nilai input pesan
  const [message, setMessage] = useState("");

  // Fungsi untuk menangani pengiriman formulir kontak
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Mengirim formulir...");

    try {
      // Mengirim data ke tabel "contact" di Supabase
      const { data, error } = await supabase
        .from("contact")
        .insert([{ name, email, message }]);

      if (error) {
        console.error("Error menyimpan data:", error.message);
      } else {
        console.log("Data berhasil disimpan:", data);
        // Mengosongkan field formulir setelah pengiriman berhasil
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error menyimpan data:", error.message);
    }
  };

  return (
    <div className="mx-auto py-8 bg-white text-black">
      <h1 className="text-3xl font-semibold mb-8 text-center">Hubungi Kami</h1>
      {/* Formulir kontak */}
      <form
        onSubmit={handleSubmit}
        className="mx-32 space-y-4 bg-gray-200 p-10 rounded-lg"
      >
        {/* Input nama */}
        <div>
          <label htmlFor="name" className="block font-medium ">
            Nama
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500 bg-white"
            required
          />
        </div>
        {/* Input email */}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500 bg-white"
            required
          />
        </div>
        {/* Input pesan */}
        <div>
          <label htmlFor="message" className="block font-medium">
            Pesan
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500 bg-white"
            required
          ></textarea>
        </div>
        {/* Tombol untuk mengirim formulir */}
        <div className="flex justify-center py-2 px-4 ">
          <Button type="submit" title="Kirim" />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
