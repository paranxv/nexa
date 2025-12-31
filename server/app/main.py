from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from .routers import products, cart, checkout, payment, auth
from . import models, database

try:
    models.Base.metadata.create_all(bind=database.engine)
except Exception as e:
    print(f"Error creating database tables: {e}")

app = FastAPI(title="Nexa API")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://www.nexatechsol.com",
    "https://nexa-backend-ten.vercel.app",
    "https://nexa-backend-31jcp07li-paranavs-projects-1bdbea90.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for debugging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(cart.router)
app.include_router(checkout.router)
app.include_router(payment.router)
app.include_router(auth.router)

handler = Mangum(app)

@app.get("/")
def read_root():
    return {"message": "Welcome to Nexa API"}
