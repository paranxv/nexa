from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import models, schemas, database
from ..paypal_service import PayPalService

router = APIRouter(
    prefix="/payment",
    tags=["payment"],
)

@router.post("/create-order", response_model=dict)
def create_payment(order_create: schemas.OrderCreate, db: Session = Depends(database.get_db)):
    # 1. Get Cart
    cart = db.query(models.Cart).filter(models.Cart.id == order_create.cart_id).first()
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # 2. Calculate Total
    total_amount = sum(item.product.price * item.quantity for item in cart.items)

    # 3. Create PayPal Order
    # In a real app, these URLs would be frontend routes
    return_url = "http://localhost:5173/checkout/success" 
    cancel_url = "http://localhost:5173/checkout/cancel"
    
    paypal_order = PayPalService.create_order(total_amount, return_url, cancel_url)
    
    if not paypal_order:
        raise HTTPException(status_code=500, detail="Failed to create PayPal order")

    # 4. Save pending order in DB
    db_order = models.Order(
        email=order_create.email,
        total_amount=total_amount,
        status="pending",
        payment_id=paypal_order.id
    )
    db.add(db_order)
    db.commit()
    
    return {"id": paypal_order.id, "links": paypal_order.links}

@router.post("/capture-order/{order_id}")
def capture_payment(order_id: str, db: Session = Depends(database.get_db)):
    capture = PayPalService.capture_order(order_id)
    
    if not capture or capture.status != "COMPLETED":
        raise HTTPException(status_code=400, detail="Payment capture failed")
        
    # Update Order status
    db_order = db.query(models.Order).filter(models.Order.payment_id == order_id).first()
    if db_order:
        db_order.status = "paid"
        db.commit()
        
    return {"status": "completed", "details": capture}
