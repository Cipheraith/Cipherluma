import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  DollarSign,
  CreditCard,
  Globe,
  Shield,
  MessageSquare,
  HelpCircle,
  FileText,
  Zap
} from 'lucide-react';
import { adminStore, User, Company, AdminStats } from '../utils/adminStore';
import AdminSupport from './AdminSupport';
import NewsSection from './NewsSection';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'companies' | 'support' | 'news'>('overview');
  const [currentView, setCurrentView] = useState<'dashboard' | 'support' | 'news'>('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [userStatusFilter, setUserStatusFilter] = useState<string>('all');
  const [kycStatusFilter, setKycStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allUsers = adminStore.getUsers();
    const allCompanies = adminStore.getCompanies();
    const adminStats = adminStore.getAdminStats();
    
    setUsers(allUsers);
    setCompanies(allCompanies);
    setStats(adminStats);
  };

  const handleUserStatusChange = (userId: string, status: User['status']) => {
    adminStore.updateUserStatus(userId, status);
    loadData();
  };

  const handleKycStatusChange = (userId: string, kycStatus: User['kycStatus']) => {
    adminStore.updateUserKycStatus(userId, kycStatus);
    loadData();
  };

  const handleCompanyStatusChange = (companyId: string, status: Company['status']) => {
    adminStore.updateCompanyStatus(companyId, status);
    loadData();
  };

  const exportUsers = (format: 'json' | 'csv') => {
    const data = adminStore.exportUsers(format);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCompanies = (format: 'json' | 'csv') => {
    const data = adminStore.exportCompanies(format);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `companies.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = userStatusFilter === 'all' || user.status === userStatusFilter;
    const matchesKyc = kycStatusFilter === 'all' || user.kycStatus === kycStatusFilter;
    
    return matchesSearch && matchesStatus && matchesKyc;
  });

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'disabled': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'flagged': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'suspended': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'not_submitted': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  if (currentView === 'support') {
    return <AdminSupport onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'news') {
    return <NewsSection onBack={() => setCurrentView('dashboard')} isAdmin={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF]">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[#0F1629] via-[#1E2A5A] to-[#1E3A8A] shadow-2xl border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <div className="flex items-center space-x-6 sm:space-x-8 animate-fade-in">
              <img 
                src="/1750581770960.jpg" 
                alt="CipherLuma" 
                className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">CipherLuma</span>
                <div className="text-blue-300 text-sm mt-1">Admin Dashboard</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <button className="relative p-2 text-blue-200 hover:text-white transition-colors duration-300 hover:bg-blue-500/20 rounded-lg">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-blue-200 hover:text-white transition-colors duration-300 hover:bg-blue-500/20 rounded-lg">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button 
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tab Navigation - Only show when not on overview */}
          {activeTab !== 'overview' && (
            <div className="flex space-x-8 pb-4 border-t border-blue-500/30">
              {[
                { id: 'users', label: 'User Management', icon: Users },
                { id: 'companies', label: 'Company Management', icon: Building },
                { id: 'support', label: 'Customer Support', icon: MessageSquare },
                { id: 'news', label: 'News Management', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'support') {
                      setCurrentView('support');
                    } else if (tab.id === 'news') {
                      setCurrentView('news');
                    } else {
                      setActiveTab(tab.id as any);
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-blue-500/30 text-white shadow-lg transform scale-105 border border-blue-400/50' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              ))}
              <button
                onClick={() => setActiveTab('overview')}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 text-blue-200 hover:text-white hover:bg-blue-500/20"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:block">Back to Dashboard</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && stats && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Admin Overview</h1>
              <p className="text-blue-200 mt-2">Monitor platform performance and user activity.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-green-400 text-xs mt-1">+{stats.monthlyGrowth}% this month</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Active Users</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.activeUsers.toLocaleString()}</p>
                    <p className="text-blue-300 text-xs mt-1">{Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Volume</p>
                    <p className="text-2xl font-bold text-white mt-1">${(stats.totalVolume / 1000000).toFixed(1)}M</p>
                    <p className="text-green-400 text-xs mt-1">Processed this month</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Success Rate</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.successRate}%</p>
                    <p className="text-green-400 text-xs mt-1">Transaction success</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Pending KYC</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.pendingKyc}</p>
                    <p className="text-yellow-400 text-xs mt-1">Awaiting review</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Flagged Users</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.flaggedUsers}</p>
                    <p className="text-red-400 text-xs mt-1">Needs attention</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Companies</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.totalCompanies}</p>
                    <p className="text-blue-300 text-xs mt-1">Business accounts</p>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Active API Keys</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.activeApiKeys}</p>
                    <p className="text-green-400 text-xs mt-1">In use</p>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-3">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Users, label: 'Manage Users', color: 'from-blue-500 to-cyan-500', action: () => setActiveTab('users') },
                { icon: Building, label: 'Manage Companies', color: 'from-green-500 to-emerald-500', action: () => setActiveTab('companies') },
                { icon: MessageSquare, label: 'Customer Support', color: 'from-purple-500 to-pink-500', action: () => setCurrentView('support') },
                { icon: FileText, label: 'News Management', color: 'from-orange-500 to-red-500', action: () => setCurrentView('news') }
              ].map((action, index) => (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-left animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${action.color} rounded-lg p-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-white font-semibold">{action.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">User Management</h1>
                <p className="text-blue-200 mt-2">Manage user accounts, KYC status, and permissions.</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportUsers('csv')}
                  className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => exportUsers('json')}
                  className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Users List */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                  {/* Filters */}
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={userStatusFilter}
                        onChange={(e) => setUserStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="all" className="bg-gray-800">All Status</option>
                        <option value="active" className="bg-gray-800">Active</option>
                        <option value="disabled" className="bg-gray-800">Disabled</option>
                        <option value="flagged" className="bg-gray-800">Flagged</option>
                        <option value="pending" className="bg-gray-800">Pending</option>
                      </select>
                      <select
                        value={kycStatusFilter}
                        onChange={(e) => setKycStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="all" className="bg-gray-800">All KYC</option>
                        <option value="approved" className="bg-gray-800">Approved</option>
                        <option value="pending" className="bg-gray-800">Pending</option>
                        <option value="rejected" className="bg-gray-800">Rejected</option>
                        <option value="not_submitted" className="bg-gray-800">Not Submitted</option>
                      </select>
                    </div>
                  </div>

                  {/* Users */}
                  <div className="space-y-3">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 ${
                          selectedUser?.id === user.id
                            ? 'bg-blue-500/30 border-blue-400/50 shadow-lg'
                            : 'bg-white/5 border-blue-500/30 hover:bg-white/10 hover:border-blue-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{user.firstName} {user.lastName}</h3>
                              <p className="text-blue-200 text-sm">{user.email}</p>
                              <p className="text-blue-300 text-xs">{user.country} • Joined {user.registrationDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full border ${getKycStatusColor(user.kycStatus)}`}>
                                {user.kycStatus.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-blue-200 text-xs">${user.totalVolume.toLocaleString()} volume</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredUsers.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                        <p className="text-blue-200">No users found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="lg:col-span-1">
                {selectedUser ? (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 space-y-6">
                    {/* User Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">{selectedUser.firstName} {selectedUser.lastName}</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Email:</span>
                          <span className="text-white">{selectedUser.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Country:</span>
                          <span className="text-white">{selectedUser.country}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Joined:</span>
                          <span className="text-white">{selectedUser.registrationDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Last Login:</span>
                          <span className="text-white">{selectedUser.lastLogin}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Transactions:</span>
                          <span className="text-white">{selectedUser.totalTransactions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Volume:</span>
                          <span className="text-white">${selectedUser.totalVolume.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Risk Score:</span>
                          <span className={`text-white ${selectedUser.riskScore > 7 ? 'text-red-400' : selectedUser.riskScore > 4 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {selectedUser.riskScore}/10
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Controls */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Account Status</label>
                      <select
                        value={selectedUser.status}
                        onChange={(e) => handleUserStatusChange(selectedUser.id, e.target.value as User['status'])}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="active" className="bg-gray-800">Active</option>
                        <option value="disabled" className="bg-gray-800">Disabled</option>
                        <option value="flagged" className="bg-gray-800">Flagged</option>
                        <option value="pending" className="bg-gray-800">Pending</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">KYC Status</label>
                      <select
                        value={selectedUser.kycStatus}
                        onChange={(e) => handleKycStatusChange(selectedUser.id, e.target.value as User['kycStatus'])}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="not_submitted" className="bg-gray-800">Not Submitted</option>
                        <option value="pending" className="bg-gray-800">Pending</option>
                        <option value="approved" className="bg-gray-800">Approved</option>
                        <option value="rejected" className="bg-gray-800">Rejected</option>
                      </select>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-3">KYC Documents</h4>
                      <div className="space-y-2">
                        {selectedUser.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <span className="text-white text-sm capitalize">{doc.type.replace('_', ' ')}</span>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-12 text-center">
                    <Users className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select a User</h3>
                    <p className="text-blue-200">Choose a user to view details and manage their account.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Company Management</h1>
                <p className="text-blue-200 mt-2">Manage business accounts and API access.</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportCompanies('csv')}
                  className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => exportCompanies('json')}
                  className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Companies List */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                  {/* Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                    <input
                      type="text"
                      placeholder="Search companies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    />
                  </div>

                  {/* Companies */}
                  <div className="space-y-3">
                    {filteredCompanies.map((company) => (
                      <div
                        key={company.id}
                        onClick={() => setSelectedCompany(company)}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 ${
                          selectedCompany?.id === company.id
                            ? 'bg-blue-500/30 border-blue-400/50 shadow-lg'
                            : 'bg-white/5 border-blue-500/30 hover:bg-white/10 hover:border-blue-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                              <Building className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{company.name}</h3>
                              <p className="text-blue-200 text-sm">{company.email}</p>
                              <p className="text-blue-300 text-xs">{company.industry} • {company.country}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(company.status)}`}>
                                {company.status}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {company.plan}
                              </span>
                            </div>
                            <p className="text-blue-200 text-xs">${(company.monthlyVolume / 1000).toFixed(0)}K monthly</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredCompanies.length === 0 && (
                      <div className="text-center py-12">
                        <Building className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                        <p className="text-blue-200">No companies found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="lg:col-span-1">
                {selectedCompany ? (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 space-y-6">
                    {/* Company Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">{selectedCompany.name}</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Email:</span>
                          <span className="text-white">{selectedCompany.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Website:</span>
                          <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            {selectedCompany.website.replace('https://', '')}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Industry:</span>
                          <span className="text-white">{selectedCompany.industry}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Country:</span>
                          <span className="text-white">{selectedCompany.country}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Plan:</span>
                          <span className="text-white capitalize">{selectedCompany.plan}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Monthly Volume:</span>
                          <span className="text-white">${selectedCompany.monthlyVolume.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Transactions:</span>
                          <span className="text-white">{selectedCompany.totalTransactions}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Control */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Company Status</label>
                      <select
                        value={selectedCompany.status}
                        onChange={(e) => handleCompanyStatusChange(selectedCompany.id, e.target.value as Company['status'])}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="active" className="bg-gray-800">Active</option>
                        <option value="suspended" className="bg-gray-800">Suspended</option>
                        <option value="pending" className="bg-gray-800">Pending</option>
                      </select>
                    </div>

                    {/* Contact Person */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-3">Contact Person</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Name:</span>
                          <span className="text-white">{selectedCompany.contactPerson.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Email:</span>
                          <span className="text-white">{selectedCompany.contactPerson.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Phone:</span>
                          <span className="text-white">{selectedCompany.contactPerson.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* API Keys */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-3">API Keys</h4>
                      <div className="space-y-2">
                        {selectedCompany.apiKeys.map((key) => (
                          <div key={key.id} className="p-2 bg-white/5 rounded">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white text-sm">{key.name}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                key.type === 'live' 
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              }`}>
                                {key.type}
                              </span>
                            </div>
                            <div className="text-xs text-blue-300">
                              {key.requestCount.toLocaleString()} requests • Last used {key.lastUsed}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-12 text-center">
                    <Building className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select a Company</h3>
                    <p className="text-blue-200">Choose a company to view details and manage their account.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;