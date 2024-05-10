import React, { useState } from "react";

export default function OpenAIExample() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
    
    const promptAwal =
      'Kamu adalah seorang admin cafe, di mana pelanggan akan bertanya tentang menu di kafe ini. Jawab pertanyaan pelanggan dengan ramah dan informatif.';
    
    const APIBody = {
      model: 'gpt-4',
      messages: [{ role: 'user', content: `${promptAwal} ${inputMessage}` }]
    };
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + API_KEY
        },
        body: JSON.stringify(APIBody)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setMessages([...messages, { role: 'admin', content: inputMessage }, { role: 'user', content: reply }]);
      setInputMessage("");
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-8">
      <div className="chat-container w-full max-w-lg bg-black rounded shadow-lg">
        <div className="chat-messages p-4">
          {messages.map((message, index) => (
          <div key={index} className={`message-${message.role} mb-4 relative flex items-center`}>
          <p className={`text-sm p-3 rounded-lg ${message.role === 'admin' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-300'} ${message.role === 'admin' ? 'ml-auto' : 'mr-auto'}`}>{message.content}</p>
          {index !== messages.length - 1 && <div className="w-full h-0.5 bg-gray-600 absolute bottom-0 left-0 -mb-2"></div>}
        </div>            
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-input-form flex p-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input flex-grow px-3 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`chat-send-button px-4 py-2 bg-gray-500 text-white rounded-r-md ml-2 ${
              isSubmit ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
            disabled={isSubmit}
          >
            {isSubmit ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
