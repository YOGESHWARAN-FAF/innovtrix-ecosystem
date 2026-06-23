import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Default DB Connection string fallback to SQLite for easy local testing
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./innovtrix.db")

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    # MySQL pool configurations
    engine = create_engine(DATABASE_URL, pool_size=10, max_overflow=20, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# DB Dependency injection setup
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
