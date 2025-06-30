import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Check, X, AlertCircle, CheckCircle, Info, Clock, User, CreditCard, Shield, Globe, Trash2, AreaChart as MarkAsUnread, Filter, Search, Settings, Archive, Star, StarOff, Eye, EyeOff } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'transaction' | 'security' | 'system' | 'marketing' | 'api';
  title: string;
  message: string;
  timestamp: number;
  date: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  metadata?: {
    transactionId?: string;
    amount?: number;
    currency?: string;
    recipient?: string;
    apiEndpoint?: string;
    deviceInfo?: string;
  };
}

const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'starred' | 'transaction' | 'security' | 'system'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Initialize with mock notifications
    const mockNotifications: Notification[] = [
      {
        id: 'notif_001',
        type: 'transaction',
        title: 'Transaction Completed',
        message: 'Your transfer of $500.00 USD to john@example.com has been completed successfully.',
        timestamp: Date.now() - 300000, // 5 minutes ago
        date: new Date(Date.now() - 300000).toISOString().split('T')[0],
        time: new Date(Date.now() - 300000).toTimeString().split(' ')[0].substring(0, 5),
        isRead: false,
        isStarred: false,
        priority: 'medium',
        metadata: {
          transactionId: 'TXN-123456',
          amount: 500,
          currency: 'USD',
          recipient: 'john@example.com'
        }
      },
      {
        id: 'notif_002',
        type: 'security',
        title: 'New Login Detected',
        message: 'A new login to your account was detected from Chrome on MacBook Pro in New York, NY.',
        timestamp: Date.now() - 3600000, // 1 hour ago
        date: new Date(Date.now() - 3600000).toISOString().split('T')[0],
        time: new Date(Date.now() - 3600000).toTimeString().split(' ')[0].substring(0, 5),
        isRead: false,
        isStarred: true,
        priority: 'high',
        metadata: {
          deviceInfo: 'Chrome on MacBook Pro'
        }
      },
      {
        id: 'notif_003',
        type: 'api',
        title: 'API Rate Limit Warning',
        message: 'Your API usage is approaching the rate limit. You have used 450/500 requests in the current window.',
        timestamp: Date.now() - 7200000, // 2 hours ago
        date: new Date(Date.now() - 7200000).toISOString().split('T')[0],
        time: new Date(Date.now() - 7200000).toTimeString().split(' ')[0].substring(0, 5),
        isRead: true,
        isStarred: false,
        priority: 'medium',
        metadata: {
          apiEndpoint: '/api/v1/transfer'
        }
      },
      {
        id: 'notif_004',
        type: 'system',
        title: 'Scheduled Maintenance',
        message: 'We will be performing scheduled maintenance on January 25th from 2:00 AM to 4:00 AM UTC.',
        timestamp: Date.now() - 86400000, // 1 day ago
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        time: new Date(Date.now() - 86400000).toTimeString().split(' ')[0].substring(0, 5),
        isRead: true,
        isStarred: false,
        priority: 'low'
      },
      {
        id: 'notif_005',
        type: 'transaction',
        title: 'Transaction Failed',
        message: 'Your transfer of $1,200.00 USD to recipient@example.com failed due to insufficient funds.',
        timestamp: Date.now() - 172800000, // 2 days ago
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        time: new Date(Date.now() - 172800000).toTimeString().split(' ')[0].substring(0, 5),
        isRead: true,
        isStarred: true,
        priority: 'urgent',
        metadata: {
          transactionId: 'TXN-123457',
          amount: 1200,
          currency: 'USD',
          recipient: 'recipient@example.com'
        }
      },
      {
        id: 'notif_006',
        type: 'security',
        title: 'Password Changed',
        message: 'Your account password was successfully changed. If this wasn\'t you, please contact support immediately.',
        timestamp: Date.now() - 259200000, // 3 days ago
        date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
        time: new Date(Date.now() - 259200000).toTimeString().split(' ')[0].substring(0, 5),
        isRead: true,
        isStarred: false,
        priority: 'high'
      },
      {
        id: 'notif_007',
        type: 'marketing',
        title: 'New Feature: Bulk Transfers',
        message: 'You can now send money to multiple recipients at once with our new bulk transfer feature.',
        timestamp: Date.now() - 432000000, // 5 days ago
        date: new Date(Date.now() - 432000000).toISOString().split('T')[0],
        time: new Date(Date.now() - 432000000).toTimeString().split(' ')[0].substring(0, 5),
        isRead: true,
        isStarred: false,
        priority: 'low'
      }
    ];

    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    let filtered = notifications;

    // Apply type filter
    if (filterType === 'unread') {
      filtered = filtered.filter(n => !n.isRead);
    } else if (filterType === 'starred') {
      filtered = filtered.filter(n => n.isStarred);
    } else if (filterType !== 'all') {
      filtered = filtered.filter(n => n.type === filterType);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.message.toLowerCase().includes(query)
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp - a.timestamp);

    setFilteredNotifications(filtered);
  }, [notifications, filterType, searchQuery]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: false } : n
    ));
  };

  const toggleStar = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isStarred: !n.isStarred } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteSelected = () => {
    if (selectedNotifications.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedNotifications.size} notification(s)?`)) {
      setNotifications(prev => prev.filter(n => !selectedNotifications.has(n.id)));
      setSelectedNotifications(new Set());
    }
  };

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAllVisible = () => {
    const visibleIds = filteredNotifications.map(n => n.id);
    setSelectedNotifications(new Set(visibleIds));
  };

  const deselectAll = () => {
    setSelectedNotifications(new Set());
  };

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = `h-5 w-5 ${
      priority === 'urgent' ? 'text-red-400' :
      priority === 'high' ? 'text-orange-400' :
      priority === 'medium' ? 'text-blue-400' : 'text-gray-400'
    }`;

    switch (type) {
      case 'transaction':
        return <CreditCard className={iconClass} />;
      case 'security':
        return <Shield className={iconClass} />;
      case 'system':
        return <Settings className={iconClass} />;
      case 'api':
        return <Globe className={iconClass} />;
      case 'marketing':
        return <Info className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const starredCount = notifications.filter(n => n.isStarred).length;

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

            <div className="hidden lg:flex items-center space-x-4">
              <Bell className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-blue-200 mt-2">
                Stay updated with your account activity and important alerts.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {selectedNotifications.size > 0 && (
                <button
                  onClick={deleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete ({selectedNotifications.size})</span>
                </button>
              )}
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Check className="h-4 w-4" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Filters</h2>
                
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  />
                </div>

                {/* Filter Options */}
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Notifications', count: notifications.length },
                    { id: 'unread', label: 'Unread', count: unreadCount },
                    { id: 'starred', label: 'Starred', count: starredCount },
                    { id: 'transaction', label: 'Transactions', count: notifications.filter(n => n.type === 'transaction').length },
                    { id: 'security', label: 'Security', count: notifications.filter(n => n.type === 'security').length },
                    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setFilterType(filter.id as any)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-between ${
                        filterType === filter.id
                          ? 'bg-blue-500/30 text-white border border-blue-400/50'
                          : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span className="text-xs bg-blue-900/30 px-2 py-1 rounded-full">
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                {/* Bulk Actions */}
                {filteredNotifications.length > 0 && (
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-500/30">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.size === filteredNotifications.length && filteredNotifications.length > 0}
                          onChange={(e) => e.target.checked ? selectAllVisible() : deselectAll()}
                          className="rounded border-blue-500/30 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-blue-200 text-sm">Select all visible</span>
                      </label>
                      {selectedNotifications.size > 0 && (
                        <span className="text-blue-300 text-sm">
                          {selectedNotifications.size} selected
                        </span>
                      )}
                    </div>
                    <div className="text-blue-200 text-sm">
                      {filteredNotifications.length} of {notifications.length} notifications
                    </div>
                  </div>
                )}

                {/* Notifications */}
                <div className="space-y-4">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No notifications found</h3>
                      <p className="text-blue-200">
                        {searchQuery ? 'Try adjusting your search terms.' : 'You\'re all caught up!'}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                          notification.isRead
                            ? 'bg-white/5 border-blue-500/30'
                            : 'bg-blue-500/10 border-blue-400/50 shadow-lg'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Checkbox */}
                          <label className="flex items-center mt-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedNotifications.has(notification.id)}
                              onChange={() => toggleSelectNotification(notification.id)}
                              className="rounded border-blue-500/30 text-blue-600 focus:ring-blue-500"
                            />
                          </label>

                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type, notification.priority)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className={`font-medium ${notification.isRead ? 'text-blue-100' : 'text-white'}`}>
                                    {notification.title}
                                  </h3>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  )}
                                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                                    notification.priority === 'urgent' ? 'bg-red-500/20 text-red-300' :
                                    notification.priority === 'high' ? 'bg-orange-500/20 text-orange-300' :
                                    notification.priority === 'medium' ? 'bg-blue-500/20 text-blue-300' :
                                    'bg-gray-500/20 text-gray-300'
                                  }`}>
                                    {notification.priority}
                                  </span>
                                </div>
                                <p className={`text-sm mb-2 ${notification.isRead ? 'text-blue-200' : 'text-blue-100'}`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-blue-300">
                                  <span>{getTimeAgo(notification.timestamp)}</span>
                                  <span>{notification.date} at {notification.time}</span>
                                  <span className="capitalize">{notification.type}</span>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => toggleStar(notification.id)}
                                  className={`p-1 rounded transition-colors duration-300 ${
                                    notification.isStarred
                                      ? 'text-yellow-400 hover:text-yellow-300'
                                      : 'text-blue-300 hover:text-yellow-400'
                                  }`}
                                  title={notification.isStarred ? 'Remove star' : 'Add star'}
                                >
                                  {notification.isStarred ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                                </button>
                                
                                <button
                                  onClick={() => notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id)}
                                  className="p-1 text-blue-300 hover:text-white transition-colors duration-300"
                                  title={notification.isRead ? 'Mark as unread' : 'Mark as read'}
                                >
                                  {notification.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                                
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                                  title="Delete notification"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Metadata */}
                            {notification.metadata && (
                              <div className="mt-3 p-3 bg-white/5 rounded-lg border border-blue-500/20">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {notification.metadata.transactionId && (
                                    <div>
                                      <span className="text-blue-300">Transaction ID:</span>
                                      <span className="text-white ml-1 font-mono">{notification.metadata.transactionId}</span>
                                    </div>
                                  )}
                                  {notification.metadata.amount && (
                                    <div>
                                      <span className="text-blue-300">Amount:</span>
                                      <span className="text-white ml-1">
                                        {notification.metadata.amount.toLocaleString()} {notification.metadata.currency}
                                      </span>
                                    </div>
                                  )}
                                  {notification.metadata.recipient && (
                                    <div>
                                      <span className="text-blue-300">Recipient:</span>
                                      <span className="text-white ml-1">{notification.metadata.recipient}</span>
                                    </div>
                                  )}
                                  {notification.metadata.deviceInfo && (
                                    <div>
                                      <span className="text-blue-300">Device:</span>
                                      <span className="text-white ml-1">{notification.metadata.deviceInfo}</span>
                                    </div>
                                  )}
                                  {notification.metadata.apiEndpoint && (
                                    <div>
                                      <span className="text-blue-300">Endpoint:</span>
                                      <span className="text-white ml-1 font-mono">{notification.metadata.apiEndpoint}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;