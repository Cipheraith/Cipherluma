import React from 'react';
import { ArrowLeft, Shield, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
              <FileText className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">Terms of Service</span>
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
              Terms of Service
            </h1>
            <p className="text-blue-200 text-lg">
              Last updated: January 20, 2024
            </p>
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-300">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">
                  Please read these terms carefully before using CipherLuma's services.
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
                    <FileText className="h-5 w-5 text-white" />
                  </span>
                  <span>1. Acceptance of Terms</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    By accessing or using CipherLuma's services, you agree to be bound by these Terms of Service ("Terms"). 
                    If you disagree with any part of these terms, you may not access our services.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, and others who access or use our payment processing and 
                    financial services platform.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                    <Shield className="h-5 w-5 text-white" />
                  </span>
                  <span>2. Description of Services</span>
                </h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    CipherLuma provides global payment processing services, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>International money transfers</li>
                    <li>Multi-currency account management</li>
                    <li>API access for developers and businesses</li>
                    <li>Mobile money integration</li>
                    <li>Cryptocurrency payment processing</li>
                    <li>Compliance and KYC verification services</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any part of our services at any time 
                    with reasonable notice to users.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts and Registration</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    To use our services, you must create an account and provide accurate, complete information. 
                    You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                    <li>Providing truthful and accurate information during registration</li>
                  </ul>
                  <p>
                    You must be at least 18 years old to create an account. By creating an account, you represent 
                    and warrant that you meet this age requirement.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Know Your Customer (KYC) and Compliance</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    As a regulated financial services provider, we are required to verify the identity of our users. 
                    You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide valid government-issued identification</li>
                    <li>Submit proof of address documentation</li>
                    <li>Answer questions about the source of your funds</li>
                    <li>Cooperate with additional verification requests</li>
                  </ul>
                  <p>
                    Failure to complete KYC verification may result in account limitations or closure. We reserve 
                    the right to request additional documentation at any time.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Prohibited Activities</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    You agree not to use our services for any illegal or prohibited activities, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Money laundering or terrorist financing</li>
                    <li>Fraud, theft, or any other criminal activity</li>
                    <li>Transactions involving illegal goods or services</li>
                    <li>Gambling or adult entertainment services (where prohibited)</li>
                    <li>Circumventing our security measures or policies</li>
                    <li>Creating multiple accounts to evade restrictions</li>
                  </ul>
                  <p>
                    Violation of these prohibitions may result in immediate account suspension and legal action.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Fees and Charges</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    Our fee structure is transparent and available on our website. Fees may include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Transaction fees for transfers</li>
                    <li>Currency conversion charges</li>
                    <li>Account maintenance fees (if applicable)</li>
                    <li>Premium service charges</li>
                  </ul>
                  <p>
                    We reserve the right to modify our fees with 30 days' notice. Continued use of our services 
                    after fee changes constitutes acceptance of the new fee structure.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    To the maximum extent permitted by law, CipherLuma shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Loss of profits or revenue</li>
                    <li>Loss of data or information</li>
                    <li>Business interruption</li>
                    <li>Loss of goodwill</li>
                  </ul>
                  <p>
                    Our total liability for any claim shall not exceed the amount of fees paid by you to us in 
                    the 12 months preceding the claim.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Dispute Resolution</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    Any disputes arising from these Terms or our services shall be resolved through binding arbitration 
                    in accordance with the rules of the International Chamber of Commerce (ICC).
                  </p>
                  <p>
                    You agree to waive your right to participate in class action lawsuits or class-wide arbitration.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Termination</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    We may terminate or suspend your account immediately, without prior notice, for any reason, 
                    including breach of these Terms.
                  </p>
                  <p>
                    Upon termination, your right to use our services will cease immediately. We will work with you 
                    to return any remaining funds in accordance with applicable laws and regulations.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to Terms</h2>
                <div className="text-blue-100 space-y-4">
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify users of significant 
                    changes via email or through our platform.
                  </p>
                  <p>
                    Your continued use of our services after changes become effective constitutes acceptance of 
                    the revised Terms.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="border-t border-blue-500/30 pt-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="text-blue-100 space-y-2">
                  <p>If you have questions about these Terms, please contact us:</p>
                  <p><strong>Email:</strong> legal@cipherluma.com</p>
                  <p><strong>Address:</strong> CipherLuma Legal Department, 123 Financial District, Global City, GC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </section>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span>These terms are effective as of January 20, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;