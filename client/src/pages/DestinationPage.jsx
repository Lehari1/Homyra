import { useParams } from 'react-router-dom';
import { listings2 } from '../data/SampleListings';
import { useNavigate } from 'react-router-dom';
export default function DestinationPage() {
  const { city } = useParams();
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1);
  const navigate = useNavigate();
  const listings = listings2.filter((l) => l.city === city);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="h-[60vh] bg-cover bg-center text-white flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url('/${city}.png')`,
          backgroundColor: '#000',
        }}
      >
        <div className="bg-black/40 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-2">Stays in {displayCity}</h1>
          <p className="text-lg text-white/80">
            Curated heritage retreats, lakeside escapes, romantic havens
          </p>
        </div>
      </section>

      {/* Listings Section */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        {listings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No listings found in {displayCity}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((l, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-xl shadow hover:shadow-md transition p-4"
              >
                {/* 🔧 FIXED: consistent image height */}
                <div className="h-48 overflow-hidden rounded-lg mb-3">
                  <img
                    src={l.image}
                    alt={l.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold">{l.title}</h3>
                <p className="text-gray-600">{l.description}</p>
                <p className="font-bold mt-1">{l.price}</p>
                <button className="bg-blue-600 text-white w-full mt-3 py-2 rounded hover:bg-blue-700 transition"
                 onClick={() => navigate(`/listing/${l.id}`)}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
