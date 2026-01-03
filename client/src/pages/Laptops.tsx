import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { LaptopCard } from '../components/LaptopCard'
import { api } from '../api/client'
import { Filter } from 'lucide-react'



export function Laptops() {
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [displayedProducts, setDisplayedProducts] = useState<any[]>([])
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [availableFilters, setAvailableFilters] = useState<{ id: string, label: string }[]>([])
    const [loading, setLoading] = useState(true)
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                // Fetch all products to determine available filters and handle client-side filtering
                // This ensures filters are always relevant to actual data
                const response = await api.get('/products')
                // Filter out Plans and Addons (Brand: Nexatechsol)
                // We only want Laptops here
                const products = response.data.filter((p: any) => p.brand !== 'Nexatechsol')

                setAllProducts(products)
                setDisplayedProducts(products)

                // Extract unique filters from products
                // Assumption: product has 'brand' and optionally 'features' (array or string)
                const brands = new Set<string>()
                const tags = new Set<string>()

                products.forEach((p: any) => {
                    if (p.brand) brands.add(p.brand)

                    // Parse features if string
                    let feats = []
                    if (typeof p.features === 'string') {
                        try {
                            feats = JSON.parse(p.features)
                        } catch (e) {
                            // If not JSON, maybe comma separated? or just text.
                            feats = [p.features]
                        }
                    } else if (Array.isArray(p.features)) {
                        feats = p.features
                    }

                    if (Array.isArray(feats)) {
                        feats.forEach((f: any) => {
                            if (typeof f === 'string') tags.add(f)
                            if (typeof f === 'object' && f.text) tags.add(f.text)
                        })
                    }
                })

                const dynamicFilters = [
                    ...Array.from(brands).map(b => ({ id: b, label: b })),
                    ...Array.from(tags).map(t => ({ id: t, label: t }))
                ].sort((a, b) => a.label.localeCompare(b.label))

                setAvailableFilters(dynamicFilters)

            } catch (error) {
                console.error("Failed to fetch products", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        if (selectedFilters.length === 0) {
            setDisplayedProducts(allProducts)
            return
        }

        const filtered = allProducts.filter(p => {
            // Check if product matches ANY of the selected filters
            // We treat filters as OR within similar types but here simple "contains" logic

            const productString = JSON.stringify(p).toLowerCase()
            return selectedFilters.some(filter => productString.includes(filter.toLowerCase()))
        })
        setDisplayedProducts(filtered)
    }, [selectedFilters, allProducts])

    const toggleFilter = (filterId: string) => {
        setSelectedFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(f => f !== filterId)
                : [...prev, filterId]
        )
    }

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
            <Header />

            <main className="flex-1 container py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className={`
                        lg:w-64 flex-shrink-0 
                        ${showMobileFilters ? 'fixed inset-0 z-40 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}
                    `}>
                        <div className="flex items-center justify-between mb-6 lg:mb-4">
                            <h2 className="text-xl font-bold text-primary">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="lg:hidden text-gray-500"
                            >
                                Close
                            </button>
                        </div>

                        <div className="space-y-3">
                            {availableFilters.map(filter => (
                                <label key={filter.id} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer h-5 w-5 rounded border-gray-300 text-secondary focus:ring-secondary"
                                            checked={selectedFilters.includes(filter.id)}
                                            onChange={() => toggleFilter(filter.id)}
                                        />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-primary transition-colors">
                                        {filter.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-primary hover:bg-gray-50 bg-white shadow-sm w-full justify-center"
                        >
                            <Filter className="w-5 h-5" />
                            <span>Show Filters</span>
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-dark-gray">Laptops</h1>
                            <p className="text-gray-500 mt-2">
                                {displayedProducts.length} products found
                            </p>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                    <div key={n} className="animate-pulse bg-gray-100 rounded-2xl h-96"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedProducts.map((product: any) => (
                                    <LaptopCard key={product.id} product={product} />
                                ))}
                                {displayedProducts.length === 0 && (
                                    <div className="col-span-full text-center py-12 text-gray-500">
                                        No products found matching your filters.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
