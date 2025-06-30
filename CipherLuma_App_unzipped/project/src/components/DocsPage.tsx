import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Book, 
  Code, 
  Globe, 
  Shield, 
  CreditCard, 
  Users, 
  Zap, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  Search,
  Download,
  Play,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Key,
  Webhook,
  BarChart3
} from 'lucide-react';

interface DocsPageProps {
  onBack: () => void;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  subsections: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
}

const DocsPage: React.FC<DocsPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeSubsection, setActiveSubsection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language = 'javascript', id }: { code: string; language?: string; id: string }) => (
    <div className="relative bg-gray-900/50 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
        <span className="text-blue-300 text-sm font-medium">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center space-x-1 text-blue-300 hover:text-white transition-colors duration-300"
        >
          {copiedCode === id ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-green-300 text-sm">{code}</code>
      </pre>
    </div>
  );

  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      subsections: [
        {
          id: 'overview',
          title: 'Overview',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Welcome to CipherLuma</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  CipherLuma is a modern global payments platform that enables instant money transfers worldwide. 
                  Our API allows developers to integrate secure, fast, and reliable payment processing into their applications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-2">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Global Coverage</h4>
                  </div>
                  <p className="text-blue-200 text-sm">
                    Send money to over 50 countries with competitive exchange rates and low fees.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Instant Transfers</h4>
                  </div>
                  <p className="text-blue-200 text-sm">
                    Most transfers complete within minutes, with real-time status updates.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Bank-Level Security</h4>
                  </div>
                  <p className="text-blue-200 text-sm">
                    256-bit SSL encryption, PCI DSS compliance, and advanced fraud detection.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-2">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Developer-Friendly</h4>
                  </div>
                  <p className="text-blue-200 text-sm">
                    RESTful API, comprehensive documentation, and SDKs for popular languages.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30 p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Quick Start Checklist</h4>
                <div className="space-y-3">
                  {[
                    'Create your CipherLuma account',
                    'Complete KYC verification',
                    'Generate your API keys',
                    'Make your first API call',
                    'Set up webhooks for real-time updates'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-blue-500 rounded-full p-1">
                        <span className="text-white text-xs font-bold w-4 h-4 flex items-center justify-center">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-blue-100">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'authentication',
          title: 'Authentication',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">API Authentication</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  CipherLuma uses API keys to authenticate requests. Your API keys carry many privileges, 
                  so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-300 font-semibold">Important</span>
                </div>
                <p className="text-yellow-200 text-sm">
                  Always use test keys (cl_test_*) during development and live keys (cl_live_*) only in production.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Getting Your API Keys</h4>
                <ol className="list-decimal list-inside space-y-2 text-blue-100 ml-4">
                  <li>Log into your CipherLuma dashboard</li>
                  <li>Navigate to the "API Access" section</li>
                  <li>Generate new API keys for test and live environments</li>
                  <li>Copy and securely store your keys</li>
                </ol>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Making Authenticated Requests</h4>
                <p className="text-blue-100 mb-4">
                  Include your API key in the Authorization header of every request:
                </p>
                <CodeBlock
                  id="auth-header"
                  code={`Authorization: Bearer cl_live_sk_your_api_key_here`}
                  language="http"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Example Request</h4>
                <CodeBlock
                  id="auth-example"
                  code={`curl -X GET "https://api.cipherluma.com/v1/balance" \\
  -H "Authorization: Bearer cl_live_sk_your_api_key_here" \\
  -H "Content-Type: application/json"`}
                  language="bash"
                />
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  <span className="text-red-300 font-semibold">Security Best Practices</span>
                </div>
                <ul className="text-red-200 text-sm space-y-1 ml-4">
                  <li>• Never commit API keys to version control</li>
                  <li>• Use environment variables to store keys</li>
                  <li>• Rotate keys regularly</li>
                  <li>• Monitor API usage for suspicious activity</li>
                </ul>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      subsections: [
        {
          id: 'transfers',
          title: 'Transfers',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Transfer API</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  The Transfer API allows you to send money globally. All transfers are processed securely 
                  and you'll receive real-time updates on the transfer status.
                </p>
              </div>

              <div className="space-y-8">
                {/* Create Transfer */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded font-medium">POST</span>
                    <code className="text-blue-300 font-mono">/v1/transfer</code>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">Create a Transfer</h4>
                  <p className="text-blue-100 mb-4">Send money to a recipient anywhere in the world.</p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Request Body</h5>
                      <CodeBlock
                        id="transfer-request"
                        code={`{
  "to": "recipient@example.com",
  "amount": 100.00,
  "currency": "USD",
  "type": "bank_transfer",
  "description": "Payment for services",
  "recipient_details": {
    "name": "John Doe",
    "bank_account": "1234567890",
    "bank_code": "SWIFT123"
  }
}`}
                        language="json"
                      />
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Response</h5>
                      <CodeBlock
                        id="transfer-response"
                        code={`{
  "transaction_id": "txn_1234567890abcdef",
  "status": "pending",
  "amount": 100.00,
  "currency": "USD",
  "recipient": "recipient@example.com",
  "estimated_delivery": "2-5 minutes",
  "fee": 1.00,
  "exchange_rate": 1.0,
  "created_at": "2024-01-20T15:30:00Z"
}`}
                        language="json"
                      />
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Parameters</h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-200 py-2">Parameter</th>
                              <th className="text-left text-blue-200 py-2">Type</th>
                              <th className="text-left text-blue-200 py-2">Required</th>
                              <th className="text-left text-blue-200 py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody className="text-blue-100">
                            <tr className="border-b border-blue-500/20">
                              <td className="py-2 font-mono">to</td>
                              <td className="py-2">string</td>
                              <td className="py-2">Yes</td>
                              <td className="py-2">Recipient email or ID</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="py-2 font-mono">amount</td>
                              <td className="py-2">number</td>
                              <td className="py-2">Yes</td>
                              <td className="py-2">Transfer amount</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="py-2 font-mono">currency</td>
                              <td className="py-2">string</td>
                              <td className="py-2">Yes</td>
                              <td className="py-2">3-letter currency code</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="py-2 font-mono">type</td>
                              <td className="py-2">string</td>
                              <td className="py-2">Yes</td>
                              <td className="py-2">Transfer method</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get Transfer Status */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded font-medium">GET</span>
                    <code className="text-blue-300 font-mono">/v1/transfer/{'{id}'}</code>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">Get Transfer Status</h4>
                  <p className="text-blue-100 mb-4">Retrieve the current status and details of a transfer.</p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Example Request</h5>
                      <CodeBlock
                        id="get-transfer"
                        code={`curl -X GET "https://api.cipherluma.com/v1/transfer/txn_1234567890abcdef" \\
  -H "Authorization: Bearer cl_live_sk_your_api_key_here"`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Response</h5>
                      <CodeBlock
                        id="get-transfer-response"
                        code={`{
  "transaction_id": "txn_1234567890abcdef",
  "status": "completed",
  "amount": 100.00,
  "currency": "USD",
  "recipient": "recipient@example.com",
  "completed_at": "2024-01-20T15:35:00Z",
  "fee": 1.00,
  "exchange_rate": 1.0,
  "tracking_number": "TRK123456789"
}`}
                        language="json"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'balances',
          title: 'Balances',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Balance API</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Retrieve your account balances across all supported currencies. Monitor your available 
                  and pending balances in real-time.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded font-medium">GET</span>
                  <code className="text-blue-300 font-mono">/v1/balance</code>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Get All Balances</h4>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-medium mb-2">Example Request</h5>
                    <CodeBlock
                      id="balance-request"
                      code={`curl -X GET "https://api.cipherluma.com/v1/balance" \\
  -H "Authorization: Bearer cl_live_sk_your_api_key_here"`}
                      language="bash"
                    />
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2">Response</h5>
                    <CodeBlock
                      id="balance-response"
                      code={`{
  "balances": [
    {
      "currency": "USD",
      "available": 12450.75,
      "pending": 0,
      "reserved": 100.00
    },
    {
      "currency": "EUR",
      "available": 8320.50,
      "pending": 0,
      "reserved": 0
    },
    {
      "currency": "ZMW",
      "available": 185000.00,
      "pending": 500.00,
      "reserved": 0
    }
  ],
  "last_updated": "2024-01-20T15:30:00Z"
}`}
                      language="json"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'webhooks',
          title: 'Webhooks',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Webhooks</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Webhooks allow you to receive real-time notifications about events in your CipherLuma account. 
                  Set up webhook endpoints to get notified when transfers complete, fail, or change status.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Webhook className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-300 font-semibold">Webhook Events</span>
                </div>
                <ul className="text-blue-200 text-sm space-y-1 ml-4">
                  <li>• <code>transfer.completed</code> - Transfer successfully completed</li>
                  <li>• <code>transfer.failed</code> - Transfer failed</li>
                  <li>• <code>transfer.pending</code> - Transfer is pending</li>
                  <li>• <code>balance.updated</code> - Account balance changed</li>
                </ul>
              </div>

              <div className="space-y-8">
                {/* Create Webhook */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded font-medium">POST</span>
                    <code className="text-blue-300 font-mono">/v1/webhooks</code>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">Create Webhook</h4>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Request Body</h5>
                      <CodeBlock
                        id="webhook-create"
                        code={`{
  "url": "https://your-app.com/webhooks/cipherluma",
  "events": [
    "transfer.completed",
    "transfer.failed"
  ],
  "description": "Production webhook endpoint"
}`}
                        language="json"
                      />
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Response</h5>
                      <CodeBlock
                        id="webhook-create-response"
                        code={`{
  "webhook_id": "wh_1234567890abcdef",
  "url": "https://your-app.com/webhooks/cipherluma",
  "events": [
    "transfer.completed",
    "transfer.failed"
  ],
  "status": "active",
  "secret": "whsec_1234567890abcdef",
  "created_at": "2024-01-20T15:30:00Z"
}`}
                        language="json"
                      />
                    </div>
                  </div>
                </div>

                {/* Webhook Payload Example */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <h4 className="text-lg font-semibold text-white mb-3">Webhook Payload Example</h4>
                  <p className="text-blue-100 mb-4">
                    When an event occurs, CipherLuma will send a POST request to your webhook URL:
                  </p>

                  <CodeBlock
                    id="webhook-payload"
                    code={`{
  "event": "transfer.completed",
  "data": {
    "transaction_id": "txn_1234567890abcdef",
    "status": "completed",
    "amount": 100.00,
    "currency": "USD",
    "recipient": "recipient@example.com",
    "completed_at": "2024-01-20T15:35:00Z"
  },
  "timestamp": "2024-01-20T15:35:01Z",
  "webhook_id": "wh_1234567890abcdef"
}`}
                    language="json"
                  />
                </div>

                {/* Webhook Security */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <h4 className="text-lg font-semibold text-white mb-3">Webhook Security</h4>
                  <p className="text-blue-100 mb-4">
                    Verify webhook signatures to ensure requests are from CipherLuma:
                  </p>

                  <CodeBlock
                    id="webhook-verify"
                    code={`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Usage
const isValid = verifyWebhookSignature(
  req.body,
  req.headers['x-cipherluma-signature'],
  process.env.WEBHOOK_SECRET
);`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'sdks',
      title: 'SDKs & Libraries',
      icon: Download,
      color: 'from-purple-500 to-pink-500',
      subsections: [
        {
          id: 'nodejs',
          title: 'Node.js SDK',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Node.js SDK</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  The official CipherLuma Node.js SDK makes it easy to integrate our payment API into your Node.js applications.
                </p>
              </div>

              <div className="space-y-6">
                {/* Installation */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Installation</h4>
                  <CodeBlock
                    id="nodejs-install"
                    code={`npm install cipherluma-node`}
                    language="bash"
                  />
                </div>

                {/* Basic Usage */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Basic Usage</h4>
                  <CodeBlock
                    id="nodejs-basic"
                    code={`const CipherLuma = require('cipherluma-node');

// Initialize with your API key
const cipherluma = new CipherLuma('cl_live_sk_your_api_key_here');

// Send a transfer
async function sendMoney() {
  try {
    const transfer = await cipherluma.transfers.create({
      to: 'recipient@example.com',
      amount: 100.00,
      currency: 'USD',
      type: 'bank_transfer',
      description: 'Payment for services'
    });
    
    console.log('Transfer created:', transfer.transaction_id);
    return transfer;
  } catch (error) {
    console.error('Transfer failed:', error.message);
  }
}

// Get account balance
async function getBalance() {
  try {
    const balance = await cipherluma.balance.retrieve();
    console.log('Account balances:', balance.balances);
    return balance;
  } catch (error) {
    console.error('Failed to get balance:', error.message);
  }
}`}
                    language="javascript"
                  />
                </div>

                {/* Advanced Features */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Advanced Features</h4>
                  <CodeBlock
                    id="nodejs-advanced"
                    code={`// Set up webhooks
async function createWebhook() {
  const webhook = await cipherluma.webhooks.create({
    url: 'https://your-app.com/webhooks/cipherluma',
    events: ['transfer.completed', 'transfer.failed']
  });
  
  return webhook;
}

// List transactions with pagination
async function getTransactions(page = 1, limit = 10) {
  const transactions = await cipherluma.transactions.list({
    page,
    limit,
    status: 'completed'
  });
  
  return transactions;
}

// Get exchange rates
async function getExchangeRates() {
  const rates = await cipherluma.exchangeRates.retrieve();
  return rates;
}`}
                    language="javascript"
                  />
                </div>

                {/* Error Handling */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Error Handling</h4>
                  <CodeBlock
                    id="nodejs-errors"
                    code={`const { CipherLumaError, AuthenticationError, RateLimitError } = require('cipherluma-node');

try {
  const transfer = await cipherluma.transfers.create({
    to: 'recipient@example.com',
    amount: 100.00,
    currency: 'USD',
    type: 'bank_transfer'
  });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded');
  } else if (error instanceof CipherLumaError) {
    console.error('CipherLuma API error:', error.message);
  } else {
    console.error('Unexpected error:', error.message);
  }
}`}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'python',
          title: 'Python SDK',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Python SDK</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  The official CipherLuma Python SDK provides a Pythonic way to interact with our payment API.
                </p>
              </div>

              <div className="space-y-6">
                {/* Installation */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Installation</h4>
                  <CodeBlock
                    id="python-install"
                    code={`pip install cipherluma-python`}
                    language="bash"
                  />
                </div>

                {/* Basic Usage */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Basic Usage</h4>
                  <CodeBlock
                    id="python-basic"
                    code={`import cipherluma

# Initialize with your API key
cipherluma.api_key = "cl_live_sk_your_api_key_here"

# Send a transfer
def send_money():
    try:
        transfer = cipherluma.Transfer.create(
            to="recipient@example.com",
            amount=100.00,
            currency="USD",
            type="bank_transfer",
            description="Payment for services"
        )
        
        print(f"Transfer created: {transfer.transaction_id}")
        return transfer
    except cipherluma.error.CipherLumaError as e:
        print(f"Transfer failed: {e}")

# Get account balance
def get_balance():
    try:
        balance = cipherluma.Balance.retrieve()
        print(f"Account balances: {balance.balances}")
        return balance
    except cipherluma.error.CipherLumaError as e:
        print(f"Failed to get balance: {e}")`}
                    language="python"
                  />
                </div>

                {/* Django Integration */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Django Integration</h4>
                  <CodeBlock
                    id="python-django"
                    code={`# settings.py
CIPHERLUMA_API_KEY = 'cl_live_sk_your_api_key_here'

# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import cipherluma
import json

cipherluma.api_key = settings.CIPHERLUMA_API_KEY

@csrf_exempt
def create_transfer(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        try:
            transfer = cipherluma.Transfer.create(
                to=data['recipient'],
                amount=data['amount'],
                currency=data['currency'],
                type=data['type']
            )
            
            return JsonResponse({
                'success': True,
                'transaction_id': transfer.transaction_id
            })
        except cipherluma.error.CipherLumaError as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)`}
                    language="python"
                  />
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'php',
          title: 'PHP SDK',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">PHP SDK</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  The official CipherLuma PHP SDK makes it simple to integrate payments into your PHP applications.
                </p>
              </div>

              <div className="space-y-6">
                {/* Installation */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Installation</h4>
                  <CodeBlock
                    id="php-install"
                    code={`composer require cipherluma/php-sdk`}
                    language="bash"
                  />
                </div>

                {/* Basic Usage */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Basic Usage</h4>
                  <CodeBlock
                    id="php-basic"
                    code={`<?php
require_once 'vendor/autoload.php';

use CipherLuma\\CipherLuma;
use CipherLuma\\Exception\\CipherLumaException;

// Initialize with your API key
CipherLuma::setApiKey('cl_live_sk_your_api_key_here');

// Send a transfer
function sendMoney() {
    try {
        $transfer = \\CipherLuma\\Transfer::create([
            'to' => 'recipient@example.com',
            'amount' => 100.00,
            'currency' => 'USD',
            'type' => 'bank_transfer',
            'description' => 'Payment for services'
        ]);
        
        echo "Transfer created: " . $transfer->transaction_id;
        return $transfer;
    } catch (CipherLumaException $e) {
        echo "Transfer failed: " . $e->getMessage();
    }
}

// Get account balance
function getBalance() {
    try {
        $balance = \\CipherLuma\\Balance::retrieve();
        echo "Account balances: " . json_encode($balance->balances);
        return $balance;
    } catch (CipherLumaException $e) {
        echo "Failed to get balance: " . $e->getMessage();
    }
}
?>`}
                    language="php"
                  />
                </div>

                {/* Laravel Integration */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Laravel Integration</h4>
                  <CodeBlock
                    id="php-laravel"
                    code={`// config/services.php
'cipherluma' => [
    'api_key' => env('CIPHERLUMA_API_KEY'),
],

// app/Http/Controllers/PaymentController.php
<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use CipherLuma\\CipherLuma;
use CipherLuma\\Exception\\CipherLumaException;

class PaymentController extends Controller
{
    public function __construct()
    {
        CipherLuma::setApiKey(config('services.cipherluma.api_key'));
    }
    
    public function createTransfer(Request $request)
    {
        $request->validate([
            'recipient' => 'required|email',
            'amount' => 'required|numeric|min:1',
            'currency' => 'required|string|size:3',
            'type' => 'required|string'
        ]);
        
        try {
            $transfer = \\CipherLuma\\Transfer::create([
                'to' => $request->recipient,
                'amount' => $request->amount,
                'currency' => $request->currency,
                'type' => $request->type
            ]);
            
            return response()->json([
                'success' => true,
                'transaction_id' => $transfer->transaction_id
            ]);
        } catch (CipherLumaException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
?>`}
                    language="php"
                  />
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'guides',
      title: 'Guides & Tutorials',
      icon: Book,
      color: 'from-orange-500 to-red-500',
      subsections: [
        {
          id: 'integration-guide',
          title: 'Integration Guide',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Complete Integration Guide</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  This comprehensive guide will walk you through integrating CipherLuma into your application, 
                  from initial setup to production deployment.
                </p>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Account Setup</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Start by creating your CipherLuma account and completing the verification process.
                    </p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
                      <h5 className="text-white font-medium mb-2">Required Steps:</h5>
                      <ul className="text-blue-200 text-sm space-y-1 ml-4">
                        <li>• Sign up at cipherluma.com</li>
                        <li>• Verify your email address</li>
                        <li>• Complete KYC verification</li>
                        <li>• Add your business information</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">API Key Generation</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Generate your API keys for both test and live environments.
                    </p>
                    
                    <CodeBlock
                      id="env-setup"
                      code={`# .env file
CIPHERLUMA_TEST_KEY=cl_test_sk_1234567890abcdef
CIPHERLUMA_LIVE_KEY=cl_live_sk_abcdef1234567890
CIPHERLUMA_WEBHOOK_SECRET=whsec_1234567890abcdef`}
                      language="bash"
                    />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">First Integration</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Start with a simple balance check to test your integration.
                    </p>
                    
                    <CodeBlock
                      id="first-integration"
                      code={`// Test your API connection
const cipherluma = require('cipherluma-node');
cipherluma.setApiKey(process.env.CIPHERLUMA_TEST_KEY);

async function testConnection() {
  try {
    const balance = await cipherluma.balance.retrieve();
    console.log('✅ Connection successful!');
    console.log('Balances:', balance.balances);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();`}
                      language="javascript"
                    />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Webhook Setup</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Set up webhooks to receive real-time notifications about transfer status changes.
                    </p>
                    
                    <CodeBlock
                      id="webhook-setup"
                      code={`// Express.js webhook endpoint
app.post('/webhooks/cipherluma', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['x-cipherluma-signature'];
  const payload = req.body;
  
  try {
    // Verify webhook signature
    const isValid = cipherluma.webhooks.verifySignature(
      payload,
      sig,
      process.env.CIPHERLUMA_WEBHOOK_SECRET
    );
    
    if (!isValid) {
      return res.status(400).send('Invalid signature');
    }
    
    const event = JSON.parse(payload);
    
    // Handle different event types
    switch (event.type) {
      case 'transfer.completed':
        console.log('Transfer completed:', event.data.transaction_id);
        // Update your database, send notifications, etc.
        break;
      case 'transfer.failed':
        console.log('Transfer failed:', event.data.transaction_id);
        // Handle failed transfer
        break;
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send('Webhook error');
  }
});`}
                      language="javascript"
                    />
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <span className="text-white font-bold">5</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Production Deployment</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Deploy to production with proper security and monitoring.
                    </p>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                      <h5 className="text-green-300 font-medium mb-2">Production Checklist:</h5>
                      <ul className="text-green-200 text-sm space-y-1 ml-4">
                        <li>• Switch to live API keys</li>
                        <li>• Enable HTTPS for webhook endpoints</li>
                        <li>• Implement proper error handling</li>
                        <li>• Set up monitoring and logging</li>
                        <li>• Test with small amounts first</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'best-practices',
          title: 'Best Practices',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Best Practices</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Follow these best practices to ensure secure, reliable, and efficient integration with CipherLuma.
                </p>
              </div>

              <div className="space-y-8">
                {/* Security */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-2">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Security</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <ul className="text-blue-100 space-y-2 ml-4">
                      <li>• <strong>Never expose API keys:</strong> Keep them in environment variables or secure vaults</li>
                      <li>• <strong>Use HTTPS:</strong> Always use HTTPS for API calls and webhook endpoints</li>
                      <li>• <strong>Verify webhooks:</strong> Always verify webhook signatures to prevent spoofing</li>
                      <li>• <strong>Rotate keys regularly:</strong> Change API keys periodically for security</li>
                      <li>• <strong>Monitor usage:</strong> Set up alerts for unusual API activity</li>
                    </ul>
                    
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
                      <h5 className="text-red-300 font-medium mb-2">⚠️ Security Warning</h5>
                      <p className="text-red-200 text-sm">
                        Never commit API keys to version control or include them in client-side code.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error Handling */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-2">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Error Handling</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Implement robust error handling to gracefully handle API failures and network issues.
                    </p>
                    
                    <CodeBlock
                      id="error-handling-example"
                      code={`async function createTransferWithRetry(transferData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const transfer = await cipherluma.transfers.create(transferData);
      return transfer;
    } catch (error) {
      console.log(\`Attempt \${attempt} failed:\`, error.message);
      
      // Don't retry on client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}`}
                      language="javascript"
                    />
                  </div>
                </div>

                {/* Rate Limiting */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-2">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Rate Limiting</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Respect rate limits and implement proper backoff strategies.
                    </p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
                      <h5 className="text-blue-300 font-medium mb-2">Rate Limits by Plan:</h5>
                      <ul className="text-blue-200 text-sm space-y-1 ml-4">
                        <li>• <strong>Starter:</strong> 100 requests/minute</li>
                        <li>• <strong>Business:</strong> 500 requests/minute</li>
                        <li>• <strong>Enterprise:</strong> 2000 requests/minute</li>
                      </ul>
                    </div>
                    
                    <CodeBlock
                      id="rate-limiting-example"
                      code={`// Simple rate limiting with queue
class RateLimitedClient {
  constructor(apiKey, requestsPerMinute = 100) {
    this.client = new CipherLuma(apiKey);
    this.queue = [];
    this.requestsPerMinute = requestsPerMinute;
    this.requestCount = 0;
    this.resetTime = Date.now() + 60000;
  }
  
  async makeRequest(method, ...args) {
    return new Promise((resolve, reject) => {
      this.queue.push({ method, args, resolve, reject });
      this.processQueue();
    });
  }
  
  processQueue() {
    if (this.queue.length === 0) return;
    
    const now = Date.now();
    if (now >= this.resetTime) {
      this.requestCount = 0;
      this.resetTime = now + 60000;
    }
    
    if (this.requestCount < this.requestsPerMinute) {
      const { method, args, resolve, reject } = this.queue.shift();
      this.requestCount++;
      
      this.client[method](...args)
        .then(resolve)
        .catch(reject);
      
      // Process next request
      setTimeout(() => this.processQueue(), 100);
    } else {
      // Wait until rate limit resets
      setTimeout(() => this.processQueue(), this.resetTime - now);
    }
  }
}`}
                      language="javascript"
                    />
                  </div>
                </div>

                {/* Testing */}
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Testing</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-blue-100">
                      Thoroughly test your integration using our test environment.
                    </p>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                      <h5 className="text-green-300 font-medium mb-2">Testing Checklist:</h5>
                      <ul className="text-green-200 text-sm space-y-1 ml-4">
                        <li>• Test successful transfers</li>
                        <li>• Test failed transfers</li>
                        <li>• Test webhook delivery</li>
                        <li>• Test error scenarios</li>
                        <li>• Test rate limiting</li>
                        <li>• Test with different currencies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'support',
      title: 'Support & Resources',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      subsections: [
        {
          id: 'contact',
          title: 'Contact Support',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Contact Support</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Our support team is here to help you with any questions or issues you may have.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Developer Support</h4>
                  </div>
                  <div className="space-y-3 text-blue-100">
                    <p><strong>Email:</strong> developers@cipherluma.com</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                    <p><strong>Best For:</strong> Technical questions, API issues, integration help</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Security Issues</h4>
                  </div>
                  <div className="space-y-3 text-blue-100">
                    <p><strong>Email:</strong> security@cipherluma.com</p>
                    <p><strong>Response Time:</strong> Within 4 hours</p>
                    <p><strong>Best For:</strong> Security vulnerabilities, suspicious activity</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Business Support</h4>
                  </div>
                  <div className="space-y-3 text-blue-100">
                    <p><strong>Email:</strong> business@cipherluma.com</p>
                    <p><strong>Response Time:</strong> Within 12 hours</p>
                    <p><strong>Best For:</strong> Account issues, billing, partnerships</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-3">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Emergency Support</h4>
                  </div>
                  <div className="space-y-3 text-blue-100">
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Available:</strong> 24/7</p>
                    <p><strong>Best For:</strong> Critical issues, fraud alerts</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30 p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Community Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="#" className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300">
                    <Book className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Developer Forum</p>
                      <p className="text-blue-200 text-sm">Community discussions</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-300 ml-auto" />
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300">
                    <Code className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">GitHub</p>
                      <p className="text-blue-200 text-sm">SDKs and examples</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-300 ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'status',
          title: 'System Status',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">System Status</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Monitor the real-time status of CipherLuma services and check for any ongoing issues.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <h4 className="text-lg font-semibold text-white">All Systems Operational</h4>
                </div>
                <p className="text-green-200">All CipherLuma services are running normally.</p>
              </div>

              <div className="space-y-4">
                {[
                  { service: 'API Gateway', status: 'operational', uptime: '99.99%' },
                  { service: 'Transfer Processing', status: 'operational', uptime: '99.98%' },
                  { service: 'Webhook Delivery', status: 'operational', uptime: '99.97%' },
                  { service: 'Dashboard', status: 'operational', uptime: '99.99%' },
                  { service: 'Authentication', status: 'operational', uptime: '100%' }
                ].map((service) => (
                  <div key={service.service} className="bg-white/5 rounded-lg p-4 border border-blue-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="text-white font-medium">{service.service}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-green-400 text-sm">Operational</span>
                        <span className="text-blue-200 text-sm">{service.uptime} uptime</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-blue-500/30">
                <h4 className="text-lg font-semibold text-white mb-4">Recent Incidents</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Resolved: API Latency Issues</p>
                      <p className="text-blue-200 text-sm">January 18, 2024 - Increased response times resolved</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Resolved: Webhook Delivery Delays</p>
                      <p className="text-blue-200 text-sm">January 15, 2024 - Webhook processing delays resolved</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a 
                  href="https://status.cipherluma.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  <span>View Full Status Page</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  const filteredSections = docSections.filter(section =>
    searchQuery === '' ||
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.subsections.some(sub => 
      sub.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentSection = docSections.find(s => s.id === activeSection);
  const currentSubsection = currentSection?.subsections.find(s => s.id === activeSubsection);

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
                <div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">CipherLuma</span>
                  <div className="text-blue-300 text-sm">Documentation</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-white mb-4">Documentation</h3>
              
              {/* Mobile Search */}
              <div className="lg:hidden mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {filteredSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => {
                        setActiveSection(section.id);
                        setActiveSubsection(section.subsections[0].id);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 text-left ${
                        activeSection === section.id
                          ? 'bg-blue-500/30 text-white border border-blue-400/50'
                          : 'text-blue-200 hover:text-white hover:bg-blue-500/20'
                      }`}
                    >
                      <div className={`bg-gradient-to-r ${section.color} rounded p-1`}>
                        <section.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{section.title}</span>
                    </button>
                    
                    {activeSection === section.id && (
                      <div className="ml-6 mt-2 space-y-1">
                        {section.subsections.map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => setActiveSubsection(subsection.id)}
                            className={`w-full text-left px-3 py-1 rounded text-sm transition-all duration-300 ${
                              activeSubsection === subsection.id
                                ? 'text-white bg-blue-500/20'
                                : 'text-blue-300 hover:text-white hover:bg-blue-500/10'
                            }`}
                          >
                            {subsection.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
              {currentSubsection ? (
                <div className="animate-fade-in">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`bg-gradient-to-r ${currentSection?.color} rounded-lg p-2`}>
                      {currentSection && <currentSection.icon className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">{currentSubsection.title}</h1>
                      <p className="text-blue-300 text-sm">{currentSection?.title}</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    {currentSubsection.content}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Book className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Welcome to CipherLuma Documentation</h3>
                  <p className="text-blue-200">
                    Select a section from the sidebar to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;