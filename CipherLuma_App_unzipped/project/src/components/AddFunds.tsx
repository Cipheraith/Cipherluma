import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Plus, Minus, DollarSign, Building, Smartphone, Bitcoin, CheckCircle, Clock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { transactionStore } from '../utils/transactionStore';

interface AddFundsProps {
  onBack: () => void;
  onTransactionComplete: (transaction: any) => void;
}

const AddFunds: React.FC<AddFundsProps> = ({ onBack, onTransactionComplete }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    method: 'bank_transfer',
    bankAccount: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    cryptoAddress: '',
    cryptoNetwork: 'bitcoin'
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

  const depositMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building,
      fee: 'Free',
      time: '1-3 business days',
      description: 'Transfer from your bank account'
    },
    {
      id: 'debit_card',
      name: 'Debit Card',
      icon: CreditCard,
      fee: '2.9% + $0.30',
      time: 'Instant',
      description: 'Add funds using your debit card'
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      fee: '1.5%',
      time: 'Instant',
      description: 'M-Pesa, Airtel Money, MTN'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Bitcoin,
      fee: 'Network fees only',
      time: '10-60 minutes',
      description: 'Bitcoin, Ethereum, USDC'
    }
  ];

  const withdrawMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building,
      fee: '$2.00',
      time: '1-3 business days',
      description: 'Transfer to your bank account'
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      fee: '1%',
      time: 'Instant',
      description: 'M-Pesa, Airtel Money, MTN'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Bitcoin,
      fee: 'Network fees only',
      time: '10-60 minutes',
      description: 'Bitcoin, Ethereum, USDC'
    }
  ];

  const quickAmounts = [50, 100, 250, 500, 1000, 2500];

  const selectedCurrency = currencies.find(c => c.code === formData.currency);
  const amount = parseFloat(formData.amount) || 0;
  const methods = activeTab === 'deposit' ? depositMethods : withdrawMethods;
  const selectedMethod = methods.find(m => m.id === formData.method);

  const calculateFee = () => {
    if (!selectedMethod) return 0;
    
    if (formData.method === 'debit_card') {
      return (amount * 0.029) + 0.30;
    } else if (formData.method === 'mobile_money') {
      return activeTab === 'deposit' ? amount * 0.015 : amount * 0.01;
    } else if (formData.method === 'bank_transfer' && activeTab === 'withdraw') {
      return 2.00;
    }
    return 0;
  };

  const fee = calculateFee();
  const totalAmount = activeTab === 'deposit' ? amount + fee : amount - fee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickAmount = (quickAmount: number) => {
    setFormData(prev => ({ ...prev, amount: quickAmount.toString() }));
  };

  const validateForm = () => {
    if (!formData.amount || amount <= 0) {
      alert('Please enter a valid amount');
      return false;
    }

    if (activeTab === 'withdraw' && selectedCurrency && amount > selectedCurrency.balance) {
      alert('Insufficient balance for withdrawal');
      return false;
    }

    if (formData.method === 'debit_card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv || !formData.cardName) {
        alert('Please fill in all card details');
        return false;
      }
    }

    if (formData.method === 'bank_transfer' && !formData.bankAccount) {
      alert('Please enter your bank account details');
      return false;
    }

    if (formData.method === 'crypto' && !formData.cryptoAddress) {
      alert('Please enter your crypto wallet address');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setStep('processing');
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      const transaction = transactionStore.addTransaction({
        type: activeTab === 'deposit' ? 'received' : 'sent',
        amount: amount,
        currency: formData.currency,
        recipient: activeTab === 'deposit' ? undefined : 'Your Bank Account',
        sender: activeTab === 'deposit' ? 'Your Bank Account' : undefined,
        status: Math.random() > 0.05 ? 'completed' : 'pending', // 95% success rate
        method: selectedMethod?.name || 'Bank Transfer',
        fee: fee,
        description: activeTab === 'deposit' ? 'Account deposit' : 'Account withdrawal',
        userId: 'user_123'
      });

      setCompletedTransaction(transaction);
      setIsProcessing(false);
      setStep('success');
      onTransactionComplete(transaction);
    }, 3000);
  };

  const renderMethodForm = () => {
    if (formData.method === 'debit_card') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                value={formData.cardExpiry}
                onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                CVV *
              </label>
              <input
                type="text"
                value={formData.cardCvv}
                onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => handleInputChange('cardName', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="John Doe"
            />
          </div>
        </div>
      );
    }

    if (formData.method === 'bank_transfer') {
      return (
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-2">
            {activeTab === 'deposit' ? 'Source Bank Account' : 'Destination Bank Account'} *
          </label>
          <input
            type="text"
            value={formData.bankAccount}
            onChange={(e) => handleInputChange('bankAccount', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            placeholder="Account ending in 1234"
          />
        </div>
      );
    }

    if (formData.method === 'crypto') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Cryptocurrency Network
            </label>
            <select
              value={formData.cryptoNetwork}
              onChange={(e) => handleInputChange('cryptoNetwork', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              <option value="bitcoin" className="bg-gray-800">Bitcoin (BTC)</option>
              <option value="ethereum" className="bg-gray-800">Ethereum (ETH)</option>
              <option value="usdc" className="bg-gray-800">USD Coin (USDC)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              {activeTab === 'deposit' ? 'Your Wallet Address' : 'Destination Wallet Address'} *
            </label>
            <input
              type="text"
              value={formData.cryptoAddress}
              onChange={(e) => handleInputChange('cryptoAddress', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 font-mono text-sm"
              placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderForm = () => (
    <div className="space-y-6">
      {/* Tab Selection */}
      <div className="flex bg-white/5 rounded-xl p-1 border border-blue-500/20">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'deposit'
              ? 'bg-green-500/30 text-white shadow-lg border border-green-400/50'
              : 'text-blue-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>Deposit Funds</span>
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'withdraw'
              ? 'bg-red-500/30 text-white shadow-lg border border-red-400/50'
              : 'text-blue-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <Minus className="h-4 w-4" />
          <span>Withdraw Funds</span>
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {activeTab === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
        </h1>
        <p className="text-blue-200">
          {activeTab === 'deposit' 
            ? 'Add money to your CipherLuma account' 
            : 'Withdraw money from your CipherLuma account'
          }
        </p>
      </div>

      {/* Current Balance */}
      {selectedCurrency && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Current Balance</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">
                  {showBalance ? `${selectedCurrency.symbol}${selectedCurrency.balance.toLocaleString()}` : '••••••'}
                </span>
                <span className="text-blue-300">{formData.currency}</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-blue-300 hover:text-white transition-colors duration-300"
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Amount and Currency */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-400" />
          <span>Amount & Currency</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

        {/* Quick Amount Buttons */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-2">
            Quick Amounts
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleQuickAmount(quickAmount)}
                className="py-2 px-3 bg-white/10 border border-blue-500/30 rounded-lg text-white hover:bg-blue-500/20 transition-all duration-300 text-sm"
              >
                {selectedCurrency?.symbol}{quickAmount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white/5 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          {activeTab === 'deposit' ? 'Funding Method' : 'Withdrawal Method'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleInputChange('method', method.id)}
              className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                formData.method === method.id
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

        {renderMethodForm()}
      </div>

      {/* Transaction Summary */}
      {amount > 0 && (
        <div className={`rounded-xl p-6 border ${
          activeTab === 'deposit' 
            ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/30'
            : 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-400/30'
        }`}>
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-200">Amount:</span>
              <span className="text-white">{selectedCurrency?.symbol}{amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Fee:</span>
              <span className="text-white">{selectedCurrency?.symbol}{fee.toFixed(2)}</span>
            </div>
            <div className="border-t border-blue-500/30 pt-2">
              <div className="flex justify-between">
                <span className="text-blue-200 font-semibold">
                  {activeTab === 'deposit' ? 'Total to Pay:' : 'You will receive:'}
                </span>
                <span className="text-white font-semibold">
                  {selectedCurrency?.symbol}{Math.abs(totalAmount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!formData.amount || amount <= 0}
        className={`w-full text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
          activeTab === 'deposit'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
            : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
        }`}
      >
        {activeTab === 'deposit' ? <Plus className="h-5 w-5" /> : <Minus className="h-5 w-5" />}
        <span>{activeTab === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}</span>
      </button>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center space-y-6">
      <div className={`rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center ${
        activeTab === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
      }`}>
        <Clock className={`h-12 w-12 animate-spin ${
          activeTab === 'deposit' ? 'text-green-400' : 'text-red-400'
        }`} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Processing Your {activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'}
        </h2>
        <p className="text-blue-200">Please wait while we process your transaction...</p>
      </div>
      <div className="bg-white/10 rounded-xl p-6 border border-blue-500/30">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-200">Amount:</span>
            <span className="text-white">{selectedCurrency?.symbol}{amount.toFixed(2)} {formData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Method:</span>
            <span className="text-white">{selectedMethod?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Type:</span>
            <span className="text-white capitalize">{activeTab}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className={`rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center ${
        activeTab === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
      }`}>
        <CheckCircle className={`h-12 w-12 ${
          activeTab === 'deposit' ? 'text-green-400' : 'text-red-400'
        }`} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {activeTab === 'deposit' ? 'Funds Added Successfully!' : 'Withdrawal Successful!'}
        </h2>
        <p className="text-blue-200">
          Your {activeTab} has been processed successfully
        </p>
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
              <span className="text-blue-200">Method:</span>
              <span className="text-white">{selectedMethod?.name}</span>
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
              amount: '',
              currency: 'USD',
              method: 'bank_transfer',
              bankAccount: '',
              cardNumber: '',
              cardExpiry: '',
              cardCvv: '',
              cardName: '',
              cryptoAddress: '',
              cryptoNetwork: 'bitcoin'
            });
            setCompletedTransaction(null);
          }}
          className={`flex-1 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === 'deposit'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
          }`}
        >
          {activeTab === 'deposit' ? 'Add More Funds' : 'Make Another Withdrawal'}
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
              <CreditCard className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">
                {activeTab === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
          {step === 'form' && renderForm()}
          {step === 'processing' && renderProcessing()}
          {step === 'success' && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default AddFunds;