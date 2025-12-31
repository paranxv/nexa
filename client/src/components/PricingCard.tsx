import { Check } from 'lucide-react'
import { useCartStore, Product } from '../stores/useCartStore'

interface PlanFeature {
    text: string
}

export interface Plan extends Product {
    features: PlanFeature[]
    popular?: boolean
    bestValue?: boolean
    description: string
    duration: string
}

interface PricingCardProps {
    plan: Plan
}

export function PricingCard({ plan }: PricingCardProps) {
    const { addItem } = useCartStore()

    return (
        <div className={`relative flex flex-col h-full bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.popular
            ? 'border-secondary ring-2 ring-secondary ring-offset-2 z-10'
            : plan.bestValue
                ? 'border-primary ring-1 ring-primary/20'
                : 'border-gray-200'
            }`}>
            {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                </div>
            )}
            {plan.bestValue && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Best Value
                </div>
            )}

            <div className="p-6 pb-0 text-center">
                <div className="h-48 mb-6 flex items-center justify-center">
                    <img
                        src={plan.image_url}
                        alt={plan.title}
                        className="h-full object-contain drop-shadow-lg"
                    />
                </div>
                <h3 className="text-xl font-bold text-dark-gray leading-tight mb-2">{plan.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                    <span className="text-3xl font-bold text-primary">${plan.price}</span>
                    <span className="text-gray-400 text-sm">/{plan.duration}</span>
                </div>
                <button
                    onClick={() => addItem(plan)}
                    className={`w-full py-3 rounded-lg font-bold mb-6 transition-all transform active:scale-95 ${plan.popular
                        ? 'bg-secondary text-primary hover:bg-secondary-hover shadow-lg shadow-secondary/20'
                        : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20'
                        }`}
                >
                    Add to Cart
                </button>
            </div>

            <div className="p-6 pt-0 border-t border-gray-100 flex-1 bg-gray-50/50 rounded-b-2xl">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-4">Includes:</p>
                <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span>{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
