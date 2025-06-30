export interface SupportMessage {
  id: string;
  ticketId: string;
  userId: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: 'general' | 'technical' | 'billing' | 'api' | 'security' | 'compliance';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
  messages: {
    id: string;
    senderId: string;
    senderType: 'customer' | 'admin';
    senderName: string;
    content: string;
    timestamp: number;
    date: string;
    time: string;
    attachments?: string[];
  }[];
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  tags: string[];
  satisfaction?: 1 | 2 | 3 | 4 | 5;
  satisfactionFeedback?: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  isPublished: boolean;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  order: number;
}

export interface SupportStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  averageResponseTime: number; // in hours
  averageResolutionTime: number; // in hours
  satisfactionScore: number;
  ticketsByCategory: Record<string, number>;
  ticketsByPriority: Record<string, number>;
  monthlyTickets: number;
  weeklyTickets: number;
}

class SupportStore {
  private supportMessages: SupportMessage[] = [];
  private faqs: FAQ[] = [];
  private readonly STORAGE_KEY_SUPPORT = 'cipherluma_support_messages';
  private readonly STORAGE_KEY_FAQS = 'cipherluma_faqs';

  constructor() {
    this.loadFromStorage();
    this.initializeMockData();
  }

  private loadFromStorage() {
    try {
      const storedMessages = localStorage.getItem(this.STORAGE_KEY_SUPPORT);
      const storedFAQs = localStorage.getItem(this.STORAGE_KEY_FAQS);
      
      if (storedMessages) {
        this.supportMessages = JSON.parse(storedMessages);
      }
      
      if (storedFAQs) {
        this.faqs = JSON.parse(storedFAQs);
      }
    } catch (error) {
      console.error('Error loading support data from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY_SUPPORT, JSON.stringify(this.supportMessages));
      localStorage.setItem(this.STORAGE_KEY_FAQS, JSON.stringify(this.faqs));
    } catch (error) {
      console.error('Error saving support data to storage:', error);
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private generateTicketId(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TKT-${timestamp}-${random}`;
  }

  private getCurrentDateTime() {
    const now = new Date();
    return {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].substring(0, 5),
      timestamp: now.getTime()
    };
  }

  private initializeMockData() {
    if (this.supportMessages.length === 0) {
      const { date, time, timestamp } = this.getCurrentDateTime();
      
      this.supportMessages = [
        {
          id: 'msg_001',
          ticketId: 'TKT-123456-ABCD',
          userId: 'user_001',
          userEmail: 'john.doe@example.com',
          userName: 'John Doe',
          subject: 'Unable to complete transfer to Nigeria',
          category: 'technical',
          priority: 'high',
          status: 'open',
          messages: [
            {
              id: 'msg_001_1',
              senderId: 'user_001',
              senderType: 'customer',
              senderName: 'John Doe',
              content: 'Hi, I\'m trying to send money to Nigeria but the transaction keeps failing. I\'ve tried multiple times with different amounts but it always shows an error. Can you please help?',
              timestamp: timestamp - 3600000,
              date,
              time: '14:30'
            }
          ],
          createdAt: date,
          updatedAt: date,
          tags: ['transfer', 'nigeria', 'failed-transaction'],
          assignedTo: 'admin_001',
          assignedToName: 'Sarah Wilson'
        },
        {
          id: 'msg_002',
          ticketId: 'TKT-123457-EFGH',
          userId: 'user_002',
          userEmail: 'jane.smith@example.com',
          userName: 'Jane Smith',
          subject: 'API rate limit questions',
          category: 'api',
          priority: 'medium',
          status: 'in_progress',
          messages: [
            {
              id: 'msg_002_1',
              senderId: 'user_002',
              senderType: 'customer',
              senderName: 'Jane Smith',
              content: 'Hello, I\'m integrating your API into our application and I\'m hitting rate limits. What are the current limits for the business plan and can they be increased?',
              timestamp: timestamp - 7200000,
              date,
              time: '13:00'
            },
            {
              id: 'msg_002_2',
              senderId: 'admin_001',
              senderType: 'admin',
              senderName: 'Sarah Wilson',
              content: 'Hi Jane, thanks for reaching out. The business plan includes 500 requests per minute. I can increase this to 1000 requests per minute for your account. Would that work for your use case?',
              timestamp: timestamp - 3600000,
              date,
              time: '14:00'
            },
            {
              id: 'msg_002_3',
              senderId: 'user_002',
              senderType: 'customer',
              senderName: 'Jane Smith',
              content: 'That would be perfect! Yes, please increase it to 1000 requests per minute. When will this take effect?',
              timestamp: timestamp - 1800000,
              date,
              time: '14:30'
            }
          ],
          createdAt: date,
          updatedAt: date,
          tags: ['api', 'rate-limits', 'business-plan'],
          assignedTo: 'admin_001',
          assignedToName: 'Sarah Wilson'
        },
        {
          id: 'msg_003',
          ticketId: 'TKT-123458-IJKL',
          userId: 'user_003',
          userEmail: 'mike.wilson@example.com',
          userName: 'Mike Wilson',
          subject: 'Account verification taking too long',
          category: 'compliance',
          priority: 'medium',
          status: 'waiting_customer',
          messages: [
            {
              id: 'msg_003_1',
              senderId: 'user_003',
              senderType: 'customer',
              senderName: 'Mike Wilson',
              content: 'I submitted my KYC documents 5 days ago but my account is still not verified. Can you please check the status?',
              timestamp: timestamp - 10800000,
              date,
              time: '12:00'
            },
            {
              id: 'msg_003_2',
              senderId: 'admin_002',
              senderType: 'admin',
              senderName: 'David Chen',
              content: 'Hi Mike, I\'ve reviewed your documents. The utility bill you provided is from 4 months ago. We need a document dated within the last 3 months. Could you please upload a more recent utility bill or bank statement?',
              timestamp: timestamp - 5400000,
              date,
              time: '13:30'
            }
          ],
          createdAt: date,
          updatedAt: date,
          tags: ['kyc', 'verification', 'documents'],
          assignedTo: 'admin_002',
          assignedToName: 'David Chen'
        }
      ];
    }

    if (this.faqs.length === 0) {
      this.faqs = [
        {
          id: 'faq_001',
          category: 'Getting Started',
          question: 'How do I create an account?',
          answer: 'To create an account, click "Get Started" on our homepage, then choose "Sign Up". Fill in your email, password, and basic information. You\'ll receive a verification email to activate your account.',
          tags: ['account', 'signup', 'registration'],
          isPublished: true,
          createdBy: 'admin_001',
          createdByName: 'Sarah Wilson',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          viewCount: 245,
          helpfulCount: 198,
          notHelpfulCount: 12,
          order: 1
        },
        {
          id: 'faq_002',
          category: 'Getting Started',
          question: 'What documents do I need for KYC verification?',
          answer: 'For KYC verification, you need: 1) A government-issued photo ID (passport, driver\'s license, or national ID), 2) Proof of address (utility bill, bank statement, or lease agreement dated within the last 3 months). All documents must be clear and legible.',
          tags: ['kyc', 'verification', 'documents', 'identity'],
          isPublished: true,
          createdBy: 'admin_002',
          createdByName: 'David Chen',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-18',
          viewCount: 189,
          helpfulCount: 156,
          notHelpfulCount: 8,
          order: 2
        },
        {
          id: 'faq_003',
          category: 'Payments',
          question: 'How long do international transfers take?',
          answer: 'Transfer times vary by destination and payment method: Bank transfers typically take 1-3 business days, Mobile money transfers are usually instant, Crypto transfers take 10-30 minutes depending on network congestion.',
          tags: ['transfers', 'timing', 'international', 'speed'],
          isPublished: true,
          createdBy: 'admin_001',
          createdByName: 'Sarah Wilson',
          createdAt: '2024-01-16',
          updatedAt: '2024-01-16',
          viewCount: 312,
          helpfulCount: 278,
          notHelpfulCount: 15,
          order: 1
        }
      ];
    }

    this.saveToStorage();
  }

  // Support Message Management
  createSupportMessage(messageData: {
    userId: string;
    userEmail: string;
    userName: string;
    subject: string;
    category: SupportMessage['category'];
    priority: SupportMessage['priority'];
    content: string;
  }): SupportMessage {
    const { date, time, timestamp } = this.getCurrentDateTime();
    
    const supportMessage: SupportMessage = {
      id: this.generateId(),
      ticketId: this.generateTicketId(),
      userId: messageData.userId,
      userEmail: messageData.userEmail,
      userName: messageData.userName,
      subject: messageData.subject,
      category: messageData.category,
      priority: messageData.priority,
      status: 'open',
      messages: [
        {
          id: this.generateId(),
          senderId: messageData.userId,
          senderType: 'customer',
          senderName: messageData.userName,
          content: messageData.content,
          timestamp,
          date,
          time
        }
      ],
      createdAt: date,
      updatedAt: date,
      tags: []
    };

    this.supportMessages.unshift(supportMessage);
    this.saveToStorage();
    return supportMessage;
  }

  addMessageToTicket(ticketId: string, messageData: {
    senderId: string;
    senderType: 'customer' | 'admin';
    senderName: string;
    content: string;
  }): boolean {
    const ticket = this.supportMessages.find(t => t.ticketId === ticketId);
    if (!ticket) return false;

    const { date, time, timestamp } = this.getCurrentDateTime();
    
    const newMessage = {
      id: this.generateId(),
      senderId: messageData.senderId,
      senderType: messageData.senderType,
      senderName: messageData.senderName,
      content: messageData.content,
      timestamp,
      date,
      time
    };

    ticket.messages.push(newMessage);
    ticket.updatedAt = date;

    // If admin responds, change status from open to in_progress
    if (messageData.senderType === 'admin' && ticket.status === 'open') {
      ticket.status = 'in_progress';
    }

    this.saveToStorage();
    return true;
  }

  updateTicketStatus(ticketId: string, status: SupportMessage['status'], adminId?: string): boolean {
    const ticket = this.supportMessages.find(t => t.ticketId === ticketId);
    if (!ticket) return false;

    ticket.status = status;
    ticket.updatedAt = this.getCurrentDateTime().date;

    if (status === 'resolved' || status === 'closed') {
      ticket.resolvedAt = this.getCurrentDateTime().date;
    }

    this.saveToStorage();
    return true;
  }

  assignTicket(ticketId: string, adminId: string, adminName: string): boolean {
    const ticket = this.supportMessages.find(t => t.ticketId === ticketId);
    if (!ticket) return false;

    ticket.assignedTo = adminId;
    ticket.assignedToName = adminName;
    ticket.updatedAt = this.getCurrentDateTime().date;

    this.saveToStorage();
    return true;
  }

  addTicketTags(ticketId: string, tags: string[]): boolean {
    const ticket = this.supportMessages.find(t => t.ticketId === ticketId);
    if (!ticket) return false;

    ticket.tags = [...new Set([...ticket.tags, ...tags])];
    ticket.updatedAt = this.getCurrentDateTime().date;

    this.saveToStorage();
    return true;
  }

  getSupportMessages(filters?: {
    status?: SupportMessage['status'];
    category?: SupportMessage['category'];
    priority?: SupportMessage['priority'];
    assignedTo?: string;
  }): SupportMessage[] {
    let filtered = this.supportMessages;

    if (filters) {
      if (filters.status) {
        filtered = filtered.filter(m => m.status === filters.status);
      }
      if (filters.category) {
        filtered = filtered.filter(m => m.category === filters.category);
      }
      if (filters.priority) {
        filtered = filtered.filter(m => m.priority === filters.priority);
      }
      if (filters.assignedTo) {
        filtered = filtered.filter(m => m.assignedTo === filters.assignedTo);
      }
    }

    return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  getTicketById(ticketId: string): SupportMessage | undefined {
    return this.supportMessages.find(t => t.ticketId === ticketId);
  }

  searchTickets(query: string): SupportMessage[] {
    const lowercaseQuery = query.toLowerCase();
    return this.supportMessages.filter(ticket =>
      ticket.ticketId.toLowerCase().includes(lowercaseQuery) ||
      ticket.subject.toLowerCase().includes(lowercaseQuery) ||
      ticket.userEmail.toLowerCase().includes(lowercaseQuery) ||
      ticket.userName.toLowerCase().includes(lowercaseQuery) ||
      ticket.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      ticket.messages.some(msg => msg.content.toLowerCase().includes(lowercaseQuery))
    );
  }

  // FAQ Management
  createFAQ(faqData: {
    category: string;
    question: string;
    answer: string;
    tags: string[];
    createdBy: string;
    createdByName: string;
  }): FAQ {
    const { date } = this.getCurrentDateTime();
    
    const faq: FAQ = {
      id: this.generateId(),
      category: faqData.category,
      question: faqData.question,
      answer: faqData.answer,
      tags: faqData.tags,
      isPublished: false,
      createdBy: faqData.createdBy,
      createdByName: faqData.createdByName,
      createdAt: date,
      updatedAt: date,
      viewCount: 0,
      helpfulCount: 0,
      notHelpfulCount: 0,
      order: this.faqs.filter(f => f.category === faqData.category).length + 1
    };

    this.faqs.push(faq);
    this.saveToStorage();
    return faq;
  }

  updateFAQ(id: string, updates: Partial<FAQ>): boolean {
    const faq = this.faqs.find(f => f.id === id);
    if (!faq) return false;

    Object.assign(faq, updates);
    faq.updatedAt = this.getCurrentDateTime().date;

    this.saveToStorage();
    return true;
  }

  deleteFAQ(id: string): boolean {
    const index = this.faqs.findIndex(f => f.id === id);
    if (index === -1) return false;

    this.faqs.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  getFAQs(filters?: {
    category?: string;
    isPublished?: boolean;
  }): FAQ[] {
    let filtered = this.faqs;

    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(f => f.category === filters.category);
      }
      if (filters.isPublished !== undefined) {
        filtered = filtered.filter(f => f.isPublished === filters.isPublished);
      }
    }

    return filtered.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.order - b.order;
    });
  }

  searchFAQs(query: string): FAQ[] {
    const lowercaseQuery = query.toLowerCase();
    return this.faqs.filter(faq =>
      faq.question.toLowerCase().includes(lowercaseQuery) ||
      faq.answer.toLowerCase().includes(lowercaseQuery) ||
      faq.category.toLowerCase().includes(lowercaseQuery) ||
      faq.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Statistics
  getSupportStats(): SupportStats {
    const totalTickets = this.supportMessages.length;
    const openTickets = this.supportMessages.filter(t => t.status === 'open').length;
    const inProgressTickets = this.supportMessages.filter(t => t.status === 'in_progress').length;
    const resolvedTickets = this.supportMessages.filter(t => t.status === 'resolved' || t.status === 'closed').length;

    const ticketsByCategory = this.supportMessages.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const ticketsByPriority = this.supportMessages.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate time-based stats
    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    const weeklyTickets = this.supportMessages.filter(t => 
      new Date(t.createdAt).getTime() >= oneWeekAgo
    ).length;

    const monthlyTickets = this.supportMessages.filter(t => 
      new Date(t.createdAt).getTime() >= oneMonthAgo
    ).length;

    // Calculate satisfaction score
    const ticketsWithSatisfaction = this.supportMessages.filter(t => t.satisfaction);
    const satisfactionScore = ticketsWithSatisfaction.length > 0
      ? ticketsWithSatisfaction.reduce((sum, t) => sum + (t.satisfaction || 0), 0) / ticketsWithSatisfaction.length
      : 0;

    return {
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      averageResponseTime: 2.5, // Mock data - hours
      averageResolutionTime: 24, // Mock data - hours
      satisfactionScore,
      ticketsByCategory,
      ticketsByPriority,
      monthlyTickets,
      weeklyTickets
    };
  }
}

export const supportStore = new SupportStore();