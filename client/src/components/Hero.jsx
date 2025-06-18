export default function Hero() {
  return (
    <div
        className="bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat h-[70vh] flex flex-col justify-center items-center text-white text-center"
      style={{ backgroundImage: `url('/hero.png')` }} // place image in `public/hero.jpg`
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
Find your next stay</h1>
      <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">Explore</button>
    </div>
  );
}