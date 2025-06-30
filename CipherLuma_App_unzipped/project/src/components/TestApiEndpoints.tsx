import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Copy, 
  Check, 
  Code, 
  Send, 
  DollarSign, 
  CreditCard, 
  BarChart3, 
  Webhook, 
  Globe, 
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';
import { apiSimulator } from '../utils/apiSimulator';

interface TestApiEndpointsProps {
  onBack: () => void;
}

interface ApiEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  sampleRequest?: any;
  requiredFields?: string[];
}

interface TestResult {
  endpoint: string;
  status: number;
  data?: any;
  error?: string;
  executionTime: number;
  timestamp: number;
}

const TestApiEndpoints: React.FC<TestApiEndpointsProps> = ({ onBack }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [apiKey, setApiKey] = useState('cl_test_sk_1234567890abcdef');
  const [showApiKey, setShowApiKey] = useState(false);
  const [requestData, setRequestData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints: ApiEndpoint[] = [
    {
      id: 'transfer',
      name: 'Send Transfer',
      method: 'POST',
      endpoint: '/transfer',
      description: 'Send money to a recipient',
      icon: Send,
      color: 'from-blue-500 to-cyan-500',
      sampleRequest: {
        to: 'john@example.com',
        amount: 100,
        currency: 'USD',
        type: 'bank_transfer',
        description: 'Payment for services'
      },
      requiredFields: ['to', 'amount', 'currency', 'type']
    },
    {
      id: 'balance',
      name: 'Get Balance',
      method: 'GET',
      endpoint: '/balance',
      description: 'Retrieve account balances',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'transactions',
      name: 'List Transactions',
      method: 'GET',
      endpoint: '/transactions',
      description: 'Get transaction history',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      sampleRequest: {
        limit: 10,
        offset: 0,
        status: 'completed'
      }
    },
    {
      id: 'exchange-rates',
      name: 'Exchange Rates',
      method: 'GET',
      endpoint: '/exchange-rates',
      description: 'Get current exchange rates',
      icon: Globe,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'payment-methods',
      name: 'Payment Methods',
      method: 'GET',
      endpoint: '/payment-methods',
      description: 'Get available payment methods',
      icon: CreditCard,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'webhooks',
      name: 'Manage Webhooks',
      method: 'GET',
      endpoint: '/webhooks',
      description: 'List configured webhooks',
      icon: Webhook,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'create-webhook',
      name: 'Create Webhook',
      method: 'POST',
      endpoint: '/webhooks',
      description: 'Create a new webhook',
      icon: Webhook,
      color: 'from-teal-500 to-cyan-500',
      sampleRequest: {
        url: 'https://your-app.com/webhook',
        events: ['transaction.completed', 'transaction.failed']
      },
      requiredFields: ['url', 'events']
    }
  ];

  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setRequestData(endpoint.sampleRequest || {});
  };

  const handleInputChange = (key: string, value: any) => {
    setRequestData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTestEndpoint = async () => {
    if (!selectedEndpoint) return;

    setIsLoading(true);
    try {
      const result = await apiSimulator.makeApiCall({
        endpoint: selectedEndpoint.endpoint,
        method: selectedEndpoint.method,
        data: Object.keys(requestData).length > 0 ? requestData : undefined,
        apiKey,
        userId: 'test_user_123'
      });

      const testResult: TestResult = {
        endpoint: `${selectedEndpoint.method} ${selectedEndpoint.endpoint}`,
        status: result.status,
        data: result.data,
        error: result.error,
        executionTime: result.executionTime,
        timestamp: Date.now()
      };

      setTestResults(prev => [testResult, ...prev.slice(0, 9)]); // Keep last 10 results
    } catch (error) {
      console.error('API test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCodeExample = (endpoint: ApiEndpoint) => {
    const hasBody = endpoint.method === 'POST' || endpoint.method === 'PUT';
    const bodyData = hasBody ? JSON.stringify(requestData, null, 2) : '';

    return `// ${endpoint.name} - ${endpoint.description}
const response = await fetch('https://api.cipherluma.com${endpoint.endpoint}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }${hasBody ? `,
  body: ${bodyData}` : ''}
});

const data = await response.json();
console.log(data);`;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return CheckCircle;
    if (status >= 400 && status < 500) return AlertCircle;
    return AlertCircle;
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
              <Code className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">API Testing Console</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Test API Endpoints
            </h1>
            <p className="text-blue-200 mt-2">
              Test our API endpoints directly from your browser. Perfect for development and integration testing.
            </p>
          </div>

          {/* API Key Configuration */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">API Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent pr-12 transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter your API key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-blue-300 text-sm mt-2">
                  Use your test API key (cl_test_*) for safe testing. Never use live keys in this console.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Endpoints List */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Available Endpoints</h2>
                <div className="space-y-3">
                  {endpoints.map((endpoint) => (
                    <button
                      key={endpoint.id}
                      onClick={() => handleEndpointSelect(endpoint)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                        selectedEndpoint?.id === endpoint.id
                          ? 'bg-blue-500/30 border-blue-400/50 shadow-lg'
                          : 'bg-white/5 border-blue-500/30 hover:bg-white/10 hover:border-blue-400/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`bg-gradient-to-r ${endpoint.color} rounded-lg p-2`}>
                          <endpoint.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium text-sm">{endpoint.name}</span>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              endpoint.method === 'GET' ? 'bg-green-500/20 text-green-300' :
                              endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-300' :
                              endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {endpoint.method}
                            </span>
                          </div>
                          <p className="text-blue-200 text-xs mt-1">{endpoint.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Interface */}
            <div className="lg:col-span-2 space-y-6">
              {selectedEndpoint ? (
                <>
                  {/* Endpoint Details */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`bg-gradient-to-r ${selectedEndpoint.color} rounded-lg p-3`}>
                          <selectedEndpoint.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{selectedEndpoint.name}</h3>
                          <p className="text-blue-200">{selectedEndpoint.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                          selectedEndpoint.method === 'GET' ? 'bg-green-500/20 text-green-300' :
                          selectedEndpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-300' :
                          selectedEndpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {selectedEndpoint.method}
                        </span>
                        <code className="px-3 py-1 bg-gray-800/50 text-blue-300 rounded text-sm">
                          {selectedEndpoint.endpoint}
                        </code>
                      </div>
                    </div>

                    {/* Request Parameters */}
                    {(selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT' || selectedEndpoint.sampleRequest) && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-white">Request Parameters</h4>
                        {selectedEndpoint.sampleRequest && Object.keys(selectedEndpoint.sampleRequest).map((key) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                              {key}
                              {selectedEndpoint.requiredFields?.includes(key) && (
                                <span className="text-red-400 ml-1">*</span>
                              )}
                            </label>
                            {typeof selectedEndpoint.sampleRequest[key] === 'boolean' ? (
                              <select
                                value={requestData[key]?.toString() || 'false'}
                                onChange={(e) => handleInputChange(key, e.target.value === 'true')}
                                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                              >
                                <option value="false" className="bg-gray-800">false</option>
                                <option value="true" className="bg-gray-800">true</option>
                              </select>
                            ) : Array.isArray(selectedEndpoint.sampleRequest[key]) ? (
                              <input
                                type="text"
                                value={Array.isArray(requestData[key]) ? requestData[key].join(', ') : ''}
                                onChange={(e) => handleInputChange(key, e.target.value.split(', ').filter(Boolean))}
                                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                                placeholder="Enter comma-separated values"
                              />
                            ) : (
                              <input
                                type={typeof selectedEndpoint.sampleRequest[key] === 'number' ? 'number' : 'text'}
                                value={requestData[key] || ''}
                                onChange={(e) => handleInputChange(key, typeof selectedEndpoint.sampleRequest[key] === 'number' ? Number(e.target.value) : e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                                placeholder={`Enter ${key}`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Test Button */}
                    <div className="flex items-center space-x-4 mt-6">
                      <button
                        onClick={handleTestEndpoint}
                        disabled={isLoading || !apiKey}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Testing...</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            <span>Test Endpoint</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => copyToClipboard(generateCodeExample(selectedEndpoint), 'code')}
                        className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2"
                      >
                        {copiedCode === 'code' ? (
                          <>
                            <Check className="h-4 w-4 text-green-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-white">Code Example</h4>
                      <button
                        onClick={() => copyToClipboard(generateCodeExample(selectedEndpoint), 'example')}
                        className="text-blue-300 hover:text-white transition-colors duration-300 flex items-center space-x-1"
                      >
                        {copiedCode === 'example' ? (
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
                    <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                      <code className="text-blue-100 text-sm">
                        {generateCodeExample(selectedEndpoint)}
                      </code>
                    </pre>
                  </div>
                </>
              ) : (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-12 text-center">
                  <Code className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select an Endpoint</h3>
                  <p className="text-blue-200">
                    Choose an API endpoint from the list to start testing.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Recent Test Results</h2>
              <div className="space-y-4">
                {testResults.map((result, index) => {
                  const StatusIcon = getStatusIcon(result.status);
                  return (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <StatusIcon className={`h-5 w-5 ${getStatusColor(result.status)}`} />
                          <code className="text-blue-300 font-medium">{result.endpoint}</code>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(result.status)} bg-current bg-opacity-20`}>
                            {result.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-blue-200">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{result.executionTime}ms</span>
                          </div>
                          <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      
                      {result.error ? (
                        <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                          <p className="text-red-300 text-sm">{result.error}</p>
                        </div>
                      ) : (
                        <div className="bg-gray-900/30 rounded p-3">
                          <pre className="text-green-300 text-sm overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestApiEndpoints;