import { Plane, Building2, Palmtree, CreditCard, Menu, Globe, Bus, Car, ChevronDown, Moon, Map, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
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
    <nav className="bg-white/80 dark:bg-onyx/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 sticky top-0 z-50 transition-colors duration-300">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Plane className="text-onyx dark:text-white w-5 h-5 transform -rotate-45" />
            </div>
            <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">Nexily</span>
          </Link>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button 
                      className={clsx(
                        "px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-200 group-hover:bg-gray-100 dark:group-hover:bg-onyx-light",
                        item.children.some(child => isActive(child.path))
                          ? "bg-primary/10 text-primary" 
                          : "text-gray-600 dark:text-gray-300 hover:text-primary"
                      )}
                    >
                      <item.icon size={18} className={item.children.some(child => isActive(child.path)) ? "stroke-[2.5px]" : ""} /> 
                      {item.label}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-onyx-light rounded-xl shadow-xl border border-gray-200 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className={clsx(
                            "block px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-onyx flex items-center gap-3 transition-colors",
                            isActive(child.path) ? "text-primary bg-primary/5" : "text-gray-600 dark:text-gray-300"
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
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-onyx-light hover:text-primary"
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
              onClick={toggleTheme}
              className="hidden sm:flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 w-9 h-9 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
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
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={clsx(
          "fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-onyx shadow-2xl z-50 transform transition-transform duration-300 md:hidden overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-serif font-bold text-gray-900 dark:text-white">Menu</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {navItems.map((item) => (
              <div key={item.label} className="space-y-2">
                {item.children ? (
                  <div className="space-y-2">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2 px-4 py-2">
                      <item.icon size={18} />
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-1 border-l-2 border-gray-100 dark:border-white/5 ml-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={clsx(
                            "block px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2",
                            isActive(child.path) 
                              ? "text-primary bg-primary/5 font-medium" 
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors",
                      isActive(item.path) 
                        ? "text-primary bg-primary/5" 
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between px-4">
              <span className="text-gray-600 dark:text-gray-300">Theme</span>
              <button 
                onClick={toggleTheme}
                className="flex items-center justify-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 w-9 h-9 rounded-full"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div className="flex items-center justify-between px-4">
              <span className="text-gray-600 dark:text-gray-300">Currency</span>
              <button 
                onClick={toggleCurrency}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full text-sm font-medium"
              >
                <Globe size={16} />
                {currency}
              </button>
            </div>
            <button className="w-full btn-primary py-3 rounded-xl shadow-lg shadow-primary/20">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
