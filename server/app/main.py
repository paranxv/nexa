from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import products, cart, checkout, payment
from . import models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Nexa API")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(cart.router)
app.include_router(checkout.router)
app.include_router(payment.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Nexa API"}
