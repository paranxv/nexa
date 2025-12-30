from app.database import SessionLocal, engine
from app import models

models.Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    # Check if products exist
    if db.query(models.Product).count() > 0:
        print("Products already seeded")
        return

    products = [
        models.Product(
            title="Norton 360 Deluxe",
            brand="Norton",
            description="Comprehensive protection for your devices and online privacy.",
            price=49.99,
            image_url="https://placehold.co/400x400?text=Norton+360",
            features="Real-time Threat Protection, Secure VPN, Dark Web Monitoring",
            stock=100
        ),
        models.Product(
            title="McAfee Total Protection",
            brand="McAfee",
            description="All-in-one protection for your personal info and privacy.",
            price=39.99,
            image_url="https://placehold.co/400x400?text=McAfee",
            features="Premium Antivirus, Safe Browsing, Identity Protection",
            stock=100
        ),
        models.Product(
            title="Bitdefender Antivirus Plus",
            brand="Bitdefender",
            description="Best antivirus protection against Windows threats.",
            price=29.99,
            image_url="https://placehold.co/400x400?text=Bitdefender",
            features="Unbeatable Threat Detection, Performance Impact, Secure VPN",
            stock=100
        ),
        models.Product(
            title="Kaspersky Internet Security",
            brand="Kaspersky",
            description="Advanced protection from viruses, ransomware and spyware.",
            price=34.99,
            image_url="https://placehold.co/400x400?text=Kaspersky",
            features="Payment Protection, Webcam Protection, Adult Content Blocker",
            stock=100
        ),
        models.Product(
            title="Avast Premium Security",
            brand="Avast",
            description="Complete online protection for all of your computers, phones, and tablets.",
            price=44.99,
            image_url="https://placehold.co/400x400?text=Avast",
            features="Shop and bank safely, Block ransomware, Block fake sites",
            stock=100
        )
    ]
    
    db.add_all(products)
    db.commit()
    print("Seeding complete!")
    db.close()

if __name__ == "__main__":
    seed()
