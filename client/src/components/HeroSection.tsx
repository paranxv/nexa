import { motion } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative bg-primary overflow-hidden py-16 lg:py-24">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary text-sm font-bold mb-6">
                            <Shield className="w-4 h-4" />
                            <span>Official Partner of Top Brands</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Ultimate Protection for Your <span className="text-secondary">Digital Life</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-lg">
                            Get premium antivirus bundles at unbeatable prices. Secure your devices, protect your data, and browse with confidence.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="btn btn-primary flex items-center gap-2">
                                Shop Deals <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="px-6 py-3 rounded font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                                View Features
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                            {/* Brand Logos Placeholder text */}
                            <span className="text-white font-bold text-xl">NORTON</span>
                            <span className="text-white font-bold text-xl">McAFEE</span>
                            <span className="text-white font-bold text-xl">KASPERSKY</span>
                            <span className="text-white font-bold text-xl">BITDEFENDER</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                            <img
                                src="https://placehold.co/800x600/1a237e/FFF?text=Premium+Security+Suite"
                                alt="Antivirus Dashboard"
                                className="w-full h-auto"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <p className="text-secondary font-bold">Limited Time Offer</p>
                                <p className="text-white text-2xl font-bold">Save up to 70% today</p>
                            </div>
                        </div>
                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                                    <p className="font-bold text-green-600">Protected</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
