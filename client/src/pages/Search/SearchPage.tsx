import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { listFlights, type Flight } from '../../services/api/flights';
import { listHotels, type Hotel } from '../../services/api/hotels';
import { listHolidays, type Holiday } from '../../services/api/holidays';
import { listVisas, type Visa } from '../../services/api/visas';
import { useSearchParams } from 'react-router-dom';
import { Plane, Building2, Palmtree, CreditCard, Clock, MapPin, Star, Check } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'flight';
  
  // State for different results
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [visas, setVisas] = useState<Visa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (type === 'flight') {
        const from = searchParams.get('from') || '';
        const data = await listFlights(from);
        setFlights(data);
      } else if (type === 'hotel') {
        const location = searchParams.get('location') || '';
        const data = await listHotels(location);
        setHotels(data);
      } else if (type === 'holiday') {
        const dest = searchParams.get('dest') || '';
        const data = await listHolidays(dest);
        setHolidays(data);
      } else if (type === 'visa') {
        const country = searchParams.get('country') || '';
        const data = await listVisas(country);
        setVisas(data);
      }
    };
    fetchData();
  }, [searchParams, type]);

  const getHeaderTitle = () => {
    switch(type) {
      case 'hotel': return 'Hotel Search Results';
      case 'holiday': return 'Holiday Packages';
      case 'visa': return 'Visa Services';
      default: return 'Flight Search Results';
    }
  };

  const getHeaderSubtitle = () => {
    switch(type) {
      case 'hotel': return 'Find the best places to stay';
      case 'holiday': return 'Explore our exclusive holiday packages';
      case 'visa': return 'Hassle-free visa processing services';
      default: return 'Showing best flights for your journey';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-[#1882FF] py-8">
        <div className="container-custom">
           <h1 className="text-white text-2xl font-bold capitalize">{getHeaderTitle()}</h1>
           <p className="text-white/80">{getHeaderSubtitle()}</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Simplified for now */}
          <div className="hidden lg:block space-y-6">
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-4">Price Range</h3>
               <input type="range" className="w-full accent-[#1882FF]" />
               <div className="flex justify-between text-sm text-gray-500 mt-2">
                 <span>Min</span>
                 <span>Max</span>
               </div>
             </div>
             
             {type === 'flight' && (
               <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-4">Stops</h3>
                 <div className="space-y-2">
                   <label className="flex items-center gap-2">
                     <input type="checkbox" className="rounded text-[#1882FF]" defaultChecked />
                     <span className="text-sm text-gray-600">Non Stop</span>
                   </label>
                   <label className="flex items-center gap-2">
                     <input type="checkbox" className="rounded text-[#1882FF]" />
                     <span className="text-sm text-gray-600">1 Stop</span>
                   </label>
                 </div>
               </div>
             )}

             {type === 'hotel' && (
               <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-4">Star Rating</h3>
                 <div className="space-y-2">
                   {[5, 4, 3, 2].map(star => (
                     <label key={star} className="flex items-center gap-2">
                       <input type="checkbox" className="rounded text-[#1882FF]" />
                       <span className="text-sm text-gray-600 flex items-center gap-1">{star} <Star size={12} className="fill-yellow-400 text-yellow-400"/></span>
                     </label>
                   ))}
                 </div>
               </div>
             )}
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
             {/* FLIGHT RESULTS */}
             {type === 'flight' && (
               flights.length > 0 ? flights.map((flight) => (
               <div key={flight.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                 {/* Airline Info */}
                 <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                     {flight.logo}
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-800">{flight.airline}</h3>
                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{flight.type}</span>
                   </div>
                 </div>

                 {/* Route Info */}
                 <div className="flex-1 flex items-center justify-center gap-8 text-center">
                   <div>
                     <div className="text-xl font-bold text-gray-800">{flight.departureTime}</div>
                     <div className="text-sm text-gray-500">{flight.originCode}</div>
                   </div>
                   <div className="flex flex-col items-center">
                     <span className="text-xs text-gray-400">{flight.duration}</span>
                     <div className="w-24 h-[1px] bg-gray-300 relative my-1">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                     </div>
                     <span className="text-xs text-gray-400">{flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}</span>
                   </div>
                   <div>
                     <div className="text-xl font-bold text-gray-800">{flight.arrivalTime}</div>
                     <div className="text-sm text-gray-500">{flight.destinationCode}</div>
                   </div>
                 </div>

                 {/* Price & Action */}
                 <div className="w-full md:w-auto text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col items-center md:items-end justify-between">
                   <div>
                     <span className="block text-xs text-gray-500">Price per person</span>
                     <div className="text-xl font-bold text-primary">
                       {flight.currency} {flight.price.toLocaleString()}
                     </div>
                   </div>
                   <button className="btn-primary mt-0 md:mt-2 py-2 px-6 text-sm">
                     Book Now
                   </button>
                 </div>
               </div>
             )) : <NoResults />
             )}

             {/* HOTEL RESULTS */}
             {type === 'hotel' && (
               hotels.length > 0 ? hotels.map((hotel) => (
                 <div key={hotel.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 md:h-auto relative">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                       <div>
                         <div className="flex justify-between items-start">
                           <div>
                             <h3 className="font-bold text-xl text-gray-800">{hotel.name}</h3>
                             <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14}/> {hotel.location}</p>
                           </div>
                           <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm font-bold">
                             <Star size={14} className="fill-blue-600" /> {hotel.rating}
                           </div>
                         </div>
                         <div className="flex flex-wrap gap-2 mt-4">
                           {hotel.amenities.slice(0, 4).map((am, i) => (
                             <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{am}</span>
                           ))}
                         </div>
                       </div>
                       <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100">
                          <div>
                            <span className="text-xs text-gray-500">Starts from</span>
                            <div className="text-xl font-bold text-primary">{hotel.currency} {hotel.price.toLocaleString()}</div>
                          </div>
                          <button className="btn-primary py-2 px-6 text-sm">View Details</button>
                       </div>
                    </div>
                 </div>
               )) : <NoResults />
             )}

             {/* HOLIDAY RESULTS */}
             {type === 'holiday' && (
               holidays.length > 0 ? holidays.map((holiday) => (
                 <div key={holiday.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-72 h-48 md:h-auto relative">
                      <img src={holiday.image} alt={holiday.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                       <div>
                         <h3 className="font-bold text-xl text-gray-800">{holiday.title}</h3>
                         <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14}/> {holiday.destination}</p>
                         <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Clock size={14}/> {holiday.duration}</p>
                         
                         <div className="grid grid-cols-2 gap-2 mt-4">
                           {holiday.inclusions.map((inc, i) => (
                             <span key={i} className="text-xs flex items-center gap-1 text-gray-600"><Check size={12} className="text-green-500"/> {inc}</span>
                           ))}
                         </div>
                       </div>
                       <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100">
                          <div>
                            <span className="text-xs text-gray-500">Per person</span>
                            <div className="text-xl font-bold text-primary">{holiday.currency} {holiday.price.toLocaleString()}</div>
                          </div>
                          <button className="btn-primary py-2 px-6 text-sm">View Package</button>
                       </div>
                    </div>
                 </div>
               )) : <NoResults />
             )}

             {/* VISA RESULTS */}
             {type === 'visa' && (
               visas.length > 0 ? visas.map((visa) => (
                 <div key={visa.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 md:h-auto relative">
                      <img src={visa.image} alt={visa.country} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                       <div>
                         <h3 className="font-bold text-xl text-gray-800">{visa.country}</h3>
                         <div className="flex items-center gap-2 mt-1">
                           <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">{visa.type}</span>
                         </div>
                         <p className="text-sm text-gray-500 flex items-center gap-1 mt-3"><Clock size={14}/> Processing: {visa.processingTime}</p>
                         
                         <div className="flex flex-wrap gap-2 mt-3">
                           <span className="text-xs font-semibold text-gray-500">Documents:</span>
                           {visa.requiredDocuments.map((doc, i) => (
                             <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">{doc}</span>
                           ))}
                         </div>
                       </div>
                       <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100">
                          <div>
                            <span className="text-xs text-gray-500">Visa Fee</span>
                            <div className="text-xl font-bold text-primary">{visa.currency} {visa.price.toLocaleString()}</div>
                          </div>
                          <button className="btn-primary py-2 px-6 text-sm">Apply Now</button>
                       </div>
                    </div>
                 </div>
               )) : <NoResults />
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NoResults() {
  return (
    <div className="bg-white p-8 rounded-xl text-center text-gray-500 border border-gray-200">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Plane className="text-gray-400" size={32} />
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">No results found</h3>
      <p>We couldn't find any matches for your search criteria. Please try different dates or filters.</p>
    </div>
  );
}
