import React from 'react';
import { Plane, Building2, Palmtree, CreditCard, Menu, User, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.includes('?')) {
      const [basePath, query] = path.split('?');
      return location.pathname === basePath && location.search.includes(query);
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Plane className="text-white w-5 h-5 transform -rotate-45" />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">E Travel</span>
          </Link>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { path: '/', label: 'Flight', icon: Plane },
              { path: '/search?type=hotel', label: 'Hotel', icon: Building2 },
              { path: '/search?type=holiday', label: 'Holiday', icon: Palmtree },
              { path: '/search?type=visa', label: 'Visa', icon: CreditCard },
            ].map((item) => (
              <Link 
                key={item.label}
                to={item.path} 
                className={clsx(
                  "px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-200",
                  isActive(item.path) 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                )}
              >
                <item.icon size={18} className={isActive(item.path) ? "stroke-[2.5px]" : ""} /> 
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-gray-200">
              <Globe size={18} />
              <span className="text-sm font-medium">BDT</span>
            </div>
            <button className="btn-primary py-2 px-6 text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
              Login
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
