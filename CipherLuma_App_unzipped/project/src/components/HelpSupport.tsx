import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Book,
  Users,
  Shield,
  CreditCard,
  Globe,
  Zap,
  AlertCircle,
  FileText,
  ExternalLink
} from 'lucide-react';
import GuideViewer from './GuideViewer';
import DeveloperPortal from './DeveloperPortal';

interface HelpSupportProps {
  onBack: () => void;
}

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

const HelpSupport: React.FC<HelpSupportProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'faq' | 'guides'>('contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [showDeveloperPortal, setShowDeveloperPortal] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    priority: 'medium',
    category: 'general',
    message: '',
    email: '',
    name: ''
  });

  const faqs: FAQ[] = [
    {
      id: 'faq_001',
      category: 'Getting Started',
      question: 'How do I create an account?',
      answer: 'To create an account, click "Get Started" on our homepage, then choose "Sign Up". Fill in your email, password, and basic information. You\'ll receive a verification email to activate your account.',
      tags: ['account', 'signup', 'registration']
    },
    {
      id: 'faq_002',
      category: 'Getting Started',
      question: 'What documents do I need for KYC verification?',
      answer: 'For KYC verification, you need: 1) A government-issued photo ID (passport, driver\'s license, or national ID), 2) Proof of address (utility bill, bank statement, or lease agreement dated within the last 3 months). All documents must be clear and legible.',
      tags: ['kyc', 'verification', 'documents', 'identity']
    },
    {
      id: 'faq_003',
      category: 'Payments',
      question: 'How long do international transfers take?',
      answer: 'Transfer times vary by destination and payment method: Bank transfers typically take 1-3 business days, Mobile money transfers are usually instant, Crypto transfers take 10-30 minutes depending on network congestion.',
      tags: ['transfers', 'timing', 'international', 'speed']
    },
    {
      id: 'faq_004',
      category: 'Payments',
      question: 'What are the transfer fees?',
      answer: 'Our fees are transparent and competitive: Bank transfers: 0.5% + $2 fixed fee, Mobile money: 1% + $1 fixed fee, Crypto transfers: 0.1% + network fees. You\'ll see the exact fee before confirming any transfer.',
      tags: ['fees', 'costs', 'pricing', 'charges']
    },
    {
      id: 'faq_005',
      category: 'Payments',
      question: 'Which countries do you support?',
      answer: 'We support transfers to over 50 countries including the US, UK, EU, Canada, Australia, and most African countries. For a complete list of supported countries and payment methods, check our coverage page.',
      tags: ['countries', 'coverage', 'international', 'supported']
    },
    {
      id: 'faq_006',
      category: 'Security',
      question: 'How secure are my transactions?',
      answer: 'We use bank-level security including 256-bit SSL encryption, two-factor authentication, and comply with international financial regulations. All funds are held in segregated accounts with tier-1 banks.',
      tags: ['security', 'encryption', 'safety', 'protection']
    },
    {
      id: 'faq_007',
      category: 'Security',
      question: 'What should I do if I suspect fraud?',
      answer: 'If you suspect fraudulent activity: 1) Immediately contact our support team, 2) Change your password, 3) Enable two-factor authentication if not already active, 4) Review your recent transactions. We monitor all accounts 24/7 for suspicious activity.',
      tags: ['fraud', 'security', 'suspicious', 'protection']
    },
    {
      id: 'faq_008',
      category: 'API',
      question: 'How do I get API access?',
      answer: 'API access is available to verified business accounts. After completing business verification, you can generate API keys from your dashboard. We offer both test and live environments with comprehensive documentation.',
      tags: ['api', 'access', 'business', 'integration']
    },
    {
      id: 'faq_009',
      category: 'API',
      question: 'What are the API rate limits?',
      answer: 'Rate limits depend on your plan: Starter: 100 requests/minute, Business: 500 requests/minute, Enterprise: 2000 requests/minute. Contact us for higher limits if needed.',
      tags: ['api', 'limits', 'rate', 'requests']
    },
    {
      id: 'faq_010',
      category: 'Account',
      question: 'How do I update my personal information?',
      answer: 'To update your information: 1) Log into your dashboard, 2) Go to Account Settings, 3) Update the required fields, 4) Some changes may require re-verification. Important changes like name or address may need document verification.',
      tags: ['account', 'update', 'information', 'settings']
    },
    {
      id: 'faq_011',
      category: 'Account',
      question: 'Can I have multiple accounts?',
      answer: 'Each person can have one personal account. However, you can have separate business accounts for different companies. All accounts must be properly verified and comply with our terms of service.',
      tags: ['account', 'multiple', 'business', 'personal']
    },
    {
      id: 'faq_012',
      category: 'Troubleshooting',
      question: 'Why was my transaction declined?',
      answer: 'Transactions can be declined for several reasons: Insufficient funds, Incorrect recipient details, Compliance or security checks, Technical issues. Check your transaction history for specific error messages or contact support.',
      tags: ['declined', 'failed', 'transaction', 'error']
    }
  ];

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        subject: '',
        priority: 'medium',
        category: 'general',
        message: '',
        email: '',
        name: ''
      });
    }, 2000);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started': return <Book className="h-4 w-4" />;
      case 'Payments': return <CreditCard className="h-4 w-4" />;
      case 'Security': return <Shield className="h-4 w-4" />;
      case 'API': return <Globe className="h-4 w-4" />;
      case 'Account': return <Users className="h-4 w-4" />;
      case 'Troubleshooting': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const tabItems = [
    { id: 'contact', label: 'Contact Support', icon: MessageCircle },
    { id: 'faq', label: 'FAQs', icon: Book },
    { id: 'guides', label: 'Guides', icon: FileText }
  ];

  // Show guides if requested
  if (showGuides) {
    return <GuideViewer onBack={() => setShowGuides(false)} />;
  }

  // Show developer portal if requested
  if (showDeveloperPortal) {
    return <DeveloperPortal onBack={() => setShowDeveloperPortal(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF]">
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
                <span>Back to Dashboard</span>
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

            {/* Tab Navigation */}
            <div className="hidden lg:flex space-x-6">
              {tabItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === item.id 
                      ? 'bg-blue-500/30 text-white shadow-lg transform scale-105 border border-blue-400/50' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden py-4 border-t border-blue-500/30">
            <div className="grid grid-cols-3 gap-2">
              {tabItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === item.id 
                      ? 'bg-blue-500/30 text-white shadow-lg border border-blue-400/50' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'contact' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contact Support</h1>
              <p className="text-blue-200 mt-2">Get help from our support team. We're here to assist you 24/7.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
                  {!isSubmitted ? (
                    <>
                      <h2 className="text-xl font-semibold text-white mb-6">Send us a message</h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Your Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Category
                            </label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                            >
                              <option value="general" className="bg-gray-800">General Inquiry</option>
                              <option value="technical" className="bg-gray-800">Technical Issue</option>
                              <option value="billing" className="bg-gray-800">Billing & Payments</option>
                              <option value="api" className="bg-gray-800">API Support</option>
                              <option value="security" className="bg-gray-800">Security Concern</option>
                              <option value="compliance" className="bg-gray-800">Compliance & KYC</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              Priority
                            </label>
                            <select
                              name="priority"
                              value={formData.priority}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                            >
                              <option value="low" className="bg-gray-800">Low</option>
                              <option value="medium" className="bg-gray-800">Medium</option>
                              <option value="high" className="bg-gray-800">High</option>
                              <option value="urgent" className="bg-gray-800">Urgent</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-2">
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                            placeholder="Brief description of your issue"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-2">
                            Message
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 resize-none"
                            placeholder="Please provide as much detail as possible about your issue..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
                      <p className="text-blue-200 mb-6">
                        Thank you for contacting us. We've received your message and will respond within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Quick Contact */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">+260976036353</p>
                        <p className="text-blue-200 text-sm">24/7 Support Line</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-2">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">support@cipherluma.com</p>
                        <p className="text-blue-200 text-sm">Email Support</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Live Chat</p>
                        <p className="text-blue-200 text-sm">Available 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Times */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Response Times</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-200 text-sm">Urgent</span>
                      </div>
                      <span className="text-white font-medium">&lt; 1 hour</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-blue-200 text-sm">High</span>
                      </div>
                      <span className="text-white font-medium">&lt; 4 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span className="text-blue-200 text-sm">Medium</span>
                      </div>
                      <span className="text-white font-medium">&lt; 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-blue-200 text-sm">Low</span>
                      </div>
                      <span className="text-white font-medium">&lt; 48 hours</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border border-red-400/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Emergency Support</h3>
                  <p className="text-red-200 text-sm mb-4">
                    For urgent security issues or suspected fraud, contact us immediately.
                  </p>
                  <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300">
                    Emergency Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Frequently Asked Questions</h1>
              <p className="text-blue-200 mt-2">Find quick answers to common questions about CipherLuma.</p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                        selectedCategory === category
                          ? 'bg-blue-500/30 text-white border border-blue-400/50'
                          : 'bg-white/10 text-blue-200 hover:text-white hover:bg-white/15 border border-blue-500/30'
                      }`}
                    >
                      {category !== 'all' && getCategoryIcon(category)}
                      <span>{category === 'all' ? 'All Categories' : category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left hover:bg-white/5 transition-colors duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2">
                        {getCategoryIcon(faq.category)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{faq.question}</h3>
                        <p className="text-blue-300 text-sm">{faq.category}</p>
                      </div>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-blue-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-300" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4 border-t border-blue-500/30 bg-white/5 animate-slide-down">
                      <div className="pt-4">
                        <p className="text-blue-100 leading-relaxed">{faq.answer}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full border border-blue-500/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No FAQs Found</h3>
                  <p className="text-blue-200">
                    Try adjusting your search terms or category filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Help Guides</h1>
              <p className="text-blue-200 mt-2">Step-by-step guides to help you get the most out of CipherLuma.</p>
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Getting Started Guide',
                  description: 'Complete walkthrough for new users',
                  icon: Zap,
                  color: 'from-green-500 to-emerald-500',
                  topics: ['Account Setup', 'KYC Verification', 'First Transfer'],
                  action: () => setShowGuides(true)
                },
                {
                  title: 'API Integration',
                  description: 'Integrate CipherLuma into your application',
                  icon: Globe,
                  color: 'from-blue-500 to-cyan-500',
                  topics: ['API Keys', 'Authentication', 'Webhooks'],
                  action: () => setShowGuides(true)
                },
                {
                  title: 'Security Best Practices',
                  description: 'Keep your account and funds secure',
                  icon: Shield,
                  color: 'from-purple-500 to-pink-500',
                  topics: ['2FA Setup', 'Password Security', 'Fraud Prevention'],
                  action: () => setShowGuides(true)
                },
                {
                  title: 'Payment Methods',
                  description: 'Understanding different payment options',
                  icon: CreditCard,
                  color: 'from-orange-500 to-red-500',
                  topics: ['Bank Transfers', 'Mobile Money', 'Crypto Payments'],
                  action: () => setShowGuides(true)
                },
                {
                  title: 'Troubleshooting',
                  description: 'Common issues and solutions',
                  icon: AlertCircle,
                  color: 'from-yellow-500 to-orange-500',
                  topics: ['Failed Transfers', 'Account Issues', 'Technical Problems'],
                  action: () => setShowGuides(true)
                },
                {
                  title: 'Business Accounts',
                  description: 'Features for business users',
                  icon: Users,
                  color: 'from-indigo-500 to-purple-500',
                  topics: ['Business Verification', 'Bulk Transfers', 'Reporting'],
                  action: () => setShowGuides(true)
                }
              ].map((guide, index) => (
                <div key={guide.title} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`bg-gradient-to-r ${guide.color} rounded-lg p-3`}>
                      <guide.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{guide.title}</h3>
                      <p className="text-blue-200 text-sm">{guide.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {guide.topics.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-100 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={guide.action}
                    className="w-full bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Read Guide</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowGuides(true)}
                  className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300"
                >
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div className="text-left">
                    <p className="text-white font-medium">API Documentation</p>
                    <p className="text-blue-200 text-sm">Complete API reference</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-blue-300 ml-auto" />
                </button>
                <button 
                  onClick={() => setShowDeveloperPortal(true)}
                  className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300"
                >
                  <Globe className="h-5 w-5 text-blue-400" />
                  <div className="text-left">
                    <p className="text-white font-medium">Developer Portal</p>
                    <p className="text-blue-200 text-sm">Tools and resources</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-blue-300 ml-auto" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpSupport;