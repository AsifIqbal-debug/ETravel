import { useState, useEffect } from 'react';
import { Plane, Calendar, Users, MapPin, ArrowRightLeft, Building2, Palmtree, CreditCard, Globe, FileText } from 'lucide-react';
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
  
  // Hotel State
  const [hotelLocation, setHotelLocation] = useState('Cox\'s Bazar');
  const [checkIn] = useState('18 Dec 25');
  const [checkOut] = useState('20 Dec 25');
  
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
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto -mt-24 relative z-10 border border-gray-100">
      {/* Tabs */}
      <div className="flex gap-4 md:gap-8 border-b border-gray-100 pb-4 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('flight')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'flight' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Plane size={18} /> Flight
        </button>
        <button 
          onClick={() => setActiveTab('hotel')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'hotel' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Building2 size={18} /> Hotel
        </button>
        <button 
          onClick={() => setActiveTab('holiday')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'holiday' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Palmtree size={18} /> Holiday
        </button>
        <button 
          onClick={() => setActiveTab('visa')}
          className={`pb-2 text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'visa' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <CreditCard size={18} /> Visa
        </button>
      </div>

      {/* Content based on Tab */}
      <div className="space-y-6">
        
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
                  className="w-4 h-4 text-primary focus:ring-primary" 
                />
                <span className="text-sm font-medium text-gray-700">One Way</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'round'} 
                  onChange={() => setTripType('round')}
                  className="w-4 h-4 text-primary focus:ring-primary" 
                />
                <span className="text-sm font-medium text-gray-700">Round Trip</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'multi'} 
                  onChange={() => setTripType('multi')}
                  className="w-4 h-4 text-primary focus:ring-primary" 
                />
                <span className="text-sm font-medium text-gray-700">Multi City</span>
              </label>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* From - To */}
              <div className="md:col-span-5 grid grid-cols-[1fr,auto,1fr] gap-2 items-center border border-gray-200 rounded-lg p-3 relative group hover:border-primary transition-colors">
                <div className="px-2">
                  <label className="block text-xs text-gray-500 uppercase font-semibold mb-1">From</label>
                  <input 
                    type="text" 
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                    className="w-full font-bold text-gray-900 outline-none placeholder-gray-300" 
                  />
                  <span className="text-xs text-gray-400 block mt-1">Bangladesh</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors">
                  <ArrowRightLeft size={14} />
                </div>
                <div className="px-2 text-right">
                  <label className="block text-xs text-gray-500 uppercase font-semibold mb-1">To</label>
                  <input 
                    type="text" 
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                    className="w-full font-bold text-gray-900 outline-none text-right placeholder-gray-300" 
                  />
                  <span className="text-xs text-gray-400 block mt-1">Bangladesh</span>
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Journey Date
                </label>
                <div className="font-bold text-gray-900">18 Dec 25</div>
                <span className="text-xs text-gray-400">Thursday</span>
              </div>

              {/* Travelers */}
              <div className="md:col-span-2 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Users size={12} /> Travelers
                </label>
                <div className="font-bold text-gray-900">1 Traveler</div>
                <span className="text-xs text-gray-400">Economy</span>
              </div>
              
              <SearchButton onClick={handleSearch} />
            </div>
          </>
        )}

        {/* HOTEL FORM */}
        {activeTab === 'hotel' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4">
             <div className="md:col-span-4 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <MapPin size={12} /> City/Hotel
                </label>
                <input 
                  type="text" 
                  value={hotelLocation}
                  onChange={(e) => setHotelLocation(e.target.value)}
                  className="w-full font-bold text-gray-900 outline-none placeholder-gray-300" 
                  placeholder="Enter city or hotel name"
                />
                <span className="text-xs text-gray-400">Bangladesh</span>
             </div>
             
             <div className="md:col-span-3 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Check In
                </label>
                <div className="font-bold text-gray-900">{checkIn}</div>
                <span className="text-xs text-gray-400">Wednesday</span>
             </div>

             <div className="md:col-span-3 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Check Out
                </label>
                <div className="font-bold text-gray-900">{checkOut}</div>
                <span className="text-xs text-gray-400">Friday</span>
             </div>

             <SearchButton onClick={handleSearch} />
          </div>
        )}

        {/* HOLIDAY FORM */}
        {activeTab === 'holiday' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4">
             <div className="md:col-span-5 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <MapPin size={12} /> Destination
                </label>
                <input 
                  type="text" 
                  value={holidayDest}
                  onChange={(e) => setHolidayDest(e.target.value)}
                  className="w-full font-bold text-gray-900 outline-none placeholder-gray-300" 
                  placeholder="Where do you want to go?"
                />
             </div>
             
             <div className="md:col-span-5 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Travel Date
                </label>
                <div className="font-bold text-gray-900">Anytime</div>
                <span className="text-xs text-gray-400">Flexible dates</span>
             </div>

             <SearchButton onClick={handleSearch} />
          </div>
        )}

        {/* VISA FORM */}
        {activeTab === 'visa' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4">
             <div className="md:col-span-5 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <Globe size={12} /> Country
                </label>
                <input 
                  type="text" 
                  value={visaCountry}
                  onChange={(e) => setVisaCountry(e.target.value)}
                  className="w-full font-bold text-gray-900 outline-none placeholder-gray-300" 
                  placeholder="Enter country name"
                />
             </div>
             
             <div className="md:col-span-5 border border-gray-200 rounded-lg p-3 hover:border-primary transition-colors cursor-pointer">
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                  <FileText size={12} /> Visa Type
                </label>
                <select 
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  className="w-full font-bold text-gray-900 outline-none bg-transparent"
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
        className="w-full h-[66px] bg-secondary hover:bg-[#a67c73] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-1"
      >
        <Plane size={24} className="transform -rotate-45" />
        <span>Search</span>
      </button>
    </div>
  );
}
