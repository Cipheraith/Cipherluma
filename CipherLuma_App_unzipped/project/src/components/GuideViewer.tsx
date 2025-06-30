import React, { useState } from 'react';
import { ArrowLeft, Book, CheckCircle, AlertCircle, Info, Code, Globe, Shield, CreditCard, Users, Zap } from 'lucide-react';

interface GuideViewerProps {
  onBack: () => void;
  guideType?: string;
}

interface GuideSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'code' | 'warning' | 'info' | 'success';
  codeLanguage?: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: GuideSection[];
}

const GuideViewer: React.FC<GuideViewerProps> = ({ onBack, guideType }) => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const guides: Guide[] = [
    {
      id: 'getting-started',
      title: 'Getting Started Guide',
      description: 'Complete walkthrough for new users',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      estimatedTime: '15 minutes',
      difficulty: 'Beginner',
      sections: [
        {
          id: 'intro',
          title: 'Welcome to CipherLuma',
          content: `Welcome to CipherLuma, your gateway to seamless global payments. This guide will walk you through everything you need to know to get started with our platform.

CipherLuma enables you to:
• Send money instantly across borders
• Accept payments from customers worldwide
• Integrate payments into your applications via API
• Manage multiple currencies in one account
• Access competitive exchange rates`,
          type: 'text'
        },
        {
          id: 'account-setup',
          title: 'Setting Up Your Account',
          content: `Follow these steps to create and verify your CipherLuma account:

1. **Sign Up**: Click "Get Started" and fill in your basic information
2. **Email Verification**: Check your email and click the verification link
3. **Profile Completion**: Add your personal details and contact information
4. **Identity Verification**: Upload required documents for KYC compliance

Required Documents:
• Government-issued photo ID (passport, driver's license, or national ID)
• Proof of address (utility bill, bank statement, or lease agreement from last 3 months)
• Selfie holding your ID (for enhanced security)`,
          type: 'info'
        },
        {
          id: 'first-transfer',
          title: 'Making Your First Transfer',
          content: `Ready to send your first payment? Here's how:

1. **Navigate to Send Money**: Click the "Send" button in your dashboard
2. **Enter Recipient Details**: Add the recipient's email or phone number
3. **Choose Amount and Currency**: Select how much to send and in which currency
4. **Select Payment Method**: Choose from bank transfer, mobile money, or crypto
5. **Review and Confirm**: Double-check all details before confirming
6. **Track Your Transfer**: Monitor the status in your transaction history

💡 **Pro Tip**: Save frequently used recipients for faster future transfers!`,
          type: 'success'
        },
        {
          id: 'security-setup',
          title: 'Securing Your Account',
          content: `Protect your account with these essential security measures:

**Enable Two-Factor Authentication (2FA)**:
1. Go to Account Settings > Security
2. Click "Enable 2FA"
3. Scan the QR code with your authenticator app
4. Enter the verification code to confirm

**Additional Security Tips**:
• Use a strong, unique password
• Never share your login credentials
• Log out from shared devices
• Monitor your account regularly for suspicious activity
• Set up email notifications for account changes`,
          type: 'warning'
        }
      ]
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'Integrate CipherLuma into your application',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      estimatedTime: '30 minutes',
      difficulty: 'Intermediate',
      sections: [
        {
          id: 'api-overview',
          title: 'API Overview',
          content: `The CipherLuma API allows you to integrate payment functionality directly into your applications. Our RESTful API supports:

• Payment processing and transfers
• Account balance management
• Transaction history retrieval
• Webhook notifications
• Exchange rate queries
• Multi-currency support

**Base URL**: https://api.cipherluma.com
**Authentication**: Bearer token (API key)
**Format**: JSON requests and responses`,
          type: 'text'
        },
        {
          id: 'authentication',
          title: 'Authentication',
          content: `All API requests require authentication using your API key. Include it in the Authorization header:`,
          type: 'text'
        },
        {
          id: 'auth-code',
          title: 'Authentication Example',
          content: `curl -X GET "https://api.cipherluma.com/balance" \\
  -H "Authorization: Bearer cl_live_your_api_key_here" \\
  -H "Content-Type: application/json"`,
          type: 'code',
          codeLanguage: 'bash'
        },
        {
          id: 'first-request',
          title: 'Making Your First API Request',
          content: `Let's start with a simple request to get your account balance:`,
          type: 'text'
        },
        {
          id: 'balance-code',
          title: 'Get Balance Example',
          content: `// JavaScript/Node.js example
const response = await fetch('https://api.cipherluma.com/balance', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer cl_live_your_api_key_here',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);

// Response
{
  "balances": [
    {
      "currency": "USD",
      "available": 1250.75,
      "pending": 0
    },
    {
      "currency": "EUR",
      "available": 890.50,
      "pending": 0
    }
  ]
}`,
          type: 'code',
          codeLanguage: 'javascript'
        },
        {
          id: 'webhooks',
          title: 'Setting Up Webhooks',
          content: `Webhooks allow you to receive real-time notifications about transaction events. Here's how to set them up:

1. **Create a webhook endpoint** in your application
2. **Register the webhook** with CipherLuma
3. **Verify webhook signatures** for security
4. **Handle webhook events** in your code

Supported events:
• transaction.completed
• transaction.failed
• transaction.pending
• account.updated`,
          type: 'info'
        },
        {
          id: 'webhook-code',
          title: 'Webhook Setup Example',
          content: `// Create a webhook
const webhook = await fetch('https://api.cipherluma.com/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer cl_live_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://your-app.com/webhook',
    events: ['transaction.completed', 'transaction.failed']
  })
});

// Webhook handler (Express.js example)
app.post('/webhook', (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'transaction.completed':
      console.log('Transaction completed:', event.data);
      break;
    case 'transaction.failed':
      console.log('Transaction failed:', event.data);
      break;
  }
  
  res.status(200).send('OK');
});`,
          type: 'code',
          codeLanguage: 'javascript'
        }
      ]
    },
    {
      id: 'security-practices',
      title: 'Security Best Practices',
      description: 'Keep your account and funds secure',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      estimatedTime: '20 minutes',
      difficulty: 'Beginner',
      sections: [
        {
          id: 'account-security',
          title: 'Account Security Fundamentals',
          content: `Protecting your CipherLuma account is crucial for safeguarding your funds and personal information. Follow these essential security practices:

**Strong Password Requirements**:
• Minimum 12 characters
• Mix of uppercase and lowercase letters
• Include numbers and special characters
• Avoid personal information
• Use a unique password for CipherLuma

**Password Management**:
• Use a reputable password manager
• Enable auto-generated passwords
• Never reuse passwords across platforms
• Update passwords regularly`,
          type: 'warning'
        },
        {
          id: 'two-factor-auth',
          title: 'Two-Factor Authentication (2FA)',
          content: `2FA adds an extra layer of security to your account. We strongly recommend enabling it:

**Setting Up 2FA**:
1. Download an authenticator app (Google Authenticator, Authy, etc.)
2. Go to Account Settings > Security
3. Click "Enable Two-Factor Authentication"
4. Scan the QR code with your authenticator app
5. Enter the 6-digit code to verify setup
6. Save your backup codes in a secure location

**Backup Codes**:
• Store backup codes securely offline
• Use them if you lose access to your authenticator
• Generate new codes after using them`,
          type: 'success'
        },
        {
          id: 'api-security',
          title: 'API Key Security',
          content: `If you're using our API, proper key management is essential:

**API Key Best Practices**:
• Never expose API keys in client-side code
• Use environment variables for key storage
• Rotate keys regularly
• Use test keys for development
• Monitor API usage for anomalies

**Key Storage**:
• Store keys in secure environment variables
• Use secrets management services in production
• Never commit keys to version control
• Restrict key permissions to minimum required`,
          type: 'warning'
        },
        {
          id: 'fraud-prevention',
          title: 'Fraud Prevention',
          content: `Stay vigilant against common fraud attempts:

**Phishing Protection**:
• Always check the URL (https://cipherluma.com)
• Never click suspicious email links
• Type our URL directly into your browser
• Look for the secure lock icon

**Social Engineering Awareness**:
• We'll never ask for passwords via email/phone
• Verify requests through official channels
• Be suspicious of urgent payment requests
• Double-check recipient details before sending

**Red Flags**:
• Unsolicited payment requests
• Pressure to act quickly
• Requests for personal information
• Suspicious sender addresses`,
          type: 'info'
        }
      ]
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      description: 'Understanding different payment options',
      icon: CreditCard,
      color: 'from-orange-500 to-red-500',
      estimatedTime: '25 minutes',
      difficulty: 'Beginner',
      sections: [
        {
          id: 'overview',
          title: 'Payment Methods Overview',
          content: `CipherLuma supports multiple payment methods to give you flexibility in how you send and receive money:

**Available Methods**:
• Bank Transfers (ACH, Wire, SEPA)
• Mobile Money (M-Pesa, Airtel Money, MTN)
• Cryptocurrency (Bitcoin, Ethereum)
• Debit/Credit Cards
• Digital Wallets

Each method has different processing times, fees, and availability depending on your location and destination.`,
          type: 'text'
        },
        {
          id: 'bank-transfers',
          title: 'Bank Transfers',
          content: `Bank transfers are the most common method for larger amounts:

**Domestic Transfers**:
• Processing time: Same day to 1 business day
• Fees: 0.5% + $2 fixed fee
• Limits: Up to $50,000 per transaction

**International Wire Transfers**:
• Processing time: 1-3 business days
• Fees: 1% + $15 fixed fee
• Limits: Up to $100,000 per transaction

**SEPA Transfers (Europe)**:
• Processing time: Same day
• Fees: 0.3% + €1 fixed fee
• Limits: Up to €50,000 per transaction

**Required Information**:
• Recipient's full name and address
• Bank name and address
• Account number or IBAN
• SWIFT/BIC code for international transfers`,
          type: 'info'
        },
        {
          id: 'mobile-money',
          title: 'Mobile Money',
          content: `Mobile money is popular in Africa and offers instant transfers:

**Supported Networks**:
• M-Pesa (Kenya, Tanzania, Uganda)
• Airtel Money (Multiple countries)
• MTN Mobile Money (Ghana, Uganda, Rwanda)
• Orange Money (West Africa)

**Benefits**:
• Instant processing
• No bank account required
• Wide acceptance
• Low fees for recipients

**Fees and Limits**:
• Processing time: Instant
• Fees: 1% + $1 fixed fee
• Limits: Varies by network ($500-$2,000)

**Required Information**:
• Recipient's mobile number
• Full name as registered
• Network provider`,
          type: 'success'
        },
        {
          id: 'cryptocurrency',
          title: 'Cryptocurrency Payments',
          content: `Send and receive payments using popular cryptocurrencies:

**Supported Cryptocurrencies**:
• Bitcoin (BTC)
• Ethereum (ETH)
• USD Coin (USDC)
• Tether (USDT)

**Advantages**:
• Fast processing (10-30 minutes)
• Low fees (0.1% + network fees)
• Global availability
• No intermediary banks

**Considerations**:
• Price volatility
• Network congestion may affect speed
• Irreversible transactions
• Technical knowledge helpful

**Required Information**:
• Recipient's wallet address
• Correct network selection
• Sufficient network fees`,
          type: 'warning'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      icon: AlertCircle,
      color: 'from-yellow-500 to-orange-500',
      estimatedTime: '15 minutes',
      difficulty: 'Beginner',
      sections: [
        {
          id: 'common-issues',
          title: 'Common Issues',
          content: `Here are the most frequently encountered issues and their solutions:

**Login Problems**:
• Forgot password: Use "Reset Password" link
• Account locked: Contact support after multiple failed attempts
• 2FA issues: Use backup codes or contact support

**Transaction Issues**:
• Failed transfers: Check recipient details and account balance
• Delayed processing: Verify during business hours and holidays
• Incorrect amount: Contact support immediately

**Verification Problems**:
• Document rejection: Ensure clear, recent documents
• KYC delays: Allow 1-3 business days for review
• Address verification: Use documents from last 3 months`,
          type: 'info'
        },
        {
          id: 'failed-transactions',
          title: 'Failed Transaction Resolution',
          content: `When a transaction fails, follow these steps:

**Immediate Actions**:
1. Check your account balance
2. Verify recipient information
3. Confirm payment method is valid
4. Check for any account restrictions

**Common Failure Reasons**:
• Insufficient funds (including fees)
• Incorrect recipient details
• Blocked or restricted account
• Network or system maintenance
• Compliance or security flags

**Resolution Steps**:
1. Review the error message carefully
2. Correct any identified issues
3. Retry the transaction
4. Contact support if problem persists

**Prevention Tips**:
• Double-check all details before confirming
• Maintain sufficient balance for fees
• Keep account information updated
• Monitor account status regularly`,
          type: 'warning'
        },
        {
          id: 'account-restrictions',
          title: 'Account Restrictions',
          content: `Understanding why accounts may be restricted and how to resolve:

**Common Restriction Reasons**:
• Incomplete KYC verification
• Suspicious activity detected
• Compliance review required
• Outstanding documentation needed

**Types of Restrictions**:
• Send limits reduced
• Receive functionality disabled
• Account temporarily suspended
• Additional verification required

**Resolution Process**:
1. Check your email for notifications
2. Review account status in dashboard
3. Upload any requested documents
4. Respond to compliance requests
5. Contact support for clarification

**Prevention**:
• Complete full verification early
• Keep documents current
• Maintain normal usage patterns
• Respond promptly to requests`,
          type: 'warning'
        },
        {
          id: 'contact-support',
          title: 'When to Contact Support',
          content: `Know when and how to reach our support team:

**Contact Support For**:
• Account access issues
• Suspicious account activity
• Transaction disputes
• Technical problems
• Compliance questions

**Before Contacting Support**:
• Check this troubleshooting guide
• Review our FAQ section
• Gather relevant transaction IDs
• Note error messages exactly
• Have account information ready

**Support Channels**:
• Live chat: Available 24/7 in your dashboard
• Email: support@cipherluma.com
• Phone: +260976036353 (24/7)
• Emergency: For urgent security issues

**Response Times**:
• Live chat: Immediate
• Email: Within 24 hours
• Phone: Immediate
• Complex issues: 1-3 business days`,
          type: 'success'
        }
      ]
    },
    {
      id: 'business-accounts',
      title: 'Business Accounts',
      description: 'Features for business users',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      estimatedTime: '35 minutes',
      difficulty: 'Intermediate',
      sections: [
        {
          id: 'business-overview',
          title: 'Business Account Benefits',
          content: `CipherLuma Business accounts offer enhanced features for companies:

**Key Benefits**:
• Higher transaction limits
• Bulk payment processing
• Advanced reporting and analytics
• API access with higher rate limits
• Dedicated account management
• Multi-user access controls
• Custom integration support

**Account Types**:
• **Starter**: Small businesses, $10K monthly volume
• **Business**: Growing companies, $100K monthly volume
• **Enterprise**: Large corporations, unlimited volume

**Pricing**:
• Competitive transaction fees
• Volume-based discounts
• No monthly account fees
• Custom pricing for enterprise`,
          type: 'text'
        },
        {
          id: 'business-verification',
          title: 'Business Verification Process',
          content: `Business accounts require additional verification:

**Required Documents**:
• Certificate of incorporation
• Business registration documents
• Tax identification number
• Proof of business address
• Director/owner identification
• Bank statements (last 3 months)

**Verification Steps**:
1. Submit business registration
2. Upload required documents
3. Verify business address
4. Complete director KYC
5. Provide business bank details
6. Wait for approval (2-5 business days)

**Enhanced Due Diligence**:
Some businesses may require additional verification:
• Source of funds documentation
• Business plan or description
• Customer references
• Regulatory licenses (if applicable)`,
          type: 'info'
        },
        {
          id: 'bulk-transfers',
          title: 'Bulk Transfer Processing',
          content: `Process multiple payments efficiently:

**Bulk Transfer Features**:
• Upload CSV files with recipient details
• Process up to 1,000 transfers at once
• Real-time validation and error checking
• Batch status tracking
• Detailed reporting

**CSV Format Requirements**:
• Recipient email or phone
• Amount and currency
• Payment method
• Reference/description
• Recipient name

**Processing Steps**:
1. Download our CSV template
2. Fill in recipient details
3. Upload file to dashboard
4. Review and validate entries
5. Approve and process batch
6. Monitor transfer status

**Best Practices**:
• Validate recipient details beforehand
• Use clear reference descriptions
• Process during business hours
• Monitor for failed transfers`,
          type: 'success'
        },
        {
          id: 'api-business',
          title: 'Business API Integration',
          content: `Advanced API features for business accounts:

**Enhanced API Features**:
• Higher rate limits (up to 10,000 requests/minute)
• Webhook reliability guarantees
• Priority support
• Custom endpoints
• Advanced reporting APIs

**Business-Specific Endpoints**:
• Bulk transfer processing
• Account management
• User permission controls
• Advanced analytics
• Compliance reporting

**Integration Examples**:
• E-commerce payment processing
• Payroll and supplier payments
• Marketplace disbursements
• Subscription billing
• International expansion`,
          type: 'text'
        },
        {
          id: 'business-code',
          title: 'Business API Example',
          content: `// Bulk transfer example
const bulkTransfer = await fetch('https://api.cipherluma.com/bulk-transfer', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer cl_live_business_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    transfers: [
      {
        to: 'employee1@company.com',
        amount: 2500,
        currency: 'USD',
        type: 'bank_transfer',
        description: 'Salary payment - January 2024'
      },
      {
        to: 'supplier@vendor.com',
        amount: 15000,
        currency: 'USD',
        type: 'bank_transfer',
        description: 'Invoice payment - INV-2024-001'
      }
    ],
    batch_reference: 'PAYROLL-2024-01'
  })
});

const result = await bulkTransfer.json();
console.log('Batch ID:', result.batch_id);

// Monitor batch status
const status = await fetch(\`https://api.cipherluma.com/bulk-transfer/\${result.batch_id}\`, {
  headers: {
    'Authorization': 'Bearer cl_live_business_key'
  }
});`,
          type: 'code',
          codeLanguage: 'javascript'
        },
        {
          id: 'reporting',
          title: 'Business Reporting',
          content: `Comprehensive reporting for business needs:

**Available Reports**:
• Transaction summaries
• Fee analysis
• Currency exposure
• Compliance reports
• Tax documentation
• Custom date ranges

**Report Formats**:
• PDF for formal documentation
• CSV for data analysis
• Excel for advanced processing
• API for real-time data

**Automated Reporting**:
• Schedule daily, weekly, or monthly reports
• Email delivery to multiple recipients
• Custom report templates
• Integration with accounting systems

**Compliance Features**:
• AML transaction monitoring
• Sanctions screening reports
• Audit trail documentation
• Regulatory filing support`,
          type: 'info'
        }
      ]
    }
  ];

  const toggleSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const renderContent = (section: GuideSection) => {
    const lines = section.content.split('\n');
    
    return (
      <div className="space-y-4">
        {lines.map((line, index) => {
          if (line.trim() === '') return <div key={index} className="h-2" />;
          
          // Handle bullet points
          if (line.startsWith('•')) {
            return (
              <div key={index} className="flex items-start space-x-2 ml-4">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-blue-100">{line.substring(1).trim()}</span>
              </div>
            );
          }
          
          // Handle numbered lists
          if (/^\d+\./.test(line.trim())) {
            return (
              <div key={index} className="flex items-start space-x-3 ml-4">
                <span className="text-blue-400 font-semibold flex-shrink-0">{line.match(/^\d+\./)?.[0]}</span>
                <span className="text-blue-100">{line.replace(/^\d+\.\s*/, '')}</span>
              </div>
            );
          }
          
          // Handle bold text
          if (line.includes('**')) {
            const parts = line.split('**');
            return (
              <p key={index} className="text-blue-100">
                {parts.map((part, partIndex) => 
                  partIndex % 2 === 1 ? 
                    <strong key={partIndex} className="text-white font-semibold">{part}</strong> : 
                    part
                )}
              </p>
            );
          }
          
          return <p key={index} className="text-blue-100">{line}</p>;
        })}
      </div>
    );
  };

  const getContentStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-500/10 border-orange-400/30 border-l-4 border-l-orange-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-400/30 border-l-4 border-l-blue-400';
      case 'success':
        return 'bg-green-500/10 border-green-400/30 border-l-4 border-l-green-400';
      case 'code':
        return 'bg-gray-900/50 border border-gray-700';
      default:
        return 'bg-white/5 border border-blue-500/20';
    }
  };

  if (selectedGuide) {
    const completedCount = selectedGuide.sections.filter(s => completedSections.has(s.id)).length;
    const progressPercentage = (completedCount / selectedGuide.sections.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF]">
        {/* Navigation */}
        <nav className="bg-gradient-to-r from-[#0F1629] via-[#1E2A5A] to-[#1E3A8A] shadow-2xl border-b border-blue-500/30 sticky top-0 z-50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20 sm:h-24">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="flex items-center space-x-2 text-blue-200 hover:text-white transition-all duration-300 hover:scale-105 group px-3 py-2 rounded-lg hover:bg-blue-500/20"
                >
                  <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Guides</span>
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
                <Book className="h-6 w-6 text-blue-400" />
                <span className="text-white font-semibold">{selectedGuide.title}</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Guide Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Guide Header */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`bg-gradient-to-r ${selectedGuide.color} rounded-lg p-3`}>
                  <selectedGuide.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{selectedGuide.title}</h1>
                  <p className="text-blue-200 mt-2">{selectedGuide.description}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm">
                    <span className="text-blue-300">⏱️ {selectedGuide.estimatedTime}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedGuide.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                      selectedGuide.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {selectedGuide.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-200 text-sm">Progress</span>
                  <span className="text-blue-200 text-sm">{completedCount}/{selectedGuide.sections.length} sections</span>
                </div>
                <div className="w-full bg-blue-900/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Guide Sections */}
            <div className="space-y-6">
              {selectedGuide.sections.map((section, index) => (
                <div key={section.id} className={`rounded-xl shadow-xl border p-6 sm:p-8 ${getContentStyle(section.type)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-2">
                        {index + 1}. {section.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => toggleSectionComplete(section.id)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-300 ${
                        completedSections.has(section.id)
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-white/10 text-blue-200 hover:text-white hover:bg-white/15 border border-blue-500/30'
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">
                        {completedSections.has(section.id) ? 'Completed' : 'Mark Complete'}
                      </span>
                    </button>
                  </div>

                  {section.type === 'code' ? (
                    <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-300 text-sm">
                        <code>{section.content}</code>
                      </pre>
                    </div>
                  ) : (
                    renderContent(section)
                  )}
                </div>
              ))}
            </div>

            {/* Completion Message */}
            {completedCount === selectedGuide.sections.length && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30 p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Congratulations!</h3>
                <p className="text-green-200">
                  You've completed the {selectedGuide.title}. You're now ready to make the most of CipherLuma's features.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
                <span>Back to Support</span>
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
              <Book className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">Help Guides</span>
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
              Help Guides
            </h1>
            <p className="text-blue-200 mt-2">
              Step-by-step guides to help you master CipherLuma's features and capabilities.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 text-left animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`bg-gradient-to-r ${guide.color} rounded-lg p-3`}>
                    <guide.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{guide.title}</h3>
                    <p className="text-blue-200 text-sm">{guide.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-300">⏱️ {guide.estimatedTime}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      guide.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                      guide.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {guide.difficulty}
                    </span>
                  </div>
                  <div className="text-blue-200 text-sm">
                    {guide.sections.length} sections
                  </div>
                </div>
                
                <div className="w-full bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Start Guide</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideViewer;