from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Admin Schemas
class AdminBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class AdminCreate(AdminBase):
    password: str

class AdminResponse(AdminBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Customer Schemas
class CustomerBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    company_name: Optional[str] = None
    business_type: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# WebsiteOrder Schemas
class WebsiteOrderBase(BaseModel):
    customer_id: Optional[int] = None
    client_name: Optional[str] = None
    service_type: str
    details: Optional[str] = None
    budget: Optional[str] = None
    status: Optional[str] = "Pending Configuration"

class WebsiteOrderCreate(WebsiteOrderBase):
    pass

class WebsiteOrderResponse(WebsiteOrderBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Project Schemas
class ProjectBase(BaseModel):
    title: str
    project_type: Optional[str] = None
    client: Optional[str] = None
    milestones: Optional[str] = None
    description: Optional[str] = None
    project_url: Optional[str] = None
    status: Optional[str] = "Discovery"
    progress: Optional[int] = 0
    deadline: Optional[str] = None
    developer_assigned: Optional[str] = "Unassigned"
    payment_status: Optional[str] = "Unpaid"

class ProjectCreate(ProjectBase):
    order_id: Optional[int] = None

class ProjectResponse(ProjectBase):
    id: int
    order_id: Optional[int]
    created_at: datetime
    class Config:
        from_attributes = True

# Service Schemas
class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    features: Optional[str] = None
    base_price: Optional[float] = None

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Portfolio Schemas
class PortfolioBase(BaseModel):
    title: str
    category: str
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    description: Optional[str] = None

class PortfolioCreate(PortfolioBase):
    pass

class PortfolioResponse(PortfolioBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Testimonial Schemas
class TestimonialBase(BaseModel):
    client_name: str
    company: Optional[str] = None
    role: Optional[str] = None
    rating: Optional[int] = 5
    feedback: str
    approved: Optional[bool] = True

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialResponse(TestimonialBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# ContactMessage Schemas
class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageResponse(ContactMessageBase):
    id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

# QuoteRequest Schemas
class QuoteRequestBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    business_type: Optional[str] = None
    service_type: str
    budget: Optional[str] = None
    details: Optional[str] = None

class QuoteRequestCreate(QuoteRequestBase):
    pass

class QuoteRequestUpdate(BaseModel):
    status: Optional[str] = None
    assigned_developer: Optional[str] = None
    notes: Optional[str] = None

class QuoteRequestResponse(QuoteRequestBase):
    id: int
    status: str
    assigned_developer: str
    notes: Optional[str]
    created_at: datetime
    class Config:
        from_attributes = True

# Invoice Schemas
class InvoiceBase(BaseModel):
    project_id: Optional[int] = None
    invoice_number: str
    client_name: Optional[str] = None
    project_title: Optional[str] = None
    amount: str
    status: Optional[str] = "Unpaid"
    due_date: Optional[str] = None

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceResponse(InvoiceBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Payment Schemas
class PaymentBase(BaseModel):
    invoice_id: Optional[int] = None
    invoice_number: Optional[str] = None
    amount: str
    payment_method: Optional[str] = None
    status: Optional[str] = "Settled"
    transaction_id: Optional[str] = None

class PaymentCreate(PaymentBase):
    pass

class PaymentResponse(PaymentBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    project_type: Optional[str] = None
    client: Optional[str] = None
    milestones: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    progress: Optional[int] = None
    deadline: Optional[str] = None
    developer_assigned: Optional[str] = None
    payment_status: Optional[str] = None

class InvoiceUpdate(BaseModel):
    status: Optional[str] = None
    due_date: Optional[str] = None
    amount: Optional[str] = None

class PaymentUpdate(BaseModel):
    status: Optional[str] = None

class WebsiteOrderUpdate(BaseModel):
    status: Optional[str] = None
    details: Optional[str] = None
