import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Refund Policy | BakeProfit',
  description: 'BakeProfit 30-day money-back guarantee refund policy. Learn how to request a refund and our terms.',
  keywords: 'refund policy, money-back guarantee, returns, refunds',
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header showBlog showTools />

        <div className="max-w-4xl pt-2 mx-auto">
          <Breadcrumbs items={[{ label: 'Refund Policy' }]} />
        </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 27, 2025</p>

          {/* Guarantee Banner */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-bold text-green-900 mb-2">30-Day Money-Back Guarantee</h2>
                <p className="text-green-800">
                  We&apos;re confident you&apos;ll love BakeProfit Pro. If you&apos;re not satisfied within 30 days of purchase, we&apos;ll refund your money in full, no questions asked.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* 1. Overview */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
              <p>
                BakeProfit offers a 30-day money-back guarantee on all Pro plan purchases. This policy is designed to give you complete peace of mind when upgrading to Pro. If you&apos;re not satisfied with the Pro plan for any reason, we&apos;ll refund your money in full.
              </p>
            </section>

            {/* 2. Who is Eligible */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Who is Eligible</h2>
              <p>
                <strong>Eligible for Refund:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>All Pro plan subscribers</li>
                <li>Both monthly and annual subscriptions</li>
                <li>Refund requests made within 30 days of purchase</li>
              </ul>

              <p className="mt-6">
                <strong>Not Eligible for Refund:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Free plan users (no payment made)</li>
                <li>Refund requests made after 30 days</li>
                <li>Chargebacks or disputes filed with payment providers</li>
              </ul>
            </section>

            {/* 3. Refund Eligibility Period */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Eligibility Period</h2>
              <p>
                <strong>30-Day Window:</strong> The refund eligibility period begins on the date of your purchase and ends 30 days later. You must request a refund within this 30-day window to be eligible.
              </p>
              <p className="mt-4">
                <strong>Example:</strong> If you purchase a Pro subscription on January 15, you have until February 14 to request a refund.
              </p>
            </section>

            {/* 4. How to Request a Refund */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to Request a Refund</h2>
              <p>
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-3 mt-4">
                <li>
                  <strong>Email us:</strong> Send an email to ajejey@gmail.com with the subject line &quot;Refund Request&quot;
                </li>
                <li>
                  <strong>Provide details:</strong> Include your account email address and the date of purchase
                </li>
                <li>
                  <strong>Optional:</strong> Let us know why you&apos;re requesting a refund (this helps us improve)
                </li>
                <li>
                  <strong>Wait for confirmation:</strong> We&apos;ll process your request within 7 business days
                </li>
              </ol>
            </section>

            {/* 5. Refund Processing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing</h2>
              <p>
                <strong>Processing Time:</strong> Once we receive your refund request, we will process it within 7 business days. The refund will be issued to your original payment method.
              </p>
              <p className="mt-4">
                <strong>Payment Method Refunds:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Razorpay:</strong> Refunds typically appear within 5-7 business days</li>
                <li><strong>PayPal:</strong> Refunds typically appear within 3-5 business days</li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> Refund timelines depend on your payment provider and bank. Some banks may take additional time to process the refund.
              </p>
            </section>

            {/* 6. Refund Conditions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Conditions</h2>
              <p>
                To be eligible for a refund, the following conditions must be met:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Refund request must be made within 30 days of purchase</li>
                <li>You must be the original purchaser or authorized account holder</li>
                <li>No chargebacks or disputes have been filed with your payment provider</li>
                <li>Your account must not have been used for fraudulent purposes</li>
              </ul>
            </section>

            {/* 7. Partial Refunds */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Partial Refunds</h2>
              <p>
                <strong>Monthly Subscriptions:</strong> If you request a refund after the first billing cycle, you will receive a refund for the current month only. Previous months are not refundable.
              </p>
              <p className="mt-4">
                <strong>Annual Subscriptions:</strong> Annual subscriptions are eligible for a full refund within 30 days of purchase. After 30 days, no refunds are available.
              </p>
            </section>

            {/* 8. Account Status After Refund */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Account Status After Refund</h2>
              <p>
                Once a refund is processed, your Pro subscription will be cancelled and your account will revert to the Free plan. You will retain access to all your data, but will be limited to Free plan features (5 recipes, 15 orders/month, etc.).
              </p>
              <p className="mt-4">
                You can upgrade to Pro again at any time if you change your mind.
              </p>
            </section>

            {/* 9. Chargebacks and Disputes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Chargebacks and Disputes</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded my-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-800">
                    <strong>Important:</strong> If you file a chargeback or dispute with your payment provider instead of requesting a refund directly from us, we reserve the right to suspend or terminate your account.
                  </p>
                </div>
              </div>
              <p>
                Please contact us directly at ajejey@gmail.com to resolve any billing issues before involving your payment provider.
              </p>
            </section>

            {/* 10. Exceptions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Exceptions</h2>
              <p>
                The following situations may result in a refund being denied:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Refund request made after 30 days from purchase</li>
                <li>Multiple refund requests for the same purchase</li>
                <li>Account used for fraudulent or abusive purposes</li>
                <li>Chargeback or dispute filed with payment provider</li>
                <li>Refund already processed for this purchase</li>
              </ul>
            </section>

            {/* 11. Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about our refund policy or need to request a refund, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> <a href="mailto:ajejey@gmail.com" className="text-rose-600 hover:text-rose-700">ajejey@gmail.com</a>
              </p>
              <p className="mt-2">
                <strong>Subject:</strong> Refund Request
              </p>
            </section>

            {/* 12. Policy Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Policy Changes</h2>
              <p>
                BakeProfit reserves the right to modify this refund policy at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Service following the posting of revised terms means you accept and agree to the changes.
              </p>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>

              <div className="space-y-4 mt-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Can I get a refund after 30 days?</h4>
                  <p className="text-gray-600">
                    No, our refund policy covers purchases within 30 days only. However, you can cancel your subscription at any time and revert to the Free plan.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Do I lose my data if I request a refund?</h4>
                  <p className="text-gray-600">
                    No, your data remains safe. After a refund, your account reverts to the Free plan, and you retain all your data. You can still access your recipes, customers, and orders within the Free plan limits.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">How long does a refund take?</h4>
                  <p className="text-gray-600">
                    We process refunds within 7 business days. The refund will then appear in your original payment method within 3-7 business days, depending on your bank.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Can I get a refund for multiple months?</h4>
                  <p className="text-gray-600">
                    For monthly subscriptions, only the current month is refundable if requested within 30 days of that specific charge. For annual subscriptions, the full year is refundable within 30 days of purchase.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">What if I paid with a different payment method?</h4>
                  <p className="text-gray-600">
                    Refunds are always issued to the original payment method used for the purchase. If you used Razorpay or PayPal, the refund will go back to that account.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Can I request a refund if I filed a chargeback?</h4>
                  <p className="text-gray-600">
                    No. If you&apos;ve already filed a chargeback or dispute with your payment provider, we cannot process a refund. Please withdraw the chargeback first and then contact us.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
