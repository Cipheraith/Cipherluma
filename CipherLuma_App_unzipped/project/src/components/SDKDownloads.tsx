import React, { useState } from 'react';
import { ArrowLeft, Download, Code, Star, GitBranch, Package, FileText, ExternalLink, Copy, Check } from 'lucide-react';

interface SDKDownloadsProps {
  onBack: () => void;
}

const SDKDownloads: React.FC<SDKDownloadsProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const sdks = [
    {
      id: 'nodejs',
      name: 'Node.js SDK',
      description: 'Official Node.js SDK with TypeScript support and comprehensive documentation',
      language: 'JavaScript/TypeScript',
      version: 'v2.1.0',
      downloads: '15.2K',
      stars: '1.2K',
      icon: '🟢',
      color: 'from-green-500 to-emerald-500',
      installCommand: 'npm install @cipherluma/sdk',
      downloadUrl: 'https://github.com/cipherluma/nodejs-sdk/releases/latest',
      docsUrl: 'https://docs.cipherluma.com/sdks/nodejs',
      features: [
        'Full TypeScript support',
        'Promise-based API',
        'Automatic retry logic',
        'Built-in error handling',
        'Webhook verification',
        'Rate limiting support'
      ],
      quickStart: `// Install the SDK
npm install @cipherluma/sdk

// Initialize the client
import { CipherLuma } from '@cipherluma/sdk';

const client = new CipherLuma({
  apiKey: 'cl_live_your_api_key_here',
  environment: 'production'
});

// Send a transfer
const transfer = await client.transfers.create({
  to: 'recipient@example.com',
  amount: 100,
  currency: 'USD',
  type: 'bank_transfer'
});`
    },
    {
      id: 'python',
      name: 'Python SDK',
      description: 'Python SDK with async/await support and Django/Flask integrations',
      language: 'Python',
      version: 'v1.8.3',
      downloads: '8.7K',
      stars: '892',
      icon: '🐍',
      color: 'from-blue-500 to-cyan-500',
      installCommand: 'pip install cipherluma',
      downloadUrl: 'https://pypi.org/project/cipherluma/',
      docsUrl: 'https://docs.cipherluma.com/sdks/python',
      features: [
        'Async/await support',
        'Django integration',
        'Flask helpers',
        'Type hints included',
        'Comprehensive logging',
        'Request/response middleware'
      ],
      quickStart: `# Install the SDK
pip install cipherluma

# Initialize the client
from cipherluma import CipherLuma

client = CipherLuma(
    api_key='cl_live_your_api_key_here',
    environment='production'
)

# Send a transfer
transfer = client.transfers.create(
    to='recipient@example.com',
    amount=100,
    currency='USD',
    type='bank_transfer'
)`
    },
    {
      id: 'php',
      name: 'PHP SDK',
      description: 'PHP SDK compatible with Laravel, Symfony, and vanilla PHP projects',
      language: 'PHP',
      version: 'v1.5.2',
      downloads: '5.1K',
      stars: '456',
      icon: '🐘',
      color: 'from-purple-500 to-pink-500',
      installCommand: 'composer require cipherluma/sdk',
      downloadUrl: 'https://packagist.org/packages/cipherluma/sdk',
      docsUrl: 'https://docs.cipherluma.com/sdks/php',
      features: [
        'Laravel service provider',
        'Symfony bundle',
        'PSR-4 autoloading',
        'Guzzle HTTP client',
        'Exception handling',
        'Configuration management'
      ],
      quickStart: `// Install the SDK
composer require cipherluma/sdk

// Initialize the client
<?php
use CipherLuma\\SDK\\Client;

$client = new Client([
    'api_key' => 'cl_live_your_api_key_here',
    'environment' => 'production'
]);

// Send a transfer
$transfer = $client->transfers->create([
    'to' => 'recipient@example.com',
    'amount' => 100,
    'currency' => 'USD',
    'type' => 'bank_transfer'
]);`
    },
    {
      id: 'ruby',
      name: 'Ruby SDK',
      description: 'Ruby gem with Rails integration and ActiveRecord support',
      language: 'Ruby',
      version: 'v1.3.1',
      downloads: '2.8K',
      stars: '234',
      icon: '💎',
      color: 'from-red-500 to-orange-500',
      installCommand: 'gem install cipherluma',
      downloadUrl: 'https://rubygems.org/gems/cipherluma',
      docsUrl: 'https://docs.cipherluma.com/sdks/ruby',
      features: [
        'Rails integration',
        'ActiveRecord models',
        'Rake tasks included',
        'RSpec test helpers',
        'Configuration DSL',
        'Background job support'
      ],
      quickStart: `# Install the SDK
gem install cipherluma

# Initialize the client
require 'cipherluma'

client = CipherLuma::Client.new(
  api_key: 'cl_live_your_api_key_here',
  environment: 'production'
)

# Send a transfer
transfer = client.transfers.create(
  to: 'recipient@example.com',
  amount: 100,
  currency: 'USD',
  type: 'bank_transfer'
)`
    },
    {
      id: 'go',
      name: 'Go SDK',
      description: 'Lightweight Go SDK for high-performance applications',
      language: 'Go',
      version: 'v1.2.0',
      downloads: '1.9K',
      stars: '178',
      icon: '🔵',
      color: 'from-cyan-500 to-blue-500',
      installCommand: 'go get github.com/cipherluma/go-sdk',
      downloadUrl: 'https://github.com/cipherluma/go-sdk/releases/latest',
      docsUrl: 'https://docs.cipherluma.com/sdks/go',
      features: [
        'Zero dependencies',
        'Context support',
        'Structured logging',
        'HTTP/2 support',
        'Concurrent safe',
        'Minimal memory footprint'
      ],
      quickStart: `// Install the SDK
go get github.com/cipherluma/go-sdk

// Initialize the client
package main

import (
    "github.com/cipherluma/go-sdk"
)

func main() {
    client := cipherluma.NewClient(&cipherluma.Config{
        APIKey:      "cl_live_your_api_key_here",
        Environment: "production",
    })

    // Send a transfer
    transfer, err := client.Transfers.Create(&cipherluma.TransferRequest{
        To:       "recipient@example.com",
        Amount:   100,
        Currency: "USD",
        Type:     "bank_transfer",
    })
}`
    },
    {
      id: 'java',
      name: 'Java SDK',
      description: 'Java SDK for Spring Boot and enterprise applications',
      language: 'Java',
      version: 'v1.1.5',
      downloads: '3.4K',
      stars: '312',
      icon: '☕',
      color: 'from-orange-500 to-red-500',
      installCommand: 'implementation "com.cipherluma:sdk:1.1.5"',
      downloadUrl: 'https://search.maven.org/artifact/com.cipherluma/sdk',
      docsUrl: 'https://docs.cipherluma.com/sdks/java',
      features: [
        'Spring Boot starter',
        'Jackson serialization',
        'OkHttp client',
        'Reactive support',
        'Annotation-based config',
        'JUnit test utilities'
      ],
      quickStart: `// Add to build.gradle
implementation "com.cipherluma:sdk:1.1.5"

// Initialize the client
import com.cipherluma.sdk.CipherLuma;
import com.cipherluma.sdk.model.TransferRequest;

CipherLuma client = CipherLuma.builder()
    .apiKey("cl_live_your_api_key_here")
    .environment("production")
    .build();

// Send a transfer
TransferRequest request = TransferRequest.builder()
    .to("recipient@example.com")
    .amount(100)
    .currency("USD")
    .type("bank_transfer")
    .build();

Transfer transfer = client.transfers().create(request);`
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const downloadSDK = (sdk: any) => {
    // In a real implementation, this would trigger the actual download
    window.open(sdk.downloadUrl, '_blank');
  };

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

            <div className="hidden lg:flex items-center space-x-4">
              <Package className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">SDK Downloads</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Official SDKs & Libraries
            </h1>
            <p className="text-blue-200 text-lg max-w-3xl mx-auto">
              Get started quickly with our official SDKs for popular programming languages. 
              All SDKs are actively maintained and include comprehensive documentation.
            </p>
          </div>

          {/* SDK Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sdks.map((sdk, index) => (
              <div key={sdk.id} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* SDK Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${sdk.color} rounded-lg p-3 text-2xl`}>
                      {sdk.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{sdk.name}</h3>
                      <p className="text-blue-300 text-sm">{sdk.language}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-300 text-sm">{sdk.version}</div>
                    <div className="flex items-center space-x-4 text-xs text-blue-400 mt-1">
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{sdk.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{sdk.stars}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-blue-100 mb-6">{sdk.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {sdk.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Installation */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Installation</h4>
                    <button
                      onClick={() => copyToClipboard(sdk.installCommand, `install-${sdk.id}`)}
                      className="text-blue-300 hover:text-white transition-colors duration-300 flex items-center space-x-1"
                    >
                      {copiedCode === `install-${sdk.id}` ? (
                        <>
                          <Check className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <code className="text-green-300 text-sm">{sdk.installCommand}</code>
                  </div>
                </div>

                {/* Quick Start */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Quick Start</h4>
                    <button
                      onClick={() => copyToClipboard(sdk.quickStart, `quickstart-${sdk.id}`)}
                      className="text-blue-300 hover:text-white transition-colors duration-300 flex items-center space-x-1"
                    >
                      {copiedCode === `quickstart-${sdk.id}` ? (
                        <>
                          <Check className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 overflow-x-auto">
                    <pre className="text-green-300 text-xs">
                      <code>{sdk.quickStart}</code>
                    </pre>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => downloadSDK(sdk)}
                    className={`flex-1 bg-gradient-to-r ${sdk.color} text-white py-3 px-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <a
                    href={sdk.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Docs</span>
                  </a>
                  <a
                    href={sdk.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="#"
                className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 text-center group"
              >
                <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-2">API Documentation</h3>
                <p className="text-blue-200 text-sm">Complete API reference with examples and best practices</p>
              </a>
              
              <a
                href="#"
                className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 text-center group"
              >
                <GitBranch className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-2">GitHub Repository</h3>
                <p className="text-blue-200 text-sm">Open source examples and community contributions</p>
              </a>
              
              <a
                href="#"
                className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 text-center group"
              >
                <Code className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-2">Code Examples</h3>
                <p className="text-blue-200 text-sm">Ready-to-use code snippets and integration guides</p>
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Need Help?</h2>
            <p className="text-blue-200 mb-6">
              Our developer support team is here to help you integrate CipherLuma into your application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Contact Developer Support
              </button>
              <button className="bg-white/10 border border-blue-500/30 text-blue-200 hover:text-white hover:bg-white/15 px-6 py-3 rounded-lg transition-all duration-300">
                Join Developer Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDKDownloads;