import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Travel Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Nexily made my trip to Bali absolutely seamless. The booking process was easy, and I got the best deals on flights and hotels. Highly recommended!"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Traveler",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "I travel frequently for work, and Nexily is my go-to platform. The customer support is outstanding, and I always find convenient flight options."
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Family Vacationer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    text: "Planning a family holiday can be stressful, but Nexily's holiday packages made it a breeze. We had a wonderful time in Dubai thanks to their excellent service."
  }
];

export default function Reviews() {
  return (
    <section className="py-20 bg-onyx">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">What Our Travelers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Read reviews from our satisfied customers who have experienced the world with Nexily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-onyx-light rounded-2xl p-8 relative hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-primary/30">
              <Quote className="absolute top-8 right-8 text-primary/20 w-12 h-12" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md"
                />
                <div>
                  <h3 className="font-bold text-white">{review.name}</h3>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < review.rating ? 'fill-primary text-primary' : 'text-gray-700'}`} 
                  />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
