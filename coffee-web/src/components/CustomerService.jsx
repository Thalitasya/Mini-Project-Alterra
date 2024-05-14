import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerService() {
  // State untuk menyimpan pertanyaan, jawaban, riwayat percakapan, status loading dari server, pesan kesalahan, pertayaan sedang diproses
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingQuestion, setProcessingQuestion] = useState("");

  // Menggunakan useEffect untuk memanggil fungsi generateAnswerForQuestion saat komponen dimuat
  useEffect(() => {
    generateAnswerForQuestion();
  }, []);

  // Fungsi untuk menentukan apakah pertanyaan terkait dengan makanan, minuman, opsi termurah, rekomendasi
  const isFoodRelated = (question) => /makanan/i.test(question);
  const isDrinkRelated = (question) => /minuman/i.test(question);
  const isAskingForCheapOption = (question) => /murah|termurah/i.test(question);
  const isAskingForRecommendation = (question) => /rekomendasi/i.test(question);

  // Fungsi untuk menentukan apakah tanggapan dari OpenAI
  const isResponseOpenAI = (question) =>
    /(hai|helo|menu yang sehat|refrensi minuman sehat|refrensi makanan sehat)/i.test(
      question
    );

  // Fungsi untuk mengambil tanggapan dari OpenAI
  const getResponseFromOpenAI = async (question) => {
    try {
      //Mengirim permintaan post ke api openai
      const response = await axios({
        //Url api
        url: `${import.meta.env.VITE_GENERATIVE_LANGUAGE_API_URL}?key=${
          import.meta.env.VITE_GENERATIVE_LANGUAGE_API_KEY
        }`,
        method: "POST", //Method permintaan post
        data: {
          //Data yang dikirim dalam permintaan
          contents: [{ parts: [{ text: question }] }],
        },
      });
      //Mengembalikan teks jawaban dari respons API
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      //Menangani kesalahan jika terjadi
      console.error("Error in getting response from OpenAI:", error);
      //Melempar kesalahan lebih spesifik jika terjadi ditempat lain
      throw new Error(
        "Gagal mengambil tanggapan dari OpenAI, silakan coba lagi!"
      );
    }
  };

  // Fungsi untuk menentukan apakah pertanyaan diluar konteks
  const isOutOfContext = (question) =>
    !isResponseOpenAI(question) &&
    !isFoodRelated(question) &&
    !isDrinkRelated(question);


// Fungsi untuk menghasilkan jawaban untuk pertanyaan
const generateAnswerForQuestion = async (question) => {
  try {
    //Jika pertanyaan membutuhkan respon dari openai
    if (isResponseOpenAI(question)) {
      return await getResponseFromOpenAI(question);
      //Jika diluar konteks
    } else if (isOutOfContext(question)) {
      return "Maaf, pertanyaan diluar konteks yang dapat saya jawab hanya terkait dengan menu makanan atau minuman di Latithara Cafe.";
      //Jika tidak terkait makanan dan minuman
    } else if (!isFoodRelated(question) && !isDrinkRelated(question)) {
      return "Maaf, saya hanya dapat menjawab pertanyaan terkait dengan menu makanan atau minuman di Latithara Cafe.";
    } else {
      // Informasi minuman termurah
      const cheapestDrink = "Lemon Tea - Rp 15.000";

      // Rekomendasi minuman best seller
      const drinkRecommendation =
        "Rekomendasi minuman kami adalah Latte. Latte kami merupakan minuman best seller di Latithara Cafe.";

      // Menghasilkan jawaban sesuai dengan jenis pertanyaan
      if (isFoodRelated(question) && isAskingForRecommendation(question)) {
        return "Rekomendasi makanan kami adalah Croissant. Croissant kami merupakan makanan best seller di Latithara Cafe.";
      } else if (isFoodRelated(question)) {
        return "Makanan best seller croissant:\nCroissant - Rp 40.000";
      } else if (isDrinkRelated(question) && isAskingForRecommendation(question)) {
        return drinkRecommendation;
      } else if (isDrinkRelated(question) && isAskingForCheapOption(question)) {
        return cheapestDrink;
      } else if (isDrinkRelated(question)) {
        return drinkRecommendation;
      }
    }
  } catch (error) {
    console.error("Error in generating answer:", error);
    throw new Error("Gagal menghasilkan jawaban, silakan coba lagi!");
  }
};

  // Fungsi untuk menghasilkan jawaban dan memperbarui state
  const generateAnswer = async () => {
    //Mengatur status loading
    setIsLoading(true);
    // Mengatur pesan kesalahan menjadi null untuk menghapus kesalahan sebelumnya
    setError(null);
    // Menyimpan pertanyaan yang sedang diproses
    setProcessingQuestion(question);
    try {
      // Menghasilkan jawaban untuk pertanyaan yang diberikan
      const newAnswer = await generateAnswerForQuestion(question);
      // Mengatur jawaban yang diterima ke dalam state
      setAnswer(newAnswer);
      // Membuat objek percakapan baru dengan pertanyaan dan jawaban
      const newConversation = { question, answer: newAnswer };
      // Menambahkan percakapan baru ke dalam array conversations, dengan percakapan terbaru di bagian depan
      setConversations([newConversation, ...conversations]);
      // Mengosongkan input pertanyaan setelah jawaban dihasilkan
      setQuestion("");
      // Mengatur pesan kesalahan jika terjadi kesalahan selama proses
    } catch (error) {
      setError(error.message);
    }
    // Mengatur status loading menjadi false setelah proses selesai
    setIsLoading(false);
    // Menghapus pertanyaan yang sedang diproses
    setProcessingQuestion("");
  };

  return (
    <div className="font-roboto bg-gray-100 min-h-screen py-8 text-black">
      <div className="max-w-6xl mx-auto overflow-hidden mt-20">
        <h1 className="text-4xl font-bold text-center font-serif">
          Konsultasi dengan OpenAI
        </h1>
      </div>
      <div className="max-w-7xl py-2 px-2 mx-auto bg-white rounded-md shadow-md overflow-hidden mt-10">
        <div className="flex flex-col md:flex-row p-2">
          <div className="w-full md:w-2/3 p-10 m-20 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Percakapan</h2>
            {/* Menampilkan daftar percakapan */}
            {conversations.map((conversation, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-md mb-4 flex justify-between items-center"
              >
                <div className="mb-2">
                  <div className="chat chat-start mb-2">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Foto Profil Pengguna"
                          src="https://tse2.mm.bing.net/th?id=OIP.dcLFW3GT9AKU4wXacZ_iYAAAAA&pid=Api&P=0&h=220"
                        />
                      </div>
                    </div>
                    <div className="mb-2 chat-bubble">
                      <p className="font-bold">User: {conversation.question}</p>
                    </div>
                  </div>
                  <div className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Foto Profil CS"
                          src="https://tse4.mm.bing.net/th?id=OIP.e2kmkhVwe_O04WYI10eelwAAAA&pid=Api&P=0&h=220"
                        />
                      </div>
                    </div>
                    <div className="mb-2 chat-bubble">
                      <p>CS: {conversation.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Menampilkan pesan loading jika pertanyaan sedang diproses */}
            {processingQuestion && (
              <div className="bg-gray-200 p-4 rounded-md mb-4">
                <p className="font-bold">Pertanyaan: {processingQuestion}</p>
                <p>Jawaban: Memuat...</p>
              </div>
            )}
            {/* Menampilkan pesan error jika terjadi kesalahan */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {/* Form untuk mengirim pertanyaan */}
            <div className="mb-4">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
                rows="10"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Masukkan pertanyaan Anda di sini..."
              ></textarea>
            </div>
            <div className="text-center">
              {/* Tombol untuk mengirim pertanyaan */}
              <button
                className={`px-4 py-2 rounded-md text-gray-800 ${
                  question
                    ? "bg-gray-400 hover:bg-gray-300"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={generateAnswer}
                disabled={!question}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerService;
