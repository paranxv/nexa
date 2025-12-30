import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HeroSection } from '../components/HeroSection'
import { ProductCard } from '../components/ProductCard'
import { CartDrawer } from '../components/CartDrawer'

// Mock data until backend is ready
const PRODUCTS = [
    {
        id: 1,
        title: "Norton 360 Deluxe",
        price: 49.99,
        image_url: "https://placehold.co/400x400/1a237e/FFF?text=Norton+360",
        brand: "Norton"
    },
    {
        id: 2,
        title: "McAfee Total Protection",
        price: 39.99,
        image_url: "https://placehold.co/400x400/e53935/FFF?text=McAfee",
        brand: "McAfee"
    },
    {
        id: 3,
        title: "Bitdefender Antivirus Plus",
        price: 29.99,
        image_url: "https://placehold.co/400x400/424242/FFF?text=Bitdefender",
        brand: "Bitdefender"
    },
    {
        id: 4,
        title: "Kaspersky Internet Security",
        price: 34.99,
        image_url: "https://placehold.co/400x400/00695c/FFF?text=Kaspersky",
        brand: "Kaspersky"
    },
]

export function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <HeroSection />

            <main className="container py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-dark-gray">Featured Deals</h2>
                    <a href="#" className="font-bold text-primary hover:text-secondary">View all products &rarr;</a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-20 bg-light-gray rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-4">Why choose nexa?</h2>
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
