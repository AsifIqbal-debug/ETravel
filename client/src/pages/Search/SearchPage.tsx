import { useState, useEffect } from 'react';
import { listFlights, type Flight } from '../../services/api/flights';
import { listHotels, type Hotel } from '../../services/api/hotels';
import { listHolidays, type Holiday } from '../../services/api/holidays';
import { listVisas, type Visa } from '../../services/api/visas';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, MapPin, Star, Clock, Check, Bus, Car, Plane } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import SearchFilters from '../../components/SearchFilters';
import clsx from 'clsx';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'flight';
  const { formatPrice } = useCurrency();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // State for different results
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [visas, setVisas] = useState<Visa[]>([]);

  const [fromInput, setFromInput] = useState(searchParams.get('from') || '');
  const [toInput, setToInput] = useState(searchParams.get('to') || '');
  const [timeFilter, setTimeFilter] = useState('');
  const [tripType, setTripType] = useState('one-way');
  const [returnDate, setReturnDate] = useState('');

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    // Sync state with URL params when they change
    setFromInput(searchParams.get('from') || '');
    setToInput(searchParams.get('to') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      if (type === 'flight') {
        const category = searchParams.get('category') || '';
        const data = await listFlights(fromInput, category, toInput, timeFilter, tripType, returnDate);
        setFlights(data);
      } else if (type === 'hotel') {
        const location = searchParams.get('location') || '';
        const hotelClass = searchParams.get('class') || '';
        let data = await listHotels(location);
        
        // Client-side filtering based on class
        if (hotelClass) {
          if (hotelClass === 'Luxury') {
            data = data.filter(h => h.rating >= 5);
          } else if (hotelClass === 'Business') {
            data = data.filter(h => h.rating >= 4 && h.rating < 5);
          } else if (hotelClass === 'Economy') {
            data = data.filter(h => h.rating < 4);
          }
        }
        
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
  }, [searchParams, type, fromInput, toInput, timeFilter, tripType, returnDate]);

  const getHeaderTitle = () => {
    const category = searchParams.get('category');
    switch(type) {
      case 'bus': return 'Bus Search Results';
      case 'car': return 'Car Rental Options';
      case 'hotel': return 'Accommodation Search Results';
      case 'holiday': return 'Destination Packages';
      case 'visa': return 'Visa Services';
      default: 
        if (category === 'domestic') return 'Domestic Flights';
        if (category === 'international') return 'International Flights';
        if (category === 'hajj-umrah') return 'Hajj and Umrah Packages';
        return 'Flight Search Results';
    }
  };

  const getHeaderSubtitle = () => {
    switch(type) {
      case 'bus': return 'Comfortable bus journeys';
      case 'car': return 'Rent a car for your trip';
      case 'hotel': return 'Find the best places to stay';
      case 'holiday': return 'Explore our exclusive destination packages';
      case 'visa': return 'Hassle-free visa processing services';
      default: return 'Showing best flights for your journey';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-onyx transition-colors duration-300">
      
      <div className="bg-white dark:bg-onyx-light border-b border-gray-200 dark:border-white/10 py-8 transition-colors duration-300">
        <div className="container-custom">
           <h1 className="text-primary text-2xl font-bold capitalize">{getHeaderTitle()}</h1>
           <p className="text-gray-600 dark:text-gray-400">{getHeaderSubtitle()}</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex justify-between items-center lg:hidden mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white">Filters</h2>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
          >
            <SlidersHorizontal size={18} /> Filter
          </button>
        </div>
        {/* Mobile Filter Drawer */}
        <div 
          className={clsx(
            "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden",
            isMobileFilterOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          )}
          onClick={() => setIsMobileFilterOpen(false)}
        />
        <div 
          className={clsx(
            "fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-onyx shadow-2xl z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto",
            isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">Filters</h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <SearchFilters 
              type={type}
              searchParams={searchParams}
              updateFilter={updateFilter}
              tripType={tripType}
              setTripType={setTripType}
              fromInput={fromInput}
              setFromInput={setFromInput}
              toInput={toInput}
              setToInput={setToInput}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Simplified for now */}
          <div className="hidden lg:block space-y-6">
             <SearchFilters 
              type={type}
              searchParams={searchParams}
              updateFilter={updateFilter}
              tripType={tripType}
              setTripType={setTripType}
              fromInput={fromInput}
              setFromInput={setFromInput}
              toInput={toInput}
              setToInput={setToInput}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
            />
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
             {/* FLIGHT RESULTS */}
             {type === 'flight' && (
               flights.length > 0 ? flights.map((flight) => (
               <div key={flight.id} className="bg-white dark:bg-onyx-light rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/30">
                 {/* Airline Info */}
                 <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                     {flight.logo}
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900 dark:text-white">{flight.airline}</h3>
                     <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/5">{flight.type}</span>
                   </div>
                 </div>

                 {/* Route Info */}
                 <div className="flex-1 flex items-center justify-center gap-8 text-center">
                   <div>
                     <div className="text-xl font-bold text-gray-900 dark:text-white">{flight.departureTime}</div>
                     <div className="text-sm text-gray-500 dark:text-gray-400">{flight.originCode}</div>
                   </div>
                   <div className="flex flex-col items-center">
                     <span className="text-xs text-gray-500">{flight.duration}</span>
                     <div className="w-24 h-[1px] bg-gray-300 dark:bg-gray-700 relative my-1">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                     </div>
                     <span className="text-xs text-gray-500">{flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}</span>
                   </div>
                   <div>
                     <div className="text-xl font-bold text-gray-900 dark:text-white">{flight.arrivalTime}</div>
                     <div className="text-sm text-gray-500 dark:text-gray-400">{flight.destinationCode}</div>
                   </div>
                 </div>

                 {/* Price & Action */}
                 <div className="w-full md:w-auto text-right border-t md:border-t-0 md:border-l border-gray-200 dark:border-white/10 pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col items-center md:items-end justify-between">
                   <div>
                     <span className="block text-xs text-gray-500 dark:text-gray-400">Price per person</span>
                    <div className="text-xl font-bold text-primary">
                      {formatPrice(Number(flight.price), flight.currency || 'BDT')}
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
                 <div key={hotel.id} className="bg-white dark:bg-onyx-light rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row hover:border-primary/30">
                    <div className="w-full md:w-64 h-48 md:h-auto relative">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                       <div>
                         <div className="flex justify-between items-start">
                           <div>
                             <h3 className="font-bold text-xl text-gray-900 dark:text-white">{hotel.name}</h3>
                             <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><MapPin size={14}/> {hotel.location}</p>
                           </div>
                           <div className="flex items-center gap-1 bg-primary/10 dark:bg-primary/20 text-primary px-2 py-1 rounded text-sm font-bold border border-primary/20">
                             <Star size={14} className="fill-primary" /> {hotel.rating}
                           </div>
                         </div>
                         <div className="flex flex-wrap gap-2 mt-4">
                           {hotel.amenities.slice(0, 4).map((am, i) => (
                             <span key={i} className="text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-white/5">{am}</span>
                           ))}
                         </div>
                       </div>
                       <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Starts from</span>
                            <div className="text-xl font-bold text-primary">{formatPrice(hotel.price, hotel.currency)}</div>
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
                 <div key={holiday.id} className="bg-white dark:bg-onyx-light rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row hover:border-primary/30">
                    <div className="w-full md:w-72 h-48 md:h-auto relative">
                      <img src={holiday.image} alt={holiday.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                       <div>
                         <h3 className="font-bold text-xl text-gray-900 dark:text-white">{holiday.title}</h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><MapPin size={14}/> {holiday.destination}</p>
                         <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><Clock size={14}/> {holiday.duration}</p>
                         
                         <div className="grid grid-cols-2 gap-2 mt-4">
                           {holiday.inclusions.map((inc, i) => (
                             <span key={i} className="text-xs flex items-center gap-1 text-gray-600 dark:text-gray-300"><Check size={12} className="text-green-500 dark:text-green-400"/> {inc}</span>
                           ))}
                         </div>
                       </div>
                       <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Per person</span>
                            <div className="text-xl font-bold text-primary">{formatPrice(holiday.price, holiday.currency)}</div>
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
                 <div key={visa.id} className="bg-white dark:bg-onyx-light rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row hover:border-primary/30">
                    <div className="w-full md:w-48 h-48 md:h-auto relative">
                      <img src={visa.image} alt={visa.country} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                       <div>
                         <h3 className="font-bold text-xl text-gray-900 dark:text-white">{visa.country}</h3>
                         <div className="flex items-center gap-2 mt-1">
                           <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-1 rounded font-medium border border-blue-200 dark:border-blue-900/30">{visa.type}</span>
                         </div>
                         <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-3"><Clock size={14}/> Processing: {visa.processingTime}</p>
                         
                         <div className="flex flex-wrap gap-2 mt-3">
                           <span className="text-xs font-semibold text-gray-500">Documents:</span>
                           {visa.requiredDocuments.map((doc, i) => (
                             <span key={i} className="text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded border border-gray-200 dark:border-white/10">{doc}</span>
                           ))}
                         </div>
                       </div>
                       <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Visa Fee</span>
                            <div className="text-xl font-bold text-primary">{formatPrice(visa.price, visa.currency)}</div>
                          </div>
                          <button className="btn-primary py-2 px-6 text-sm">Apply Now</button>
                       </div>
                    </div>
                 </div>
               )) : <NoResults />
             )}

             {/* BUS RESULTS */}
             {type === 'bus' && (
                <div className="bg-white dark:bg-onyx-light p-12 rounded-xl text-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bus size={40} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Bus Search</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">We are currently connecting with bus operators to bring you the best routes and prices. Please check back soon!</p>
                </div>
             )}

             {/* CAR RESULTS */}
             {type === 'car' && (
                <div className="bg-white dark:bg-onyx-light p-12 rounded-xl text-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Car size={40} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Car Rental</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">Our premium car rental fleet is being updated. You will be able to book your ride shortly.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NoResults() {
  return (
    <div className="bg-white dark:bg-onyx-light p-8 rounded-xl text-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
          <Plane className="text-gray-400 dark:text-gray-500" size={32} />
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
      <p>We couldn't find any matches for your search criteria. Please try different dates or filters.</p>
    </div>
  );
}
