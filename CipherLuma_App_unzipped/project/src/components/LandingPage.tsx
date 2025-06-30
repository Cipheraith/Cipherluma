import React, { useState } from 'react';
import { ArrowRight, Zap, Code, MapPin, FileText, ExternalLink } from 'lucide-react';
import DocsPage from './DocsPage';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [showDocs, setShowDocs] = useState(false);

  const openApiDocs = () => {
    setShowDocs(true);
  };

  if (showDocs) {
    return <DocsPage onBack={() => setShowDocs(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF] text-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 relative z-10 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-12 animate-fade-in">
          <img 
            src="/1750581770960.jpg" 
            alt="CipherLuma" 
            className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-wide text-center sm:text-left">CipherLUMA</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 sm:px-8 lg:px-12 py-4 sm:py-8 lg:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12 animate-slide-in-left text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] tracking-tight">
                  Global Payments,<br />
                  <span className="text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">Locally Powered</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Send & receive money instantly from anywhere in the world.<br className="hidden sm:block" />
                  Designed for people. Built for developers.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center lg:justify-start">
                <button 
                  onClick={onGetStarted}
                  className="w-full sm:w-auto bg-white text-[#0F1629] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 animate-bounce-subtle"
                >
                  Get Started
                </button>
                <button 
                  onClick={openApiDocs}
                  className="w-full sm:w-auto border-2 border-white/30 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white/50 flex items-center justify-center space-x-2"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>View API Docs</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>

            {/* Right Content - Enhanced visual element */}
            <div className="relative flex justify-center items-center mt-8 lg:mt-0 animate-slide-in-right">
              <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] h-[200px] sm:h-[300px] lg:h-[400px] flex items-center justify-center">
                {/* Central glowing orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-2 sm:top-4 lg:top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full shadow-lg"></div>
                  <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-purple-400 rounded-full shadow-lg"></div>
                  <div className="absolute left-2 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-cyan-400 rounded-full shadow-lg"></div>
                  <div className="absolute right-2 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-indigo-400 rounded-full shadow-lg"></div>
                </div>

                {/* Secondary orbit */}
                <div className="absolute inset-2 sm:inset-4 lg:inset-8 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-80"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-80"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-80"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-80"></div>
                </div>

                {/* Central logo */}
                <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <img 
                    src="/1750581770960.jpg" 
                    alt="CipherLuma" 
                    className="h-16 w-16 sm:h-20 sm:w-20 lg:h-32 lg:w-32 object-contain rounded-xl"
                  />
                </div>

                {/* Floating connection lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 500 400">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2"/>
                    </linearGradient>
                  </defs>
                  <path d="M 100 100 Q 250 50 400 150" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
                  <path d="M 100 300 Q 250 350 400 250" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }}/>
                  <path d="M 50 200 Q 150 100 300 200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDelay: '2s' }}/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16">
            {/* Instant Transfers */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 group animate-fade-in-up text-center sm:text-left" style={{ animationDelay: '0.2s' }}>
              <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-3 group-hover:bg-blue-500/20 transition-all duration-300 transform group-hover:scale-110 mx-auto sm:mx-0">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Instant Transfers</h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Quick and seamless money transfers worldwide.
                </p>
              </div>
            </div>

            {/* API Access */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 group animate-fade-in-up text-center sm:text-left" style={{ animationDelay: '0.4s' }}>
              <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-3 group-hover:bg-blue-500/20 transition-all duration-300 transform group-hover:scale-110 mx-auto sm:mx-0">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">API Access</h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Integrate global payments with a simple API
                </p>
              </div>
            </div>

            {/* Built for Africa */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 group animate-fade-in-up text-center sm:text-left sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.6s' }}>
              <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-3 group-hover:bg-blue-500/20 transition-all duration-300 transform group-hover:scale-110 mx-auto sm:mx-0">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Built for Africa</h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Empowering financial inclusion across the continent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;