export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: 'product_updates' | 'security' | 'partnerships' | 'company_news' | 'technical';
  tags: string[];
  imageUrl?: string;
  authorId: string;
  authorName: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

class NewsStore {
  private articles: NewsArticle[] = [];
  private readonly STORAGE_KEY = 'cipherluma_news_articles';

  constructor() {
    this.loadFromStorage();
    this.initializeMockData();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.articles = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading news data from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.articles));
    } catch (error) {
      console.error('Error saving news data to storage:', error);
    }
  }

  private generateId(): string {
    return `news_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private initializeMockData() {
    if (this.articles.length === 0) {
      this.articles = [
        {
          id: 'news_001',
          title: 'CipherLuma Launches Enhanced API v2.0 with Improved Security',
          content: `We're excited to announce the launch of CipherLuma API v2.0, featuring enhanced security measures and improved performance.

Key improvements include:

• Enhanced encryption protocols with 256-bit AES encryption
• Improved rate limiting with intelligent throttling
• New webhook reliability features with automatic retry mechanisms
• Expanded currency support including 15 new African currencies
• Real-time transaction status updates
• Comprehensive error handling and detailed response codes

The new API maintains backward compatibility while offering significant performance improvements. Existing integrations will continue to work seamlessly, and we encourage all developers to upgrade to take advantage of the new features.

Migration guides and updated documentation are available in our developer portal. Our team is standing by to assist with any questions during the transition period.`,
          category: 'product_updates',
          tags: ['api', 'security', 'update', 'v2.0'],
          imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
          authorId: 'admin_001',
          authorName: 'CipherLuma Development Team',
          isPublished: true,
          publishedAt: '2024-01-20',
          createdAt: '2024-01-20',
          updatedAt: '2024-01-20',
          viewCount: 1247
        },
        {
          id: 'news_002',
          title: 'New Partnership with Major African Banks Expands Our Reach',
          content: `CipherLuma is proud to announce strategic partnerships with leading financial institutions across Africa, significantly expanding our service coverage and improving transaction speeds.

Partnership highlights:

• Direct integration with 12 major banks across 8 African countries
• Reduced transaction times from hours to minutes for bank transfers
• Lower fees for customers through direct banking relationships
• Enhanced compliance and regulatory alignment
• Improved customer support with local banking expertise

These partnerships represent a major milestone in our mission to democratize financial services across Africa. Customers will immediately benefit from faster transfers, lower costs, and improved reliability.

The new banking partnerships complement our existing mobile money integrations, providing customers with more choice and flexibility in how they send and receive money.`,
          category: 'partnerships',
          tags: ['partnerships', 'banks', 'africa', 'expansion'],
          imageUrl: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg',
          authorId: 'admin_001',
          authorName: 'CipherLuma Business Development',
          isPublished: true,
          publishedAt: '2024-01-18',
          createdAt: '2024-01-18',
          updatedAt: '2024-01-18',
          viewCount: 892
        },
        {
          id: 'news_003',
          title: 'Enhanced Security Measures: Introducing Advanced Fraud Detection',
          content: `Security is at the heart of everything we do at CipherLuma. Today, we're announcing the deployment of our next-generation fraud detection system, powered by machine learning and real-time risk assessment.

New security features:

• AI-powered transaction monitoring that learns from patterns
• Real-time risk scoring for all transactions
• Enhanced device fingerprinting and behavioral analysis
• Improved KYC verification with document authentication
• Advanced sanctions screening and AML compliance
• 24/7 security operations center monitoring

These improvements build upon our existing security infrastructure, which already includes bank-level encryption, multi-factor authentication, and regulatory compliance across all our operating jurisdictions.

Customer accounts remain fully protected, and these enhancements work transparently in the background to provide an additional layer of security without impacting the user experience.`,
          category: 'security',
          tags: ['security', 'fraud-detection', 'ai', 'protection'],
          imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
          authorId: 'admin_001',
          authorName: 'CipherLuma Security Team',
          isPublished: true,
          publishedAt: '2024-01-15',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          viewCount: 1456
        },
        {
          id: 'news_004',
          title: 'CipherLuma Founder Fred Solami Speaks at FinTech Africa Summit',
          content: `CipherLuma founder and CEO Fred Solami delivered a keynote address at the prestigious FinTech Africa Summit in Lagos, Nigeria, sharing insights on the future of digital payments in Africa.

Key topics covered:

• The role of technology in financial inclusion
• Overcoming infrastructure challenges in emerging markets
• Building trust in digital financial services
• The importance of local partnerships and understanding
• Future trends in African fintech and payment systems

Fred's presentation highlighted CipherLuma's journey from a university dropout's vision to a leading payment platform serving customers across multiple continents. His story resonated with the audience of entrepreneurs, investors, and industry leaders.

The summit brought together over 500 fintech leaders from across Africa and beyond, fostering collaboration and innovation in the rapidly growing African fintech ecosystem.

Video recordings of the keynote will be available on our website and social media channels.`,
          category: 'company_news',
          tags: ['founder', 'summit', 'keynote', 'africa', 'fintech'],
          imageUrl: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
          authorId: 'admin_001',
          authorName: 'CipherLuma Communications',
          isPublished: true,
          publishedAt: '2024-01-12',
          createdAt: '2024-01-12',
          updatedAt: '2024-01-12',
          viewCount: 734
        },
        {
          id: 'news_005',
          title: 'Technical Deep Dive: How We Achieve 99.9% Uptime',
          content: `Behind CipherLuma's reliable service is a robust technical infrastructure designed for maximum availability and performance. Here's how we maintain 99.9% uptime while processing thousands of transactions daily.

Infrastructure highlights:

• Multi-region deployment across 3 continents
• Redundant systems with automatic failover capabilities
• Real-time monitoring and alerting systems
• Load balancing and auto-scaling infrastructure
• Database replication and backup strategies
• Comprehensive disaster recovery procedures

Our engineering team follows strict DevOps practices, including:

• Continuous integration and deployment pipelines
• Automated testing at every stage of development
• Blue-green deployment strategies for zero-downtime updates
• Comprehensive logging and observability tools
• Regular security audits and penetration testing

This technical foundation enables us to provide reliable service to our customers while maintaining the flexibility to rapidly deploy new features and improvements.

We're committed to transparency about our technical capabilities and regularly publish updates on our system status and performance metrics.`,
          category: 'technical',
          tags: ['infrastructure', 'uptime', 'engineering', 'reliability'],
          imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
          authorId: 'admin_001',
          authorName: 'CipherLuma Engineering Team',
          isPublished: true,
          publishedAt: '2024-01-10',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-10',
          viewCount: 567
        }
      ];
      this.saveToStorage();
    }
  }

  createArticle(articleData: Omit<NewsArticle, 'id' | 'publishedAt' | 'createdAt' | 'updatedAt' | 'viewCount'>): NewsArticle {
    const currentDate = this.getCurrentDate();
    
    const article: NewsArticle = {
      ...articleData,
      id: this.generateId(),
      publishedAt: articleData.isPublished ? currentDate : '',
      createdAt: currentDate,
      updatedAt: currentDate,
      viewCount: 0
    };

    this.articles.unshift(article);
    this.saveToStorage();
    return article;
  }

  updateArticle(id: string, updates: Partial<NewsArticle>): boolean {
    const index = this.articles.findIndex(a => a.id === id);
    if (index === -1) return false;

    const article = this.articles[index];
    const wasPublished = article.isPublished;
    
    this.articles[index] = {
      ...article,
      ...updates,
      updatedAt: this.getCurrentDate(),
      publishedAt: updates.isPublished && !wasPublished ? this.getCurrentDate() : article.publishedAt
    };

    this.saveToStorage();
    return true;
  }

  deleteArticle(id: string): boolean {
    const index = this.articles.findIndex(a => a.id === id);
    if (index === -1) return false;

    this.articles.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  getArticles(filters?: {
    isPublished?: boolean;
    category?: NewsArticle['category'];
    authorId?: string;
  }): NewsArticle[] {
    let filtered = this.articles;

    if (filters) {
      if (filters.isPublished !== undefined) {
        filtered = filtered.filter(a => a.isPublished === filters.isPublished);
      }
      if (filters.category) {
        filtered = filtered.filter(a => a.category === filters.category);
      }
      if (filters.authorId) {
        filtered = filtered.filter(a => a.authorId === filters.authorId);
      }
    }

    return filtered.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }

  getArticleById(id: string): NewsArticle | undefined {
    return this.articles.find(a => a.id === id);
  }

  incrementViewCount(id: string): boolean {
    const article = this.articles.find(a => a.id === id);
    if (!article) return false;

    article.viewCount += 1;
    this.saveToStorage();
    return true;
  }

  searchArticles(query: string): NewsArticle[] {
    const lowercaseQuery = query.toLowerCase();
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
}

export const newsStore = new NewsStore();