import { Shield, Lock, Eye } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-onyx min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-onyx-light border-b border-white/10 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-onyx-light p-6 rounded-xl border border-white/5">
            <Shield className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Data Protection</h3>
            <p className="text-gray-400">We use industry-standard encryption to protect your sensitive data.</p>
          </div>
          <div className="bg-onyx-light p-6 rounded-xl border border-white/5">
            <Lock className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure Transactions</h3>
            <p className="text-gray-400">All payments are processed securely through certified payment gateways.</p>
          </div>
          <div className="bg-onyx-light p-6 rounded-xl border border-white/5">
            <Eye className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Transparency</h3>
            <p className="text-gray-400">We are transparent about the data we collect and how it is used.</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you create an account, make a booking, or contact our support team. This may include your name, email address, phone number, payment information, and travel preferences.
            </p>
            <p>
              We also automatically collect certain information about your device and how you interact with our services, such as your IP address, browser type, and pages visited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process your bookings and payments.</li>
              <li>To communicate with you about your reservations and account.</li>
              <li>To send you promotional offers and newsletters (you can opt-out at any time).</li>
              <li>To improve our website and customer service.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-4">3. Data Sharing</h2>
            <p>
              We may share your information with third-party service providers who assist us in operating our business, such as airlines, hotels, and payment processors. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-4">4. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or request a copy of it. To exercise these rights, please contact our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-4">5. Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
