import React from 'react';
import { ArrowLeft, User, Heart, Globe, Zap, Shield, Users, Target, Award, MapPin, Mail, Phone, Linkedin, Twitter, BookOpen, Code, Trophy } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[#0F1629] via-[#1E2A5A] to-[#1E3A8A] shadow-2xl border-b border-blue-500/30 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-blue-200 hover:text-white transition-all duration-300 hover:scale-105 group px-3 py-2 rounded-lg hover:bg-blue-500/20"
              >
                <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back</span>
              </button>
              
              <div className="flex items-center space-x-6 sm:space-x-8 animate-fade-in">
                <img 
                  src="/1750581770960.jpg" 
                  alt="CipherLuma" 
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">CipherLuma</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <User className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">About Us</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="space-y-8 sm:space-y-12 animate-fade-in">
          
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              About CipherLuma
            </h1>
            <p className="text-xl sm:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Born from adversity, built with determination, and driven by a vision to democratize global finance.
            </p>
          </div>

          {/* Founder's Story - The Journey */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-500/30 p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Fred Solami</h2>
              <p className="text-blue-300 text-xl">Founder & CEO</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6 text-blue-100 leading-relaxed">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  <span>The Beginning</span>
                </h3>
                <p className="text-lg mb-4">
                  My journey began at <strong className="text-white">Mulungushi University</strong>, where I was pursuing Computer Science with dreams bigger than my circumstances. I was passionate about technology, fascinated by its potential to solve real-world problems, and determined to make a difference.
                </p>
                <p className="text-lg">
                  But life had other plans. As I was about to enter my second year, <em className="text-blue-300">financial challenges forced me to make one of the hardest decisions of my life</em> - I had to withdraw from university. The weight of that moment still stays with me. Watching my classmates continue their journey while I had to step away felt like watching a train leave the station without me.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-400/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-3">
                  <Code className="h-6 w-6 text-orange-400" />
                  <span>The Turning Point</span>
                </h3>
                <p className="text-lg mb-4">
                  <strong className="text-white">I refused to let circumstances define my future.</strong> If I couldn't learn in a classroom, I would create my own classroom. I discovered <em className="text-orange-300">Coursera</em> and threw myself into online learning with a hunger that only comes from having your dreams temporarily taken away.
                </p>
                <p className="text-lg mb-4">
                  Every day became a battle against doubt. <em className="text-orange-300">While others questioned my path, I coded through the night.</em> While others saw a university dropout, I saw someone building their own destiny, one line of code at a time.
                </p>
                <p className="text-lg">
                  Then came the <strong className="text-white">hackathons</strong>. These weren't just competitions for me - they were validation. They were proof that knowledge doesn't only come from lecture halls, that innovation doesn't require a degree, and that <em className="text-orange-300">passion can overcome any obstacle</em>.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-400/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-3">
                  <Trophy className="h-6 w-6 text-green-400" />
                  <span>The Awakening</span>
                </h3>
                <p className="text-lg mb-4">
                  Through hackathons, I discovered my true calling. I wasn't just learning to code - <strong className="text-white">I was learning to solve problems that mattered</strong>. I saw how technology could bridge gaps, connect people, and create opportunities where none existed before.
                </p>
                <p className="text-lg mb-4">
                  Growing up in Zambia, I witnessed the daily struggles of people trying to send money to family members abroad. I watched small business owners lose customers because they couldn't accept international payments. <em className="text-green-300">I felt the frustration of talented developers who couldn't receive payments from global clients.</em>
                </p>
                <p className="text-lg">
                  That's when it hit me - <strong className="text-white">my withdrawal from university wasn't a setback; it was preparation</strong>. It taught me resilience, self-reliance, and most importantly, it connected me to the real struggles that traditional education might have shielded me from.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-purple-400" />
                  <span>The Vision</span>
                </h3>
                <p className="text-lg mb-4">
                  <strong className="text-white">CipherLuma was born from pain, nurtured by determination, and built with love.</strong> Every line of code carries the weight of my journey - from the university halls I had to leave, to the late nights spent learning on Coursera, to the hackathons that proved my worth.
                </p>
                <p className="text-lg mb-4">
                  This platform isn't just about moving money - <em className="text-purple-300">it's about moving dreams</em>. It's about ensuring that a young developer in Lagos doesn't have to wait weeks to receive payment for their work. It's about making sure a mother in Lusaka can send money to her child studying abroad without losing half of it to fees.
                </p>
                <p className="text-lg">
                  <strong className="text-white">Every transaction processed through CipherLuma is a victory against the barriers that once stood in my way.</strong> Every user who successfully sends money is proof that sometimes, the most beautiful solutions come from the deepest struggles.
                </p>
              </div>

              <div className="text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 border border-blue-400/30">
                <p className="text-xl font-semibold text-white mb-4">
                  "They say necessity is the mother of invention. For me, adversity was the father of innovation."
                </p>
                <p className="text-lg text-blue-200">
                  Today, CipherLuma stands as a testament that <em>your circumstances don't determine your destination</em> - your determination does.
                </p>
              </div>
            </div>
          </div>

          {/* The Vision */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-500/30 p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why CipherLuma?</h2>
            
            <div className="space-y-8">
              <div className="text-blue-100 leading-relaxed space-y-4">
                <p className="text-lg">
                  <strong className="text-white">CipherLuma</strong> represents more than just a payment platform - it's a bridge between dreams and reality. The name combines "Cipher" - representing the security and encryption that protects our users' trust - with "Luma" - meaning light in Latin, symbolizing our mission to illuminate the path to financial inclusion for everyone, everywhere.
                </p>
                
                <p>
                  Born in 2024 from personal experience and fueled by determination, CipherLuma addresses the unique challenges faced by emerging markets, particularly in Africa. We understand what it means to be excluded from traditional financial systems because we've lived it.
                </p>
                
                <p>
                  What sets us apart isn't just our technology - it's our heart. Every feature we build, every partnership we forge, and every line of code we write is guided by one simple question: <em className="text-blue-300">"Will this help someone achieve their dreams?"</em>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3 w-fit mb-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Global Reach</h3>
                  <p className="text-blue-200 text-sm">
                    Supporting over 50 countries with local payment methods and currencies, because borders shouldn't limit dreams.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 w-fit mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                  <p className="text-blue-200 text-sm">
                    Instant transfers with mobile money and near-instant with traditional banking - because time is precious.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bank-Level Security</h3>
                  <p className="text-blue-200 text-sm">
                    Military-grade encryption and compliance with international financial regulations - because trust is everything.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-500/30 p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Inclusion</h3>
                <p className="text-blue-200 text-sm">
                  Financial services should be accessible to everyone, everywhere - no exceptions.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Transparency</h3>
                <p className="text-blue-200 text-sm">
                  Clear pricing, no hidden fees, and honest communication - always.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Innovation</h3>
                <p className="text-blue-200 text-sm">
                  Constantly pushing boundaries to improve financial technology for all.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Resilience</h3>
                <p className="text-blue-200 text-sm">
                  Born from adversity, we never give up on making the impossible possible.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-500/30 p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Get in Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 w-fit mx-auto">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Headquarters</h3>
                <p className="text-blue-200 text-sm">
                  Lusaka, Zambia<br />
                  Serving Africa & Beyond
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3 w-fit mx-auto">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <p className="text-blue-200 text-sm">
                  hello@cipherluma.com<br />
                  support@cipherluma.com
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 w-fit mx-auto">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <p className="text-blue-200 text-sm">
                  +260976036353<br />
                  24/7 Support Line
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-3 w-fit mx-auto">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                <div className="flex justify-center space-x-3">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    <Twitter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Footer */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-blue-500/30 p-8 text-center">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <img 
                  src="/1750581770960.jpg" 
                  alt="CipherLuma" 
                  className="h-12 w-12 object-contain rounded-lg"
                />
                <span className="text-2xl font-bold text-white">CipherLuma</span>
              </div>
              
              <div className="text-blue-200 space-y-2">
                <p className="text-lg font-medium">
                  © 2024 CipherLuma. All rights reserved.
                </p>
                <p className="text-sm">
                  Founded by Fred Solami with ❤️ for global financial inclusion.
                </p>
                <p className="text-xs opacity-75 italic">
                  "From university halls to hackathon victories, from setbacks to breakthroughs - this is our story."
                </p>
                <p className="text-xs opacity-75">
                  CipherLuma is a registered trademark. Unauthorized use is prohibited.<br />
                  Licensed and regulated financial services provider.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-300 pt-4 border-t border-blue-500/30">
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
                <span>•</span>
                <span>User Agreement</span>
                <span>•</span>
                <span>API Documentation</span>
                <span>•</span>
                <span>Security</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;