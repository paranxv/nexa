import { Star, AlertCircle } from 'lucide-react'

// Define the interface locally or import if shared
interface Review {
    user: string
    rating: number
    comment: string
}

interface LaptopProduct {
    id: number
    title: string
    price: number
    image_url: string
    description: string
    features: string[] | string // Handle both parsed and raw
    reviews: Review[] | string // Handle both parsed and raw
    stock: number
}

interface LaptopCardProps {
    product: LaptopProduct
}

export function LaptopCard({ product }: LaptopCardProps) {
    // Parse reviews if needed
    const reviews = typeof product.reviews === 'string'
        ? JSON.parse(product.reviews)
        : product.reviews || []

    const features = typeof product.features === 'string'
        ? JSON.parse(product.features)
        : product.features || []

    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full transition-all hover:shadow-lg ${product.stock === 0 ? 'opacity-75 hover:opacity-100' : ''}`}>
            <div className="relative h-48 p-4 bg-gray-50 flex items-center justify-center">
                <img
                    src={product.image_url || "/placeholder.png"}
                    alt={product.title}
                    className={`h-full object-contain ${product.stock === 0 ? 'grayscale' : ''}`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=No+Image';
                    }}
                />
                {product.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg transform -rotate-12 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            OUT OF STOCK
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{product.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                </div>

                <div className="mb-4 space-y-1">
                    {features.slice(0, 3).map((feature: string, idx: number) => (
                        <div key={idx} className="text-xs text-gray-400 flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            {feature}
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xl font-bold text-secondary">${product.price}</span>
                        {product.stock > 0 ? (
                            <span className="text-sm text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full">In Stock</span>
                        ) : (
                            <span className="text-sm text-red-500 font-medium">Sold Out</span>
                        )}
                    </div>

                    {/* Reviews Preview */}
                    {reviews.length > 0 && (
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                            <div className="flex items-center gap-1 mb-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < reviews[0].rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="font-bold text-xs ml-1 text-gray-600">{reviews[0].user}</span>
                            </div>
                            <p className="text-xs text-gray-500 italic">"{reviews[0].comment}"</p>
                        </div>
                    )}

                    {product.stock > 0 && (
                        <button className="w-full mt-4 bg-secondary text-primary font-bold py-2 rounded hover:bg-secondary-hover transition-colors">
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
