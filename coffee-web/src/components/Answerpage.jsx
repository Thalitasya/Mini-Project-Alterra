import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://sksjsvotnzydxcjfanxn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc2pzdm90bnp5ZHhjamZhbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNjE3NDMsImV4cCI6MjAzMDczNzc0M30.MNUSc9iuL2-pyi0Vk8syeZzke9g6X2sZ8HrupWfZ7Hk");

function Answerpage() {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    getContact();
  }, []);

  async function getContact() {
    const { data } = await supabase.from("contact").select("*");
    setContact(data);
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Daftar Kontak</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contact.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Name: {item.name}</h2>
              <p className="text-gray-600">Email: {item.email}</p>
              <p className="text-gray-600">Message: {item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Answerpage;
