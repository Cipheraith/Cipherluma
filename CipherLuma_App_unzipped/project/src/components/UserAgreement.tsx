import React from 'react';
import { ArrowLeft, Users, FileText, AlertCircle, CheckCircle, Shield, Globe } from 'lucide-react';

interface UserAgreementProps {
  onBack: () => void;
}

const UserAgreement: React.FC<UserAgreementProps> = ({ onBack }) => {
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
              <Users className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">User Agreement</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              User Agreement
            </h1>
            <p className="text-blue-200 text-lg">
              Last updated: January 20, 2024
            </p>
            <div className="mt-4 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
              <div className="flex items-center space-x-2 text-green-300">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">
                  This agreement outlines your rights and responsibilities as a CipherLuma user.
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/30 p-6 sm:p-8">
            <div className="prose prose-invert max-w-none space-y-8">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2">
                    <Users className="h-5 w-5 text-white" />
                  </span>
                  <span>1. User Rights and Responsibilities</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Your Rights:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access to secure, reliable payment processing services</li>
                    <li>Transparent fee structure and transaction information</li>
                    <li>24/7 customer support for account-related issues</li>
                    <li>Protection of your personal and financial data</li>
                    <li>Fair treatment in accordance with applicable laws</li>
                    <li>Access to transaction history and account statements</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Your Responsibilities:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and truthful information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Report suspicious activities or security breaches</li>
                    <li>Keep your contact information up to date</li>
                    <li>Use services only for legitimate business purposes</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                    <Shield className="h-5 w-5 text-white" />
                  </span>
                  <span>2. Account Security and Access</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Security Measures:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Two-factor authentication (2FA) is strongly recommended</li>
                    <li>Regular password updates and strong password requirements</li>
                    <li>Monitoring of account activity for suspicious behavior</li>
                    <li>Secure encryption of all data transmissions</li>
                    <li>Regular security audits and compliance checks</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Access Controls:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You are solely responsible for maintaining account confidentiality</li>
                    <li>Sharing account credentials is strictly prohibited</li>
                    <li>Immediate notification required for any unauthorized access</li>
                    <li>Account lockout procedures for security breaches</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Transaction Processing and Limits</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Processing Standards:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Transactions are processed during business hours (Monday-Friday, 9 AM - 6 PM GMT)</li>
                    <li>International transfers may take 1-5 business days depending on destination</li>
                    <li>Real-time processing available for supported corridors</li>
                    <li>Automatic retry mechanisms for failed transactions</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Transaction Limits:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Daily limits: $10,000 for verified accounts, $1,000 for unverified</li>
                    <li>Monthly limits: $100,000 for verified accounts, $5,000 for unverified</li>
                    <li>Higher limits available for business accounts upon request</li>
                    <li>Limits may be adjusted based on account history and risk assessment</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. API Usage and Developer Terms</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">API Access Rights:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access to production and sandbox environments</li>
                    <li>Comprehensive API documentation and support</li>
                    <li>Rate limiting based on your subscription plan</li>
                    <li>Webhook notifications for real-time updates</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Developer Responsibilities:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Secure storage and handling of API keys</li>
                    <li>Implementation of proper error handling</li>
                    <li>Compliance with rate limits and usage guidelines</li>
                    <li>Regular updates to maintain compatibility</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </span>
                  <span>5. International Compliance</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Regulatory Compliance:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Full compliance with Anti-Money Laundering (AML) regulations</li>
                    <li>Know Your Customer (KYC) verification requirements</li>
                    <li>Sanctions screening for all transactions</li>
                    <li>Reporting obligations to relevant financial authorities</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Geographic Restrictions:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Services may not be available in all jurisdictions</li>
                    <li>Compliance with local laws and regulations required</li>
                    <li>Restricted countries list updated regularly</li>
                    <li>User responsibility to ensure legal compliance in their jurisdiction</li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Customer Support and Communication</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Support Channels:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>24/7 live chat support for urgent issues</li>
                    <li>Email support with response within 24 hours</li>
                    <li>Phone support during business hours</li>
                    <li>Comprehensive help center and documentation</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Communication Preferences:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email notifications for important account updates</li>
                    <li>SMS alerts for security-related activities</li>
                    <li>In-app notifications for transaction status</li>
                    <li>Optional marketing communications (opt-out available)</li>
                  </ul>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Data Retention and Account Closure</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Data Retention:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Transaction records retained for 7 years as required by law</li>
                    <li>Personal data retained only as long as necessary</li>
                    <li>Right to request data deletion (subject to legal requirements)</li>
                    <li>Secure data destruction procedures</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Account Closure:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>30-day notice period for voluntary account closure</li>
                    <li>Return of remaining funds within 30 business days</li>
                    <li>Final transaction statement provided</li>
                    <li>Continued access to historical data for legal requirements</li>
                  </ul>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property Rights</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    All intellectual property rights in our platform, including but not limited to software, 
                    trademarks, logos, and content, remain the exclusive property of CipherLuma.
                  </p>
                  <h3 className="text-lg font-semibold text-white">User Content:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You retain ownership of any content you provide</li>
                    <li>Limited license granted to us for service provision</li>
                    <li>No unauthorized use of our intellectual property</li>
                    <li>Respect for third-party intellectual property rights</li>
                  </ul>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Force Majeure and Service Availability</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service due to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Scheduled maintenance and updates</li>
                    <li>Force majeure events (natural disasters, war, etc.)</li>
                    <li>Third-party service provider outages</li>
                    <li>Regulatory or legal requirements</li>
                  </ul>
                  <p>
                    We will provide advance notice of scheduled maintenance and work to minimize service disruptions.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="border-t border-blue-500/30 pt-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="text-blue-100 space-y-2">
                  <p>For questions about this User Agreement, please contact us:</p>
                  <p><strong>Email:</strong> support@cipherluma.com</p>
                  <p><strong>Address:</strong> CipherLuma Customer Relations, 123 Financial District, Global City, GC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Live Chat:</strong> Available 24/7 through your account dashboard</p>
                </div>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span>This User Agreement is effective as of January 20, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAgreement;