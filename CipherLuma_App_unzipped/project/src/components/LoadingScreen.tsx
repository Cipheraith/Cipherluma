import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF] text-white flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center space-y-8 relative z-10">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center space-x-10 sm:space-x-12 mb-12 animate-fade-in">
          <img 
            src="/1750581770960.jpg" 
            alt="CipherLuma" 
            className="h-36 w-36 sm:h-40 sm:w-40 lg:h-48 lg:w-48 object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CipherLuma</span>
        </div>

        {/* Enhanced Loading Spinner */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-700/30 rounded-full"></div>
            {/* Animated blue arc */}
            <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="animate-pulse">
          <p className="text-lg sm:text-xl text-gray-300">Initializing secure connection...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;