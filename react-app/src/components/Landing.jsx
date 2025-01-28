import React from 'react';
import { ChevronDown } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Track, analyze & share
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Codolio helps you navigate and track your coding journey to success
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Get Started
        </button>
        
        {/* Dashboard Preview */}
        <div className="mt-12 relative">
          <img 
            src="/api/placeholder/1000/500" 
            alt="Dashboard Preview" 
            className="rounded-lg shadow-2xl"
          />
          <img 
            src="/api/placeholder/100/100" 
            alt="Owl Mascot" 
            className="absolute -top-8 -left-8 w-24 h-24"
          />
        </div>
      </section>

      {/* Coding Platforms Section */}
      <section className="py-16 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">Your Favourite Coding Platforms</h2>
        <p className="text-gray-600 mb-8">
          Streamlined in Codolio for simplify your coding journey
        </p>
        <div className="flex justify-center items-center space-x-4">
          <img src="/api/placeholder/40/40" alt="Platform 1" className="h-10" />
          <img src="/api/placeholder/40/40" alt="Platform 2" className="h-10" />
          <img src="/api/placeholder/40/40" alt="Platform 3" className="h-10" />
          <img src="/api/placeholder/40/40" alt="Platform 4" className="h-10" />
        </div>
      </section>

      {/* Simplify Your Prep Section */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Simplify Your Prep</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
          <div className="p-6">
            <img src="/api/placeholder/64/64" alt="Icon" className="mx-auto mb-4" />
            <h3 className="font-semibold mb-2">My Workspace</h3>
            <p className="text-gray-600">Organize your coding journey</p>
          </div>
          <div className="p-6">
            <img src="/api/placeholder/64/64" alt="Icon" className="mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Smart Sheets</h3>
            <p className="text-gray-600">Track your progress</p>
          </div>
          <div className="p-6">
            <img src="/api/placeholder/64/64" alt="Icon" className="mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Contest Calendar</h3>
            <p className="text-gray-600">Never miss a contest</p>
          </div>
        </div>
        <img 
          src="/api/placeholder/1000/500" 
          alt="Workspace Preview" 
          className="rounded-lg shadow-xl"
        />
      </section>

      {/* All-in-One Portfolio Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Your All-in-One Coding Portfolio</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Total Problems Solved</h3>
                <div className="text-4xl font-bold">920</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Progress Chart</h3>
                <img src="/api/placeholder/400/200" alt="Chart" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Achievements</h3>
                <div className="flex space-x-4">
                  <img src="/api/placeholder/48/48" alt="Badge" />
                  <img src="/api/placeholder/48/48" alt="Badge" />
                  <img src="/api/placeholder/48/48" alt="Badge" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Contest Ratings</h3>
                <img src="/api/placeholder/400/200" alt="Ratings" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Share your #CodolioCard</h2>
        <p className="text-gray-600 mb-12">Wherever you want</p>
        <img 
          src="/api/placeholder/600/400" 
          alt="Social Share Preview" 
          className="mx-auto rounded-lg shadow-xl"
        />
      </section>

      {/* Contest Calendar Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Never Miss a Contest</h2>
          <img 
            src="/api/placeholder/1000/500" 
            alt="Calendar Preview" 
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            "How can I change my profile name?",
            "Why can't seeing public working and unable to find my profile handle?",
            "Which coding platforms are supported?",
            "How do I connect my coding profile from different platforms?",
            "What should I do if structured or area competing my leetcode profile?"
          ].map((question, index) => (
            <button 
              key={index}
              className="w-full text-left p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              {question}
              <ChevronDown className="w-5 h-5" />
            </button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to unlock</h2>
        <h2 className="text-3xl font-bold mb-8">your Coding Portfolio?</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-4">
            {/* <a className="text-gray-600 hover:text-gray-900">
              <Linkedin className="w-6 h-6" />
            </a>
            <a className="text-gray-600 hover:text-gray-900">
              <Twitter className="w-6 h-6" />
            </a>
            <a className="text-gray-600 hover:text-gray-900">
              <Instagram className="w-6 h-6" />
            </a> */}
          </div>
          <p className="text-center text-gray-600">
            © 2024 Codolio, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;