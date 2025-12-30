import { Plus } from 'lucide-react'
import { useCartStore, Product } from '../stores/useCartStore'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore()

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col group">
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={() => addItem(product)}
                        className="bg-secondary text-primary font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all"
                    >
                        Quick Add
                    </button>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <p className="text-secondary text-xs font-bold uppercase tracking-wide mb-1">Bundle</p>
                <h3 className="font-bold text-lg mb-2 text-dark-gray leading-tight min-h-[3rem]">{product.title}</h3>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                    <div>
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                    </div>
                    <button
                        onClick={() => addItem(product)}
                        className="p-2 rounded-full bg-light-gray text-primary hover:bg-secondary hover:text-primary transition-colors"
                        aria-label="Add to cart"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
