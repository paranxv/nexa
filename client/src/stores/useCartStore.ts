import { create } from 'zustand'

export interface Product {
    id: number
    title: string
    price: number
    image_url: string
}

export interface CartItem {
    id: number // cart item id
    product: Product
    quantity: number
}

interface CartState {
    items: CartItem[]
    isOpen: boolean
    total: number
    toggleCart: () => void
    setItems: (items: CartItem[]) => void
    addItem: (product: Product) => void
    removeItem: (cartItemId: number) => void
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    isOpen: false,
    total: 0,
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    setItems: (items) => set({
        items,
        total: items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    }),
    addItem: (product) => set((state) => {
        // For now, simple client side logic, will replace with API call
        const existing = state.items.find(i => i.product.id === product.id)
        if (existing) {
            return {
                items: state.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i),
                total: state.total + product.price
            }
        }
        return {
            items: [...state.items, { id: Date.now(), product, quantity: 1 }],
            total: state.total + product.price,
            isOpen: true // auto open cart on add
        }
    }),
    removeItem: (cartItemId) => set((state) => {
        const item = state.items.find(i => i.id === cartItemId)
        if (!item) return state
        return {
            items: state.items.filter(i => i.id !== cartItemId),
            total: state.total - (item.product.price * item.quantity)
        }
    })
}))
