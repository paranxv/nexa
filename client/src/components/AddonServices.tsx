import { Plus, Check } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'

interface Addon {
    id: number
    title: string
    price: number
}

interface AddonServicesProps {
    addons: Addon[]
}

export function AddonServices({ addons }: AddonServicesProps) {
    const { addItem } = useCartStore()

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xl font-bold text-dark-gray">Add-On Services</h3>
                <p className="text-gray-500 text-sm">Enhance your protection with these easy upgrades.</p>
            </div>
            <div className="divide-y divide-gray-100">
                {addons.map((addon) => (
                    <div key={addon.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-gray">{addon.title}</h4>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-lg text-primary">${addon.price}</span>
                            <button
                                onClick={() => addItem({
                                    id: addon.id,
                                    title: addon.title,
                                    price: addon.price,
                                    image_url: '', // No specific image for addons
                                })}
                                className="w-8 h-8 rounded-full bg-light-gray text-primary hover:bg-secondary hover:text-primary flex items-center justify-center transition-colors"
                                aria-label={`Add ${addon.title} to cart`}
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
