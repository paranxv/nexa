from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter(
    prefix="/checkout",
    tags=["checkout"],
)

from . import auth

@router.post("/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    cart = db.query(models.Cart).filter(models.Cart.id == order.cart_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    if not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
        
    # Calculate total (simplistic)
    total = sum(item.product.price * item.quantity for item in cart.items)
    
    db_order = models.Order(email=order.email, total_amount=total, status="pending")
    db.add(db_order)
    db.commit() # Get ID
    db.refresh(db_order)
    
    # Move items to order (logic omitted for brevity, would typically copy items)
    
    return db_order
