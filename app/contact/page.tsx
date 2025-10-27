import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Mail, MessageSquare, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | BakeProfit',
  description: 'Get in touch with BakeProfit. We&apos;re here to help with questions, support, and feedback about our bakery management software.',
  keywords: 'contact, support, help, email, customer service',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header showBlog showTools />
        <div className="max-w-4xl pt-2 mx-auto">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
        </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Have questions or feedback? We&apos;d love to hear from you. Reach out to our team.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">
                For general inquiries, support, and feedback
              </p>
              <a
                href="mailto:ajejey@gmail.com"
                className="text-rose-600 hover:text-rose-700 font-semibold"
              >
                ajejey@gmail.com
              </a>
            </div>

            {/* Response Time */}
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600 mb-4">
                We typically respond within 24 hours
              </p>
              <p className="text-sm text-gray-500">
                Monday - Friday, 9 AM - 6 PM IST
              </p>
            </div>

            {/* Support */}
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 mb-4">
                Pro plan members get priority support
              </p>
              <p className="text-sm text-gray-500">
                All inquiries are welcome
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">How We Can Help</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">General Questions</h3>
                <p className="text-gray-600">
                  Have questions about BakeProfit features, pricing, or how to get started? We&apos;re here to help!
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Technical Support</h3>
                <p className="text-gray-600">
                  Experiencing issues with the app? Our support team can help troubleshoot and resolve problems quickly.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Feature Requests</h3>
                <p className="text-gray-600">
                  Have an idea for a new feature? We&apos;d love to hear your suggestions and feedback to improve BakeProfit.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Billing & Subscription</h3>
                <p className="text-gray-600">
                  Questions about your subscription, billing, or the 30-day money-back guarantee? We&apos;re happy to assist.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Data & Privacy</h3>
                <p className="text-gray-600">
                  Have concerns about your data or privacy? Contact us for detailed information about how we protect your information.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Business Inquiries</h3>
                <p className="text-gray-600">
                  Interested in partnerships, integrations, or other business opportunities? We&apos;d like to explore possibilities with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How do I contact support?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                You can reach our support team by emailing ajejey@gmail.com. We typically respond within 24 hours during business hours (Monday - Friday, 9 AM - 6 PM IST).
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do you offer phone support?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Currently, we support inquiries through email. This allows us to provide detailed, well-researched responses to your questions. For urgent matters, please mark your email as urgent.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What&apos;s your response time?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                We aim to respond to all inquiries within 24 hours during business hours. Pro plan members receive priority support and may see faster response times.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How do I report a bug?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Please email us at ajejey@gmail.com with details about the bug, including what you were doing when it occurred, what you expected to happen, and what actually happened. Screenshots are helpful too!
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I request a new feature?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Absolutely! We love hearing feature requests from our users. Email us at ajejey@gmail.com with your idea, and explain how it would help your bakery business. We review all suggestions carefully.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How do I delete my account?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                To delete your account and all associated data, please email us at ajejey@gmail.com with your request. We&apos;ll process it within 7 business days and provide confirmation once complete.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How do I request my data?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                You can request a copy of your data at any time by emailing ajejey@gmail.com. We&apos;ll provide your data in a portable format within 30 days, as required by GDPR and other privacy regulations.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl border border-gray-200 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do you have a refund policy?
                <span className="text-rose-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! We offer a 30-day money-back guarantee on all Pro plan purchases. If you&apos;re not satisfied, simply email us at ajejey@gmail.com and we&apos;ll refund your money, no questions asked.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Have any questions before signing up? Feel free to reach out!
          </p>
          <a
            href="mailto:ajejey@gmail.com"
            className="inline-block bg-white text-rose-600 px-8 py-3 rounded-full font-bold hover:bg-rose-50 transition-colors"
          >
            Send us an Email
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>© 2025 BakeProfit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
