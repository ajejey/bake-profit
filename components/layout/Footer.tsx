import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-rose-400 transition-colors">Pricing</Link></li>
              <li><Link href="/tools" className="hover:text-rose-400 transition-colors">Free Tools</Link></li>
              <li><Link href="/blog" className="hover:text-rose-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-rose-400 transition-colors">Contact</Link></li>
              <li><a href="mailto:ajejey@gmail.com" className="hover:text-rose-400 transition-colors">Email</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-rose-400 transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-rose-400 transition-colors">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/refund-policy" className="hover:text-rose-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} BakeProfit. All rights reserved. Made with ❤️ for bakers.</p>
        </div>
      </div>
    </footer>
  );
}
