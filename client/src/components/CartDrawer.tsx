import * as Dialog from '@radix-ui/react-dialog'
import { X, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'
import { cn } from '../lib/utils'

export function CartDrawer() {
    const { isOpen, toggleCart, items, total, removeItem } = useCartStore()

    return (
        <Dialog.Root open={isOpen} onOpenChange={toggleCart}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
                <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl focus:outline-none z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b">
                        <Dialog.Title className="text-lg font-bold">Shopping Cart ({items.reduce((a, c) => a + c.quantity, 0)})</Dialog.Title>
                        <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </Dialog.Close>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
                                <p>Your cart is empty</p>
                                <button onClick={toggleCart} className="text-secondary font-bold hover:underline">
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded border hover:border-gray-200 transition-colors">
                                    <img src={item.product.image_url} alt={item.product.title} className="w-20 h-20 object-cover rounded bg-white" />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-sm line-clamp-2">{item.product.title}</h4>
                                            <p className="text-xs text-gray-500 uppercase mt-1">Bundle</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold">${item.product.price}</span>
                                                <span className="text-xs text-gray-400">x {item.quantity}</span>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-center text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                            <button className="w-full btn btn-primary flex items-center justify-center gap-2">
                                Checkout <ArrowRight className="w-4 h-4" />
                            </button>
                            <div className="mt-4 flex justify-center gap-2 grayscale opacity-60">
                                {/* Payment icons placeholder */}
                                <span className="text-xs font-bold border px-1 rounded">VISA</span>
                                <span className="text-xs font-bold border px-1 rounded">MC</span>
                                <span className="text-xs font-bold border px-1 rounded">PAYPAL</span>
                            </div>
                        </div>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
