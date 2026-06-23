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

# Initialize Database tables
models.Base.metadata.create_all(bind=database.engine)

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
    db = next(database.get_db())
    try:
        # 1. Seed Admin
        admin_email = "innovtrix30@gmail.com"
        exists = db.query(models.Admin).filter(models.Admin.email == admin_email).first()
        if not exists:
            db_admin = models.Admin(
                email=admin_email,
                password_hash=auth.get_password_hash("@Innovtrix30"),
                full_name="Innovtrix Admin Support"
            )
            db.add(db_admin)
            db.commit()
            print("Seeded default admin credentials successfully.")

        # 2. Seed Services
        if db.query(models.Service).count() == 0:
            s1 = models.Service(name="E-Commerce Website Development", description="Scalable e-retail setups", base_price=5999.0)
            s2 = models.Service(name="Commercial Website Development", description="Corporate business sites & portfolios", base_price=2499.0)
            db.add_all([s1, s2])
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
    return db_msg

@app.get("/api/contact", response_model=List[schemas.ContactMessageResponse])
def get_all_contact_messages(current_admin: models.Admin = Depends(auth.get_current_admin), db: Session = Depends(database.get_db)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()


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
