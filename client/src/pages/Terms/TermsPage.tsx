import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-gray-50 dark:bg-onyx min-h-screen pb-20 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-white dark:bg-onyx-light border-b border-gray-200 dark:border-white/10 py-16 transition-colors duration-300">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By using Nexily, you agree to be bound by these terms.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="text-primary" size={24} />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Nexily website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" size={24} />
              2. Booking and Reservations
            </h2>
            <p className="mb-4">
              All bookings are subject to availability and acceptance by the respective service providers (airlines, hotels, etc.). When you make a booking, you are entering into a contract directly with the service provider.
            </p>
            <p>
              Nexily acts as an intermediary and is not responsible for the acts or omissions of these third-party providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-primary" size={24} />
              3. Cancellations and Refunds
            </h2>
            <p className="mb-4">
              Cancellation policies vary by service provider. Please review the specific terms and conditions of your booking before confirming.
            </p>
            <p>
              Nexily may charge a service fee for processing cancellations or changes, in addition to any fees charged by the service provider. Refunds will be processed according to the provider's policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">4. User Responsibilities</h2>
            <p>
              You are responsible for ensuring that you have valid travel documents (passports, visas, etc.) for your journey. You agree to provide accurate and complete information when making a booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p>
              The content on the Nexily website, including text, graphics, logos, and images, is the property of Nexily or its content suppliers and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
            <p>
              Nexily shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
            </p>
          </section>

           <section>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">7. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Nexily operates.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
