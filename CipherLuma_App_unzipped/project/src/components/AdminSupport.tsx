import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Send, 
  Clock, 
  User, 
  Tag, 
  CheckCircle, 
  AlertCircle, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  BarChart3,
  Users,
  MessageCircle,
  HelpCircle,
  FileText,
  Settings,
  Star,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Globe,
  Zap
} from 'lucide-react';
import { supportStore, SupportMessage, FAQ, SupportStats } from '../utils/supportStore';

interface AdminSupportProps {
  onBack: () => void;
}

const AdminSupport: React.FC<AdminSupportProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'faqs' | 'analytics'>('overview');
  const [selectedTicket, setSelectedTicket] = useState<SupportMessage | null>(null);
  const [tickets, setTickets] = useState<SupportMessage[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [stats, setStats] = useState<SupportStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [newMessage, setNewMessage] = useState('');
  const [isEditingFAQ, setIsEditingFAQ] = useState<FAQ | null>(null);
  const [newFAQ, setNewFAQ] = useState({
    category: '',
    question: '',
    answer: '',
    tags: ''
  });
  const [showNewFAQForm, setShowNewFAQForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allTickets = supportStore.getSupportMessages();
    const allFAQs = supportStore.getFAQs();
    const supportStats = supportStore.getSupportStats();
    
    setTickets(allTickets);
    setFAQs(allFAQs);
    setStats(supportStats);
  };

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;

    supportStore.addMessageToTicket(selectedTicket.ticketId, {
      senderId: 'admin_001',
      senderType: 'admin',
      senderName: 'Admin User',
      content: newMessage
    });

    setNewMessage('');
    
    // Refresh ticket data
    const updatedTicket = supportStore.getTicketById(selectedTicket.ticketId);
    if (updatedTicket) {
      setSelectedTicket(updatedTicket);
    }
    loadData();
  };

  const handleStatusChange = (ticketId: string, status: SupportMessage['status']) => {
    supportStore.updateTicketStatus(ticketId, status);
    loadData();
    
    if (selectedTicket && selectedTicket.ticketId === ticketId) {
      const updatedTicket = supportStore.getTicketById(ticketId);
      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }
    }
  };

  const handleCreateFAQ = () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) return;

    supportStore.createFAQ({
      category: newFAQ.category || 'General',
      question: newFAQ.question,
      answer: newFAQ.answer,
      tags: newFAQ.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdBy: 'admin_001',
      createdByName: 'Admin User'
    });

    setNewFAQ({ category: '', question: '', answer: '', tags: '' });
    setShowNewFAQForm(false);
    loadData();
  };

  const handleUpdateFAQ = () => {
    if (!isEditingFAQ) return;

    supportStore.updateFAQ(isEditingFAQ.id, {
      category: isEditingFAQ.category,
      question: isEditingFAQ.question,
      answer: isEditingFAQ.answer,
      tags: isEditingFAQ.tags
    });

    setIsEditingFAQ(null);
    loadData();
  };

  const handleDeleteFAQ = (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      supportStore.deleteFAQ(id);
      loadData();
    }
  };

  const handleToggleFAQPublished = (id: string, isPublished: boolean) => {
    supportStore.updateFAQ(id, { isPublished });
    loadData();
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchQuery === '' || 
      ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'in_progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'waiting_customer': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'resolved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'closed': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

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
                <span>Back to Admin</span>
              </button>
              
              <div className="flex items-center space-x-10 sm:space-x-12 animate-fade-in">
                <img 
                  src="/1750581770960.jpg" 
                  alt="CipherLuma" 
                  className="h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">CipherLuma</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="hidden lg:flex space-x-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'tickets', label: 'Support Tickets', icon: MessageSquare },
                { id: 'faqs', label: 'FAQ Management', icon: HelpCircle },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id 
                      ? 'bg-blue-500/30 text-white shadow-lg transform scale-105 border border-blue-400/50' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden py-4 border-t border-blue-500/30">
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'tickets', label: 'Tickets', icon: MessageSquare },
                { id: 'faqs', label: 'FAQs', icon: HelpCircle },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === tab.id 
                      ? 'bg-blue-500/30 text-white shadow-lg border border-blue-400/50' 
                      : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && stats && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Customer Support Overview
              </h1>
              <p className="text-blue-200 mt-2">Monitor and manage customer support operations.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Tickets</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.totalTickets}</p>
                    <p className="text-green-400 text-xs mt-1">+{stats.weeklyTickets} this week</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Open Tickets</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.openTickets}</p>
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
                    <p className="text-blue-200 text-sm font-medium">Avg Response Time</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.averageResponseTime}h</p>
                    <p className="text-green-400 text-xs mt-1">Within SLA</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Satisfaction Score</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.satisfactionScore.toFixed(1)}/5</p>
                    <p className="text-green-400 text-xs mt-1">Excellent rating</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: MessageSquare, label: 'View All Tickets', color: 'from-blue-500 to-cyan-500', action: () => setActiveTab('tickets') },
                { icon: HelpCircle, label: 'Manage FAQs', color: 'from-green-500 to-emerald-500', action: () => setActiveTab('faqs') },
                { icon: TrendingUp, label: 'View Analytics', color: 'from-purple-500 to-pink-500', action: () => setActiveTab('analytics') },
                { icon: Plus, label: 'Create FAQ', color: 'from-orange-500 to-red-500', action: () => { setActiveTab('faqs'); setShowNewFAQForm(true); } }
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

            {/* Recent Tickets */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Support Tickets</h2>
                <button
                  onClick={() => setActiveTab('tickets')}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              </div>

              <div className="space-y-4">
                {tickets.slice(0, 5).map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <MessageCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{ticket.subject}</p>
                        <p className="text-blue-200 text-sm">{ticket.ticketId} • {ticket.userEmail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-blue-200 text-xs">{ticket.updatedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Support Tickets
              </h1>
              <p className="text-blue-200 mt-2">Manage customer support requests and communications.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Tickets List */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                  {/* Filters */}
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="all" className="bg-gray-800">All Status</option>
                        <option value="open" className="bg-gray-800">Open</option>
                        <option value="in_progress" className="bg-gray-800">In Progress</option>
                        <option value="waiting_customer" className="bg-gray-800">Waiting Customer</option>
                        <option value="resolved" className="bg-gray-800">Resolved</option>
                        <option value="closed" className="bg-gray-800">Closed</option>
                      </select>
                      <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="all" className="bg-gray-800">All Priority</option>
                        <option value="urgent" className="bg-gray-800">Urgent</option>
                        <option value="high" className="bg-gray-800">High</option>
                        <option value="medium" className="bg-gray-800">Medium</option>
                        <option value="low" className="bg-gray-800">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Tickets */}
                  <div className="space-y-3">
                    {filteredTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 ${
                          selectedTicket?.id === ticket.id
                            ? 'bg-blue-500/30 border-blue-400/50 shadow-lg'
                            : 'bg-white/5 border-blue-500/30 hover:bg-white/10 hover:border-blue-400/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-white font-medium">{ticket.subject}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority}
                              </span>
                            </div>
                            <p className="text-blue-200 text-sm mb-2">{ticket.ticketId} • {ticket.userEmail}</p>
                            <div className="flex items-center space-x-4 text-xs text-blue-300">
                              <span>Created: {ticket.createdAt}</span>
                              <span>Updated: {ticket.updatedAt}</span>
                              {ticket.assignedToName && <span>Assigned: {ticket.assignedToName}</span>}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                            <span className="text-blue-300 text-xs">{ticket.messages.length} messages</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredTickets.length === 0 && (
                      <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                        <p className="text-blue-200">No tickets found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="lg:col-span-1">
                {selectedTicket ? (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 space-y-6">
                    {/* Ticket Header */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{selectedTicket.subject}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Ticket ID:</span>
                          <span className="text-white font-mono">{selectedTicket.ticketId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Customer:</span>
                          <span className="text-white">{selectedTicket.userName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Email:</span>
                          <span className="text-white">{selectedTicket.userEmail}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200">Category:</span>
                          <span className="text-white capitalize">{selectedTicket.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Controls */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Status</label>
                      <select
                        value={selectedTicket.status}
                        onChange={(e) => handleStatusChange(selectedTicket.ticketId, e.target.value as SupportMessage['status'])}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        <option value="open" className="bg-gray-800">Open</option>
                        <option value="in_progress" className="bg-gray-800">In Progress</option>
                        <option value="waiting_customer" className="bg-gray-800">Waiting Customer</option>
                        <option value="resolved" className="bg-gray-800">Resolved</option>
                        <option value="closed" className="bg-gray-800">Closed</option>
                      </select>
                    </div>

                    {/* Messages */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-3">Conversation</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedTicket.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`p-3 rounded-lg ${
                              message.senderType === 'admin'
                                ? 'bg-blue-500/20 border border-blue-400/30 ml-4'
                                : 'bg-white/10 border border-blue-500/30 mr-4'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white text-sm font-medium">{message.senderName}</span>
                              <span className="text-blue-300 text-xs">{message.time}</span>
                            </div>
                            <p className="text-blue-100 text-sm">{message.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reply */}
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Reply</label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                        placeholder="Type your response..."
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Send className="h-4 w-4" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-12 text-center">
                    <MessageSquare className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select a Ticket</h3>
                    <p className="text-blue-200">Choose a support ticket to view details and respond.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FAQ Management
                </h1>
                <p className="text-blue-200 mt-2">Create and manage frequently asked questions.</p>
              </div>
              <button
                onClick={() => setShowNewFAQForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add FAQ</span>
              </button>
            </div>

            {/* New FAQ Form */}
            {showNewFAQForm && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Create New FAQ</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Category</label>
                    <input
                      type="text"
                      value={newFAQ.category}
                      onChange={(e) => setNewFAQ({...newFAQ, category: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="e.g., Getting Started, Payments, API"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Question</label>
                    <input
                      type="text"
                      value={newFAQ.question}
                      onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Enter the question"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Answer</label>
                    <textarea
                      value={newFAQ.answer}
                      onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                      placeholder="Enter the detailed answer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={newFAQ.tags}
                      onChange={(e) => setNewFAQ({...newFAQ, tags: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="e.g., account, signup, verification"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleCreateFAQ}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                    >
                      Create FAQ
                    </button>
                    <button
                      onClick={() => setShowNewFAQForm(false)}
                      className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-6 py-2 rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ List */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
                    {isEditingFAQ?.id === faq.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={isEditingFAQ.category}
                          onChange={(e) => setIsEditingFAQ({...isEditingFAQ, category: e.target.value})}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white"
                          placeholder="Category"
                        />
                        <input
                          type="text"
                          value={isEditingFAQ.question}
                          onChange={(e) => setIsEditingFAQ({...isEditingFAQ, question: e.target.value})}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white"
                          placeholder="Question"
                        />
                        <textarea
                          value={isEditingFAQ.answer}
                          onChange={(e) => setIsEditingFAQ({...isEditingFAQ, answer: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white resize-none"
                          placeholder="Answer"
                        />
                        <input
                          type="text"
                          value={isEditingFAQ.tags.join(', ')}
                          onChange={(e) => setIsEditingFAQ({...isEditingFAQ, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)})}
                          className="w-full px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white"
                          placeholder="Tags (comma-separated)"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdateFAQ}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditingFAQ(null)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-blue-300 text-sm font-medium">{faq.category}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                faq.isPublished 
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              }`}>
                                {faq.isPublished ? 'Published' : 'Draft'}
                              </span>
                            </div>
                            <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                            <p className="text-blue-100 text-sm mb-3">{faq.answer}</p>
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full border border-blue-500/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleToggleFAQPublished(faq.id, !faq.isPublished)}
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                faq.isPublished 
                                  ? 'text-green-400 hover:bg-green-500/20' 
                                  : 'text-yellow-400 hover:bg-yellow-500/20'
                              }`}
                              title={faq.isPublished ? 'Unpublish' : 'Publish'}
                            >
                              {faq.isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => setIsEditingFAQ(faq)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-blue-300">
                          <span>Created by {faq.createdByName} on {faq.createdAt}</span>
                          <div className="flex items-center space-x-4">
                            <span>{faq.viewCount} views</span>
                            <span>{faq.helpfulCount} helpful</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {faqs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-blue-200">No FAQs created yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && stats && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Support Analytics
              </h1>
              <p className="text-blue-200 mt-2">Detailed insights into customer support performance.</p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Resolution Rate</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats.totalTickets > 0 ? Math.round((stats.resolvedTickets / stats.totalTickets) * 100) : 0}%
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Avg Resolution Time</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.averageResolutionTime}h</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Monthly Growth</p>
                    <p className="text-2xl font-bold text-white mt-1">+{Math.round(((stats.monthlyTickets - stats.weeklyTickets * 4) / (stats.weeklyTickets * 4)) * 100)}%</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Customer Satisfaction</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.satisfactionScore.toFixed(1)}/5</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Category and Priority Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tickets by Category</h3>
                <div className="space-y-3">
                  {Object.entries(stats.ticketsByCategory).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-blue-200 capitalize">{category}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-blue-900/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${(count / stats.totalTickets) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tickets by Priority</h3>
                <div className="space-y-3">
                  {Object.entries(stats.ticketsByPriority).map(([priority, count]) => (
                    <div key={priority} className="flex items-center justify-between">
                      <span className="text-blue-200 capitalize">{priority}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-blue-900/30 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              priority === 'urgent' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                              priority === 'high' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                              priority === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-green-500' :
                              'bg-gradient-to-r from-green-500 to-emerald-500'
                            }`}
                            style={{ width: `${(count / stats.totalTickets) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;