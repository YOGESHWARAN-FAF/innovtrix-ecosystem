import datetime
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import auth
import database

app = FastAPI(
    title="Innovtrix Corporate API Ecosystem",
    description="Enterprise-grade REST backend managing leads, invoices, active projects, and security audits.",
    version="1.0.0"
)

# CORS configurations allowing local React clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup Seeding Routine
@app.on_event("startup")
def seed_database():
    # Initialize Database tables safely on startup
    try:
        models.Base.metadata.create_all(bind=database.engine)
        print("Database tables initialized successfully.")
    except Exception as e:
        print(f"Error during database table initialization: {e}")

    db = next(database.get_db())
    try:
        # 1. Seed Admin
        admin_email = "innovtrix30@gmail.com"
        admin = db.query(models.Admin).filter(models.Admin.email == admin_email).first()
        if not admin:
            db_admin = models.Admin(
                email=admin_email,
                password_hash=auth.get_password_hash("@Innovtrix30"),
                full_name="Innovtrix Admin Support"
            )
            db.add(db_admin)
            db.commit()
            print("Seeded default admin credentials successfully.")
        else:
            admin.password_hash = auth.get_password_hash("@Innovtrix30")
            db.commit()
            print("Forced update of default admin credentials successfully.")

        # 2. Seed Services
        services_to_seed = [
            ("Business & Commercial Websites", "Premium corporate and professional service sites", 2499.0),
            ("Industry-Specific Websites", "Tailored solutions for gyms, schools, hospitals, etc.", 2999.0),
            ("E-Commerce Development", "High-performance online stores and marketplaces", 5999.0),
            ("SaaS Application Development", "Custom SaaS platforms and client subscription portals", 6999.0),
            ("IoT Applications & Smart Solutions", "Real-time hardware monitoring and data dashboards", 7999.0),
            ("Cloud Deployment & Monitoring", "AWS, server configurations, and monitoring setup", 3999.0),
            ("AI & Automation Solutions", "AI chatbots and workflow integrations", 4999.0),
            ("Custom Web Applications", "Bespoke management systems, CRM & ERP software", 8999.0),
        ]
        for name, desc, price in services_to_seed:
            existing = db.query(models.Service).filter(models.Service.name == name).first()
            if not existing:
                new_service = models.Service(name=name, description=desc, base_price=price)
                db.add(new_service)
        db.commit()

        # 3. Seed Testimonials
        if db.query(models.Testimonial).count() == 0:
            t1 = models.Testimonial(
                client_name="Harish Kumar", company="Vogue Silk Textiles", role="Operations Director",
                rating=5, feedback="Innovtrix built our B2B wholesale fabric ordering portal. Excellent results.", approved=True
            )
            t2 = models.Testimonial(
                client_name="Anjali Sharma", company="Aura Luxury Jewellery", role="Founder",
                rating=5, feedback="Stunning storefront with optimized speed grids.", approved=True
            )
            db.add_all([t1, t2])
            db.commit()

        # 4. Seed Projects
        if db.query(models.Project).count() == 0:
            import json
            p1_milestones = [
                {"name": "Database Wireframes", "done": True},
                {"name": "Frontend Styling", "done": True},
                {"name": "Stripe Payment Hook", "done": True},
                {"name": "Testing Audits", "done": False}
            ]
            p1 = models.Project(
                title="PS-Tex Production Storefront",
                project_type="E-Commerce",
                client="Vogue Silk Textiles",
                developer_assigned="Thomas Mercer",
                deadline="2026-07-15",
                progress=75,
                payment_status="Partial",
                project_url="https://ps-tex-production.up.railway.app",
                milestones=json.dumps(p1_milestones),
                status="In Progress"
            )
            p2_milestones = [
                {"name": "UI layouts wireframing", "done": True},
                {"name": "Frontend content assembly", "done": True},
                {"name": "Contact and Leads setup", "done": False},
                {"name": "Launch & DNS hosting config", "done": False}
            ]
            p2 = models.Project(
                title="PS-Tex Corporate Portal",
                project_type="Corporate Website",
                client="PS-Tex Garments",
                developer_assigned="Anjali Sharma",
                deadline="2026-08-01",
                progress=50,
                payment_status="Unpaid",
                project_url="https://ps-tex.com",
                milestones=json.dumps(p2_milestones),
                status="In Progress"
            )
            db.add_all([p1, p2])
            db.commit()

        # 5. Seed SystemSettings (stats & founders)
        stats_setting = db.query(models.SystemSetting).filter(models.SystemSetting.key == "stats").first()
        if not stats_setting:
            default_stats = [
                { "value": "150+", "label": "Websites Built" },
                { "value": "99.9%", "label": "Uptime Guaranteed" },
                { "value": "18+", "label": "Industries Served" },
                { "value": "24/7", "label": "Tech Support" }
            ]
            db_stats = models.SystemSetting(key="stats", value=json.dumps(default_stats))
            db.add(db_stats)
            db.commit()
            print("Seeded default stats setting successfully.")

        founders_setting = db.query(models.SystemSetting).filter(models.SystemSetting.key == "founders").first()
        if not founders_setting:
            default_founders = [
                {
                    "name": "Yogeshwaran M",
                    "role": "DevOps Specialist / Co-Founder",
                    "badgeRole": "DEVOPS / SEC",
                    "bio": "Expert in AWS, CI/CD orchestration, Terraform, Docker, and Linux administration. Engineers scalable, automated cloud architecture with high-security guardrails.",
                    "image": "",
                    "socials": {
                        "github": "https://github.com/YOGESHWARAN-FAF",
                        "linkedin": "#",
                        "email": "mailto:innovtrix30@gmail.com"
                    },
                    "skills": ["AWS", "Docker", "Terraform", "Linux", "CI/CD", "Nginx"]
                },
                {
                    "name": "Prashanth S",
                    "role": "Full Stack Developer / Co-Founder",
                    "badgeRole": "DEV / FULLSTACK",
                    "bio": "Specialist in modern web rendering frameworks, Python/FastAPI servers, responsive UI designs, and database performance optimizations.",
                    "image": "",
                    "socials": {
                        "github": "#",
                        "linkedin": "#",
                        "email": "mailto:innovtrix30@gmail.com"
                    },
                    "skills": ["React", "Node.js", "FastAPI", "MySQL", "Tailwind", "Git"]
                }
            ]
            db_founders = models.SystemSetting(key="founders", value=json.dumps(default_founders))
            db.add(db_founders)
            db.commit()
            print("Seeded default founders setting successfully.")

        # 6. Seed Portfolio showcase projects
        if db.query(models.Portfolio).count() == 0:
            default_portfolio = [
                models.Portfolio(
                    title="Vogue Silk Textiles",
                    category="E-Commerce Storefront",
                    type="E-Commerce",
                    image_url="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
                    description="Enterprise-grade catalog and retail store custom designed for a high-fashion textile exporter.",
                    project_url="https://ps-tex-production.up.railway.app"
                ),
                models.Portfolio(
                    title="Aura Fine Jewellery",
                    category="Online Shopping Websites",
                    type="E-Commerce",
                    image_url="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
                    description="Elegant high-conversion digital boutique featuring Stripe checkout, inventory management, and 3D preview mockups.",
                    project_url=""
                ),
                models.Portfolio(
                    title="Apex Construction Group",
                    category="Corporate Websites",
                    type="Corporate",
                    image_url="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
                    description="Premium commercial website showing heavy industrial portfolios, active projects tracker, and bids portal.",
                    project_url=""
                ),
                models.Portfolio(
                    title="Lumina Electronics Hub",
                    category="Modern E-Commerce Websites",
                    type="E-Commerce",
                    image_url="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop",
                    description="High-speed retail store built with fast search query processing for thousands of electronic items.",
                    project_url=""
                ),
                models.Portfolio(
                    title="Verdant Real Estate",
                    category="Landing Pages",
                    type="Landing Pages",
                    image_url="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
                    description="Single-page landing page featuring dynamic properties galleries, contact forms, and booking triggers.",
                    project_url=""
                ),
                models.Portfolio(
                    title="Apex Furniture Showroom",
                    category="Product Catalog Websites",
                    type="Product Catalog",
                    image_url="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
                    description="Premium interactive catalog with customization configuration parameters and quotation builder tools.",
                    project_url=""
                ),
                models.Portfolio(
                    title="Zenith Wholesale Emporium",
                    category="Wholesale Business Websites",
                    type="Wholesale",
                    image_url="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
                    description="Portal built for wholesale B2B buyers with login restrictions, custom tier pricing structure, and bulk invoice automation.",
                    project_url=""
                )
            ]
            db.add_all(default_portfolio)
            db.commit()
            print("Seeded default portfolio showcase projects successfully.")

        # 7. Seed Contact Messages and Notifications
        if db.query(models.ContactMessage).count() == 0:
            m1 = models.ContactMessage(
                name="Sanjay Gupta",
                email="sanjay.gupta@outlook.com",
                phone="+91 98765 43210",
                subject="Inquiry regarding SaaS CRM application",
                message="Hello Innovtrix Team, I am looking to build a custom CRM SaaS platform for my real estate brokerage business. Could we schedule a consultation call sometime this week? Thanks!",
                status="Unread"
            )
            m2 = models.ContactMessage(
                name="Deepa Ranganathan",
                email="deepa.r@gmail.com",
                phone="+91 76543 21098",
                subject="Portfolio Showcase Question",
                message="Loved your work on Vogue Silk Textiles portal! I would like to know the cost estimate and timeline for building a similar premium product catalog with custom invoice integrations for my wholesale retail brand. Thanks.",
                status="Unread"
            )
            db.add_all([m1, m2])
            db.commit()
            print("Seeded default contact messages successfully.")

        if db.query(models.Notification).count() == 0:
            n1 = models.Notification(
                message="New Message: 'Inquiry regarding SaaS CRM' from Sanjay Gupta",
                read_status=False
            )
            n2 = models.Notification(
                message="New Lead: E-Commerce Development inquiry from Deepa Ranganathan",
                read_status=False
            )
            db.add_all([n1, n2])
            db.commit()
            print("Seeded default notifications successfully.")
            
    except Exception as e:
        print(f"Error seeding DB: {e}")
    finally:
        db.close()


# ==========================================
# AUTHENTICATION ENDPOINTS
# ==========================================

@app.post("/api/auth/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    admin = db.query(models.Admin).filter(models.Admin.email == form_data.username).first()
    if not admin or not auth.verify_password(form_data.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": admin.email})
    return {"access_token": access_token, "token_type": "bearer"}


# ==========================================
# QUOTE REQUEST / LEADS ENDPOINTS
# ==========================================

@app.post("/api/quotes", response_model=schemas.QuoteRequestResponse)
def create_quote_request(quote: schemas.QuoteRequestCreate, db: Session = Depends(database.get_db)):
    db_quote = models.QuoteRequest(**quote.dict())
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    
    # Create dynamic notification in DB
    db_notif = models.Notification(
        message=f"New Lead: {db_quote.service_type} inquiry from {db_quote.name}",
        read_status=False
    )
    db.add(db_notif)
    db.commit()
    
    return db_quote

@app.get("/api/quotes", response_model=List[schemas.QuoteRequestResponse])
def read_all_quotes(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.QuoteRequest).order_by(models.QuoteRequest.created_at.desc()).all()

@app.put("/api/quotes/{quote_id}", response_model=schemas.QuoteRequestResponse)
def update_quote_status(quote_id: int, quote_update: schemas.QuoteRequestUpdate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_quote = db.query(models.QuoteRequest).filter(models.QuoteRequest.id == quote_id).first()
    if not db_quote:
        raise HTTPException(status_code=404, detail="Quote request not found")
    
    update_data = quote_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_quote, key, value)
        
    db.commit()
    db.refresh(db_quote)
    return db_quote


# ==========================================
# CONTACT MESSAGES ENDPOINTS
# ==========================================

@app.post("/api/contact", response_model=schemas.ContactMessageResponse)
def create_contact_message(msg: schemas.ContactMessageCreate, db: Session = Depends(database.get_db)):
    db_msg = models.ContactMessage(**msg.dict())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    
    # Create dynamic notification in DB
    db_notif = models.Notification(
        message=f"New Message: '{db_msg.subject}' from {db_msg.name}",
        read_status=False
    )
    db.add(db_notif)
    db.commit()
    
    return db_msg

@app.get("/api/contact", response_model=List[schemas.ContactMessageResponse])
def get_all_contact_messages(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()

@app.put("/api/contact/{contact_id}", response_model=schemas.ContactMessageResponse)
def update_contact_message(contact_id: int, msg_update: schemas.ContactMessageUpdate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == contact_id).first()
    if not db_msg:
        raise HTTPException(status_code=404, detail="Contact message not found")
    db_msg.status = msg_update.status
    db.commit()
    db.refresh(db_msg)
    return db_msg


# ==========================================
# PROJECTS ENDPOINTS
# ==========================================

@app.get("/api/projects", response_model=List[schemas.ProjectResponse])
def read_all_projects(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.Project).all()

@app.post("/api/projects", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


# ==========================================
# TESTIMONIALS ENDPOINTS
# ==========================================

@app.get("/api/testimonials", response_model=List[schemas.TestimonialResponse])
def get_approved_testimonials(db: Session = Depends(database.get_db)):
    return db.query(models.Testimonial).filter(models.Testimonial.approved == True).all()

@app.post("/api/testimonials", response_model=schemas.TestimonialResponse)
def create_testimonial(testi: schemas.TestimonialCreate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_testi = models.Testimonial(**testi.dict())
    db.add(db_testi)
    db.commit()
    db.refresh(db_testi)
    return db_testi


# ==========================================
# INVOICES & PAYMENTS ENDPOINTS
# ==========================================

@app.get("/api/invoices", response_model=List[schemas.InvoiceResponse])
def get_all_invoices(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.Invoice).all()

@app.post("/api/invoices", response_model=schemas.InvoiceResponse)
def generate_invoice(invoice: schemas.InvoiceCreate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_invoice = models.Invoice(**invoice.dict())
    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)
    return db_invoice

@app.get("/api/payments", response_model=List[schemas.PaymentResponse])
def get_all_payments(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.Payment).all()

@app.post("/api/payments", response_model=schemas.PaymentResponse)
def record_payment(payment: schemas.PaymentCreate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_payment = models.Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

# ==========================================
# EXTRA TRANSACTIONAL CONTROLS (PUT & DELETE)
# ==========================================

# Project PUT and DELETE
@app.put("/api/projects/{project_id}", response_model=schemas.ProjectResponse)
def update_project(project_id: int, proj_update: schemas.ProjectUpdate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_proj = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_proj:
        raise HTTPException(status_code=404, detail="Project not found")
    for key, value in proj_update.dict(exclude_unset=True).items():
        setattr(db_proj, key, value)
    db.commit()
    db.refresh(db_proj)
    return db_proj

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_proj = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_proj:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(db_proj)
    db.commit()
    return {"detail": "Project deleted successfully"}

# Invoice PUT and DELETE
@app.put("/api/invoices/{invoice_id}", response_model=schemas.InvoiceResponse)
def update_invoice(invoice_id: int, inv_update: schemas.InvoiceUpdate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_inv = db.query(models.Invoice).filter(models.Invoice.id == invoice_id).first()
    if not db_inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    for key, value in inv_update.dict(exclude_unset=True).items():
        setattr(db_inv, key, value)
    db.commit()
    db.refresh(db_inv)
    return db_inv

@app.delete("/api/invoices/{invoice_id}")
def delete_invoice(invoice_id: int, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_inv = db.query(models.Invoice).filter(models.Invoice.id == invoice_id).first()
    if not db_inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    db.delete(db_inv)
    db.commit()
    return {"detail": "Invoice deleted successfully"}

# Payment PUT and DELETE
@app.put("/api/payments/{payment_id}", response_model=schemas.PaymentResponse)
def update_payment(payment_id: int, pay_update: schemas.PaymentUpdate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_pay = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not db_pay:
        raise HTTPException(status_code=404, detail="Payment not found")
    for key, value in pay_update.dict(exclude_unset=True).items():
        setattr(db_pay, key, value)
    db.commit()
    db.refresh(db_pay)
    return db_pay

@app.delete("/api/payments/{payment_id}")
def delete_payment(payment_id: int, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_pay = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not db_pay:
        raise HTTPException(status_code=404, detail="Payment not found")
    db.delete(db_pay)
    db.commit()
    return {"detail": "Payment deleted successfully"}

# Leads (QuoteRequests) DELETE
@app.delete("/api/quotes/{quote_id}")
def delete_quote(quote_id: int, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_quote = db.query(models.QuoteRequest).filter(models.QuoteRequest.id == quote_id).first()
    if not db_quote:
        raise HTTPException(status_code=404, detail="Quote request not found")
    db.delete(db_quote)
    db.commit()
    return {"detail": "Quote request deleted successfully"}

# Messages DELETE
@app.delete("/api/contact/{contact_id}")
def delete_contact_message(contact_id: int, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == contact_id).first()
    if not db_msg:
        raise HTTPException(status_code=404, detail="Contact message not found")
    db.delete(db_msg)
    db.commit()
    return {"detail": "Contact message deleted successfully"}

# WebsiteOrder GET, POST, PUT, DELETE
@app.get("/api/orders", response_model=List[schemas.WebsiteOrderResponse])
def get_all_orders(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.WebsiteOrder).all()

@app.post("/api/orders", response_model=schemas.WebsiteOrderResponse)
def create_order(order: schemas.WebsiteOrderCreate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_order = models.WebsiteOrder(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@app.put("/api/orders/{order_id}", response_model=schemas.WebsiteOrderResponse)
def update_order(order_id: int, order_update: schemas.WebsiteOrderUpdate, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_order = db.query(models.WebsiteOrder).filter(models.WebsiteOrder.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    for key, value in order_update.dict(exclude_unset=True).items():
        setattr(db_order, key, value)
    db.commit()
    db.refresh(db_order)
    return db_order

@app.delete("/api/orders/{order_id}")
def delete_order(order_id: int, current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db_order = db.query(models.WebsiteOrder).filter(models.WebsiteOrder.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(db_order)
    db.commit()
    return {"detail": "Order deleted successfully"}

# ==========================================
# PORTFOLIO SHOWCASE ENDPOINTS
# ==========================================

@app.get("/api/portfolio", response_model=List[schemas.PortfolioResponse])
def read_all_portfolio(db: Session = Depends(database.get_db)):
    return db.query(models.Portfolio).all()

@app.post("/api/portfolio", response_model=schemas.PortfolioResponse)
def create_portfolio_item(
    item: schemas.PortfolioCreate,
    current_admin: models.Admin = Depends(auth.get_current_admin),
    db: Session = Depends(database.get_db)
):
    db_item = models.Portfolio(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/api/portfolio/{portfolio_id}", response_model=schemas.PortfolioResponse)
def update_portfolio_item(
    portfolio_id: int,
    item_update: schemas.PortfolioUpdate,
    current_admin: models.Admin = Depends(auth.get_current_admin),
    db: Session = Depends(database.get_db)
):
    db_item = db.query(models.Portfolio).filter(models.Portfolio.id == portfolio_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    
    for key, value in item_update.dict(exclude_unset=True).items():
        setattr(db_item, key, value)
        
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/api/portfolio/{portfolio_id}")
def delete_portfolio_item(
    portfolio_id: int,
    current_admin: models.Admin = Depends(auth.get_current_admin),
    db: Session = Depends(database.get_db)
):
    db_item = db.query(models.Portfolio).filter(models.Portfolio.id == portfolio_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    db.delete(db_item)
    db.commit()
    return {"detail": "Portfolio item deleted successfully"}

# ==========================================
# SYSTEM SETTINGS ENDPOINTS
# ==========================================

@app.get("/api/settings")
def get_all_settings(db: Session = Depends(database.get_db)):
    settings = db.query(models.SystemSetting).all()
    return {s.key: s.value for s in settings}

@app.get("/api/settings/{key}", response_model=schemas.SystemSettingResponse)
def get_setting_by_key(key: str, db: Session = Depends(database.get_db)):
    setting = db.query(models.SystemSetting).filter(models.SystemSetting.key == key).first()
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    return setting

@app.put("/api/settings/{key}", response_model=schemas.SystemSettingResponse)
def update_setting(
    key: str,
    setting_update: schemas.SystemSettingUpdate,
    current_admin: models.Admin = Depends(auth.get_current_admin),
    db: Session = Depends(database.get_db)
):
    setting = db.query(models.SystemSetting).filter(models.SystemSetting.key == key).first()
    if not setting:
        setting = models.SystemSetting(key=key, value=setting_update.value)
        db.add(setting)
    else:
        setting.value = setting_update.value
        
    db.commit()
    db.refresh(setting)
    return setting


# ==========================================
# NOTIFICATIONS ENDPOINTS
# ==========================================

@app.get("/api/notifications", response_model=List[schemas.NotificationResponse])
def get_all_notifications(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.Notification).order_by(models.Notification.created_at.desc()).all()

@app.put("/api/notifications/read-all")
def mark_all_notifications_as_read(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    db.query(models.Notification).update({models.Notification.read_status: True})
    db.commit()
    return {"detail": "All notifications marked as read"}

@app.put("/api/notifications/{notification_id}", response_model=schemas.NotificationResponse)
def update_notification_status(
    notification_id: int,
    notif_update: schemas.NotificationUpdate,
    current_admin: models.Admin = Depends(auth.get_current_admin),
    db: Session = Depends(database.get_db)
):
    db_notif = db.query(models.Notification).filter(models.Notification.id == notification_id).first()
    if not db_notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    db_notif.read_status = notif_update.read_status
    db.commit()
    db.refresh(db_notif)
    return db_notif

@app.delete("/api/notifications/{notification_id}")
def delete_notification(
    notification_id: int,
    current_admin: models.Admin = Depends(auth.get_current_admin),
    db: Session = Depends(database.get_db)
):
    db_notif = db.query(models.Notification).filter(models.Notification.id == notification_id).first()
    if not db_notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    db.delete(db_notif)
    db.commit()
    return {"detail": "Notification deleted successfully"}


