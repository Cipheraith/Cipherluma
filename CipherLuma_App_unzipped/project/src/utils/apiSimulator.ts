import { transactionStore, ApiUsage } from './transactionStore';

interface ApiRequest {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  apiKey: string;
  userId: string;
}

interface ApiResponse {
  status: number;
  data?: any;
  error?: string;
  executionTime: number;
}

class ApiSimulator {
  private simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * 1000 + 200; // 200-1200ms delay
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  private validateApiKey(apiKey: string): boolean {
    // Simulate API key validation
    return apiKey.startsWith('cl_live_') || apiKey.startsWith('cl_test_');
  }

  private generateMockResponse(endpoint: string, method: string, data?: any): { status: number; responseData?: any; error?: string } {
    // Simulate different response scenarios
    const successRate = 0.85; // 85% success rate
    const isSuccess = Math.random() < successRate;

    if (!isSuccess) {
      const errors = [
        { status: 400, error: 'Invalid request parameters' },
        { status: 401, error: 'Unauthorized - Invalid API key' },
        { status: 429, error: 'Rate limit exceeded' },
        { status: 500, error: 'Internal server error' },
        { status: 503, error: 'Service temporarily unavailable' }
      ];
      const randomError = errors[Math.floor(Math.random() * errors.length)];
      return { status: randomError.status, error: randomError.error };
    }

    // Generate successful responses based on endpoint
    switch (endpoint) {
      case '/transfer':
        return {
          status: 200,
          responseData: {
            transactionId: `txn_${Date.now()}`,
            status: 'pending',
            amount: data?.amount || 0,
            currency: data?.currency || 'USD',
            recipient: data?.to || '',
            estimatedDelivery: '2-5 minutes',
            fee: (data?.amount || 0) * 0.01 // 1% fee
          }
        };

      case '/balance':
        return {
          status: 200,
          responseData: {
            balances: [
              { currency: 'USD', available: 12450.75, pending: 0 },
              { currency: 'EUR', available: 8320.50, pending: 0 },
              { currency: 'ZMW', available: 185000.00, pending: 500 },
              { currency: 'NGN', available: 2500000.00, pending: 0 },
              { currency: 'GBP', available: 6750.25, pending: 0 },
              { currency: 'BTC', available: 0.25, pending: 0.01 }
            ]
          }
        };

      case '/transactions':
        return {
          status: 200,
          responseData: {
            transactions: transactionStore.getTransactions(data?.userId).slice(0, 10),
            pagination: {
              page: 1,
              limit: 10,
              total: transactionStore.getTransactions(data?.userId).length
            }
          }
        };

      case '/exchange-rates':
        return {
          status: 200,
          responseData: {
            base: 'USD',
            rates: {
              EUR: 0.85,
              ZMW: 18.5,
              NGN: 460.0,
              GBP: 0.75,
              BTC: 0.000023
            },
            timestamp: Date.now()
          }
        };

      case '/webhooks':
        if (method === 'POST') {
          return {
            status: 201,
            responseData: {
              webhookId: `wh_${Date.now()}`,
              url: data?.url || '',
              events: data?.events || [],
              status: 'active'
            }
          };
        }
        return {
          status: 200,
          responseData: {
            webhooks: [
              {
                id: 'wh_123456',
                url: 'https://example.com/webhook',
                events: ['transaction.completed', 'transaction.failed'],
                status: 'active',
                created: '2024-01-15T10:30:00Z'
              }
            ]
          }
        };

      case '/payment-methods':
        return {
          status: 200,
          responseData: {
            methods: [
              {
                type: 'bank_transfer',
                currencies: ['USD', 'EUR', 'GBP'],
                fees: { fixed: 0, percentage: 0.5 },
                processingTime: '1-3 business days'
              },
              {
                type: 'mobile_money',
                currencies: ['ZMW', 'NGN'],
                fees: { fixed: 1, percentage: 1.0 },
                processingTime: 'Instant'
              },
              {
                type: 'crypto',
                currencies: ['BTC'],
                fees: { fixed: 0, percentage: 0.1 },
                processingTime: '10-30 minutes'
              }
            ]
          }
        };

      default:
        return {
          status: 404,
          error: 'Endpoint not found'
        };
    }
  }

  async makeApiCall(request: ApiRequest): Promise<ApiResponse> {
    const startTime = Date.now();

    // Validate API key
    if (!this.validateApiKey(request.apiKey)) {
      const executionTime = Date.now() - startTime;
      const response: ApiResponse = {
        status: 401,
        error: 'Invalid API key',
        executionTime
      };

      // Record API usage
      transactionStore.recordApiUsage({
        apiKey: request.apiKey,
        endpoint: request.endpoint,
        method: request.method,
        requestData: request.data,
        responseStatus: response.status,
        responseData: response.data,
        userId: request.userId,
        ipAddress: '192.168.1.1', // Mock IP
        userAgent: navigator.userAgent,
        executionTime: response.executionTime,
        errorMessage: response.error
      });

      return response;
    }

    // Simulate network delay
    await this.simulateNetworkDelay();

    const executionTime = Date.now() - startTime;
    const mockResponse = this.generateMockResponse(request.endpoint, request.method, request.data);

    const response: ApiResponse = {
      status: mockResponse.status,
      data: mockResponse.responseData,
      error: mockResponse.error,
      executionTime
    };

    // Record API usage
    transactionStore.recordApiUsage({
      apiKey: request.apiKey,
      endpoint: request.endpoint,
      method: request.method,
      requestData: request.data,
      responseStatus: response.status,
      responseData: response.data,
      userId: request.userId,
      ipAddress: '192.168.1.1', // Mock IP
      userAgent: navigator.userAgent,
      executionTime: response.executionTime,
      errorMessage: response.error
    });

    return response;
  }

  // Convenience methods for common API calls
  async transfer(apiKey: string, userId: string, transferData: {
    to: string;
    amount: number;
    currency: string;
    type: string;
    description?: string;
  }): Promise<ApiResponse> {
    return this.makeApiCall({
      endpoint: '/transfer',
      method: 'POST',
      data: transferData,
      apiKey,
      userId
    });
  }

  async getBalance(apiKey: string, userId: string): Promise<ApiResponse> {
    return this.makeApiCall({
      endpoint: '/balance',
      method: 'GET',
      apiKey,
      userId
    });
  }

  async getTransactions(apiKey: string, userId: string, filters?: any): Promise<ApiResponse> {
    return this.makeApiCall({
      endpoint: '/transactions',
      method: 'GET',
      data: { userId, ...filters },
      apiKey,
      userId
    });
  }

  async getExchangeRates(apiKey: string, userId: string): Promise<ApiResponse> {
    return this.makeApiCall({
      endpoint: '/exchange-rates',
      method: 'GET',
      apiKey,
      userId
    });
  }

  async createWebhook(apiKey: string, userId: string, webhookData: {
    url: string;
    events: string[];
  }): Promise<ApiResponse> {
    return this.makeApiCall({
      endpoint: '/webhooks',
      method: 'POST',
      data: webhookData,
      apiKey,
      userId
    });
  }

  async getWebhooks(apiKey: string, userId: string): Promise<ApiResponse> {
    return this.makeApiCall({
      endpoint: '/webhooks',
      method: 'GET',
      apiKey,
      userId
    });
  }

  async getPaymentMethods(apiKey: string, userId: string): Promise<ApiResponse> {
    return this.makeApiCall({
      endpoint: '/payment-methods',
      method: 'GET',
      apiKey,
      userId
    });
  }
}

export const apiSimulator = new ApiSimulator();