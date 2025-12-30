from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database
from typing import Optional

router = APIRouter(
    prefix="/cart",
    tags=["cart"],
)

# In a real app, we'd use a session ID or user JWT. 
# For simplicity/demo with shared cart or guest cart, we might create a cart or pass a cart_id.

@router.post("/", response_model=schemas.Cart)
def create_cart(db: Session = Depends(database.get_db)):
    db_cart = models.Cart()
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart

@router.get("/{cart_id}", response_model=schemas.Cart)
def get_cart(cart_id: int, db: Session = Depends(database.get_db)):
    cart = db.query(models.Cart).filter(models.Cart.id == cart_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    return cart

@router.post("/{cart_id}/items", response_model=schemas.Cart)
def add_to_cart(cart_id: int, item: schemas.CartItemCreate, db: Session = Depends(database.get_db)):
    cart = db.query(models.Cart).filter(models.Cart.id == cart_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Check if item exists in cart
    existing_item = db.query(models.CartItem).filter(
        models.CartItem.cart_id == cart_id,
        models.CartItem.product_id == item.product_id
    ).first()
    
    if existing_item:
        existing_item.quantity += item.quantity
    else:
        new_item = models.CartItem(cart_id=cart_id, product_id=item.product_id, quantity=item.quantity)
        db.add(new_item)
    
    db.commit()
    db.refresh(cart)
    return cart
