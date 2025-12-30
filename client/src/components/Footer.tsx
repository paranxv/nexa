import { ShieldCheck, Lock } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-dark-gray text-white pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-white">nexa</h3>
                        <p className="text-gray-400 mb-4">
                            Premium antivirus solutions for your digital life. protection you can trust.
                        </p>
                        <div className="flex bg-white/5 p-4 rounded items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-secondary" />
                            <div>
                                <p className="font-bold text-sm">Official Partner</p>
                                <p className="text-xs text-gray-400">Authorized Reseller</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-secondary">All Products</a></li>
                            <li><a href="#" className="hover:text-secondary">Antivirus Bundles</a></li>
                            <li><a href="#" className="hover:text-secondary">VPN Solutions</a></li>
                            <li><a href="#" className="hover:text-secondary">Business Security</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><span className="text-secondary font-bold">888 431 7172</span></li>
                            <li><a href="mailto:support@nexa.com" className="hover:text-secondary">support@nexa.com</a></li>
                            <li><a href="#" className="hover:text-secondary">FAQs</a></li>
                            <li><a href="#" className="hover:text-secondary">License Retrieval</a></li>
                            <li><a href="#" className="hover:text-secondary">Installation Guide</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Secure Payment</h4>
                        <p className="text-gray-400 mb-4 text-sm">
                            We use 256-bit SSL encryption to ensure your payment details are safe.
                        </p>
                        <div className="flex gap-2 mb-4">
                            {/* Mock Icons */}
                            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black text-xs font-bold">VISA</div>
                            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black text-xs font-bold">MC</div>
                            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black text-xs font-bold">PP</div>
                        </div>
                        <div className="flex items-center gap-2 text-secondary text-sm">
                            <Lock className="w-4 h-4" />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Nexa. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
