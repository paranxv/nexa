from typing import List, Optional, Any, Dict, Union
from pydantic import BaseModel, EmailStr
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    brand: str
    description: str
    price: float
    image_url: str
    features: Optional[str] = None
    stock: int = 100

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItem(CartItemBase):
    id: int
    product: Product

    class Config:
        from_attributes = True

class CartBase(BaseModel):
    pass

class Cart(CartBase):
    id: int
    items: List[CartItem] = []
    total_price: float = 0.0

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    email: str
    
class OrderCreate(OrderBase):
    cart_id: int
    payment_method: str # 'paypal', 'card'

class Order(OrderBase):
    id: int
    total_amount: float
    status: str
    created_at: datetime
    items: List[Any] # Simplify for now

    class Config:
        from_attributes = True

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
