import LocationCard from "./LocationCard";

const mockLocations = [
  { image: "/hotel1.jpeg", title: "Mumbai", price: "₹20,000 night" },
  { image: "/hotel2.jpeg", title: "Goa", price: "₹10,000 night" },
  { image: "/hotel3.jpeg", title: "Munnar", price: "₹5,000 night" },
];

export default function Destinations() {
  return (
    <section className="px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Location Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockLocations.map((loc, idx) => (
          <LocationCard key={idx} location={loc} />
        ))}
      </div>
    </section>
  );
}
