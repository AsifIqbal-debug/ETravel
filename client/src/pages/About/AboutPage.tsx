import { Plane, Users, Globe, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-onyx transition-colors duration-300 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white dark:bg-onyx-light border-b border-gray-200 dark:border-white/10 py-20 transition-colors duration-300">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">About Nexily</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We are dedicated to making your travel experience seamless, affordable, and memorable. 
            Discover the world with confidence.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              At Nexily, we believe that travel opens minds and bridges cultures. Our mission is to provide 
              a comprehensive platform where travelers can easily plan their journeys, from flights and 
              accommodation to visa processing and holiday packages.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We leverage technology to bring you the best prices and a hassle-free booking experience, 
              backed by 24/7 customer support.
            </p>
          </div>
          <div className="bg-white dark:bg-onyx-light border border-gray-200 dark:border-white/10 rounded-2xl h-[400px] flex items-center justify-center transition-colors duration-300 shadow-sm">
             <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <Plane className="text-primary w-12 h-12" />
             </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-onyx-light py-20 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-white/5">
                <Users className="text-primary w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1M+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-white/5">
                <Globe className="text-primary w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">100+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-white/5">
                <Plane className="text-primary w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">500+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Airline Partners</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200 dark:border-white/5">
                <Award className="text-primary w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
