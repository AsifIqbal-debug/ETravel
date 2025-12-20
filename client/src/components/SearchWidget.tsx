import { useState, useEffect } from 'react';
import { Plane, Calendar, Users, MapPin, ArrowRightLeft, Building2, Palmtree, CreditCard, Globe, FileText, Bus, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchWidgetProps {
  onTabChange?: (tab: string) => void;
  initialTab?: string;
}

export default function SearchWidget({ onTabChange, initialTab = 'flight' }: SearchWidgetProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Flight State
  const [tripType, setTripType] = useState('round');
  const [flightFrom, setFlightFrom] = useState('Dhaka (DAC)');
  const [flightTo, setFlightTo] = useState('Cox\'s Bazar (CXB)');
  
  // Transportation State
  const [transportationSubTab, setTransportationSubTab] = useState<'bus' | 'car'>('bus');
  
  // Bus State
  const [busFrom, setBusFrom] = useState('Dhaka');
  const [busTo, setBusTo] = useState('Chittagong');

  // Car State
  const [carLocation, setCarLocation] = useState('Dhaka');

  // Hotel State
  const [hotelLocation, setHotelLocation] = useState('Cox\'s Bazar');
  const [checkIn] = useState('18 Dec 25');
  const [checkOut] = useState('20 Dec 25');
  const [hotelClass, setHotelClass] = useState('Luxury');
  
  // Holiday State
  const [holidayDest, setHolidayDest] = useState('Maldives');
  
  // Visa State
  const [visaCountry, setVisaCountry] = useState('Thailand');
  const [visaType, setVisaType] = useState('Tourist');

  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  const handleSearch = () => {
    let query = '';
    if (activeTab === 'flight') {
      query = `?type=flight&from=${encodeURIComponent(flightFrom)}&to=${encodeURIComponent(flightTo)}`;
    } else if (activeTab === 'transportation') {
      if (transportationSubTab === 'bus') {
        query = `?type=bus&from=${encodeURIComponent(busFrom)}&to=${encodeURIComponent(busTo)}`;
      } else {
        query = `?type=car&location=${encodeURIComponent(carLocation)}`;
      }
    } else if (activeTab === 'hotel') {
      query = `?type=hotel&location=${encodeURIComponent(hotelLocation)}`;
    } else if (activeTab === 'holiday') {
      query = `?type=holiday&dest=${encodeURIComponent(holidayDest)}`;
    } else if (activeTab === 'visa') {
      query = `?type=visa&country=${encodeURIComponent(visaCountry)}`;
    }
    navigate(`/search${query}`);
  };

  return (
    <div className="bg-white dark:bg-onyx-light rounded-2xl shadow-xl p-6 max-w-5xl mx-auto -mt-24 relative z-10 border border-gray-200 dark:border-white/10 transition-colors duration-300">
      {/* Tabs */}
      <div className="flex gap-4 md:gap-8 border-b border-gray-200 dark:border-white/10 pb-4 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('transportation')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'transportation' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
        >
          <Bus size={18} /> Transportation
        </button>
        <button 
          onClick={() => setActiveTab('flight')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'flight' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
        >
          <Plane size={18} /> Flight
        </button>
        <button 
          onClick={() => setActiveTab('hotel')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'hotel' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
        >
          <Building2 size={18} /> Accommodation
        </button>
        <button 
          onClick={() => setActiveTab('holiday')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'holiday' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
        >
          <Palmtree size={18} /> Destination
        </button>
        <button 
          onClick={() => setActiveTab('visa')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'visa' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
        >
          <CreditCard size={18} /> Visa
        </button>
      </div>

      {/* Content based on Tab */}
      <div className="space-y-6">
        
        {/* TRANSPORTATION FORM */}
        {activeTab === 'transportation' && (
          <div className="pt-2">
            {/* Sub Tabs for Bus/Car */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setTransportationSubTab('bus')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${transportationSubTab === 'bus' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-onyx text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-onyx-lighter'}`}
              >
                <Bus size={16} /> Bus
              </button>
              <button 
                onClick={() => setTransportationSubTab('car')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${transportationSubTab === 'car' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-onyx text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-onyx-lighter'}`}
              >
                <Car size={16} /> Car Rent
              </button>
            </div>

            {/* BUS FORM */}
            {transportationSubTab === 'bus' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                 <div className="md:col-span-5 grid grid-cols-[1fr,auto,1fr] gap-2 items-center border border-gray-200 dark:border-white/10 rounded-lg p-3 relative group hover:border-primary transition-colors">
                    <div className="px-2">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">From</label>
                      <input 
                        type="text" 
                        value={busFrom}
                        onChange={(e) => setBusFrom(e.target.value)}
                        className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600" 
                      />
                      <span className="text-xs text-gray-400 dark:text-gray-500 block mt-1">Bangladesh</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors">
                      <ArrowRightLeft size={14} />
                    </div>
                    <div className="px-2 text-right">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">To</label>
                      <input 
                        type="text" 
                        value={busTo}
                        onChange={(e) => setBusTo(e.target.value)}
                        className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none text-right placeholder-gray-400 dark:placeholder-gray-600" 
                      />
                      <span className="text-xs text-gray-400 dark:text-gray-500 block mt-1">Bangladesh</span>
                    </div>
                 </div>

                 <div className="md:col-span-3 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Journey Date
                    </label>
                    <div className="font-bold text-gray-900 dark:text-white">18 Dec 25</div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">Thursday</span>
                 </div>

                 <div className="md:col-span-2 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                      <Users size={12} /> Seats
                    </label>
                    <div className="font-bold text-gray-900 dark:text-white">1 Seat</div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">AC Coach</span>
                 </div>
                 
                 <SearchButton onClick={handleSearch} />
              </div>
            )}

            {/* CAR FORM */}
            {transportationSubTab === 'car' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                 <div className="md:col-span-4 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                      <MapPin size={12} /> Pick-up Location
                    </label>
                    <input 
                      type="text" 
                      value={carLocation}
                      onChange={(e) => setCarLocation(e.target.value)}
                      className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600" 
                      placeholder="Enter city or location"
                    />
                    <span className="text-xs text-gray-400 dark:text-gray-500">Bangladesh</span>
                 </div>
                 
                 <div className="md:col-span-3 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Pick-up Date
                    </label>
                    <div className="font-bold text-gray-900 dark:text-white">18 Dec 25</div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">Wednesday</span>
                 </div>

                 <div className="md:col-span-3 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                    <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Drop-off Date
                    </label>
                    <div className="font-bold text-gray-900 dark:text-white">20 Dec 25</div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">Friday</span>
                 </div>

                 <SearchButton onClick={handleSearch} />
              </div>
            )}
          </div>
        )}

        {/* FLIGHT FORM */}
        {activeTab === 'flight' && (
          <>
            {/* Trip Type Radio */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'one'} 
                  onChange={() => setTripType('one')}
                  className="w-4 h-4 text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">One Way</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'round'} 
                  onChange={() => setTripType('round')}
                  className="w-4 h-4 text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Round Trip</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'multi'} 
                  onChange={() => setTripType('multi')}
                  className="w-4 h-4 text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Multi City</span>
              </label>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* From - To */}
              <div className="md:col-span-5 grid grid-cols-[1fr,auto,1fr] gap-2 items-center border border-gray-200 dark:border-white/10 rounded-lg p-3 relative group hover:border-primary transition-colors">
                <div className="px-2">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">From</label>
                  <input 
                    type="text" 
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                    className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600" 
                  />
                  <span className="text-xs text-gray-400 dark:text-gray-500 block mt-1">Bangladesh</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors">
                  <ArrowRightLeft size={14} />
                </div>
                <div className="px-2 text-right">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">To</label>
                  <input 
                    type="text" 
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                    className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none text-right placeholder-gray-400 dark:placeholder-gray-600" 
                  />
                  <span className="text-xs text-gray-400 dark:text-gray-500 block mt-1">Bangladesh</span>
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Journey Date
                </label>
                <div className="font-bold text-gray-900 dark:text-white">18 Dec 25</div>
                <span className="text-xs text-gray-400 dark:text-gray-500">Thursday</span>
              </div>

              {/* Travelers */}
              <div className="md:col-span-2 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Users size={12} /> Travelers
                </label>
                <div className="font-bold text-gray-900 dark:text-white">1 Traveler</div>
                <span className="text-xs text-gray-400 dark:text-gray-500">Economy</span>
              </div>
              
              <SearchButton onClick={handleSearch} />
            </div>
          </>
        )}

        {/* HOTEL FORM */}
        {activeTab === 'hotel' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4">
             <div className="md:col-span-3 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <MapPin size={12} /> City/Accommodation
                </label>
                <input 
                  type="text" 
                  value={hotelLocation}
                  onChange={(e) => setHotelLocation(e.target.value)}
                  className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600" 
                  placeholder="Enter city"
                />
                <span className="text-xs text-gray-400 dark:text-gray-500">Bangladesh</span>
             </div>
             
             <div className="md:col-span-2 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Check In
                </label>
                <div className="font-bold text-gray-900 dark:text-white">{checkIn}</div>
                <span className="text-xs text-gray-400 dark:text-gray-500">Wednesday</span>
             </div>

             <div className="md:col-span-2 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Check Out
                </label>
                <div className="font-bold text-gray-900 dark:text-white">{checkOut}</div>
                <span className="text-xs text-gray-400 dark:text-gray-500">Friday</span>
             </div>

             <div className="md:col-span-3 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Building2 size={12} /> Class
                </label>
                <select 
                  value={hotelClass}
                  onChange={(e) => setHotelClass(e.target.value)}
                  className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none cursor-pointer appearance-none"
                >
                  <option value="Economy" className="text-gray-900 bg-white dark:bg-onyx">Economy</option>
                  <option value="Business" className="text-gray-900 bg-white dark:bg-onyx">Business</option>
                  <option value="Luxury" className="text-gray-900 bg-white dark:bg-onyx">Luxury</option>
                </select>
                <span className="text-xs text-gray-400 dark:text-gray-500">Select Tier</span>
             </div>

             <SearchButton onClick={handleSearch} />
          </div>
        )}

        {/* HOLIDAY FORM */}
        {activeTab === 'holiday' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4">
             <div className="md:col-span-5 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <MapPin size={12} /> Destination
                </label>
                <input 
                  type="text" 
                  value={holidayDest}
                  onChange={(e) => setHolidayDest(e.target.value)}
                  className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600" 
                  placeholder="Where do you want to go?"
                />
             </div>
             
             <div className="md:col-span-5 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Travel Date
                </label>
                <div className="font-bold text-gray-900 dark:text-white">Anytime</div>
                <span className="text-xs text-gray-400 dark:text-gray-500">Flexible dates</span>
             </div>

             <SearchButton onClick={handleSearch} />
          </div>
        )}

        {/* VISA FORM */}
        {activeTab === 'visa' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4">
             <div className="md:col-span-5 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Globe size={12} /> Country
                </label>
                <input 
                  type="text" 
                  value={visaCountry}
                  onChange={(e) => setVisaCountry(e.target.value)}
                  className="w-full font-bold text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600" 
                  placeholder="Enter country name"
                />
             </div>
             
             <div className="md:col-span-5 border border-gray-200 dark:border-white/10 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  <FileText size={12} /> Visa Type
                </label>
                <select 
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  className="w-full font-bold text-gray-900 dark:text-white outline-none bg-transparent [&>option]:text-black"
                >
                  <option>Tourist</option>
                  <option>Business</option>
                  <option>Student</option>
                  <option>Medical</option>
                </select>
             </div>

             <SearchButton onClick={handleSearch} />
          </div>
        )}

      </div>
    </div>
  );
}

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="md:col-span-2">
      <button 
        onClick={onClick}
        className="w-full h-[66px] bg-primary hover:bg-primary-light text-white dark:text-onyx font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-1"
      >
        <Plane size={24} className="transform -rotate-45" />
        <span>Search</span>
      </button>
    </div>
  );
}