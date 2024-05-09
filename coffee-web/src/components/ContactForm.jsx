import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "../layouts/Button";

const supabase = createClient(
  "https://sksjsvotnzydxcjfanxn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc2pzdm90bnp5ZHhjamZhbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNjE3NDMsImV4cCI6MjAzMDczNzc0M30.MNUSc9iuL2-pyi0Vk8syeZzke9g6X2sZ8HrupWfZ7Hk"
);

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form...");

    try {
      const { data, error } = await supabase.from("contact").insert([
        { name, email, message },
      ]);

      if (error) {
        console.error("Error saving data:", error.message);
      } else {
        console.log("Data saved successfully:", data);
        // Clear form fields after successful submission
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit} className="mx-32 space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            required
          ></textarea>
        </div>
        <Button type="submit" title="Submit" />
      </form>
    </div>
  );
};

export default ContactForm;
