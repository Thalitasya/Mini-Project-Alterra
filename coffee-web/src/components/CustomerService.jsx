import React, { useState } from 'react';

const CustomerService = () => {
  const [userMessage, setUserMessage] = useState('');
  const [botReply, setBotReply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mengirimkan permintaan ke layanan NLP
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY_HERE', // Ganti YOUR_API_KEY_HERE dengan API Key Anda
        },
        body: JSON.stringify({
          model: 'text-davinci-002', // Gunakan model yang sesuai, misalnya text-davinci-002
          prompt: `Customer: ${userMessage}\nAI:`, // Contoh dan konteks pesan pengguna
          max_tokens: 50, // Jumlah maksimum token dalam balasan
          temperature: 0.7, // Semakin tinggi nilainya, semakin kreatif balasannya
        }),
      });

      const data = await response.json();
      // Menetapkan balasan dari bot AI ke state
      setBotReply(data.choices[0].text.trim());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Customer Service</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan Anda:</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Kirim
          </button>
        </form>
        {botReply && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Balasan AI:</h2>
            <p>{botReply}</p>
          </div>
        )}
      </div>
  );
};

export default CustomerService;
