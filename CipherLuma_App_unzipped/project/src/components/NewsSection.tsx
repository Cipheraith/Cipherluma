import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Calendar, User, Tag, Image, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { newsStore, NewsArticle } from '../utils/newsStore';

interface NewsSectionProps {
  onBack: () => void;
  isAdmin?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onBack, isAdmin = false }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'product_updates',
    tags: '',
    imageUrl: '',
    isPublished: false
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const allArticles = newsStore.getArticles(isAdmin ? undefined : { isPublished: true });
    setArticles(allArticles);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    const articleData = {
      title: formData.title,
      content: formData.content,
      category: formData.category as NewsArticle['category'],
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      imageUrl: formData.imageUrl || undefined,
      isPublished: formData.isPublished,
      authorId: 'admin_001',
      authorName: 'CipherLuma Team'
    };

    if (editingArticle) {
      newsStore.updateArticle(editingArticle.id, articleData);
    } else {
      newsStore.createArticle(articleData);
    }

    setFormData({
      title: '',
      content: '',
      category: 'product_updates',
      tags: '',
      imageUrl: '',
      isPublished: false
    });
    setShowCreateForm(false);
    setEditingArticle(null);
    loadArticles();
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', '),
      imageUrl: article.imageUrl || '',
      isPublished: article.isPublished
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      newsStore.deleteArticle(id);
      loadArticles();
    }
  };

  const handlePublishToggle = (id: string, isPublished: boolean) => {
    newsStore.updateArticle(id, { isPublished });
    loadArticles();
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'product_updates', label: 'Product Updates' },
    { id: 'security', label: 'Security' },
    { id: 'partnerships', label: 'Partnerships' },
    { id: 'company_news', label: 'Company News' },
    { id: 'technical', label: 'Technical' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product_updates': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'security': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'partnerships': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'company_news': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'technical': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (article: NewsArticle) => {
    if (article.isPublished) {
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
    return <Clock className="h-4 w-4 text-yellow-400" />;
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1629] via-[#1E3A8A] to-[#1E40AF]">
        {/* Navigation */}
        <nav className="bg-gradient-to-r from-[#0F1629] via-[#1E2A5A] to-[#1E3A8A] shadow-2xl border-b border-blue-500/30 sticky top-0 z-50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20 sm:h-24">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center space-x-2 text-blue-200 hover:text-white transition-all duration-300 hover:scale-105 group px-3 py-2 rounded-lg hover:bg-blue-500/20"
                >
                  <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to News</span>
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
            </div>
          </div>
        </nav>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <article className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
            {selectedArticle.imageUrl && (
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 text-sm rounded-full border ${getCategoryColor(selectedArticle.category)}`}>
                  {selectedArticle.category.replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-2 text-blue-300 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedArticle.publishedAt}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-300 text-sm">
                  <User className="h-4 w-4" />
                  <span>{selectedArticle.authorName}</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">{selectedArticle.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedArticle.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full border border-blue-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {selectedArticle.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-blue-100 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
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
                <span>Back</span>
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

            <div className="flex items-center space-x-4">
              <FileText className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">News & Updates</span>
              {isAdmin && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Article</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Create/Edit Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingArticle(null);
                  setFormData({
                    title: '',
                    content: '',
                    category: 'product_updates',
                    tags: '',
                    imageUrl: '',
                    isPublished: false
                  });
                }}
                className="text-blue-300 hover:text-white transition-colors duration-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id} className="bg-gray-800">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="api, security, update"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Write your article content here..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                  className="rounded border-blue-500/30 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isPublished" className="text-blue-200">
                  Publish immediately
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  {editingArticle ? 'Update Article' : 'Create Article'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingArticle(null);
                  }}
                  className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              News & Updates
            </h1>
            <p className="text-blue-200 mt-2">
              Stay updated with the latest CipherLuma news, product updates, and announcements.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      filterCategory === category.id
                        ? 'bg-blue-500/30 text-white border border-blue-400/50'
                        : 'bg-white/10 text-blue-200 hover:text-white hover:bg-white/15 border border-blue-500/30'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                {article.imageUrl && (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(article.category)}`}>
                      {article.category.replace('_', ' ')}
                    </span>
                    {isAdmin && (
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(article)}
                        <span className={`text-xs ${article.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                          {article.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-blue-200 text-sm mb-4 line-clamp-3">
                    {article.content.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-blue-300 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{article.publishedAt}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span>{article.authorName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Read More</span>
                    </button>
                    
                    {isAdmin && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePublishToggle(article.id, !article.isPublished)}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            article.isPublished 
                              ? 'text-yellow-400 hover:bg-yellow-500/20' 
                              : 'text-green-400 hover:bg-green-500/20'
                          }`}
                          title={article.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {article.isPublished ? <Clock className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-blue-200">
                {searchQuery || filterCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No articles have been published yet.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;