from app.database import SessionLocal, engine
from app import models
import json

db = SessionLocal()

def seed():
    # Drop existing products table to ensure schema update (Development only quick fix)
    models.Product.__table__.drop(engine)
    models.Base.metadata.create_all(bind=engine)
    
    # Plans (Stock 100)
    plans = [
        {
            "title": "BASIC SECURITY & SUPPORT PLAN",
            "price": 179.0,
            "image_url": "/assets/box_basic.png",
            "brand": "Nexatechsol",
            "stock": 100,
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
            ]),
            "reviews": json.dumps([{"user": "Alice", "rating": 5, "comment": "Great basic protection!"}])
        },
        {
            "title": "ADVANCED SECURITY & TECH SUPPORT",
            "price": 279.0,
            "image_url": "/assets/box_advanced.png",
            "brand": "Nexatechsol",
            "stock": 100,
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
            ]),
            "reviews": json.dumps([{"user": "Bob", "rating": 5, "comment": "Best value for money."}])

        },
        {
            "title": "PREMIUM TOTAL SECURITY & SUPPORT",
            "price": 379.0,
            "image_url": "/assets/box_premium.png",
            "brand": "Nexatechsol",
            "stock": 100,
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
            ]),
            "reviews": json.dumps([{"user": "Charlie", "rating": 5, "comment": "Incredible support team!"}])
        }
    ]

    # Add-ons
    addons = [
        {"title": "Lifetime Support Upgrade", "price": 99.0, "image_url": "", "brand": "Nexatechsol", "stock": 100, "description": "Lifetime support upgrade.", "features": "[]"},
        {"title": "Cloud Backup Setup", "price": 79.0, "image_url": "", "brand": "Nexatechsol", "stock": 100,"description": "Cloud backup setup.", "features": "[]"},
        {"title": "VPN Secure Browsing", "price": 69.0, "image_url": "", "brand": "Nexatechsol", "stock": 100,"description": "VPN Secure Browsing.", "features": "[]"},
        {"title": "Additional Device Protection", "price": 39.0, "image_url": "", "brand": "Nexatechsol", "stock": 100,"description": "Additional Device Protection (per device).", "features": "[]"},
    ]

    # Laptops (Stock 0 - Out of Stock)
    laptops = [
        {
            "title": "Apple MacBook Air 13\" (M3)",
            "price": 1099.0,
            "brand": "Apple",
            "stock": 0,
            "description": "Supercharged by M3. 8-core CPU, 10-core GPU, 8GB Unified Memory, 256GB SSD.",
            "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034",
            "features": json.dumps(["M3 Chip", "13.6-inch Liquid Retina", "18 hours battery", "Fanless design"]),
            "reviews": json.dumps([
                {"user": "Sarah J.", "rating": 5, "comment": "Fastest laptop I've ever owned. Battery lasts forever!"},
                {"user": "Mike T.", "rating": 4, "comment": "Great machine, but wish it had more ports."}
            ])
        },
        {
            "title": "Dell XPS 13 Plus",
            "price": 1299.0,
            "brand": "Dell",
            "stock": 0,
            "description": "Twice as powerful as before. 12th Gen Intel Core, 16GB RAM, 512GB SSD.",
            "image_url": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/13-9320/media-gallery/ontario-black/notebook-xps-13-9320-black-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=536&qlt=100,1&resMode=sharp2&size=536,402&chrss=full",
            "features": json.dumps(["12th Gen Intel", "OLED Touch Display", "Zero-lattice Keyboard", "Minimalist Design"]),
             "reviews": json.dumps([
                {"user": "Dave L.", "rating": 5, "comment": "Stunning display and build quality."},
                {"user": "Jenny W.", "rating": 4, "comment": "A bit pricey but worth it for the design."}
            ])
        },
        {
            "title": "HP Spectre x360 14",
            "price": 1699.99,
            "brand": "HP",
            "stock": 0,
            "description": "2-in-1 Laptop. Intel Core Ultra 7, 16GB RAM, 1TB SSD, OLED Display.",
            "image_url": "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08493134.png",
            "features": json.dumps(["Intel Core Ultra 7", "2.8K OLED Display", "Haptic Touchpad", "9MP AI Camera"]),
             "reviews": json.dumps([
                {"user": "Mark R.", "rating": 5, "comment": "The best 2-in-1 on the market. OLED is gorgeous."},
                {"user": "Emily S.", "rating": 5, "comment": "Love the pen input for drawing."}
            ])
        },
        {
            "title": "Lenovo ThinkPad X1 Carbon Gen 12",
            "price": 1849.00,
            "brand": "Lenovo",
            "stock": 0,
            "description": "The newly designed X1 Carbon Gen 12 is the world's best business laptop.",
            "image_url": "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8ODk5MzB8aW1hZ2UvcG5nfGhhMy9oODAvMTY5NTMxNDg1NDkxNTAucG5nfDAwYjY5MmU5ZWU4YTAwMjlkZTMxMzI3MmIxNzg0Y2RkM2QzZGY0ZmI2YzI1ODRmYmFhZjQ3Y2IzYmNjMThmYjM/lenovo-laptop-thinkpad-x1-carbon-gen-12-14-intel-gallery-1.png",
            "features": json.dumps(["Intel Core Ultra", "Carbon Fiber Chassis", "Dolby Voice", "Military Grade Durability"]),
            "reviews": json.dumps([
                {"user": "BusinessUser1", "rating": 5, "comment": "Incredibly light and the keyboard is legendary."},
                {"user": "IT_Admin", "rating": 5, "comment": "Easy to manage and extremely durable."}
            ])
        },
        {
            "title": "ASUS ROG Zephyrus G14",
            "price": 1599.99,
            "brand": "ASUS",
            "stock": 0,
            "description": "World's most powerful 14-inch gaming laptop. AMD Ryzen 9, NVIDIA RTX 4060.",
            "image_url": "https://dlcdnwebimgs.asus.com/gain/3D706037-3316-4702-8610-14F98B82F6A1/w1000/h732",
            "features": json.dumps(["AMD Ryzen 9", "RTX 4060", "OLED Nebula Display", "Slash Lighting"]),
            "reviews": json.dumps([
                {"user": "GamerX", "rating": 5, "comment": "Beast of a machine in a small package."},
                {"user": "EditorDan", "rating": 4, "comment": "Runs a bit hot, but performance is unmatched."}
            ])
        },
        {
            "title": "MacBook Pro 16\" (M3 Max)",
            "price": 3499.00,
            "brand": "Apple",
            "stock": 0,
            "description": "The heavy hitter. M3 Max chip. 36GB Unified Memory, 1TB SSD.",
            "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
            "features": json.dumps(["M3 Max Chip", "16.2-inch XDR Display", "22 hours battery", "Space Black"]),
             "reviews": json.dumps([
                {"user": "ProVideo", "rating": 5, "comment": "Renders 8K video like butter. Essential for my workflow."},
                {"user": "DevOpsLead", "rating": 5, "comment": "Compiles code instantly. Best logical investment."}
            ])
        },
        {
            "title": "Razer Blade 15",
            "price": 2499.99,
            "brand": "Razer",
            "stock": 0,
            "description": "Fastest gaming laptop. 13th Gen Intel i7, RTX 4070, 240Hz QHD Display.",
            "image_url": "https://assets2.razerzone.com/images/pnx.assets/d9c086d75cda49704043232049184518/razer-blade-15-2023-black-hero-mobile.jpg",
            "features": json.dumps(["Intel i7 H-Series", "RTX 4070", "QHD 240Hz", "Chroma RGB"]),
            "reviews": json.dumps([
                {"user": "RGBFan", "rating": 5, "comment": "It's beautiful and powerful. Fan noise is noticeable under load."},
                {"user": "GamerGirl", "rating": 4, "comment": "Battery life isn't great, but plugged in it's a beast."}
            ])
        },
        {
            "title": "Microsoft Surface Laptop Studio 2",
            "price": 2399.00,
            "brand": "Microsoft",
            "stock": 0,
            "description": "Versatility to create and power to perform. 14.4\" Touchscreen, Intel Core i7.",
            "image_url": "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW16TqZ?ver=8016&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
            "features": json.dumps(["Dynamic Woven Hinge", "NVIDIA RTX 4050", "120Hz Refresh Rate", "Surface Pen Support"]),
            "reviews": json.dumps([
                {"user": "Artist101", "rating": 5, "comment": "Perfect for digital art and 3D modeling."},
                {"user": "TechReviewer", "rating": 4, "comment": "A unique form factor that actually works."}
            ])
        },
        {
            "title": "Samsung Galaxy Book4 Ultra",
            "price": 2999.99,
            "brand": "Samsung",
            "stock": 0,
            "description": "AI-powered productivity. Intel Core Ultra 9, RTX 4070, 3K AMOLED.",
            "image_url": "https://images.samsung.com/is/image/samsung/p6pim/uk/np960xgl-xg2uk/gallery/uk-galaxy-book4-ultra-np960-np960xgl-xg2uk-540130985?$650_519_PNG$",
            "features": json.dumps(["Intel Core Ultra 9", "Dynamic AMOLED 2X", "Galaxy Ecosystem", "Touchscreen"]),
             "reviews": json.dumps([
                {"user": "SamsungUser", "rating": 5, "comment": "Integrates perfectly with my S24 Ultra."},
                {"user": "PowerUser", "rating": 5, "comment": "Screen is unmatched. Colors are amazing."}
            ])
        },
        {
            "title": "LG Gram 17",
            "price": 1799.00,
            "brand": "LG",
            "stock": 0,
            "description": "Ultra-lightweight 17-inch laptop. Intel Core i7, 32GB RAM, 1TB SSD.",
            "image_url": "https://www.lg.com/us/images/laptops/md07555695/gallery/medium01.jpg",
            "features": json.dumps(["2.98 lbs Weight", "17-inch IPS Display", "Military-Grade Durability", "Long Battery Life"]),
            "reviews": json.dumps([
                {"user": "Traveler", "rating": 5, "comment": "Unbelievably light for its size. Perfect for travel."},
                {"user": "BigScreenFan", "rating": 5, "comment": "Finally a large screen I can carry anywhere."}
            ])
        }
    ]

    for p_data in plans + addons + laptops:
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
    seed()
