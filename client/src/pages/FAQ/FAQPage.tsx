import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I book a flight?",
      answer: "Booking a flight is easy! Simply enter your origin, destination, and travel dates in the search bar on our homepage. Browse the available options, select your preferred flight, and proceed to payment."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking, but it depends on the specific policy of the airline or hotel. You can view the cancellation policy in your booking details or contact our support team for assistance."
    },
    {
      question: "How do I get my ticket?",
      answer: "Once your booking is confirmed and payment is processed, your e-ticket will be sent to your registered email address. You can also download it from the 'My Bookings' section of your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods, including credit/debit cards (Visa, MasterCard, Amex), mobile banking (bKash, Nagad), and net banking."
    },
    {
      question: "Do you offer visa assistance?",
      answer: "Yes, we offer comprehensive visa assistance services for many popular destinations. You can check the 'Visa' section on our website for requirements and pricing."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure your financial information is protected at all times."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-onyx min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-onyx-light border-b border-white/10 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our services, bookings, and policies.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-onyx-light border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === index ? 'bg-primary text-onyx' : 'bg-white/5 text-gray-400'}`}>
                    <HelpCircle size={18} />
                  </div>
                  <span className={`font-medium text-lg ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                    {faq.question}
                  </span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="text-primary" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-0 pl-[4.5rem] text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a 
            href="/contact" 
            className="inline-block bg-white/5 hover:bg-white/10 text-white font-medium px-8 py-3 rounded-full border border-white/10 hover:border-primary/50 transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
