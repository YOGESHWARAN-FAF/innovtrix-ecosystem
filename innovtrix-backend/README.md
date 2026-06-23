# Innovtrix Python FastAPI Backend API

REST API server built for the Innovtrix business ecosystem. Handles database operations, client leads collection, project progress tracking, invoices generating, and JWT sessions authentication.

## Technical Specifications
- **Framework**: FastAPI (High performance, OpenAPI schema, native async support)
- **Database Engine**: MySQL (with SQLAlchemy ORM declarations)
- **Authentication**: JWT token bearer authorizations, bcrypt hashing
- **Dialect Driver**: PyMySQL

## Database Schema Structure
The server manages the following MySQL tables:
- `admins`: Logged-in admin registers.
- `customers`: Client identifiers.
- `website_orders`: Specific website configurations (E-Commerce or Commercial).
- `projects`: Codebase project progress pipelines.
- `services`: Specialized offerings list.
- `portfolio`: Visual showcase items.
- `testimonials`: Approved customer reviews.
- `contact_messages`: Public enquiry messages.
- `quote_requests`: Leads and budget specifications.
- `invoices`: Project bills.
- `payments`: Bank wires and credit transactions logs.
- `notifications`: Internal alerts.
- `activity_logs`: Administrative actions trails.

## Local Installation (Python 3.8+)
1. Navigate to the project directory:
   ```bash
   cd innovtrix-backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install package dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run server:
   ```bash
   uvicorn main:app --reload
   ```
   Server starts on `http://127.0.0.1:8000`. Swagger API docs are available at `/docs`.

## Render Deployment Instructions
1. Push codebase to a GitHub/GitLab repository.
2. Login to [Render](https://render.com/) and choose **New Web Service**.
3. Link your repository.
4. Set configurations:
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Configure Environment Variables:
   - `DATABASE_URL`: Your production MySQL connection string (e.g., `mysql+pymysql://user:password@host:port/dbname`).
   - `JWT_SECRET`: A secure key string to sign tokens.
6. Click **Deploy**.
