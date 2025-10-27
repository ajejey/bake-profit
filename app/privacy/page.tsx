import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy | BakeProfit',
  description: 'Privacy Policy for BakeProfit. Learn how we protect your data and respect your privacy. GDPR and CCPA compliant.',
  keywords: 'privacy policy, data protection, GDPR, CCPA, privacy',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header showBlog showTools />

        <div className="max-w-4xl pt-2 mx-auto">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
        </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 27, 2025</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p>
                BakeProfit (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Company&quot;) operates the BakeProfit website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
              <p className="mt-4">
                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms of Service.
              </p>
            </section>

            {/* 1. Information Collection and Use */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information Collection and Use</h2>
              <p>
                We collect different types of information for various purposes to provide and improve our Service to you.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.1 Types of Data Collected</h3>

              <h4 className="font-semibold text-gray-900 mt-4 mb-2">Personal Data:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Email address (for account creation and communication)</li>
                <li>Name (optional, for personalization)</li>
                <li>Payment information (processed through Razorpay/PayPal, not stored by us)</li>
                <li>Usage data (how you interact with the Service)</li>
              </ul>

              <h4 className="font-semibold text-gray-900 mt-4 mb-2">Bakery Business Data:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Recipes and ingredients</li>
                <li>Customer information</li>
                <li>Order details</li>
                <li>Inventory information</li>
                <li>Pricing and profit calculations</li>
              </ul>

              <h4 className="font-semibold text-gray-900 mt-4 mb-2">Usage Data:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URL</li>
                <li>Pages visited and time spent</li>
                <li>IP address (anonymized)</li>
              </ul>
            </section>

            {/* 2. Data Storage and Location */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data Storage and Location</h2>
              <p>
                <strong>Free Plan Users:</strong> Your data is stored locally in your browser using browser storage (localStorage). We do not have access to this data. It remains entirely on your device.
              </p>
              <p className="mt-4">
                <strong>Pro Plan Users:</strong> Your data is stored locally in your browser AND automatically synced to your Google Drive account. We do not store your data on our servers. The sync is handled directly between your browser and your Google Drive account.
              </p>
              <p className="mt-4">
                <strong>Data Location:</strong> Google Drive data is stored in accordance with Google&apos;s data center policies, which may be in multiple countries.
              </p>
            </section>

            {/* 3. Use of Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Data</h2>
              <p>BakeProfit uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            {/* 4. Security of Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
              <p className="mt-4">
                <strong>Our Security Measures:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>HTTPS encryption for all data in transit</li>
                <li>Local storage encryption in your browser</li>
                <li>No storage of sensitive payment information</li>
                <li>Regular security audits and updates</li>
                <li>Secure authentication mechanisms</li>
              </ul>
            </section>

            {/* 5. Sharing of Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sharing of Data</h2>
              <p>
                <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
              </p>
              <p className="mt-4">
                We may share your data only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Service Providers:</strong> We may share data with third parties who provide services on our behalf (e.g., Razorpay, PayPal for payments; Google for Drive sync)</li>
                <li><strong>Legal Requirements:</strong> If required by law or if we believe in good faith that such action is necessary to comply with legal obligations</li>
                <li><strong>Business Transfers:</strong> If BakeProfit is involved in a merger, acquisition, or bankruptcy, your data may be transferred as part of that transaction</li>
              </ul>
            </section>

            {/* 6. Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
              <p>
                Our Service may contain links to third-party websites and services that are not operated by us. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services before providing your information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Third-Party Services We Use:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Razorpay:</strong> Payment processing. See their privacy policy at razorpay.com</li>
                <li><strong>PayPal:</strong> Payment processing. See their privacy policy at paypal.com</li>
                <li><strong>Google Drive:</strong> Data sync for Pro users. See Google&apos;s privacy policy at google.com/policies/privacy</li>
              </ul>
            </section>

            {/* 7. Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal data:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">GDPR Rights (EU/EEA Residents):</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate data</li>
                <li>Right to erase your data (&quot;right to be forgotten&quot;)</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent at any time</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">CCPA Rights (California Residents):</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether personal information is sold or disclosed</li>
                <li>Right to say no to the sale or sharing of personal information</li>
                <li>Right to delete personal information collected</li>
                <li>Right to correct inaccurate personal information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Exercise Your Rights:</h3>
              <p className="mt-4">
                To exercise any of these rights, please contact us at ajejey@gmail.com with your request. We will respond within 30 days (or as required by applicable law).
              </p>
            </section>

            {/* 8. Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p>
                <strong>Free Plan Users:</strong> Your data is retained as long as you use the Service. You can delete your account and all associated data at any time.
              </p>
              <p className="mt-4">
                <strong>Pro Plan Users:</strong> Your data is retained as long as your subscription is active. Upon cancellation, you have 30 days to download your data. After 30 days, your data will be deleted from our systems.
              </p>
              <p className="mt-4">
                <strong>Account Deletion:</strong> You can request complete deletion of your account and all data at any time by contacting us at ajejey@gmail.com.
              </p>
            </section>

            {/* 9. Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p className="mt-4">
                <strong>Types of Cookies We Use:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Essential Cookies:</strong> Required for the Service to function</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use the Service</li>
                <li><strong>Authentication Cookies:</strong> Keep you logged in</li>
              </ul>
            </section>

            {/* 10. Children&apos;s Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 18 (&quot;Children&quot;). We do not knowingly collect personally identifiable information from children under 18. If we become aware that a child under 18 has provided us with Personal Data, we will delete such information and terminate the child&apos;s account immediately.
              </p>
            </section>

            {/* 11. Changes to This Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this Privacy Policy.
              </p>
            </section>

            {/* 12. Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> <a href="mailto:ajejey@gmail.com" className="text-rose-600 hover:text-rose-700">ajejey@gmail.com</a>
              </p>
            </section>

            {/* 13. Data Protection Officer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Data Protection Officer</h2>
              <p>
                For GDPR-related inquiries, you can contact our Data Protection Officer at ajejey@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>© 2025 BakeProfit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
