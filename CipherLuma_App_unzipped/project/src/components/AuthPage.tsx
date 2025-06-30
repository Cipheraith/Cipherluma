import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import TermsOfService from './TermsOfService';
import UserAgreement from './UserAgreement';
import PrivacyPolicy from './PrivacyPolicy';

interface AuthPageProps {
  onLogin: (token: string) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentLegalPage, setCurrentLegalPage] = useState<'terms' | 'agreement' | 'privacy' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    country: '',
    phoneNumber: '',
    dateOfBirth: '',
    acceptTerms: false,
    acceptPrivacy: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const countries = [
    { code: 'US', name: 'United States', currency: 'USD' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'EU', name: 'European Union', currency: 'EUR' },
    { code: 'CA', name: 'Canada', currency: 'CAD' },
    { code: 'AU', name: 'Australia', currency: 'AUD' },
    { code: 'ZM', name: 'Zambia', currency: 'ZMW' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'GH', name: 'Ghana', currency: 'GHS' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'UG', name: 'Uganda', currency: 'UGX' },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS' },
    { code: 'RW', name: 'Rwanda', currency: 'RWF' },
    { code: 'BW', name: 'Botswana', currency: 'BWP' },
    { code: 'MW', name: 'Malawi', currency: 'MWK' },
    { code: 'ZW', name: 'Zimbabwe', currency: 'ZWL' },
    { code: 'IN', name: 'India', currency: 'INR' },
    { code: 'CN', name: 'China', currency: 'CNY' },
    { code: 'JP', name: 'Japan', currency: 'JPY' },
    { code: 'SG', name: 'Singapore', currency: 'SGD' },
    { code: 'AE', name: 'United Arab Emirates', currency: 'AED' },
    { code: 'BR', name: 'Brazil', currency: 'BRL' },
    { code: 'MX', name: 'Mexico', currency: 'MXN' }
  ];

  // Show legal pages if requested
  if (currentLegalPage === 'terms') {
    return <TermsOfService onBack={() => setCurrentLegalPage(null)} />;
  }
  if (currentLegalPage === 'agreement') {
    return <UserAgreement onBack={() => setCurrentLegalPage(null)} />;
  }
  if (currentLegalPage === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentLegalPage(null)} />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });

      // Check password strength for registration
      if (name === 'password' && !isLogin) {
        checkPasswordStrength(value);
      }
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
      case 2:
        return { text: 'Weak', color: 'text-red-400' };
      case 3:
      case 4:
        return { text: 'Medium', color: 'text-yellow-400' };
      case 5:
      case 6:
        return { text: 'Strong', color: 'text-green-400' };
      default:
        return { text: '', color: '' };
    }
  };

  const validateForm = () => {
    if (!isLogin) {
      // Registration validation
      if (!formData.firstName || !formData.lastName) {
        alert('Please enter your full name');
        return false;
      }
      
      if (!formData.country) {
        alert('Please select your country');
        return false;
      }
      
      if (!formData.phoneNumber) {
        alert('Please enter your phone number');
        return false;
      }
      
      if (!formData.dateOfBirth) {
        alert('Please enter your date of birth');
        return false;
      }
      
      if (passwordStrength < 3) {
        alert('Please choose a stronger password');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return false;
      }
      
      if (!formData.acceptTerms || !formData.acceptPrivacy) {
        alert('Please accept the terms and privacy policy');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check for admin login
      if (formData.email === 'admin@cipherluma.com' && formData.password === 'admin123') {
        const adminToken = 'admin_jwt_token_' + Date.now();
        onLogin(adminToken);
      } else {
        // Generate a mock token for regular users
        const mockToken = 'mock_jwt_token_' + Date.now();
        onLogin(mockToken);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF] text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-8 py-6 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 group"
        >
          <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-10 sm:space-x-12 animate-fade-in">
          <img 
            src="/1750581770960.jpg" 
            alt="CipherLuma" 
            className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">CipherLuma</span>
        </div>

        <div className="w-20"></div> {/* Spacer for centering */}
      </nav>

      {/* Auth Form */}
      <div className="flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12 relative z-10">
        <div className="w-full max-w-2xl animate-slide-in-up">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-300">
                {isLogin 
                  ? 'Sign in to your CipherLuma account' 
                  : 'Join the future of global payments'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                        placeholder="John"
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                        placeholder="Doe"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                        Country of Origin *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                        required={!isLogin}
                      >
                        <option value="" className="bg-gray-800">Select your country</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.code} className="bg-gray-800">
                            {country.name} ({country.currency})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                        placeholder="+1 234 567 8900"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div className="animate-fade-in">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all duration-300 hover:bg-white/15"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!isLogin && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength <= 2 ? 'bg-red-500' :
                            passwordStrength <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength / 6) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getPasswordStrengthText().color}`}>
                        {getPasswordStrengthText().text}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Use 8+ characters with uppercase, lowercase, numbers, and symbols
                    </p>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="animate-fade-in">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all duration-300 hover:bg-white/15"
                      placeholder="••••••••"
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required={!isLogin}
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-gray-300">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setCurrentLegalPage('terms')}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => setCurrentLegalPage('agreement')}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        User Agreement
                      </button>
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="acceptPrivacy"
                      name="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required={!isLogin}
                    />
                    <label htmlFor="acceptPrivacy" className="text-sm text-gray-300">
                      I acknowledge that I have read and understood the{' '}
                      <button
                        type="button"
                        onClick={() => setCurrentLegalPage('privacy')}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {!isLogin && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-200 text-sm text-center">
                  By creating an account, you'll get access to our secure global payment platform with competitive rates and instant transfers.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;