import { ShoppingCart, Search, Menu, User } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'


export function Header() {
    const { items, toggleCart } = useCartStore()
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <header className="bg-primary text-text-light sticky top-0 z-50 shadow-md">
            <div className="container h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 hover:bg-white/10 rounded-full">
                        <Menu className="w-6 h-6" />
                    </button>
                    <a href="/" className="text-2xl font-bold tracking-tight text-white hover:text-secondary transition-colors">
                        nexa
                    </a>
                </div>

                <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
                    <input
                        type="text"
                        placeholder="Search antivirus bundles..."
                        className="w-full h-10 pl-4 pr-12 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button className="absolute right-0 top-0 h-10 w-12 bg-secondary flex items-center justify-center rounded-r hover:bg-secondary-hover">
                        <Search className="w-5 h-5 text-primary" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 hover:text-secondary transition-colors">
                        <User className="w-6 h-6" />
                        <span className="hidden sm:inline font-medium">Account</span>
                    </button>

                    <button
                        onClick={toggleCart}
                        className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
                    >
                        <ShoppingCart className="w-6 h-6 group-hover:text-secondary" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {itemCount}
                            </span>
                        )}
                        <span className="hidden sm:inline ml-2 font-bold">Cart</span>
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden p-4 bg-primary border-t border-white/10">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-10 pl-4 pr-10 rounded bg-white/10 text-white placeholder:text-white/60 focus:bg-white focus:text-black transition-colors"
                    />
                    <Search className="absolute right-3 top-2.5 w-5 h-5 text-white/60" />
                </div>
            </div>
        </header>
    )
}
