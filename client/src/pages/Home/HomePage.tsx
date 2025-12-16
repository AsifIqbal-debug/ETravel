import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SearchWidget from '../../components/SearchWidget';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('flight');
  const navigate = useNavigate();

  // Mock Data for different sections
  const popularFlights = [
    { title: "Cox's Bazar", price: "4,500", img: "https://images.unsplash.com/photo-1599577533036-7c98096b79c3?q=80&w=600&auto=format&fit=crop", query: "?type=flight&from=Dhaka&to=Cox%27s%20Bazar" },
    { title: "Bangkok", price: "22,000", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600&auto=format&fit=crop", query: "?type=flight&from=Dhaka&to=Bangkok" },
    { title: "Maldives", price: "65,000", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop", query: "?type=flight&from=Dhaka&to=Maldives" }
  ];

  const popularHotels = [
    { title: "Royal Tulip Sea Pearl", price: "12,500", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop", query: "?type=hotel&location=Royal%20Tulip" },
    { title: "Sayeman Beach Resort", price: "15,000", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop", query: "?type=hotel&location=Sayeman" },
    { title: "Long Beach Hotel", price: "8,500", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&auto=format&fit=crop", query: "?type=hotel&location=Long%20Beach" }
  ];

  const popularHolidays = [
    { title: "Bali Escape", price: "85,000", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop", query: "?type=holiday&dest=Bali" },
    { title: "Dubai Adventure", price: "95,000", img: "https://images.unsplash.com/photo-1512453979798-5ea932a23518?q=80&w=600&auto=format&fit=crop", query: "?type=holiday&dest=Dubai" },
    { title: "Singapore Delight", price: "75,000", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop", query: "?type=holiday&dest=Singapore" }
  ];

  const visaPackages = [
    { title: "Thailand Visa", price: "5,500", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600&auto=format&fit=crop", query: "?type=visa&country=Thailand" },
    { title: "Dubai Visa", price: "15,000", img: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=600&auto=format&fit=crop", query: "?type=visa&country=United%20Arab%20Emirates" },
    { title: "Malaysia Visa", price: "6,500", img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=600&auto=format&fit=crop", query: "?type=visa&country=Malaysia" }
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
      case 'holiday': return "Trending Holiday Packages";
      case 'visa': return "Popular Visa Services";
      default: return "Popular Destinations";
    }
  };

  const handleItemClick = (query: string) => {
    navigate(`/search${query}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[450px] bg-gradient-to-r from-primary-dark to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        
        <div className="container-custom h-full flex flex-col justify-center items-center text-center pb-20 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md"
          >
            Welcome to E Travel
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg max-w-2xl drop-shadow-sm"
          >
            Find the best flights, hotels, and holiday packages for your next journey.
          </motion.p>
        </div>
        
        {/* Abstract Shapes/Clouds for subtle movement */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
           <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white opacity-20"></path>
          </svg>
        </div>
      </div>

      {/* Search Widget Section */}
      <div className="container-custom pb-20">
        <SearchWidget onTabChange={setActiveTab} initialTab={activeTab} />
        
        {/* Promotional Cards */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{getSectionTitle()}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getPopularItems().map((item, i) => (
              <div 
                key={i} 
                onClick={() => handleItemClick(item.query)}
                className="group cursor-pointer rounded-xl overflow-hidden relative h-64 shadow-md hover:shadow-xl transition-all"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm opacity-90">Start from BDT {item.price}</p>
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
             <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:-translate-y-1 transition-transform group">
               <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                 {i+1}
               </div>
               <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
               <p className="text-sm text-gray-500">{f.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
