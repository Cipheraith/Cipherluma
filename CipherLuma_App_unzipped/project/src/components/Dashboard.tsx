import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Download, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Bell, 
  User, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  RefreshCw,
  HelpCircle,
  Code,
  Info,
  FileText,
  Package
} from 'lucide-react';
import { transactionStore, Transaction } from '../utils/transactionStore';
import HelpSupport from './HelpSupport';
import Notifications from './Notifications';
import TestApiEndpoints from './TestApiEndpoints';
import AboutPage from './AboutPage';
import SendMoney from './SendMoney';
import RequestPayment from './RequestPayment';
import AddFunds from './AddFunds';
import SettingsPage from './Settings';
import NewsSection from './NewsSection';
import SDKDownloads from './SDKDownloads';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'help' | 'notifications' | 'api-test' | 'about' | 'send-money' | 'request-payment' | 'add-funds' | 'settings' | 'news' | 'sdk-downloads'>('dashboard');
  const [showBalance, setShowBalance] = useState(true);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userId = 'user_123'; // Mock user ID
  const apiKey = 'cl_live_sk_1234567890abcdef';

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    // Load existing transactions or create mock data
    let userTransactions = transactionStore.getTransactions(userId);
    
    if (userTransactions.length === 0) {
      // Create some mock transactions for demo
      const mockTransactions = [
        {
          type: 'sent' as const,
          amount: 500,
          currency: 'USD',
          recipient: 'john@example.com',
          status: 'completed' as const,
          method: 'Bank Transfer',
          fee: 2.50,
          description: 'Payment for services',
          userId
        },
        {
          type: 'received' as const,
          amount: 1200,
          currency: 'USD',
          sender: 'client@company.com',
          status: 'completed' as const,
          method: 'Mobile Money',
          fee: 0,
          description: 'Project payment',
          userId
        },
        {
          type: 'sent' as const,
          amount: 250,
          currency: 'EUR',
          recipient: 'supplier@business.com',
          status: 'pending' as const,
          method: 'Crypto',
          fee: 0.25,
          description: 'Invoice payment',
          userId
        }
      ];

      mockTransactions.forEach(tx => transactionStore.addTransaction(tx));
      userTransactions = transactionStore.getTransactions(userId);
    }
    
    setTransactions(userTransactions);
  };

  const handleTransactionComplete = (transaction: any) => {
    // Refresh transactions when a new one is completed
    loadTransactions();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      loadTransactions();
      setIsRefreshing(false);
    }, 1000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'failed':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  // Show different views based on currentView state
  if (currentView === 'help') {
    return <HelpSupport onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'notifications') {
    return <Notifications onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'api-test') {
    return <TestApiEndpoints onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'about') {
    return <AboutPage onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'send-money') {
    return <SendMoney onBack={() => setCurrentView('dashboard')} onTransactionComplete={handleTransactionComplete} />;
  }

  if (currentView === 'request-payment') {
    return <RequestPayment onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'add-funds') {
    return <AddFunds onBack={() => setCurrentView('dashboard')} onTransactionComplete={handleTransactionComplete} />;
  }

  if (currentView === 'settings') {
    return <SettingsPage onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'news') {
    return <NewsSection onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'sdk-downloads') {
    return <SDKDownloads onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF]">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[#0F1629] via-[#1E2A5A] to-[#1E3A8A] shadow-2xl border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 lg:h-24 py-4 sm:py-0 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 animate-fade-in">
              <img 
                src="/1750581770960.jpg" 
                alt="CipherLuma" 
                className="h-16 w-16 sm:h-20 sm:w-20 lg:h-28 lg:w-28 object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <div className="text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">CipherLuma</span>
                <div className="text-blue-300 text-sm mt-1">Global Payments Platform</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button 
                  onClick={() => setCurrentView('notifications')}
                  className="relative p-2 text-blue-200 hover:text-white transition-colors duration-300 hover:bg-blue-500/20 rounded-lg"
                >
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button 
                  onClick={() => setCurrentView('about')}
                  className="p-2 text-blue-200 hover:text-white transition-colors duration-300 hover:bg-blue-500/20 rounded-lg"
                >
                  <Info className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button 
                  onClick={() => setCurrentView('settings')}
                  className="p-2 text-blue-200 hover:text-white transition-colors duration-300 hover:bg-blue-500/20 rounded-lg"
                >
                  <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              <button 
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Help Button */}
      <button
        onClick={() => setCurrentView('help')}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-3xl z-50 animate-bounce-subtle"
        title="Help & Support"
      >
        <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Welcome Section */}
          <div className="text-center animate-fade-in">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-blue-200 text-sm sm:text-base">Manage your global payments with ease</p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 animate-fade-in-up">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2 sm:p-3">
                  <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-blue-300 hover:text-white transition-colors duration-300"
                >
                  {showBalance ? <Eye className="h-3 w-3 sm:h-4 sm:w-4" /> : <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />}
                </button>
              </div>
              <div>
                <p className="text-blue-200 text-xs sm:text-sm font-medium">USD Balance</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {showBalance ? '$12,450.75' : '••••••'}
                </p>
                <p className="text-green-400 text-xs mt-1">+2.5% this month</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-2 sm:p-3">
                  <Globe className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-blue-200 text-xs sm:text-sm font-medium">EUR Balance</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {showBalance ? '€8,320.50' : '••••••'}
                </p>
                <p className="text-blue-400 text-xs mt-1">Available</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2 sm:p-3">
                  <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-blue-200 text-xs sm:text-sm font-medium">ZMW Balance</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {showBalance ? 'K185,000' : '••••••'}
                </p>
                <p className="text-yellow-400 text-xs mt-1">K500 pending</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-2 sm:p-3">
                  <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-blue-200 text-xs sm:text-sm font-medium">Total Volume</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {showBalance ? '$45.2K' : '••••••'}
                </p>
                <p className="text-green-400 text-xs mt-1">This month</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => setCurrentView('send-money')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-xl shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Send Money</span>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('request-payment')}
              className="bg-white/10 backdrop-blur-lg border border-blue-500/30 text-white p-4 sm:p-6 rounded-xl shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Request Payment</span>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('add-funds')}
              className="bg-white/10 backdrop-blur-lg border border-blue-500/30 text-white p-4 sm:p-6 rounded-xl shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Add Funds</span>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('api-test')}
              className="bg-white/10 backdrop-blur-lg border border-blue-500/30 text-white p-4 sm:p-6 rounded-xl shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Code className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Test API</span>
              </div>
            </button>
          </div>

          {/* Additional Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => setCurrentView('news')}
              className="bg-white/10 backdrop-blur-lg border border-blue-500/30 text-white p-4 sm:p-6 rounded-xl shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">News & Updates</span>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('sdk-downloads')}
              className="bg-white/10 backdrop-blur-lg border border-blue-500/30 text-white p-4 sm:p-6 rounded-xl shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Download SDKs</span>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('settings')}
              className="bg-white/10 backdrop-blur-lg border border-blue-500/30 text-white p-4 sm:p-6 rounded-xl shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Account Settings</span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-4 sm:p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Transactions</h2>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="text-blue-300 hover:text-white transition-colors duration-300 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className={`p-2 rounded-lg ${transaction.type === 'sent' ? 'bg-red-500/20' : 'bg-green-500/20'} flex-shrink-0`}>
                        {transaction.type === 'sent' ? 
                          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" /> : 
                          <ArrowDownLeft className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                        }
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm sm:text-base truncate">
                          {transaction.type === 'sent' ? `To: ${transaction.recipient}` : `From: ${transaction.sender}`}
                        </p>
                        <p className="text-blue-200 text-xs sm:text-sm">{transaction.method} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <p className={`font-semibold text-sm sm:text-base ${transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'}`}>
                          {transaction.type === 'sent' ? '-' : '+'}{transaction.amount} {transaction.currency}
                        </p>
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {transactions.length === 0 && (
                  <div className="text-center py-6 sm:py-8">
                    <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-blue-200 text-sm sm:text-base">No transactions yet</p>
                    <p className="text-blue-300 text-xs sm:text-sm">Your transaction history will appear here</p>
                  </div>
                )}
              </div>

              {transactions.length > 5 && (
                <div className="mt-4 sm:mt-6 text-center">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base">
                    View all transactions
                  </button>
                </div>
              )}
            </div>

            {/* API Access & Stats */}
            <div className="space-y-4 sm:space-y-6">
              {/* API Key Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">API Access</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-blue-200 mb-2">Live API Key</label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 px-2 sm:px-3 py-2 bg-gray-900/50 text-green-300 rounded text-xs font-mono truncate">
                        {apiKey}
                      </code>
                      <button
                        onClick={copyApiKey}
                        className="p-2 text-blue-300 hover:text-white transition-colors duration-300 flex-shrink-0"
                      >
                        {copiedApiKey ? <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentView('api-test')}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 sm:px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm sm:text-base"
                  >
                    Test API Endpoints
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Stats</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-xs sm:text-sm">This Month</span>
                    <span className="text-white font-semibold text-sm sm:text-base">12 transactions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-xs sm:text-sm">Success Rate</span>
                    <span className="text-green-400 font-semibold text-sm sm:text-base">98.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-xs sm:text-sm">Avg. Processing</span>
                    <span className="text-white font-semibold text-sm sm:text-base">2.3 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-xs sm:text-sm">API Calls</span>
                    <span className="text-white font-semibold text-sm sm:text-base">1,247</span>
                  </div>
                </div>
              </div>

              {/* Security Status */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30 p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">Security Status</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                    <span className="text-green-200 text-xs sm:text-sm">2FA Enabled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                    <span className="text-green-200 text-xs sm:text-sm">KYC Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                    <span className="text-green-200 text-xs sm:text-sm">Account Secured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;