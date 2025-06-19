import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div
      className="h-[75vh] bg-cover bg-center flex flex-col justify-center items-center text-white text-center"
      style={{ backgroundImage: `url('/hotel1.jpeg')` }} // Ensure this image exists in public/
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
        Feel at home, wherever you go
      </h1>
      <p className="text-lg md:text-xl mb-3 drop-shadow">
        Trusted listings. Verified hosts. Seamless booking.
      </p>
      
      <button
        onClick={() => navigate("/register")}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow text-white font-semibold transition"
      >
        Explore Now
      </button>
    </div>
  );
}
