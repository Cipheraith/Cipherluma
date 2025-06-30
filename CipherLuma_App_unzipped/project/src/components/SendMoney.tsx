import React, { useState } from 'react';
import { ArrowLeft, Send, User, DollarSign, Globe, CreditCard, Smartphone, Bitcoin, AlertCircle, CheckCircle, Clock, Eye, EyeOff } from 'lucide-react';
import { transactionStore } from '../utils/transactionStore';

interface SendMoneyProps {
  onBack: () => void;
  onTransactionComplete: (transaction: any) => void;
}

const SendMoney: React.FC<SendMoneyProps> = ({ onBack, onTransactionComplete }) => {
  const [step, setStep] = useState<'form' | 'review' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    currency: 'USD',
    paymentMethod: 'bank_transfer',
    description: '',
    recipientName: '',
    recipientPhone: '',
    recipientBank: '',
    recipientAccount: ''
  });
  const [showBalance, setShowBalance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState<any>(null);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', balance: 12450.75 },
    { code: 'EUR', name: 'Euro', symbol: '€', balance: 8320.50 },
    { code: 'GBP', name: 'British Pound', symbol: '£', balance: 6750.25 },
    { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'K', balance: 185000.00 },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', balance: 2500000.00 },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', balance: 125000.00 }
  ];

  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: CreditCard,
      fee: '0.5% + $2',
      time: '1-3 business days',
      description: 'Direct bank-to-bank transfer'
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      fee: '1% + $1',
      time: 'Instant',
      description: 'M-Pesa, Airtel Money, MTN'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Bitcoin,
      fee: '0.1% + network fees',
      time: '10-30 minutes',
      description: 'Bitcoin, Ethereum, USDC'
    }
  ];

  const selectedCurrency = currencies.find(c => c.code === formData.currency);
  const selectedPaymentMethod = paymentMethods.find(p => p.id === formData.paymentMethod);
  const amount = parseFloat(formData.amount) || 0;
  const feePercentage = formData.paymentMethod === 'bank_transfer' ? 0.005 : formData.paymentMethod === 'mobile_money' ? 0.01 : 0.001;
  const fixedFee = formData.paymentMethod === 'bank_transfer' ? 2 : formData.paymentMethod === 'mobile_money' ? 1 : 0;
  const totalFee = (amount * feePercentage) + fixedFee;
  const totalAmount = amount + totalFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.recipient || !formData.amount || !formData.recipientName) {
      alert('Please fill in all required fields');
      return false;
    }

    if (amount <= 0) {
      alert('Amount must be greater than 0');
      return false;
    }

    if (selectedCurrency && totalAmount > selectedCurrency.balance) {
      alert('Insufficient balance');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setStep('review');
  };

  const handleConfirm = async () => {
    setStep('processing');
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      const transaction = transactionStore.addTransaction({
        type: 'sent',
        amount: amount,
        currency: formData.currency,
        recipient: formData.recipient,
        status: Math.random() > 0.1 ? 'completed' : 'pending', // 90% success rate
        method: selectedPaymentMethod?.name || 'Bank Transfer',
        fee: totalFee,
        description: formData.description || 'Money transfer',
        userId: 'user_123'
      });

      setCompletedTransaction(transaction);
      setIsProcessing(false);
      setStep('success');
      onTransactionComplete(transaction);
    }, 3000);
  };

  const renderForm = () => (
    <div className="space-y-6">
      {/* Recipient Information */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <User className="h-5 w-5 text-blue-400" />
          <span>Recipient Information</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Recipient Email/Phone *
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => handleInputChange('recipient', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="john@example.com or +1234567890"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Recipient Name *
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) => handleInputChange('recipientName', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="John Doe"
            />
          </div>
        </div>

        {formData.paymentMethod === 'mobile_money' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={formData.recipientPhone}
              onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="+260 97 123 4567"
            />
          </div>
        )}

        {formData.paymentMethod === 'bank_transfer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.recipientBank}
                onChange={(e) => handleInputChange('recipientBank', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Bank of America"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={formData.recipientAccount}
                onChange={(e) => handleInputChange('recipientAccount', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="1234567890"
              />
            </div>
          </div>
        )}
      </div>

      {/* Amount and Currency */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-400" />
          <span>Amount & Currency</span>
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

        {selectedCurrency && (
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-200">Available Balance:</span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold">
                  {showBalance ? `${selectedCurrency.symbol}${selectedCurrency.balance.toLocaleString()}` : '••••••'}
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-blue-300 hover:text-white transition-colors duration-300"
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Globe className="h-5 w-5 text-purple-400" />
          <span>Payment Method</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleInputChange('paymentMethod', method.id)}
              className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                formData.paymentMethod === method.id
                  ? 'bg-blue-500/30 border-blue-400/50 shadow-lg'
                  : 'bg-white/5 border-blue-500/30 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <method.icon className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">{method.name}</span>
              </div>
              <p className="text-blue-200 text-sm mb-1">{method.description}</p>
              <p className="text-blue-300 text-xs">Fee: {method.fee}</p>
              <p className="text-blue-300 text-xs">Time: {method.time}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-blue-200 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
          placeholder="What's this payment for?"
        />
      </div>

      {/* Fee Summary */}
      {amount > 0 && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-400/30">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-200">Amount:</span>
              <span className="text-white">{selectedCurrency?.symbol}{amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-200">Fee:</span>
              <span className="text-white">{selectedCurrency?.symbol}{totalFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-green-400/30 pt-2">
              <div className="flex justify-between">
                <span className="text-green-200 font-semibold">Total:</span>
                <span className="text-white font-semibold">{selectedCurrency?.symbol}{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!formData.recipient || !formData.amount || !formData.recipientName}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Send className="h-5 w-5" />
        <span>Review Transfer</span>
      </button>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Review Your Transfer</h2>
        <p className="text-blue-200">Please confirm the details below</p>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-blue-500/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recipient</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-200">Name:</span>
                <span className="text-white">{formData.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Contact:</span>
                <span className="text-white">{formData.recipient}</span>
              </div>
              {formData.recipientBank && (
                <div className="flex justify-between">
                  <span className="text-blue-200">Bank:</span>
                  <span className="text-white">{formData.recipientBank}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Transfer Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-200">Amount:</span>
                <span className="text-white">{selectedCurrency?.symbol}{amount.toFixed(2)} {formData.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Method:</span>
                <span className="text-white">{selectedPaymentMethod?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Fee:</span>
                <span className="text-white">{selectedCurrency?.symbol}{totalFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-blue-500/30 pt-2">
                <div className="flex justify-between">
                  <span className="text-blue-200 font-semibold">Total:</span>
                  <span className="text-white font-semibold">{selectedCurrency?.symbol}{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {formData.description && (
          <div className="mt-6 pt-6 border-t border-blue-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-blue-100">{formData.description}</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep('form')}
          className="flex-1 bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-3 px-6 rounded-lg transition-all duration-300"
        >
          Back to Edit
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <CheckCircle className="h-5 w-5" />
          <span>Confirm & Send</span>
        </button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center space-y-6">
      <div className="bg-blue-500/20 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
        <Clock className="h-12 w-12 text-blue-400 animate-spin" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Processing Your Transfer</h2>
        <p className="text-blue-200">Please wait while we process your transaction...</p>
      </div>
      <div className="bg-white/10 rounded-xl p-6 border border-blue-500/30">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-200">Amount:</span>
            <span className="text-white">{selectedCurrency?.symbol}{amount.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">To:</span>
            <span className="text-white">{formData.recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Method:</span>
            <span className="text-white">{selectedPaymentMethod?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-500/20 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
        <CheckCircle className="h-12 w-12 text-green-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Transfer Successful!</h2>
        <p className="text-blue-200">Your money has been sent successfully</p>
      </div>

      {completedTransaction && (
        <div className="bg-white/10 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-200">Transaction ID:</span>
              <span className="text-white font-mono">{completedTransaction.reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Amount:</span>
              <span className="text-white">{selectedCurrency?.symbol}{amount.toFixed(2)} {formData.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">To:</span>
              <span className="text-white">{formData.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Status:</span>
              <span className={`${completedTransaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                {completedTransaction.status === 'completed' ? 'Completed' : 'Processing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Date:</span>
              <span className="text-white">{completedTransaction.date} at {completedTransaction.time}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => {
            setStep('form');
            setFormData({
              recipient: '',
              amount: '',
              currency: 'USD',
              paymentMethod: 'bank_transfer',
              description: '',
              recipientName: '',
              recipientPhone: '',
              recipientBank: '',
              recipientAccount: ''
            });
            setCompletedTransaction(null);
          }}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Send Another
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
              <Send className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">Send Money</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
          {step === 'form' && renderForm()}
          {step === 'review' && renderReview()}
          {step === 'processing' && renderProcessing()}
          {step === 'success' && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default SendMoney;