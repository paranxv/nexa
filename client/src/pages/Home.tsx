import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HeroSection } from '../components/HeroSection'
import { PricingCard, Plan } from '../components/PricingCard'
import { AddonServices } from '../components/AddonServices'
import { CartDrawer } from '../components/CartDrawer'
import { LaptopCard } from '../components/LaptopCard'
import { api } from '../api/client'

// Images (Fallback or mapped if needed, though backend should provide URLs)
import basicBox from '../assets/box_basic.png'
import advancedBox from '../assets/box_advanced.png'
import premiumBox from '../assets/box_premium.png'

export function Home() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [addons, setAddons] = useState<any[]>([])
    const [laptops, setLaptops] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')
                // Only show Nexatechsol plans and addons on Home page
                const allProducts = response.data


                // Separate Plans and Addons based on price or title naming convention
                // Or ideally backend separates them. 
                // For now, let's assume "Plan" -> Plan, others -> Addon or filter by price high/low
                // But since we filtered for Nexatechsol, we are safe from Laptops and other AVs.

                const fetchedPlans = allProducts.filter((p: any) => p.brand === 'Nexatechsol' && p.price >= 100).map((p: any) => ({
                    ...p,
                    // Parse features if string
                    features: typeof p.features === 'string' ? JSON.parse(p.features).map((f: string) => ({ text: f })) : [],
                    // Map local images if URL matches seed
                    image_url: p.image_url.includes('basic') ? basicBox :
                        p.image_url.includes('advanced') ? advancedBox :
                            p.image_url.includes('premium') ? premiumBox : p.image_url,
                    // Add UI flags based on title
                    popular: p.title.includes('ADVANCED'),
                    bestValue: p.title.includes('PREMIUM'),
                    duration: '1 Year'
                }))

                const fetchedAddons = allProducts.filter((p: any) => p.brand === 'Nexatechsol' && p.price < 100).map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    price: p.price
                }))

                // Laptops - Filter by title containing "Laptop"
                const fetchedLaptops = allProducts.filter((p: any) => p.title.toLowerCase().includes('laptop'))

                setPlans(fetchedPlans)
                setAddons(fetchedAddons)
                setLaptops(fetchedLaptops)
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

                <div className="mt-24 max-w-4xl mx-auto">
                    <AddonServices addons={addons} />
                </div>

                <div className="mt-20 bg-light-gray rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-4">Why choose Nexatechsol?</h2>
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
