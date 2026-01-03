from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database

router = APIRouter(
    prefix="/products",
    tags=["products"],
)

from sqlalchemy import or_, and_

@router.get("/", response_model=List[schemas.Product])
def read_products(
    skip: int = 0, 
    limit: int = 100, 
    q: str = None, 
    features: List[str] = Query(None),
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Product)
    
    if q:
        search = f"%{q}%"
        query = query.filter(
            or_(
                models.Product.title.ilike(search),
                models.Product.description.ilike(search),
                models.Product.brand.ilike(search)
            )
        )
    
    if features:
        # Filter products that match ANY of the selected features/brands
        # Since frontend sends brands as part of features list in this UI
        feature_filters = []
        for feature in features:
            feature_filters.append(models.Product.title.ilike(f"%{feature}%"))
            feature_filters.append(models.Product.brand.ilike(f"%{feature}%"))
            feature_filters.append(models.Product.features.ilike(f"%{feature}%"))
        
        query = query.filter(or_(*feature_filters))

    products = query.offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(database.get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
