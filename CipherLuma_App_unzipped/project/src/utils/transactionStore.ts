export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  currency: string;
  recipient?: string;
  sender?: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  time: string;
  method: string;
  fee: number;
  reference: string;
  description?: string;
  userId: string;
  timestamp: number;
}

export interface ApiUsage {
  id: string;
  apiKey: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requestData?: any;
  responseStatus: number;
  responseData?: any;
  timestamp: number;
  date: string;
  time: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  executionTime: number; // in milliseconds
  errorMessage?: string;
}

class TransactionStore {
  private transactions: Transaction[] = [];
  private apiUsages: ApiUsage[] = [];
  private readonly STORAGE_KEY_TRANSACTIONS = 'cipherluma_transactions';
  private readonly STORAGE_KEY_API_USAGE = 'cipherluma_api_usage';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedTransactions = localStorage.getItem(this.STORAGE_KEY_TRANSACTIONS);
      const storedApiUsages = localStorage.getItem(this.STORAGE_KEY_API_USAGE);
      
      if (storedTransactions) {
        this.transactions = JSON.parse(storedTransactions);
      }
      
      if (storedApiUsages) {
        this.apiUsages = JSON.parse(storedApiUsages);
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY_TRANSACTIONS, JSON.stringify(this.transactions));
      localStorage.setItem(this.STORAGE_KEY_API_USAGE, JSON.stringify(this.apiUsages));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private generateReference(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TXN-${timestamp}-${random}`;
  }

  private getCurrentDateTime() {
    const now = new Date();
    return {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].substring(0, 5),
      timestamp: now.getTime()
    };
  }

  // Transaction methods
  addTransaction(transactionData: Omit<Transaction, 'id' | 'reference' | 'date' | 'time' | 'timestamp'>): Transaction {
    const { date, time, timestamp } = this.getCurrentDateTime();
    
    const transaction: Transaction = {
      ...transactionData,
      id: this.generateId(),
      reference: this.generateReference(),
      date,
      time,
      timestamp
    };

    this.transactions.unshift(transaction); // Add to beginning for latest first
    this.saveToStorage();
    
    return transaction;
  }

  getTransactions(userId?: string, type?: 'sent' | 'received'): Transaction[] {
    let filtered = this.transactions;
    
    if (userId) {
      filtered = filtered.filter(t => t.userId === userId);
    }
    
    if (type) {
      filtered = filtered.filter(t => t.type === type);
    }
    
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  updateTransactionStatus(id: string, status: Transaction['status']): boolean {
    const transaction = this.transactions.find(t => t.id === id);
    if (transaction) {
      transaction.status = status;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // API Usage methods
  recordApiUsage(apiUsageData: Omit<ApiUsage, 'id' | 'date' | 'time' | 'timestamp'>): ApiUsage {
    const { date, time, timestamp } = this.getCurrentDateTime();
    
    const apiUsage: ApiUsage = {
      ...apiUsageData,
      id: this.generateId(),
      date,
      time,
      timestamp
    };

    this.apiUsages.unshift(apiUsage); // Add to beginning for latest first
    this.saveToStorage();
    
    return apiUsage;
  }

  getApiUsages(userId?: string, apiKey?: string): ApiUsage[] {
    let filtered = this.apiUsages;
    
    if (userId) {
      filtered = filtered.filter(u => u.userId === userId);
    }
    
    if (apiKey) {
      filtered = filtered.filter(u => u.apiKey === apiKey);
    }
    
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  getApiUsageStats(userId?: string, timeframe?: 'day' | 'week' | 'month'): {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    topEndpoints: { endpoint: string; count: number }[];
  } {
    let filtered = this.apiUsages;
    
    if (userId) {
      filtered = filtered.filter(u => u.userId === userId);
    }
    
    if (timeframe) {
      const now = Date.now();
      const timeframeDuration = {
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000
      };
      
      const cutoff = now - timeframeDuration[timeframe];
      filtered = filtered.filter(u => u.timestamp >= cutoff);
    }
    
    const totalRequests = filtered.length;
    const successfulRequests = filtered.filter(u => u.responseStatus >= 200 && u.responseStatus < 300).length;
    const failedRequests = totalRequests - successfulRequests;
    const averageResponseTime = filtered.reduce((sum, u) => sum + u.executionTime, 0) / totalRequests || 0;
    
    // Count endpoint usage
    const endpointCounts = filtered.reduce((acc, u) => {
      acc[u.endpoint] = (acc[u.endpoint] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topEndpoints = Object.entries(endpointCounts)
      .map(([endpoint, count]) => ({ endpoint, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      totalRequests,
      successfulRequests,
      failedRequests,
      averageResponseTime: Math.round(averageResponseTime),
      topEndpoints
    };
  }

  // Search and filter methods
  searchTransactions(query: string, userId?: string): Transaction[] {
    const transactions = this.getTransactions(userId);
    const lowercaseQuery = query.toLowerCase();
    
    return transactions.filter(t => 
      t.reference.toLowerCase().includes(lowercaseQuery) ||
      t.recipient?.toLowerCase().includes(lowercaseQuery) ||
      t.sender?.toLowerCase().includes(lowercaseQuery) ||
      t.method.toLowerCase().includes(lowercaseQuery) ||
      t.currency.toLowerCase().includes(lowercaseQuery) ||
      t.description?.toLowerCase().includes(lowercaseQuery)
    );
  }

  filterTransactions(filters: {
    userId?: string;
    type?: 'sent' | 'received';
    status?: Transaction['status'];
    currency?: string;
    method?: string;
    dateFrom?: string;
    dateTo?: string;
    amountMin?: number;
    amountMax?: number;
  }): Transaction[] {
    let filtered = this.transactions;
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === '') return;
      
      switch (key) {
        case 'userId':
          filtered = filtered.filter(t => t.userId === value);
          break;
        case 'type':
          filtered = filtered.filter(t => t.type === value);
          break;
        case 'status':
          filtered = filtered.filter(t => t.status === value);
          break;
        case 'currency':
          filtered = filtered.filter(t => t.currency === value);
          break;
        case 'method':
          filtered = filtered.filter(t => t.method === value);
          break;
        case 'dateFrom':
          filtered = filtered.filter(t => t.date >= value);
          break;
        case 'dateTo':
          filtered = filtered.filter(t => t.date <= value);
          break;
        case 'amountMin':
          filtered = filtered.filter(t => t.amount >= value);
          break;
        case 'amountMax':
          filtered = filtered.filter(t => t.amount <= value);
          break;
      }
    });
    
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  // Export methods
  exportTransactions(userId?: string, format: 'json' | 'csv' = 'json'): string {
    const transactions = this.getTransactions(userId);
    
    if (format === 'csv') {
      const headers = ['ID', 'Type', 'Amount', 'Currency', 'Recipient/Sender', 'Status', 'Date', 'Time', 'Method', 'Fee', 'Reference', 'Description'];
      const csvRows = [
        headers.join(','),
        ...transactions.map(t => [
          t.id,
          t.type,
          t.amount,
          t.currency,
          t.recipient || t.sender || '',
          t.status,
          t.date,
          t.time,
          t.method,
          t.fee,
          t.reference,
          t.description || ''
        ].map(field => `"${field}"`).join(','))
      ];
      return csvRows.join('\n');
    }
    
    return JSON.stringify(transactions, null, 2);
  }

  exportApiUsage(userId?: string, format: 'json' | 'csv' = 'json'): string {
    const apiUsages = this.getApiUsages(userId);
    
    if (format === 'csv') {
      const headers = ['ID', 'API Key', 'Endpoint', 'Method', 'Response Status', 'Date', 'Time', 'Execution Time (ms)', 'Error Message'];
      const csvRows = [
        headers.join(','),
        ...apiUsages.map(u => [
          u.id,
          u.apiKey,
          u.endpoint,
          u.method,
          u.responseStatus,
          u.date,
          u.time,
          u.executionTime,
          u.errorMessage || ''
        ].map(field => `"${field}"`).join(','))
      ];
      return csvRows.join('\n');
    }
    
    return JSON.stringify(apiUsages, null, 2);
  }

  // Clear methods (for testing or reset)
  clearAllData() {
    this.transactions = [];
    this.apiUsages = [];
    this.saveToStorage();
  }

  clearUserData(userId: string) {
    this.transactions = this.transactions.filter(t => t.userId !== userId);
    this.apiUsages = this.apiUsages.filter(u => u.userId !== userId);
    this.saveToStorage();
  }
}

// Create singleton instance
export const transactionStore = new TransactionStore();