import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  CreditCard, 
  Key, 
  Download, 
  Eye, 
  EyeOff, 
  Save, 
  CheckCircle,
  AlertCircle,
  Smartphone,
  Mail,
  Lock,
  Trash2,
  Plus,
  Edit
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'api' | 'preferences'>('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    country: 'United States',
    timezone: 'America/New_York',
    language: 'English'
  });

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    productUpdates: true,
    weeklyReports: true,
    pushNotifications: true
  });

  const [apiSettings, setApiSettings] = useState({
    liveApiKey: 'cl_live_sk_1234567890abcdef',
    testApiKey: 'cl_test_sk_abcdef1234567890',
    webhookUrl: 'https://your-app.com/webhook',
    rateLimitAlerts: true
  });

  const handleSave = async (section: string) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSavedMessage(`${section} settings saved successfully!`);
      setTimeout(() => setSavedMessage(''), 3000);
    }, 1000);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    switch (section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }));
        break;
      case 'security':
        setSecurityData(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'api':
        setApiSettings(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  const generateNewApiKey = (type: 'live' | 'test') => {
    const newKey = `cl_${type}_sk_${Date.now()}${Math.random().toString(36).substring(2, 15)}`;
    setApiSettings(prev => ({ 
      ...prev, 
      [type === 'live' ? 'liveApiKey' : 'testApiKey']: newKey 
    }));
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Country</label>
            <select
              value={profileData.country}
              onChange={(e) => handleInputChange('profile', 'country', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              <option value="United States" className="bg-gray-800">United States</option>
              <option value="United Kingdom" className="bg-gray-800">United Kingdom</option>
              <option value="Canada" className="bg-gray-800">Canada</option>
              <option value="Zambia" className="bg-gray-800">Zambia</option>
              <option value="Nigeria" className="bg-gray-800">Nigeria</option>
              <option value="Kenya" className="bg-gray-800">Kenya</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Timezone</label>
            <select
              value={profileData.timezone}
              onChange={(e) => handleInputChange('profile', 'timezone', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              <option value="America/New_York" className="bg-gray-800">Eastern Time (ET)</option>
              <option value="America/Chicago" className="bg-gray-800">Central Time (CT)</option>
              <option value="America/Denver" className="bg-gray-800">Mountain Time (MT)</option>
              <option value="America/Los_Angeles" className="bg-gray-800">Pacific Time (PT)</option>
              <option value="Europe/London" className="bg-gray-800">Greenwich Mean Time (GMT)</option>
              <option value="Africa/Lusaka" className="bg-gray-800">Central Africa Time (CAT)</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={() => handleSave('Profile')}
          disabled={isSaving}
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 flex items-center space-x-2"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Security Settings</h2>
        
        {/* Two-Factor Authentication */}
        <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
              <p className="text-blue-200 text-sm">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${securityData.twoFactorEnabled ? 'text-green-400' : 'text-red-400'}`}>
                {securityData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={() => handleInputChange('security', 'twoFactorEnabled', !securityData.twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securityData.twoFactorEnabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          
          {securityData.twoFactorEnabled && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-green-400" />
                <span className="text-green-200">Authenticator app configured</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm">
                View Backup Codes
              </button>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Current Password</label>
              <input
                type="password"
                value={securityData.currentPassword}
                onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter current password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">New Password</label>
              <input
                type="password"
                value={securityData.newPassword}
                onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={securityData.confirmPassword}
                onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Confirm new password"
              />
            </div>
            
            <button
              onClick={() => handleSave('Password')}
              disabled={!securityData.currentPassword || !securityData.newPassword || securityData.newPassword !== securityData.confirmPassword}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span>Update Password</span>
            </button>
          </div>
        </div>

        {/* Login Alerts */}
        <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Login Alerts</h3>
              <p className="text-blue-200 text-sm">Get notified of new login attempts</p>
            </div>
            <button
              onClick={() => handleInputChange('security', 'loginAlerts', !securityData.loginAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securityData.loginAlerts ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securityData.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Notification Preferences</h2>
        
        <div className="space-y-4">
          {[
            { key: 'transactionAlerts', label: 'Transaction Alerts', description: 'Get notified when transactions are completed or failed' },
            { key: 'securityAlerts', label: 'Security Alerts', description: 'Important security notifications and login alerts' },
            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional offers and product announcements' },
            { key: 'productUpdates', label: 'Product Updates', description: 'New features and platform improvements' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary of your account activity and transactions' },
            { key: 'pushNotifications', label: 'Push Notifications', description: 'Real-time notifications in your browser' }
          ].map((setting) => (
            <div key={setting.key} className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{setting.label}</h3>
                  <p className="text-blue-200 text-sm">{setting.description}</p>
                </div>
                <button
                  onClick={() => handleInputChange('notifications', setting.key, !notificationSettings[setting.key as keyof typeof notificationSettings])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings[setting.key as keyof typeof notificationSettings] ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings[setting.key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => handleSave('Notification')}
          disabled={isSaving}
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 flex items-center space-x-2"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">API Management</h2>
        
        {/* API Keys */}
        <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Live API Key</label>
              <div className="flex items-center space-x-2">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiSettings.liveApiKey}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white font-mono text-sm"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-3 text-blue-300 hover:text-white transition-colors duration-300"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => generateNewApiKey('live')}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Test API Key</label>
              <div className="flex items-center space-x-2">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiSettings.testApiKey}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white font-mono text-sm"
                />
                <button
                  onClick={() => generateNewApiKey('test')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Webhook Configuration */}
        <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Webhook Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Webhook URL</label>
              <input
                type="url"
                value={apiSettings.webhookUrl}
                onChange={(e) => handleInputChange('api', 'webhookUrl', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="https://your-app.com/webhook"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Rate Limit Alerts</h4>
                <p className="text-blue-200 text-sm">Get notified when approaching API rate limits</p>
              </div>
              <button
                onClick={() => handleInputChange('api', 'rateLimitAlerts', !apiSettings.rateLimitAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  apiSettings.rateLimitAlerts ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    apiSettings.rateLimitAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleSave('API')}
          disabled={isSaving}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 flex items-center space-x-2"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save API Settings'}</span>
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API', icon: Key }
  ];

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
              <User className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">Account Settings</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Message */}
      {savedMessage && (
        <div className="fixed top-24 right-4 bg-green-500/20 border border-green-400/30 text-green-300 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="h-5 w-5" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-blue-200 mt-2">Manage your account preferences and security settings.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                        activeTab === tab.id
                          ? 'bg-blue-500/30 text-white shadow-lg border border-blue-400/50'
                          : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
                {activeTab === 'profile' && renderProfile()}
                {activeTab === 'security' && renderSecurity()}
                {activeTab === 'notifications' && renderNotifications()}
                {activeTab === 'api' && renderAPI()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;