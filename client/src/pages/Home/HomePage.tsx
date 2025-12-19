import { useState } from 'react';
import SearchWidget from '../../components/SearchWidget';
import Reviews from '../../components/Reviews';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('flight');
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  // Mock Data for different sections
  const popularFlights = [
    { title: "Cox's Bazar", price: 4500, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", query: "?type=flight&from=Dhaka&to=Cox%27s%20Bazar" },
    { title: "Bangkok", price: 22000, img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600&auto=format&fit=crop", query: "?type=flight&from=Dhaka&to=Bangkok" },
    { title: "Maldives", price: 65000, img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop", query: "?type=flight&from=Dhaka&to=Maldives" }
  ];

  const popularHotels = [
    { title: "Royal Tulip Sea Pearl", price: 12500, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop", query: "?type=hotel&location=Royal%20Tulip" },
    { title: "Sayeman Beach Resort", price: 15000, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop", query: "?type=hotel&location=Sayeman" },
    { title: "Long Beach Hotel", price: 8500, img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&auto=format&fit=crop", query: "?type=hotel&location=Long%20Beach" }
  ];

  const popularHolidays = [
    { title: "Bali Escape", price: 85000, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop", query: "?type=holiday&dest=Bali" },
    { title: "Dubai Adventure", price: 95000, img: "https://images.unsplash.com/photo-1512453979798-5ea932a23518?q=80&w=600&auto=format&fit=crop", query: "?type=holiday&dest=Dubai" },
    { title: "Singapore Delight", price: 75000, img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop", query: "?type=holiday&dest=Singapore" }
  ];

  const visaPackages = [
    { title: "Thailand Visa", price: 5500, img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600&auto=format&fit=crop", query: "?type=visa&country=Thailand" },
    { title: "Dubai Visa", price: 15000, img: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=600&auto=format&fit=crop", query: "?type=visa&country=United%20Arab%20Emirates" },
    { title: "Malaysia Visa", price: 6500, img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=600&auto=format&fit=crop", query: "?type=visa&country=Malaysia" }
  ];

  const getPopularItems = () => {
    switch(activeTab) {
      case 'hotel': return popularHotels;
      case 'holiday': return popularHolidays;
      case 'visa': return visaPackages;
      default: return popularFlights;
    }
  };

  const getSectionTitle = () => {
    switch(activeTab) {
      case 'hotel': return "Popular Hotels";
      case 'holiday': return "Trending Destinations";
      case 'visa': return "Popular Visa Services";
      default: return "Popular Destinations";
    }
  };

  const handleItemClick = (query: string) => {
    navigate(`/search${query}`);
  };

  return (
    <div className="min-h-screen bg-onyx">
      
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Hero Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000" 
          alt="Luxury Travel Destination" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-onyx z-0"></div>
        
        <div className="container-custom h-full flex flex-col justify-center items-center text-center pb-20 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg"
          >
            Welcome to Nexily
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md leading-relaxed"
          >
            Find the best flights, accommodations, and holiday packages for your next journey.
            Experience the world in cinematic style.
          </motion.p>
        </div>
      </div>

      {/* Search Widget Section */}
      <div className="container-custom pb-20">
        <SearchWidget onTabChange={setActiveTab} initialTab={activeTab} />
        
        {/* Promotional Cards */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            {getSectionTitle()}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getPopularItems().map((item, i) => (
              <div 
                key={i} 
                onClick={() => handleItemClick(item.query)}
                className="group cursor-pointer rounded-xl overflow-hidden relative h-64 shadow-md hover:shadow-xl transition-all border border-white/10"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-serif font-bold text-primary-light">{item.title}</h3>
                  <p className="text-sm opacity-90 text-gray-300">Start from {formatPrice(item.price as number, 'BDT')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { title: "Best Price Guarantee", desc: "We ensure the best price for you" },
             { title: "Easy Booking", desc: "Book your flight in just a few clicks" },
             { title: "24/7 Support", desc: "We are here to help you anytime" },
             { title: "Secure Payment", desc: "100% secure payment methods" }
           ].map((f, i) => (
             <div key={i} className="bg-onyx-light p-6 rounded-xl border border-white/10 shadow-sm text-center hover:-translate-y-1 transition-transform group hover:border-primary/50">
               <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:bg-primary group-hover:text-onyx transition-colors">
                 {i+1}
               </div>
               <h3 className="font-bold text-white mb-2 font-serif">{f.title}</h3>
               <p className="text-sm text-gray-400">{f.desc}</p>
             </div>
           ))}
        </div>

        {/* Reviews Section */}
        <Reviews />
      </div>
    </div>
  );
}
