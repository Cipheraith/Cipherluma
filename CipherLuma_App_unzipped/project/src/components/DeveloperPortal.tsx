import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Code, 
  Book, 
  Globe, 
  Key, 
  Zap, 
  Shield, 
  Download, 
  ExternalLink, 
  Copy, 
  Check,
  Play,
  Terminal,
  FileText,
  Users,
  BarChart3,
  Webhook,
  Settings
} from 'lucide-react';

interface DeveloperPortalProps {
  onBack: () => void;
}

const DeveloperPortal: React.FC<DeveloperPortalProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'docs' | 'tools' | 'community'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const quickStartCode = `// Install the CipherLuma SDK
npm install @cipherluma/sdk

// Initialize the client
import { CipherLuma } from '@cipherluma/sdk';

const client = new CipherLuma({
  apiKey: 'cl_live_your_api_key_here',
  environment: 'production' // or 'sandbox'
});

// Send a payment
const transfer = await client.transfers.create({
  to: 'recipient@example.com',
  amount: 100,
  currency: 'USD',
  type: 'bank_transfer',
  description: 'Payment for services'
});

console.log('Transfer created:', transfer.id);`;

  const webhookCode = `// Express.js webhook handler
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['cipherluma-signature'];
  
  try {
    const event = client.webhooks.constructEvent(req.body, sig);
    
    switch (event.type) {
      case 'transaction.completed':
        console.log('Payment completed:', event.data);
        break;
      case 'transaction.failed':
        console.log('Payment failed:', event.data);
        break;
    }
    
    res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send('Invalid signature');
  }
});`;

  const resources = [
    {
      title: 'API Reference',
      description: 'Complete API documentation with examples',
      icon: Book,
      color: 'from-blue-500 to-cyan-500',
      link: '#',
      type: 'documentation'
    },
    {
      title: 'SDK Libraries',
      description: 'Official SDKs for popular programming languages',
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      link: '#',
      type: 'tools'
    },
    {
      title: 'Postman Collection',
      description: 'Ready-to-use API collection for testing',
      icon: Download,
      color: 'from-orange-500 to-red-500',
      link: '#',
      type: 'tools'
    },
    {
      title: 'Webhook Testing',
      description: 'Test webhook endpoints with our simulator',
      icon: Webhook,
      color: 'from-purple-500 to-pink-500',
      link: '#',
      type: 'tools'
    },
    {
      title: 'Status Page',
      description: 'Real-time API status and uptime monitoring',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      link: '#',
      type: 'monitoring'
    },
    {
      title: 'Developer Community',
      description: 'Connect with other developers and get help',
      icon: Users,
      color: 'from-teal-500 to-cyan-500',
      link: '#',
      type: 'community'
    }
  ];

  const sdks = [
    {
      name: 'Node.js',
      description: 'Official Node.js SDK with TypeScript support',
      version: 'v2.1.0',
      downloads: '15.2K',
      language: 'JavaScript/TypeScript',
      icon: '🟢'
    },
    {
      name: 'Python',
      description: 'Python SDK with async/await support',
      version: 'v1.8.3',
      downloads: '8.7K',
      language: 'Python',
      icon: '🐍'
    },
    {
      name: 'PHP',
      description: 'PHP SDK compatible with Laravel and Symfony',
      version: 'v1.5.2',
      downloads: '5.1K',
      language: 'PHP',
      icon: '🐘'
    },
    {
      name: 'Ruby',
      description: 'Ruby gem with Rails integration',
      version: 'v1.3.1',
      downloads: '2.8K',
      language: 'Ruby',
      icon: '💎'
    },
    {
      name: 'Go',
      description: 'Lightweight Go SDK for high-performance apps',
      version: 'v1.2.0',
      downloads: '1.9K',
      language: 'Go',
      icon: '🔵'
    },
    {
      name: 'Java',
      description: 'Java SDK for Spring Boot and enterprise apps',
      version: 'v1.1.5',
      downloads: '3.4K',
      language: 'Java',
      icon: '☕'
    }
  ];

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/transfers',
      description: 'Create a new transfer',
      category: 'Transfers'
    },
    {
      method: 'GET',
      endpoint: '/transfers/{id}',
      description: 'Retrieve transfer details',
      category: 'Transfers'
    },
    {
      method: 'GET',
      endpoint: '/balance',
      description: 'Get account balances',
      category: 'Account'
    },
    {
      method: 'GET',
      endpoint: '/transactions',
      description: 'List transactions',
      category: 'Transactions'
    },
    {
      method: 'GET',
      endpoint: '/exchange-rates',
      description: 'Get current exchange rates',
      category: 'Rates'
    },
    {
      method: 'POST',
      endpoint: '/webhooks',
      description: 'Create webhook endpoint',
      category: 'Webhooks'
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-300';
      case 'POST': return 'bg-blue-500/20 text-blue-300';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-300';
      case 'DELETE': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
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

            {/* Tab Navigation */}
            <div className="hidden lg:flex space-x-6">
              {[
                { id: 'overview', label: 'Overview', icon: Globe },
                { id: 'docs', label: 'Documentation', icon: Book },
                { id: 'tools', label: 'Tools & SDKs', icon: Code },
                { id: 'community', label: 'Community', icon: Users }
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
                { id: 'overview', label: 'Overview', icon: Globe },
                { id: 'docs', label: 'Docs', icon: Book },
                { id: 'tools', label: 'Tools', icon: Code },
                { id: 'community', label: 'Community', icon: Users }
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
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Developer Portal
              </h1>
              <p className="text-blue-200 text-lg max-w-3xl mx-auto">
                Build powerful payment solutions with CipherLuma's comprehensive APIs and developer tools. 
                Get started in minutes with our SDKs and extensive documentation.
              </p>
            </div>

            {/* Quick Start */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Quick Start</h2>
                <button
                  onClick={() => copyToClipboard(quickStartCode, 'quickstart')}
                  className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors duration-300"
                >
                  {copiedCode === 'quickstart' ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-300 text-sm">
                  <code>{quickStartCode}</code>
                </pre>
              </div>
            </div>

            {/* Resources Grid */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Developer Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <a
                    key={resource.title}
                    href={resource.link}
                    className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`bg-gradient-to-r ${resource.color} rounded-lg p-3`}>
                        <resource.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                          {resource.title}
                        </h3>
                        <p className="text-blue-200 text-sm">{resource.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* API Status */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30 p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 rounded-full p-2">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">All Systems Operational</h3>
                  <p className="text-green-200 text-sm">API uptime: 99.98% • Response time: 145ms</p>
                </div>
                <div className="ml-auto">
                  <a href="#" className="text-green-300 hover:text-green-200 transition-colors duration-300 flex items-center space-x-1">
                    <span>View Status</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                API Documentation
              </h1>
              <p className="text-blue-200 mt-2">
                Comprehensive documentation for the CipherLuma API with examples and best practices.
              </p>
            </div>

            {/* API Endpoints */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">API Endpoints</h2>
              <div className="space-y-3">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-blue-500/20 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-blue-300 font-mono">{endpoint.endpoint}</code>
                      <span className="text-blue-100">{endpoint.description}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-300 text-sm">{endpoint.category}</span>
                      <ExternalLink className="h-4 w-4 text-blue-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Webhook Example */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Webhook Integration</h2>
                <button
                  onClick={() => copyToClipboard(webhookCode, 'webhook')}
                  className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors duration-300"
                >
                  {copiedCode === 'webhook' ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-300 text-sm">
                  <code>{webhookCode}</code>
                </pre>
              </div>
            </div>

            {/* Documentation Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Authentication', description: 'API key management and security', icon: Key },
                { title: 'Rate Limiting', description: 'Request limits and best practices', icon: Zap },
                { title: 'Error Handling', description: 'Error codes and troubleshooting', icon: Shield },
                { title: 'Testing', description: 'Sandbox environment and test data', icon: Play }
              ].map((doc, index) => (
                <a
                  key={doc.title}
                  href="#"
                  className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3">
                      <doc.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                        {doc.title}
                      </h3>
                      <p className="text-blue-200 text-sm">{doc.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tools & SDKs
              </h1>
              <p className="text-blue-200 mt-2">
                Official SDKs, tools, and resources to accelerate your development.
              </p>
            </div>

            {/* SDKs */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Official SDKs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sdks.map((sdk, index) => (
                  <div key={sdk.name} className="bg-white/5 rounded-lg border border-blue-500/20 p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{sdk.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold">{sdk.name}</h3>
                        <p className="text-blue-300 text-sm">{sdk.language}</p>
                      </div>
                    </div>
                    <p className="text-blue-200 text-sm mb-3">{sdk.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-300">{sdk.version}</span>
                      <span className="text-blue-300">{sdk.downloads} downloads</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors duration-300">
                        Install
                      </button>
                      <button className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-2 px-3 rounded text-sm transition-all duration-300">
                        Docs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'API Explorer',
                  description: 'Interactive API testing interface',
                  icon: Terminal,
                  action: 'Launch Explorer'
                },
                {
                  title: 'Webhook Tester',
                  description: 'Test webhook endpoints and payloads',
                  icon: Webhook,
                  action: 'Test Webhooks'
                },
                {
                  title: 'Postman Collection',
                  description: 'Complete API collection for Postman',
                  icon: Download,
                  action: 'Download'
                },
                {
                  title: 'OpenAPI Spec',
                  description: 'Machine-readable API specification',
                  icon: FileText,
                  action: 'Download'
                }
              ].map((tool, index) => (
                <div key={tool.title} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{tool.title}</h3>
                      <p className="text-blue-200 text-sm">{tool.description}</p>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    {tool.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Developer Community
              </h1>
              <p className="text-blue-200 mt-2">
                Connect with other developers, share knowledge, and get help from our community.
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">2,500+</div>
                <div className="text-blue-200">Active Developers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">850+</div>
                <div className="text-blue-200">GitHub Stars</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">150+</div>
                <div className="text-blue-200">Community Posts</div>
              </div>
            </div>

            {/* Community Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Discord Community',
                  description: 'Join our Discord server for real-time discussions',
                  icon: Users,
                  color: 'from-indigo-500 to-purple-500',
                  members: '1,200+ members'
                },
                {
                  title: 'GitHub Repository',
                  description: 'Contribute to our open-source projects',
                  icon: Code,
                  color: 'from-gray-600 to-gray-800',
                  members: '850+ stars'
                },
                {
                  title: 'Stack Overflow',
                  description: 'Ask questions and get answers from experts',
                  icon: FileText,
                  color: 'from-orange-500 to-red-500',
                  members: '300+ questions'
                },
                {
                  title: 'Developer Blog',
                  description: 'Read tutorials, guides, and announcements',
                  icon: Book,
                  color: 'from-green-500 to-emerald-500',
                  members: '50+ articles'
                }
              ].map((community, index) => (
                <a
                  key={community.title}
                  href="#"
                  className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`bg-gradient-to-r ${community.color} rounded-lg p-3`}>
                      <community.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                        {community.title}
                      </h3>
                      <p className="text-blue-200 text-sm">{community.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-blue-300 text-sm">{community.members}</div>
                </a>
              ))}
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Need Help?</h3>
              <p className="text-blue-200 mb-4">
                Our developer support team is here to help you succeed. Get priority support with technical questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Contact Developer Support
                </button>
                <button className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-6 py-3 rounded-lg transition-all duration-300">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperPortal;