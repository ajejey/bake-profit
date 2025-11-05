import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | BakeProfit',
  description: 'Terms of Service for BakeProfit bakery management software. Read our complete terms, conditions, and user agreement.',
  keywords: 'terms of service, terms and conditions, user agreement, legal',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header showBlog showTools />

        <div className="max-w-4xl pt-2 mx-auto">
          <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
        </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 27, 2025</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* 1. Agreement to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using BakeProfit (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to abide by the above, please do not use this service. BakeProfit reserves the right to update and change these Terms of Service at any time without notice. Your continued use of the Service following the posting of revised Terms of Service means that you accept and agree to the changes.
              </p>
            </section>

            {/* 2. Use License */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on BakeProfit for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on BakeProfit</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Engaging in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service</li>
                <li>Obtaining or attempting to obtain any materials or information through any means not intentionally made available</li>
              </ul>
            </section>

            {/* 3. Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
              <p>
                The materials on BakeProfit are provided on an &apos;as is&apos; basis. BakeProfit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mt-4">
                Further, BakeProfit does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </section>

            {/* 4. Limitations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
              <p>
                In no event shall BakeProfit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BakeProfit, even if BakeProfit or a BakeProfit authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            {/* 5. Accuracy of Materials */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on BakeProfit could include technical, typographical, or photographic errors. BakeProfit does not warrant that any of the materials on its website are accurate, complete, or current. BakeProfit may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            {/* 6. Materials and Content */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Materials and Content</h2>
              <p>
                The materials on BakeProfit&apos;s website are protected by copyright law and international treaties. You may not modify, copy, reproduce, republish, upload, post, transmit, or distribute these materials in any way without BakeProfit&apos;s prior written permission.
              </p>
            </section>

            {/* 7. User Data and Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Data and Privacy</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. You must notify BakeProfit immediately of any unauthorized uses of your account.
              </p>
              <p className="mt-4">
                BakeProfit stores your data securely. For free plan users, data is stored locally in your browser. For Pro plan users, data is stored locally and synced to your Google Drive account. We never access, sell, or share your data with third parties.
              </p>
            </section>

            {/* 8. Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Payment Terms</h2>
              <p>
                <strong>Free Plan:</strong> The Free plan is available at no cost and can be used indefinitely. No payment information is required.
              </p>
              <p className="mt-4">
                <strong>Pro Plan:</strong> The Pro plan is available for $6.99 USD per month or $69 USD per year. Payments are processed through Razorpay and/or PayPal. By subscribing to the Pro plan, you authorize BakeProfit to charge your payment method on a recurring basis.
              </p>
              <p className="mt-4">
                <strong>Billing Cycle:</strong> Your billing cycle begins on the date you subscribe. Charges will be applied on the same day each month (for monthly plans) or year (for annual plans).
              </p>
              <p className="mt-4">
                <strong>Cancellation:</strong> You may cancel your Pro subscription at any time. Cancellation will take effect at the end of your current billing cycle. No refunds will be issued for partial months or years, except as provided in our Money-Back Guarantee.
              </p>
              <p className="mt-4">
                <strong>Money-Back Guarantee:</strong> If you are not satisfied with the Pro plan within 30 days of purchase, we will refund your money in full, no questions asked. Contact us at ajejey@gmail.com to request a refund.
              </p>
            </section>

            {/* 9. Payment Processing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Payment Processing</h2>
              <p>
                Payments are processed securely through Razorpay and/or PayPal. BakeProfit does not store your credit card information. All payment processing is handled by these third-party payment processors in accordance with their terms of service and privacy policies.
              </p>
              <p className="mt-4">
                By making a payment, you represent and warrant that you are authorized to use the payment method and that the information you provide is accurate and complete.
              </p>
            </section>

            {/* 10. Refunds and Chargebacks */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Refunds and Chargebacks</h2>
              <p>
                Refunds are available within 30 days of purchase under our Money-Back Guarantee. After 30 days, refunds are not available except as required by law.
              </p>
              <p className="mt-4">
                If you initiate a chargeback with your payment provider, we reserve the right to suspend or terminate your account. Chargebacks should be resolved directly with BakeProfit before involving your payment provider.
              </p>
            </section>

            {/* 11. Prohibited Uses */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Prohibited Uses</h2>
              <p>You agree not to use BakeProfit for any of the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Harassing, threatening, or abusing others</li>
                <li>Transmitting obscene or offensive content</li>
                <li>Disrupting the normal flow of dialogue within BakeProfit</li>
                <li>Attempting to gain unauthorized access to BakeProfit systems</li>
                <li>Engaging in any form of automated data collection or scraping</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
              </ul>
            </section>

            {/* 12. Intellectual Property Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Intellectual Property Rights</h2>
              <p>
                BakeProfit and its content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by BakeProfit, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            {/* 13. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Limitation of Liability</h2>
              <p>
                In no event shall BakeProfit, its directors, employees, or agents be liable to you for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service, even if BakeProfit has been advised of the possibility of such damages.
              </p>
            </section>

            {/* 14. Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless BakeProfit and its officers, directors, employees, agents, and suppliers from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in connection with your use of BakeProfit or violation of these Terms of Service.
              </p>
            </section>

            {/* 15. Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Termination</h2>
              <p>
                BakeProfit may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms of Service.
              </p>
              <p className="mt-4">
                Upon termination, your right to use the Service will immediately cease. We will make reasonable efforts to provide you with a copy of your data upon request.
              </p>
            </section>

            {/* 16. Modifications to Service */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Modifications to Service</h2>
              <p>
                BakeProfit reserves the right to modify or discontinue the Service (or any part thereof) with or without notice. BakeProfit shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>

            {/* 17. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Governing Law</h2>
              <p>
                These Terms of Service and any separate agreements we may enter into to provide the Service are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* 18. Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Dispute Resolution</h2>
              <p>
                Any dispute arising out of or relating to these Terms of Service shall be resolved through good faith negotiation. If negotiation fails, disputes shall be resolved through arbitration or litigation as permitted by law in India.
              </p>
            </section>

            {/* 19. Entire Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Entire Agreement</h2>
              <p>
                These Terms of Service, together with our Privacy Policy and any other legal notices published by BakeProfit, constitute the entire agreement between you and BakeProfit concerning the Service and supersede all prior agreements and understandings.
              </p>
            </section>

            {/* 20. Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> <a href="mailto:ajejey@gmail.com" className="text-rose-600 hover:text-rose-700">ajejey@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
