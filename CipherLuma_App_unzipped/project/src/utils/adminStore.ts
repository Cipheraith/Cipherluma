export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'disabled' | 'flagged' | 'pending';
  kycStatus: 'pending' | 'approved' | 'rejected' | 'not_submitted';
  country: string;
  registrationDate: string;
  lastLogin: string;
  totalTransactions: number;
  totalVolume: number;
  apiUsage: number;
  riskScore: number;
  documents: {
    id: string;
    type: 'passport' | 'national_id' | 'drivers_license' | 'utility_bill';
    status: 'pending' | 'approved' | 'rejected';
    uploadDate: string;
  }[];
}

export interface Company {
  id: string;
  name: string;
  email: string;
  website: string;
  industry: string;
  country: string;
  registrationDate: string;
  status: 'active' | 'suspended' | 'pending';
  apiKeys: {
    id: string;
    name: string;
    type: 'live' | 'test';
    created: string;
    lastUsed: string;
    requestCount: number;
  }[];
  monthlyVolume: number;
  totalTransactions: number;
  plan: 'starter' | 'business' | 'enterprise';
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  totalVolume: number;
  pendingKyc: number;
  flaggedUsers: number;
  totalCompanies: number;
  activeApiKeys: number;
  monthlyGrowth: number;
  successRate: number;
}

class AdminStore {
  private users: User[] = [];
  private companies: Company[] = [];
  private readonly STORAGE_KEY_USERS = 'cipherluma_admin_users';
  private readonly STORAGE_KEY_COMPANIES = 'cipherluma_admin_companies';

  constructor() {
    this.loadFromStorage();
    this.initializeMockData();
  }

  private loadFromStorage() {
    try {
      const storedUsers = localStorage.getItem(this.STORAGE_KEY_USERS);
      const storedCompanies = localStorage.getItem(this.STORAGE_KEY_COMPANIES);
      
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
      
      if (storedCompanies) {
        this.companies = JSON.parse(storedCompanies);
      }
    } catch (error) {
      console.error('Error loading admin data from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(this.users));
      localStorage.setItem(this.STORAGE_KEY_COMPANIES, JSON.stringify(this.companies));
    } catch (error) {
      console.error('Error saving admin data to storage:', error);
    }
  }

  private initializeMockData() {
    if (this.users.length === 0) {
      this.users = [
        {
          id: 'user_001',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          status: 'active',
          kycStatus: 'approved',
          country: 'United States',
          registrationDate: '2024-01-15',
          lastLogin: '2024-01-20',
          totalTransactions: 45,
          totalVolume: 125000,
          apiUsage: 0,
          riskScore: 2,
          documents: [
            { id: 'doc_001', type: 'passport', status: 'approved', uploadDate: '2024-01-16' },
            { id: 'doc_002', type: 'utility_bill', status: 'approved', uploadDate: '2024-01-16' }
          ]
        },
        {
          id: 'user_002',
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          status: 'active',
          kycStatus: 'pending',
          country: 'United Kingdom',
          registrationDate: '2024-01-18',
          lastLogin: '2024-01-19',
          totalTransactions: 12,
          totalVolume: 35000,
          apiUsage: 0,
          riskScore: 1,
          documents: [
            { id: 'doc_003', type: 'drivers_license', status: 'pending', uploadDate: '2024-01-19' }
          ]
        },
        {
          id: 'user_003',
          email: 'mike.wilson@example.com',
          firstName: 'Mike',
          lastName: 'Wilson',
          status: 'flagged',
          kycStatus: 'rejected',
          country: 'Canada',
          registrationDate: '2024-01-10',
          lastLogin: '2024-01-17',
          totalTransactions: 78,
          totalVolume: 250000,
          apiUsage: 0,
          riskScore: 8,
          documents: [
            { id: 'doc_004', type: 'national_id', status: 'rejected', uploadDate: '2024-01-11' }
          ]
        },
        {
          id: 'user_004',
          email: 'sarah.johnson@example.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          status: 'disabled',
          kycStatus: 'approved',
          country: 'Australia',
          registrationDate: '2024-01-05',
          lastLogin: '2024-01-15',
          totalTransactions: 23,
          totalVolume: 67000,
          apiUsage: 0,
          riskScore: 5,
          documents: [
            { id: 'doc_005', type: 'passport', status: 'approved', uploadDate: '2024-01-06' }
          ]
        }
      ];
    }

    if (this.companies.length === 0) {
      this.companies = [
        {
          id: 'comp_001',
          name: 'TechPay Solutions',
          email: 'api@techpay.com',
          website: 'https://techpay.com',
          industry: 'Fintech',
          country: 'United States',
          registrationDate: '2024-01-10',
          status: 'active',
          apiKeys: [
            { id: 'key_001', name: 'Production API', type: 'live', created: '2024-01-10', lastUsed: '2024-01-20', requestCount: 15420 },
            { id: 'key_002', name: 'Test Environment', type: 'test', created: '2024-01-10', lastUsed: '2024-01-19', requestCount: 8750 }
          ],
          monthlyVolume: 2500000,
          totalTransactions: 1250,
          plan: 'enterprise',
          contactPerson: {
            name: 'David Chen',
            email: 'david@techpay.com',
            phone: '+1-555-0123'
          }
        },
        {
          id: 'comp_002',
          name: 'Global Remit Inc',
          email: 'dev@globalremit.com',
          website: 'https://globalremit.com',
          industry: 'Remittance',
          country: 'United Kingdom',
          registrationDate: '2024-01-12',
          status: 'active',
          apiKeys: [
            { id: 'key_003', name: 'Main API', type: 'live', created: '2024-01-12', lastUsed: '2024-01-20', requestCount: 9850 }
          ],
          monthlyVolume: 1200000,
          totalTransactions: 890,
          plan: 'business',
          contactPerson: {
            name: 'Emma Thompson',
            email: 'emma@globalremit.com',
            phone: '+44-20-7946-0958'
          }
        },
        {
          id: 'comp_003',
          name: 'StartupPay',
          email: 'hello@startuppay.io',
          website: 'https://startuppay.io',
          industry: 'E-commerce',
          country: 'Canada',
          registrationDate: '2024-01-15',
          status: 'pending',
          apiKeys: [
            { id: 'key_004', name: 'Development Key', type: 'test', created: '2024-01-15', lastUsed: '2024-01-18', requestCount: 450 }
          ],
          monthlyVolume: 85000,
          totalTransactions: 125,
          plan: 'starter',
          contactPerson: {
            name: 'Alex Rodriguez',
            email: 'alex@startuppay.io',
            phone: '+1-416-555-0789'
          }
        }
      ];
    }

    this.saveToStorage();
  }

  // User Management
  getUsers(): User[] {
    return this.users.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  updateUserStatus(id: string, status: User['status']): boolean {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.status = status;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  updateUserKycStatus(id: string, kycStatus: User['kycStatus']): boolean {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.kycStatus = kycStatus;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Company Management
  getCompanies(): Company[] {
    return this.companies.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());
  }

  getCompanyById(id: string): Company | undefined {
    return this.companies.find(c => c.id === id);
  }

  updateCompanyStatus(id: string, status: Company['status']): boolean {
    const company = this.companies.find(c => c.id === id);
    if (company) {
      company.status = status;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Statistics
  getAdminStats(): AdminStats {
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter(u => u.status === 'active').length;
    const pendingKyc = this.users.filter(u => u.kycStatus === 'pending').length;
    const flaggedUsers = this.users.filter(u => u.status === 'flagged').length;
    const totalCompanies = this.companies.length;
    const activeApiKeys = this.companies.reduce((sum, c) => sum + c.apiKeys.length, 0);
    
    const totalTransactions = this.users.reduce((sum, u) => sum + u.totalTransactions, 0) + 
                             this.companies.reduce((sum, c) => sum + c.totalTransactions, 0);
    
    const totalVolume = this.users.reduce((sum, u) => sum + u.totalVolume, 0) + 
                       this.companies.reduce((sum, c) => sum + c.monthlyVolume, 0);

    return {
      totalUsers,
      activeUsers,
      totalTransactions,
      totalVolume,
      pendingKyc,
      flaggedUsers,
      totalCompanies,
      activeApiKeys,
      monthlyGrowth: 15.5, // Mock data
      successRate: 94.2 // Mock data
    };
  }

  // Search and Filter
  searchUsers(query: string): User[] {
    const lowercaseQuery = query.toLowerCase();
    return this.users.filter(u => 
      u.email.toLowerCase().includes(lowercaseQuery) ||
      u.firstName.toLowerCase().includes(lowercaseQuery) ||
      u.lastName.toLowerCase().includes(lowercaseQuery) ||
      u.country.toLowerCase().includes(lowercaseQuery)
    );
  }

  searchCompanies(query: string): Company[] {
    const lowercaseQuery = query.toLowerCase();
    return this.companies.filter(c => 
      c.name.toLowerCase().includes(lowercaseQuery) ||
      c.email.toLowerCase().includes(lowercaseQuery) ||
      c.industry.toLowerCase().includes(lowercaseQuery) ||
      c.country.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Export functions
  exportUsers(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['ID', 'Email', 'Name', 'Status', 'KYC Status', 'Country', 'Registration Date', 'Total Transactions', 'Total Volume', 'Risk Score'];
      const csvRows = [
        headers.join(','),
        ...this.users.map(u => [
          u.id,
          u.email,
          `${u.firstName} ${u.lastName}`,
          u.status,
          u.kycStatus,
          u.country,
          u.registrationDate,
          u.totalTransactions,
          u.totalVolume,
          u.riskScore
        ].map(field => `"${field}"`).join(','))
      ];
      return csvRows.join('\n');
    }
    return JSON.stringify(this.users, null, 2);
  }

  exportCompanies(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['ID', 'Name', 'Email', 'Industry', 'Country', 'Status', 'Plan', 'Monthly Volume', 'Total Transactions', 'API Keys Count'];
      const csvRows = [
        headers.join(','),
        ...this.companies.map(c => [
          c.id,
          c.name,
          c.email,
          c.industry,
          c.country,
          c.status,
          c.plan,
          c.monthlyVolume,
          c.totalTransactions,
          c.apiKeys.length
        ].map(field => `"${field}"`).join(','))
      ];
      return csvRows.join('\n');
    }
    return JSON.stringify(this.companies, null, 2);
  }
}

export const adminStore = new AdminStore();