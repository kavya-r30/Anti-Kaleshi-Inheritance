import React from 'react';
import { Code2, Github, Trophy, ChevronRight, Check, Star, Users, Zap } from 'lucide-react';
import PlatformCurve from './landing/PlatformCurve';
import dashboardP from '../assets/dashboardP.png'
import devboardP from '../assets/devboardP.png'
import contestP from '../assets/contestP.png'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const FeaturePoint = ({ children }) => (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
        <Check className="w-4 h-4 text-purple-600" />
      </div>
      <span>{children}</span>
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className="pt-20 pb-20 text-center px-4 bg-gradient-to-b from-purple-50 
          via-slate-50 to-white relative overflow-hidden">
        <div className="relative">
          <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
            from-purple-500 via-purple-600 to-purple-500 mb-8">
            Track. Code. Excel.
          </h1>
          <p className="text-2xl text-slate-700 max-w-5xl mx-auto px-8 leading-relaxed mb-9">
          Track your competitive programming journey with powerful analytics and insights. 
          Monitor your progress across multiple platforms, analyze your performance, and 
          identify areas for improvement.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link to='/dashboard'>
              <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white 
                rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 
                transition-all duration-300 flex items-center gap-3 group"
              >
                Get Started
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        <PlatformCurve />
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-24 space-y-24">
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-16 relative overflow-hidden group">
          <div className="flex items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg w-fit">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">
                Coding Mastery Dashboard
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Track your competitive programming journey with powerful analytics and insights.
              </p>
              <div className="grid grid-cols-1 gap-4 text-slate-700">
                <FeaturePoint>Real-time Performance tracking</FeaturePoint>
                <FeaturePoint>Contest Rating overview</FeaturePoint>
                <FeaturePoint>Skill Level analysis</FeaturePoint>
                <FeaturePoint>Progress visualization</FeaturePoint>
                <FeaturePoint>Daily problem suggestion</FeaturePoint>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 
                rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img src={dashboardP} alt="Dashboard" className="relative rounded-xl w-full 
                h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-16 text-white relative overflow-hidden group">
          <div className="flex items-center gap-16 flex-row-reverse">
            <div className="flex-1 space-y-8">
              <div className="p-3 bg-white/10 backdrop-blur-xl rounded-xl shadow-lg w-fit">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold">
                Developer Portfolio Hub
              </h2>
              <p className="text-xl text-slate-200 mb-8">
                Showcase your development journey with beautiful visualizations and metrics.
              </p>
              <div className="grid grid-cols-2 gap-4 text-slate-200">
                <FeaturePoint>Automated project showcases</FeaturePoint>
                <FeaturePoint>Contribution analytics</FeaturePoint>
                <FeaturePoint>Custom domain support</FeaturePoint>
                <FeaturePoint>Integration with GitHub</FeaturePoint>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 
                rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img src={devboardP} alt="Dashboard" className="relative rounded-xl w-full 
                h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-16 relative overflow-hidden group mb-24">
          <div className="flex items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg w-fit">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">
                Contest Central
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Stay ahead with monthly contest reminders, ensuring you never miss an opportunity!
              </p>
              <div className="grid grid-cols-1 gap-4">
                <FeaturePoint>Live contest tracking</FeaturePoint>
                <FeaturePoint>Custom reminders</FeaturePoint>
                <FeaturePoint>Monthly Contest Overview</FeaturePoint>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 
                rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img src={contestP} alt="Dashboard" className="relative rounded-xl w-full 
                h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-b from-purple-700 to-purple-950 text-white py-24">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h3 className="text-5xl font-bold mb-8">
            Ready to Transform Your Coding Journey?
          </h3>
          <p className="text-xl text-slate-200 mb-12">
            Join thousands of developers who are already taking their coding skills to the next level.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link to='/dashboard'>
              <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group">
                Get Started Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;