import { useNavigate } from "react-router-dom";
import LocationCard from "./LocationCard";
import { motion } from 'framer-motion';

const mockLocations = [
  { image: "/hotel1.jpeg", title: "Mumbai", price: "₹20,000 night" },
  { image: "/hotel2.jpeg", title: "Goa", price: "₹10,000 night" },
  { image: "/hotel3.jpeg", title: "Munnar", price: "₹5,000 night" },
];

export default function Destinations({ redirectToRegister = false }) {
  const navigate = useNavigate();

  return (
    <section className="px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Popular Locations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockLocations.map((loc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <LocationCard
              location={loc}
              onBook={redirectToRegister ? () => navigate("/register") : undefined}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
