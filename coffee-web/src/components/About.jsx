import React from "react";
import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-32 bg-gray-100 text-black">
      {/* Judul */}
      <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-20 mb-8 p-5">
        About Us
      </h1>

      {/* Konten */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Gambar */}
        <div className="w-full lg:w-2/4">
          <img className="rounded-lg" src={img} alt="img" />
        </div>
        {/* Deskripsi */}
        <div className="w-full lg:w-2/4 p-5 space-y-4">
          <h2 className="font-semibold text-3xl">
            What Makes Our Coffee Special?
          </h2>
          <p>
            Kami adalah tempat yang diilhami oleh keindahan kopi dan kenikmatan
            kuliner. Dengan komitmen kami untuk menyajikan pengalaman yang
            memuaskan bagi setiap pelanggan, kami berusaha untuk menciptakan
            suasana yang hangat dan ramah di setiap kunjungan.
          </p>
          <p>
            Di Latithara Cafe, kami tidak hanya menyajikan kopi berkualitas
            tinggi dan hidangan lezat, tetapi juga memberikan sentuhan khas dan
            cerita di setiap hidangan yang kami sajikan. Dari aroma kopi yang
            menggugah selera hingga cita rasa makanan yang autentik, setiap
            detik di sini adalah kesempatan untuk merasakan kebahagiaan yang
            sederhana namun berkesan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
