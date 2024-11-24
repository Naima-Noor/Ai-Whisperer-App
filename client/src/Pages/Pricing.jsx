import React from 'react';

function PricingPage() {
  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="container mx-auto px-4 py-12">
        <h1 className="underline text-4xl font-bold text-center mb-8" style={{ color: '#3bb19b' }}>Pricing Plans</h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Welcome to AI Whisperer, the ultimate destination for discerning the authenticity and originality of written content. Our advanced tools leverage cutting-edge technology to differentiate between AI-generated and human-written text with unparalleled accuracy. Whether you're a student, educator, writer, or business professional, our services ensure the integrity of your work by detecting plagiarism and providing detailed reports. Explore our flexible pricing plans tailored to meet your specific needs and experience the peace of mind that comes with knowing your content is both genuine and unique.
        </p>
        <div className="flex justify-center gap-8 flex-nowrap overflow-x-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-lg border-4 border-[#3bb19b] p-6 w-full md:w-1/3">
            <div className="border-b-4 border-[#3bb19b] mb-4 pb-4">
              <h2 className="text-2xl font-bold text-center mb-2">Basic Plan</h2>
              <div className="text-center">
                <p className="text-3xl" style={{ color: '#3bb19b' }}>$9.99/month</p>
              </div>
            </div>
            <ul className="text-gray-700 mb-6">
              <li className="mb-2">Analyze up to 50 documents per month</li>
              <li className="mb-2">AI vs. human text differentiation</li>
              <li className="mb-2">Basic plagiarism detection</li>
              <li className="mb-2">Detailed text analysis reports</li>
              <li className="mb-2">Email support</li>
            </ul>
            <p className="text-gray-500 text-center mb-6">Ideal For: Students, hobbyists, and small projects</p>
            <a href="#" className="block text-center bg-[#3bb19b] text-white border-2 border-[#3bb19b] py-3 px-6 rounded-lg transition duration-200 hover:py-4 hover:px-7 hover:underline">Subscribe Now</a>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-lg border-4 border-[#3bb19b] p-6 w-full md:w-1/3">
            <div className="border-b-4 border-[#3bb19b] mb-4 pb-4">
              <h2 className="text-2xl font-bold text-center mb-2">Pro Plan</h2>
              <div className="text-center">
                <p className="text-3xl" style={{ color: '#3bb19b' }}>$29.99/month</p>
              </div>
            </div>
            <ul className="text-gray-700 mb-6">
              <li className="mb-2">Analyze up to 200 documents per month</li>
              <li className="mb-2">AI vs. human text differentiation</li>
              <li className="mb-2">Advanced plagiarism detection</li>
              <li className="mb-2">Comprehensive text analysis reports</li>
              <li className="mb-2">Priority email support</li>
              <li className="mb-2">API access for integration</li>
            </ul>
            <p className="text-gray-500 text-center mb-6">Ideal For: Educators, writers, and small businesses</p>
            <a href="#" className="block text-center bg-[#3bb19b] text-white border-2 border-[#3bb19b] py-3 px-6 rounded-lg transition duration-200 hover:py-4 hover:px-7 hover:underline">Subscribe Now</a>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-lg border-4 border-[#3bb19b] p-6 w-full md:w-1/3">
            <div className="border-b-4 border-[#3bb19b] mb-4 pb-4">
              <h2 className="text-2xl font-bold text-center mb-2">Enterprise Plan</h2>
              <div className="text-center">
                <p className="text-3xl" style={{ color: '#3bb19b' }}>Starting at $99.99/month</p>
              </div>
            </div>
            <ul className="text-gray-700 mb-6">
              <li className="mb-2">Unlimited document analysis</li>
              <li className="mb-2">AI vs. human text differentiation</li>
              <li className="mb-2">Premium plagiarism detection with cross-referencing</li>
              <li className="mb-2">In-depth text analysis reports with export options</li>
              <li className="mb-2">Dedicated account manager</li>
              <li className="mb-2">24/7 priority support</li>
              <li className="mb-2">Custom API solutions and integrations</li>
            </ul>
            <p className="text-gray-500 text-center mb-6">Ideal For: Large organizations, educational institutions, and enterprises</p>
            <a href="#" className="block text-center bg-[#3bb19b] text-white border-2 border-[#3bb19b] py-3 px-6 rounded-lg transition duration-200 hover:py-4 hover:px-7 hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
