import React from 'react';
import { ArrowLeft, Shield, FileText, AlertCircle, CheckCircle, Eye, Lock, Database, Globe } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">Privacy Policy</span>
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
              Privacy Policy
            </h1>
            <p className="text-blue-200 text-lg">
              Last updated: January 20, 2024
            </p>
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
              <div className="flex items-center space-x-2 text-purple-300">
                <Shield className="h-5 w-5" />
                <span className="text-sm">
                  Your privacy is our priority. This policy explains how we collect, use, and protect your data.
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
                    <Eye className="h-5 w-5 text-white" />
                  </span>
                  <span>1. Information We Collect</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Personal Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Full name, date of birth, and contact information</li>
                    <li>Government-issued identification documents</li>
                    <li>Proof of address and residency documentation</li>
                    <li>Financial information and bank account details</li>
                    <li>Employment and income verification</li>
                    <li>Biometric data for enhanced security (where permitted)</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Technical Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP addresses and device identifiers</li>
                    <li>Browser type, version, and operating system</li>
                    <li>Login times and session duration</li>
                    <li>API usage patterns and request logs</li>
                    <li>Geolocation data (with your consent)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Transaction Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Transaction amounts, currencies, and destinations</li>
                    <li>Payment method and processing details</li>
                    <li>Transaction history and patterns</li>
                    <li>Merchant and recipient information</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                    <Database className="h-5 w-5 text-white" />
                  </span>
                  <span>2. How We Use Your Information</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Service Provision:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Processing and facilitating financial transactions</li>
                    <li>Verifying your identity and preventing fraud</li>
                    <li>Maintaining and improving our services</li>
                    <li>Providing customer support and assistance</li>
                    <li>Generating account statements and reports</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Legal and Compliance:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Complying with Anti-Money Laundering (AML) regulations</li>
                    <li>Meeting Know Your Customer (KYC) requirements</li>
                    <li>Reporting to financial authorities as required</li>
                    <li>Responding to legal requests and court orders</li>
                    <li>Preventing illegal activities and protecting our platform</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Business Operations:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Risk assessment and management</li>
                    <li>Product development and enhancement</li>
                    <li>Marketing and promotional communications (with consent)</li>
                    <li>Analytics and business intelligence</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </span>
                  <span>3. Information Sharing and Disclosure</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">We may share your information with:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Service Providers:</strong> Third-party vendors who assist in service delivery</li>
                    <li><strong>Financial Partners:</strong> Banks and payment processors for transaction processing</li>
                    <li><strong>Regulatory Bodies:</strong> Government agencies as required by law</li>
                    <li><strong>Legal Authorities:</strong> Law enforcement when legally obligated</li>
                    <li><strong>Business Partners:</strong> With your explicit consent for specific services</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">We do NOT sell your personal information to:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Marketing companies or data brokers</li>
                    <li>Social media platforms</li>
                    <li>Advertising networks</li>
                    <li>Any third party for commercial purposes</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-2">
                    <Lock className="h-5 w-5 text-white" />
                  </span>
                  <span>4. Data Security and Protection</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Security Measures:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>256-bit SSL encryption for all data transmissions</li>
                    <li>Advanced encryption at rest for stored data</li>
                    <li>Multi-factor authentication for account access</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>SOC 2 Type II compliance certification</li>
                    <li>PCI DSS compliance for payment card data</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Access Controls:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Role-based access control for employees</li>
                    <li>Regular access reviews and privilege management</li>
                    <li>Secure development practices and code reviews</li>
                    <li>24/7 security monitoring and incident response</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Data Backup and Recovery:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Automated daily backups with encryption</li>
                    <li>Geographically distributed backup storage</li>
                    <li>Disaster recovery procedures and testing</li>
                    <li>Business continuity planning</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Your Privacy Rights</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Under GDPR and other privacy laws, you have the right to:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                    <li><strong>Erasure:</strong> Request deletion of your data (subject to legal requirements)</li>
                    <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                    <li><strong>Restriction:</strong> Limit how we process your information</li>
                    <li><strong>Objection:</strong> Object to certain types of processing</li>
                    <li><strong>Withdraw Consent:</strong> Revoke consent for optional data processing</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">To exercise these rights:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Contact our Data Protection Officer at privacy@cipherluma.com</li>
                    <li>Use the privacy controls in your account settings</li>
                    <li>Submit a request through our customer support portal</li>
                    <li>We will respond within 30 days of receiving your request</li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies and Tracking Technologies</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">We use cookies for:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Security Cookies:</strong> Fraud prevention and account protection</li>
                    <li><strong>Performance Cookies:</strong> Analytics and service improvement</li>
                    <li><strong>Preference Cookies:</strong> Remembering your settings and choices</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Cookie Management:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You can control cookies through your browser settings</li>
                    <li>Use our cookie preference center to manage non-essential cookies</li>
                    <li>Disabling certain cookies may affect website functionality</li>
                    <li>We respect Do Not Track signals where technically feasible</li>
                  </ul>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. International Data Transfers</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    As a global payment platform, we may transfer your data internationally. We ensure adequate 
                    protection through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                    <li>Adequacy decisions for transfers to approved countries</li>
                    <li>Binding Corporate Rules for intra-group transfers</li>
                    <li>Additional safeguards as required by applicable law</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Data Processing Locations:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Primary data centers in the European Union and United States</li>
                    <li>Backup facilities in Canada and Singapore</li>
                    <li>Customer support centers in multiple jurisdictions</li>
                    <li>All locations maintain equivalent security standards</li>
                  </ul>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Retention Periods:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Transaction Records:</strong> 7 years (regulatory requirement)</li>
                    <li><strong>Identity Documents:</strong> 5 years after account closure</li>
                    <li><strong>Communication Records:</strong> 3 years</li>
                    <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
                    <li><strong>Technical Logs:</strong> 12 months</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Secure Deletion:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Automated deletion processes for expired data</li>
                    <li>Secure overwriting of storage media</li>
                    <li>Certificate of destruction for physical documents</li>
                    <li>Regular audits of retention compliance</li>
                  </ul>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    Our services are not intended for individuals under 18 years of age. We do not knowingly 
                    collect personal information from children. If we become aware that we have collected 
                    information from a child, we will take steps to delete it promptly.
                  </p>
                  <p>
                    Parents or guardians who believe their child has provided us with personal information 
                    should contact us immediately at privacy@cipherluma.com.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Privacy Policy</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    We may update this Privacy Policy periodically to reflect changes in our practices or 
                    applicable laws. We will notify you of material changes through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email notification to your registered address</li>
                    <li>Prominent notice on our website and platform</li>
                    <li>In-app notifications for significant changes</li>
                    <li>30-day advance notice for material changes</li>
                  </ul>
                  <p>
                    Your continued use of our services after changes become effective constitutes acceptance 
                    of the updated Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="border-t border-blue-500/30 pt-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="text-blue-100 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Data Protection Officer:</h3>
                  <div className="space-y-2 ml-4">
                    <p><strong>Email:</strong> privacy@cipherluma.com</p>
                    <p><strong>Address:</strong> CipherLuma Data Protection Office, 123 Financial District, Global City, GC 12345</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567 ext. 789</p>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">EU Representative:</h3>
                  <div className="space-y-2 ml-4">
                    <p><strong>Email:</strong> eu-privacy@cipherluma.com</p>
                    <p><strong>Address:</strong> CipherLuma EU Office, 456 Financial Square, Dublin, Ireland</p>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Supervisory Authority:</h3>
                  <div className="space-y-2 ml-4">
                    <p>You have the right to lodge a complaint with your local data protection authority if you believe we have not handled your personal data in accordance with applicable law.</p>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span>This Privacy Policy is effective as of January 20, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;