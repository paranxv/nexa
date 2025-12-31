import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HeroSection } from '../components/HeroSection'
import { PricingCard, Plan } from '../components/PricingCard'
import { AddonServices } from '../components/AddonServices'
import { CartDrawer } from '../components/CartDrawer'

// Images
import basicBox from '../assets/box_basic.png'
import advancedBox from '../assets/box_advanced.png'
import premiumBox from '../assets/box_premium.png'

const PLANS: Plan[] = [
    {
        id: 1,
        title: "BASIC SECURITY & SUPPORT PLAN",
        price: 179,
        duration: "1 Year",
        description: "Best for single users / basic protection",
        image_url: basicBox,
        features: [
            { text: "Protection for 1 Device (PC or Mac)" },
            { text: "Antivirus + Anti-Malware Protection" },
            { text: "Real-Time Threat Monitoring" },
            { text: "Spyware & Adware Removal" },
            { text: "One-Time PC Health Check" },
            { text: "Basic Firewall Configuration" },
            { text: "Email Support + Limited Phone Support" },
            { text: "Installation & Setup Assistance" },
            { text: "OS Optimization (basic)" }
        ]
    },
    {
        id: 2,
        title: "ADVANCED SECURITY & TECH SUPPORT",
        price: 279,
        duration: "1 Year",
        description: "Most Popular Plan",
        image_url: advancedBox,
        popular: true,
        features: [
            { text: "Includes everything in Basic, PLUS:" },
            { text: "Protection for Up to 3 Devices" },
            { text: "Advanced Firewall Protection" },
            { text: "Ransomware Protection" },
            { text: "Browser & Online Banking Security" },
            { text: "Data Cleanup & Performance Tune-Up" },
            { text: "Unlimited Virus & Malware Removal" },
            { text: "Unlimited Phone & Chat Support" },
            { text: "Monthly System Health Monitoring" },
            { text: "Software Update Assistance" }
        ]
    },
    {
        id: 3,
        title: "PREMIUM TOTAL SECURITY & SUPPORT",
        price: 379,
        duration: "1 Year",
        description: "Best Value / Maximum Protection",
        image_url: premiumBox,
        bestValue: true,
        features: [
            { text: "Includes everything in Advanced, PLUS:" },
            { text: "Protection for Up to 5 Devices" },
            { text: "Identity Theft Protection (Basic Monitoring)" },
            { text: "Dark Web Monitoring (Email & Credentials)" },
            { text: "Network Security & Wi-Fi Protection" },
            { text: "Operating System Error Fixes" },
            { text: "Advanced Data Protection & Backup Guidance" },
            { text: "Priority 24/7 Tech Support" },
            { text: "Quarterly Full System Tune-Up" },
            { text: "Dedicated Senior Technician Access" }
        ]
    }
]

const ADDONS = [
    { id: 101, title: "Lifetime Support Upgrade", price: 99 },
    { id: 102, title: "Cloud Backup Setup", price: 79 },
    { id: 103, title: "VPN Secure Browsing", price: 69 },
    { id: 104, title: "Additional Device Protection", price: 39 }, // per device
]

export function Home() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />
            <HeroSection />

            <main className="container py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">Choose Your Protection Plan</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Comprehensive security solutions tailored to your needs. All plans include our premium 24/7 support.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {PLANS.map(plan => (
                        <PricingCard key={plan.id} plan={plan} />
                    ))}
                </div>

                <div className="mt-24 max-w-4xl mx-auto">
                    <AddonServices addons={ADDONS} />
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
