import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HeroSection } from '../components/HeroSection'
import { PricingCard, Plan } from '../components/PricingCard'
import { AddonServices } from '../components/AddonServices'
import { CartDrawer } from '../components/CartDrawer'
import { LaptopCard } from '../components/LaptopCard'
import { api } from '../api/client'
import { HARDCODED_PLANS } from '../constants/plans'

// Images (Fallback or mapped if needed, though backend should provide URLs)
import basicBox from '../assets/plus.png'
import advancedBox from '../assets/pro.png'
import premiumBox from '../assets/premium.png'

export function Home() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [addons, setAddons] = useState<any[]>([])
    const [laptops, setLaptops] = useState<any[]>([])
    const [printers, setPrinters] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')
                // Only show Nexatechsol plans and addons on Home page
                const allProducts = response.data

                // Use HARDCODED_PLANS but map images correctly
                const fetchedPlans = HARDCODED_PLANS.map(p => ({
                    ...p,
                    image_url: p.image_url === 'plus' ? basicBox :
                        p.image_url === 'pro' ? advancedBox :
                            p.image_url === 'premium' ? premiumBox : basicBox
                }))

                const fetchedAddons = allProducts.filter((p: any) => p.brand === 'Nexatechsol' && p.price < 100).map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    price: p.price
                }))

                // Laptops - Filter by title containing "Laptop"
                const fetchedLaptops = allProducts.filter((p: any) => p.title.toLowerCase().includes('laptop'))
                const fetchedPrinters = allProducts.filter((p: any) => p.title.toLowerCase().includes('printer'))

                setPlans(fetchedPlans)
                setAddons(fetchedAddons)
                setLaptops(fetchedLaptops)
                setPrinters(fetchedPrinters)
            } catch (error) {
                console.error("Failed to fetch products", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />
            <HeroSection />

            <main className="container mx-auto py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">Choose Your Protection Plan</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Comprehensive security solutions tailored to your needs. All plans include our premium 24/7 support.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map(plan => (
                        <PricingCard key={plan.id} plan={plan} />
                    ))}
                </div>

                {/* Laptops Section */}
                {laptops.length > 0 && (
                    <div className="mt-32">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-dark-gray mb-4">Premium Laptops</h2>
                            <p className="text-red-500 font-medium bg-red-50 inline-block px-4 py-1 rounded-full text-sm">
                                Currently Out of Stock due to high demand
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {laptops.map((laptop: any) => (
                                <LaptopCard key={laptop.id} product={laptop} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Printers Section */}
                {printers.length > 0 && (
                    <div className="mt-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-dark-gray mb-4">Printers & Accessories</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                High-performance printers from top brands like HP, Canon, Brother, and Epson.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {printers.map((printer: any) => (
                                <LaptopCard key={printer.id} product={printer} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-24 max-w-4xl mx-auto">
                    <AddonServices addons={addons} />
                </div>

                <div className="mt-20 bg-light-gray rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                    <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-sm text-gray-600">
                        <section>
                            <h4 className="font-bold text-dark-gray mb-2">Disclaimer:</h4>
                            <p>
                                Hardware Manufacturers and Independent Software Vendors provide standard warranties with their products free of cost, if you purchased a new product from nexatechsol.com or directly from the manufacturer, and you are covered under standard warranty, we highly recommend that you register your purchase with the manufacturer and reach out to their in-house customer service teams.
                            </p>
                        </section>

                        <p>
                            Please read on if you are looking for an extended Protection Plan for your Products and are looking for total protection (hardware, software and managed service) beyond the standard warranty. In that case, NexatechTotal Protection is for you.
                        </p>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary/20">
                            <p className="font-medium text-primary mb-2">Need Help?</p>
                            <p className="mb-4">
                                Is your computer running too slow? Are file downloads and transfers taking longer than usual? Does your system keep restarting? Do you have Internet connectivity or printer-related issues? A simple thing to do is to call Nexatech repair experts. Call <span className="font-bold text-secondary">1-888 431 7172</span> to get help now.
                            </p>
                            <p className="text-xs text-gray-500">
                                ** We are committed to providing world-class support to our customers. As part of Virtual Assistance Service, we help our customers price match services. Helping you find great deals on purchases helps you save money.
                            </p>
                        </div>

                        <p className="text-xs italic">
                            *** Nexatech Plans can be canceled anytime. The refunds will be made on pro-rata basis. In case of cancellation, one-time incident fee of $29 is payable.
                        </p>

                        <p className="text-xs font-bold">
                            *Nexatech Total Protection is an Annual Membership Plan that can be renewed every year at Customer's request. Nexatech Pro cannot be auto-renewed.
                        </p>

                        <div className="mt-8 border-t pt-8">
                            <h2 className="text-2xl font-bold mb-4">Why choose Nexatechsol?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">1</div>
                                    <p className="font-medium">Instant digital delivery to your email.</p>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">2</div>
                                    <p className="font-medium">Official reseller guarantees generic software.</p>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">3</div>
                                    <p className="font-medium">24/7 Premium technical support included.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Background Decoration */}
                    <div className="absolute right-0 bottom-0 opacity-10">
                        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#1a237e" d="M42.7,-73.2C55.9,-67.1,67.9,-58.3,77.3,-47.4C86.7,-36.4,93.5,-23.3,92.6,-10.5C91.7,2.3,83.1,14.8,74.7,26.4C66.3,38,58.1,48.7,48,56.8C38,64.9,26.1,70.4,13.6,72.8C1.1,75.2,-12,74.5,-24.1,70.1C-36.2,65.7,-47.4,57.7,-57.1,47.8C-66.8,37.9,-75,26.1,-78.9,12.7C-82.8,-0.7,-82.4,-15.6,-76.3,-28.9C-70.2,-42.2,-58.4,-53.8,-45.8,-60.2C-33.2,-66.6,-19.9,-67.7,-6.2,-66.6C7.5,-65.5,15,-62.2,29.5,-79.3L42.7,-73.2Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                </div>
            </main>

            <Footer />
            <CartDrawer />
        </div>
    )
}
