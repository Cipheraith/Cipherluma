import React, { useState } from 'react';
import { ArrowLeft, Download, User, DollarSign, Globe, Link, Copy, Check, QrCode, Mail, MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface RequestPaymentProps {
  onBack: () => void;
}

const RequestPayment: React.FC<RequestPaymentProps> = ({ onBack }) => {
  const [step, setStep] = useState<'form' | 'generated' | 'sent'>('form');
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    description: '',
    payerEmail: '',
    payerName: '',
    dueDate: '',
    sendMethod: 'email'
  });
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'K' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' }
  ];

  const selectedCurrency = currencies.find(c => c.code === formData.currency);
  const amount = parseFloat(formData.amount) || 0;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePaymentRequest = () => {
    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const paymentLink = `https://pay.cipherluma.com/request/${requestId}`;
    
    const request = {
      id: requestId,
      amount: amount,
      currency: formData.currency,
      description: formData.description,
      payerEmail: formData.payerEmail,
      payerName: formData.payerName,
      dueDate: formData.dueDate,
      paymentLink: paymentLink,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };

    setPaymentRequest(request);
    setStep('generated');
  };

  const handleSubmit = () => {
    if (!formData.amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!formData.description) {
      alert('Please provide a description for the payment request');
      return;
    }

    generatePaymentRequest();
  };

  const copyPaymentLink = () => {
    if (paymentRequest) {
      navigator.clipboard.writeText(paymentRequest.paymentLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const sendPaymentRequest = () => {
    // Simulate sending the payment request
    setTimeout(() => {
      setStep('sent');
    }, 1000);
  };

  const renderForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Request Payment
        </h1>
        <p className="text-blue-200">Create a payment request to receive money from others</p>
      </div>

      {/* Amount and Currency */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-400" />
          <span>Payment Amount</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Amount *
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code} className="bg-gray-800">
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {amount > 0 && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
            <div className="text-center">
              <span className="text-green-200">Requesting: </span>
              <span className="text-white font-bold text-xl">
                {selectedCurrency?.symbol}{amount.toFixed(2)} {formData.currency}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-blue-200 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
          placeholder="What is this payment for? (e.g., Invoice #123, Freelance work, etc.)"
        />
      </div>

      {/* Payer Information (Optional) */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <User className="h-5 w-5 text-blue-400" />
          <span>Payer Information (Optional)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Payer Name
            </label>
            <input
              type="text"
              value={formData.payerName}
              onChange={(e) => handleInputChange('payerName', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Payer Email
            </label>
            <input
              type="email"
              value={formData.payerEmail}
              onChange={(e) => handleInputChange('payerEmail', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="john@example.com"
            />
          </div>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-blue-200 mb-2">
          Due Date (Optional)
        </label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!formData.amount || !formData.description}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Download className="h-5 w-5" />
        <span>Generate Payment Request</span>
      </button>
    </div>
  );

  const renderGenerated = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Request Created!</h2>
        <p className="text-blue-200">Your payment request has been generated successfully</p>
      </div>

      {paymentRequest && (
        <div className="bg-white/10 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-white mb-4">Request Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-200">Request ID:</span>
              <span className="text-white font-mono">{paymentRequest.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Amount:</span>
              <span className="text-white font-semibold">
                {selectedCurrency?.symbol}{paymentRequest.amount.toFixed(2)} {paymentRequest.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Description:</span>
              <span className="text-white">{paymentRequest.description}</span>
            </div>
            {paymentRequest.dueDate && (
              <div className="flex justify-between">
                <span className="text-blue-200">Due Date:</span>
                <span className="text-white">{new Date(paymentRequest.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-blue-200">Status:</span>
              <span className="text-yellow-400">Pending</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Link */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Link className="h-5 w-5 text-blue-400" />
          <span>Payment Link</span>
        </h3>
        
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={paymentRequest?.paymentLink || ''}
            readOnly
            className="flex-1 px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white font-mono text-sm"
          />
          <button
            onClick={copyPaymentLink}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            {copiedLink ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <p className="text-blue-200 text-sm">
          Share this link with the person who needs to pay you. They can use it to complete the payment securely.
        </p>
      </div>

      {/* QR Code */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20 text-center">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center space-x-2">
          <QrCode className="h-5 w-5 text-purple-400" />
          <span>QR Code</span>
        </h3>
        
        <div className="bg-white rounded-lg p-6 inline-block">
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <QrCode className="h-16 w-16 text-gray-600" />
          </div>
        </div>
        
        <p className="text-blue-200 text-sm mt-4">
          Scan this QR code to access the payment link quickly
        </p>
      </div>

      {/* Send Options */}
      {formData.payerEmail && (
        <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Send Request</h3>
          <p className="text-blue-200 mb-4">
            Send this payment request directly to {formData.payerEmail}
          </p>
          <button
            onClick={sendPaymentRequest}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Mail className="h-5 w-5" />
            <span>Send via Email</span>
          </button>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => {
            setStep('form');
            setFormData({
              amount: '',
              currency: 'USD',
              description: '',
              payerEmail: '',
              payerName: '',
              dueDate: '',
              sendMethod: 'email'
            });
            setPaymentRequest(null);
          }}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Create Another Request
        </button>
        <button
          onClick={onBack}
          className="flex-1 bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-3 px-6 rounded-lg transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  const renderSent = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-500/20 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
        <Mail className="h-12 w-12 text-green-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Request Sent Successfully!</h2>
        <p className="text-blue-200">
          Your payment request has been sent to {formData.payerEmail}
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/20 rounded-full p-2">
              <Mail className="h-4 w-4 text-blue-400" />
            </div>
            <span className="text-blue-100">The recipient will receive an email with your payment request</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/20 rounded-full p-2">
              <Link className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-blue-100">They can click the secure link to make the payment</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 rounded-full p-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
            <span className="text-blue-100">You'll be notified when the payment is completed</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => {
            setStep('form');
            setFormData({
              amount: '',
              currency: 'USD',
              description: '',
              payerEmail: '',
              payerName: '',
              dueDate: '',
              sendMethod: 'email'
            });
            setPaymentRequest(null);
          }}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Create Another Request
        </button>
        <button
          onClick={onBack}
          className="flex-1 bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-3 px-6 rounded-lg transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

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
              <Download className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">Request Payment</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
          {step === 'form' && renderForm()}
          {step === 'generated' && renderGenerated()}
          {step === 'sent' && renderSent()}
        </div>
      </div>
    </div>
  );
};

export default RequestPayment;