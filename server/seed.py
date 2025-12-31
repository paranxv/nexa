from app.database import SessionLocal, engine
from app import models
import json

db = SessionLocal()

def seed():
    # Clear existing products (optional, but good for idempotent runs during dev)
    # db.query(models.Product).delete()
    
    # Plans
    plans = [
        {
            "title": "BASIC SECURITY & SUPPORT PLAN",
            "price": 179.0,
            "image_url": "/assets/box_basic.png",
            "brand": "Nexatechsol",
            "description": "Best for single users / basic protection. Protection for 1 Device (PC or Mac).",
            "features": json.dumps([
                "Protection for 1 Device (PC or Mac)",
                "Antivirus + Anti-Malware Protection",
                "Real-Time Threat Monitoring",
                "Spyware & Adware Removal",
                "One-Time PC Health Check",
                "Basic Firewall Configuration",
                "Email Support + Limited Phone Support",
                "Installation & Setup Assistance",
                "OS Optimization (basic)"
            ])
        },
        {
            "title": "ADVANCED SECURITY & TECH SUPPORT",
            "price": 279.0,
            "image_url": "/assets/box_advanced.png",
            "brand": "Nexatechsol",
            "description": "Most Popular Plan. Includes everything in Basic, PLUS Protection for Up to 3 Devices.",
            "features": json.dumps([
                "Includes everything in Basic, PLUS:",
                "Protection for Up to 3 Devices",
                "Advanced Firewall Protection",
                "Ransomware Protection",
                "Browser & Online Banking Security",
                "Data Cleanup & Performance Tune-Up",
                "Unlimited Virus & Malware Removal",
                "Unlimited Phone & Chat Support",
                "Monthly System Health Monitoring",
                "Software Update Assistance"
            ])
        },
        {
            "title": "PREMIUM TOTAL SECURITY & SUPPORT",
            "price": 379.0,
            "image_url": "/assets/box_premium.png",
            "brand": "Nexatechsol",
            "description": "Best Value / Maximum Protection. Includes everything in Advanced, PLUS Protection for Up to 5 Devices.",
            "features": json.dumps([
                "Includes everything in Advanced, PLUS:",
                "Protection for Up to 5 Devices",
                "Identity Theft Protection (Basic Monitoring)",
                "Dark Web Monitoring (Email & Credentials)",
                "Network Security & Wi-Fi Protection",
                "Operating System Error Fixes",
                "Advanced Data Protection & Backup Guidance",
                "Priority 24/7 Tech Support",
                "Quarterly Full System Tune-Up",
                "Dedicated Senior Technician Access"
            ])
        }
    ]

    # Add-ons (Treating as products for now, or just seeded products)
    addons = [
        {"title": "Lifetime Support Upgrade", "price": 99.0, "image_url": "", "brand": "Nexatechsol", "description": "Lifetime support upgrade.", "features": "[]"},
        {"title": "Cloud Backup Setup", "price": 79.0, "image_url": "", "brand": "Nexatechsol", "description": "Cloud backup setup.", "features": "[]"},
        {"title": "VPN Secure Browsing", "price": 69.0, "image_url": "", "brand": "Nexatechsol", "description": "VPN Secure Browsing.", "features": "[]"},
        {"title": "Additional Device Protection", "price": 39.0, "image_url": "", "brand": "Nexatechsol", "description": "Additional Device Protection (per device).", "features": "[]"},
    ]

    for p_data in plans + addons:
        # Check if exists by title to avoid dupes
        exists = db.query(models.Product).filter(models.Product.title == p_data["title"]).first()
        if not exists:
            product = models.Product(**p_data)
            db.add(product)
            print(f"Added {p_data['title']}")
        else:
            print(f"Skipped {p_data['title']} (already exists)")

    db.commit()
    db.close()

if __name__ == "__main__":
    # Create tables if not exist
    models.Base.metadata.create_all(bind=engine)
    seed()
