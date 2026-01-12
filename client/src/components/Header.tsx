import { ShoppingCart, Search, Menu, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import { AuthService } from '../api/auth'
import logo from '../assets/logo.png'


export function Header() {
    const { items, toggleCart } = useCartStore()
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    return (
        <header className="sticky top-0 z-50 shadow-md flex flex-col">
            {/* Top Bar */}
            {/* Top Bar Removed as per request */}

            <div className="bg-primary text-text-light">
                <div className="container h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 hover:bg-white/10 rounded-full"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img src={logo} alt="Nexatechsol" className="h-12 w-auto" />
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
                        {AuthService.isAuthenticated() ? (
                            <div className="group relative">
                                <button className="flex items-center gap-2 hover:text-secondary transition-colors">
                                    <User className="w-6 h-6" />
                                    <span className="hidden sm:inline font-medium">Account</span>
                                </button>
                                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full right-0 bg-white text-black shadow-xl rounded-lg w-48 py-2 transition-all z-50">
                                    <button
                                        onClick={() => {
                                            AuthService.logout();
                                            window.location.reload();
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <a href="/login" className="flex items-center gap-2 hover:text-secondary transition-colors">
                                <User className="w-6 h-6" />
                                <span className="hidden sm:inline font-medium">Login</span>
                            </a>
                        )}

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

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-primary border-t border-white/10">
                        <nav className="flex flex-col p-4 space-y-4">
                            <Link to="/" className={`text-white transition-colors ${location.pathname === '/' ? 'text-secondary font-bold' : 'hover:text-secondary'}`}>Home</Link>
                            <Link to="/antivirus" className={`text-white transition-colors ${location.pathname === '/antivirus' ? 'text-secondary font-bold' : 'hover:text-secondary'}`}>Antivirus Software</Link>
                            <Link to="/laptops" className={`text-white transition-colors ${location.pathname === '/laptops' ? 'text-secondary font-bold' : 'hover:text-secondary'}`}>Laptops & Printers</Link>
                        </nav>
                    </div>
                )}


                {/* Main Navigation (Desktop) */}
                <div className="hidden md:block bg-primary border-t border-white/10">
                    <div className="container">
                        <nav className="flex items-center gap-8 h-12 text-sm font-medium">
                            <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-secondary font-bold' : 'hover:text-secondary'}`}>Home</Link>
                            <Link to="/antivirus" className={`transition-colors ${location.pathname === '/antivirus' ? 'text-secondary font-bold' : 'hover:text-secondary'}`}>Antivirus Software</Link>
                            <Link to="/laptops" className={`transition-colors ${location.pathname === '/laptops' ? 'text-secondary font-bold' : 'hover:text-secondary'}`}>Laptops & Printers</Link>
                        </nav>
                    </div>
                </div>
            </div>

        </header >
    )
}
