import { Plane, Building2, Palmtree, CreditCard, Menu, Globe, Bus, Car, ChevronDown, Moon, Map } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useCurrency } from '../context/CurrencyContext';

export default function Navbar() {
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();
  
  const toggleCurrency = () => {
    setCurrency(currency === 'BDT' ? 'USD' : 'BDT');
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.includes('?')) {
      const [basePath, query] = path.split('?');
      return location.pathname === basePath && location.search.includes(query);
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { 
      label: 'Transportation', 
      icon: Bus,
      path: '/search?type=bus',
      children: [
        { path: '/search?type=bus', label: 'Bus', icon: Bus },
        { path: '/search?type=car', label: 'Car Rent', icon: Car },
      ]
    },
    { 
      label: 'Flight', 
      icon: Plane,
      path: '/search?type=flight',
      children: [
        { path: '/search?type=flight&category=domestic', label: 'Domestic Flight', icon: Map },
        { path: '/search?type=flight&category=international', label: 'International Flight', icon: Globe },
        { path: '/search?type=flight&category=hajj-umrah', label: 'Hajj and Umrah', icon: Moon },
      ]
    },
    { path: '/search?type=hotel', label: 'Accommodation', icon: Building2 },
    { path: '/search?type=holiday', label: 'Destination', icon: Palmtree },
    { path: '/search?type=visa', label: 'Visa', icon: CreditCard },
  ];

  return (
    <nav className="bg-onyx/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Plane className="text-white w-5 h-5 transform -rotate-45" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight">Nexily</span>
          </Link>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button 
                      className={clsx(
                        "px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-200 group-hover:bg-onyx-light",
                        item.children.some(child => isActive(child.path))
                          ? "bg-primary/10 text-primary" 
                          : "text-gray-300 hover:text-primary"
                      )}
                    >
                      <item.icon size={18} className={item.children.some(child => isActive(child.path)) ? "stroke-[2.5px]" : ""} /> 
                      {item.label}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 w-48 bg-onyx-light rounded-xl shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className={clsx(
                            "block px-4 py-3 text-sm font-medium hover:bg-onyx flex items-center gap-3 transition-colors",
                            isActive(child.path) ? "text-primary bg-primary/5" : "text-gray-300"
                          )}
                        >
                          <child.icon size={16} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    to={item.path} 
                    className={clsx(
                      "px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-200",
                      isActive(item.path) 
                        ? "bg-primary/10 text-primary" 
                        : "text-gray-300 hover:bg-onyx-light hover:text-primary"
                    )}
                  >
                    <item.icon size={18} className={isActive(item.path) ? "stroke-[2.5px]" : ""} /> 
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleCurrency}
              className="hidden sm:flex items-center gap-2 text-gray-300 cursor-pointer hover:bg-white/5 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-white/10"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{currency}</span>
            </button>
            <button className="btn-primary py-2 px-6 text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
              Login
            </button>
            <button className="md:hidden p-2 text-gray-300 hover:bg-white/5 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
