import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    company_name = Column(String(255), nullable=True)
    business_type = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class WebsiteOrder(Base):
    __tablename__ = "website_orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    client_name = Column(String(255), nullable=True)
    service_type = Column(String(255), nullable=False) # E-Commerce or Commercial
    details = Column(Text, nullable=True)
    budget = Column(String(100), nullable=True)
    status = Column(String(100), default="Pending Configuration")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("website_orders.id"), nullable=True)
    title = Column(String(255), nullable=False)
    project_type = Column(String(255), nullable=True)
    client = Column(String(255), nullable=True)
    milestones = Column(Text, nullable=True) # JSON serialized list
    description = Column(Text, nullable=True)
    project_url = Column(String(500), nullable=True)
    status = Column(String(100), default="Discovery")
    progress = Column(Integer, default=0)
    deadline = Column(String(150), nullable=True)
    developer_assigned = Column(String(255), default="Unassigned")
    payment_status = Column(String(100), default="Unpaid")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    features = Column(Text, nullable=True) # JSON or comma-separated
    base_price = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Portfolio(Base):
    __tablename__ = "portfolio"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(150), nullable=False)
    type = Column(String(100), nullable=True)
    image_url = Column(String(500), nullable=True)
    project_url = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SystemSetting(Base):
    __tablename__ = "system_settings"
    key = Column(String(255), primary_key=True, index=True)
    value = Column(Text, nullable=False)


class Testimonial(Base):
    __tablename__ = "testimonials"
    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    role = Column(String(150), nullable=True)
    rating = Column(Integer, default=5)
    feedback = Column(Text, nullable=False)
    approved = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(100), default="Unread")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class QuoteRequest(Base):
    __tablename__ = "quote_requests"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    company = Column(String(255), nullable=True)
    business_type = Column(String(150), nullable=True)
    service_type = Column(String(255), nullable=False)
    budget = Column(String(100), nullable=True)
    details = Column(Text, nullable=True)
    status = Column(String(100), default="New")
    assigned_developer = Column(String(255), default="Unassigned")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    invoice_number = Column(String(150), unique=True, nullable=False)
    client_name = Column(String(255), nullable=True)
    project_title = Column(String(255), nullable=True)
    amount = Column(String(100), nullable=False)
    status = Column(String(100), default="Unpaid")
    due_date = Column(String(150), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(Integer, ForeignKey("invoices.id"), nullable=True)
    invoice_number = Column(String(150), nullable=True)
    amount = Column(String(100), nullable=False)
    payment_method = Column(String(150), nullable=True)
    status = Column(String(100), default="Settled")
    transaction_id = Column(String(255), unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String(500), nullable=False)
    read_status = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("admins.id"), nullable=True)
    action = Column(String(150), nullable=False)
    details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
