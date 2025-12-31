from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import os
import traceback

try:
    # Attempt normal imports
    from .routers import products, cart, checkout, payment, auth
    from . import models, database

    # Attempt DB init
    try:
        models.Base.metadata.create_all(bind=database.engine)
    except Exception as e:
        print(f"DB Init Error (Non-fatal): {e}")

    app = FastAPI(title="Nexa API")

    origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://www.nexatechsol.com",
        "https://nexa-backend-ten.vercel.app",
        "https://nexa-backend-31jcp07li-paranavs-projects-1bdbea90.vercel.app",
        "*" 
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # Permissive for debug
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(products.router)
    app.include_router(cart.router)
    app.include_router(checkout.router)
    app.include_router(payment.router)
    app.include_router(auth.router)

    @app.get("/")
    def read_root():
        return {"message": "Welcome to Nexa API. System operational."}

except Exception as e:
    # Fallback app if any import or setup fails
    error_msg = f"Startup Error: {str(e)}\n\nTraceback:\n{traceback.format_exc()}"
    print(error_msg) # Log to console
    
    app = FastAPI(title="Nexa API - Error Mode")
    
    # Add CORS even in error mode
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def read_root():
        return {"status": "error", "detail": error_msg}
    
    # Register wildcard to catch other paths
    @app.api_route("/{path_name:path}", methods=["GET", "POST", "PUT", "DELETE"])
    def catch_all(path_name: str):
         return {"status": "error", "detail": error_msg}

# Expose handler for Vercel
handler = Mangum(app)
