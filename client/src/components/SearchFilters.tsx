import { Plane, Clock, MapPin, Star, Check, Bus, Car, Calendar } from 'lucide-react';

interface SearchFiltersProps {
  type: string;
  searchParams: URLSearchParams;
  updateFilter: (key: string, value: string) => void;
  // Flight Props
  tripType: string;
  setTripType: (val: string) => void;
  fromInput: string;
  setFromInput: (val: string) => void;
  toInput: string;
  setToInput: (val: string) => void;
  returnDate: string;
  setReturnDate: (val: string) => void;
  timeFilter: string;
  setTimeFilter: (val: string) => void;
}

export default function SearchFilters({
  type,
  searchParams,
  updateFilter,
  tripType,
  setTripType,
  fromInput,
  setFromInput,
  toInput,
  setToInput,
  returnDate,
  setReturnDate,
  timeFilter,
  setTimeFilter
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      {type === 'flight' && (
        <div className="bg-white dark:bg-onyx-light p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4 transition-colors duration-300">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Search Flight</h3>
          
          {/* Trip Type Selection */}
          <div className="flex flex-wrap gap-3 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="tripType" 
                value="one-way" 
                checked={tripType === 'one-way'} 
                onChange={(e) => setTripType(e.target.value)}
                className="text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600 accent-primary"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">One Way</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="tripType" 
                value="round-trip" 
                checked={tripType === 'round-trip'} 
                onChange={(e) => setTripType(e.target.value)}
                className="text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600 accent-primary"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">Round Trip</span>
            </label>

            {searchParams.get('category') !== 'hajj-umrah' && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  value="multi-city" 
                  checked={tripType === 'multi-city'} 
                  onChange={(e) => setTripType(e.target.value)}
                  className="text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600 accent-primary"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">Multi City</span>
              </label>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">From</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <input 
                type="text" 
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
                placeholder="Departure City"
                className="w-full bg-gray-50 dark:bg-onyx border border-gray-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">To</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <input 
                type="text" 
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                placeholder="Destination City"
                className="w-full bg-gray-50 dark:bg-onyx border border-gray-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {tripType === 'round-trip' && (
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Return Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input 
                  type="date" 
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-onyx border border-gray-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary/50 dark:[&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Departure Time</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full bg-gray-50 dark:bg-onyx border border-gray-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-primary/50 appearance-none"
              >
                <option value="">Any Time</option>
                <option value="morning">Morning (6AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 6PM)</option>
                <option value="evening">Evening (6PM - 12AM)</option>
                <option value="night">Night (12AM - 6AM)</option>
              </select>
              <Check size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none opacity-50" />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-onyx-light p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Price Range</h3>
        <input type="range" className="w-full accent-primary bg-gray-200 dark:bg-gray-700" />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>Min</span>
          <span>Max</span>
        </div>
      </div>
      
      {type === 'flight' && (
        <div className="bg-white dark:bg-onyx-light p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Stops</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600" defaultChecked />
              <span className="text-sm text-gray-600 dark:text-gray-300">Non Stop</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">1 Stop</span>
            </label>
          </div>
        </div>
      )}

      {type === 'hotel' && (
        <>
        <div className="bg-white dark:bg-onyx-light p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Class</h3>
            <div className="space-y-2">
              {['Economy', 'Business', 'Luxury'].map((cls) => (
                <label key={cls} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="hotelClass" 
                    checked={searchParams.get('class') === cls}
                    onChange={() => updateFilter('class', cls)}
                    className="text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600 accent-primary" 
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{cls}</span>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="hotelClass" 
                    checked={!searchParams.get('class')}
                    onChange={() => updateFilter('class', '')}
                    className="text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600 accent-primary" 
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">All</span>
                </label>
            </div>
          </div>

          <div className="bg-white dark:bg-onyx-light p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Star Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2].map(star => (
                <label key={star} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary bg-gray-100 dark:bg-onyx border-gray-300 dark:border-gray-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">{star} <Star size={12} className="fill-primary text-primary"/></span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}