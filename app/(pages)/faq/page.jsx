"use client"
import React, { useState } from 'react';

const faqs = [
  {
    question: "Are there any special discounts or promotions available during the event?",
    answer: "Yes, we offer exclusive discounts and promotions during our events. Stay tuned for announcements on upcoming deals!",
  },
  {
    question: "What are the dates and locations for the product launch events?",
    answer: "Our product launch events are scheduled throughout the year in major cities. Please visit our events page for the latest updates.",
  },
  {
    question: "Can I bring a guest with me to the product launch event?",
    answer: "Yes, you're welcome to bring a guest. Please make sure to register them during the event registration process.",
  },
  {
    question: "How can I register for the event?",
    answer: "You can register for the event through our official website under the events section. Follow the simple registration steps provided.",
  },
  {
    question: "Is there parking available at the venue?",
    answer: "Most of our event venues have designated parking areas. Details will be provided in the event confirmation email.",
  },
  {
    question: "How can I contact the event organizers?",
    answer: "You can reach out to us through the contact form on our website or email us at events@example.com for any inquiries.",
  },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
      <div className="divide-y rounded-lg shadow-md">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion">
            <button
              type="button"
              className="w-full text-left font-semibold py-4 px-4 text-gray-800 hover:text-blue-600 flex items-center focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="mr-4">{faq.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-4 h-4 ml-auto transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180 text-blue-600' : 'rotate-0 text-gray-500'
                }`}
              >
                <path
                  fill="currentColor"
                  d="M12 15.5l-7-7 1.41-1.41L12 12.67l5.59-5.58L19 8.5z"
                />
              </svg>
            </button>
            <div
              className={`px-4 overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-sm text-gray-600 py-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
