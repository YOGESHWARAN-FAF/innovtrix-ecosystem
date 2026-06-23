# Innovtrix Administrative Management Dashboard

Internal management suite for Innovtrix staff to coordinate lead intakes, review incoming website orders, assign developers, track project milestones, record customer transactions, and generate invoices.

## System Features & Modules
- **Overview Dashboard**: Graphical summaries of monthly sales volume and E-commerce vs. Commercial build distributions using Chart.js.
- **Leads & Inquiries**: Pipeline tracker to allocate developers, update contact stats, adjust budgets, and write logs.
- **Website Orders**: Specific catalog/shop specs setup reviews.
- **Active Projects**: Interactive progress controls and checklist milestones.
- **Invoicing & Payments**: Transaction settlement registers and invoice generator.
- **Client Messages**: Contact form log viewer.

## Credentials
- **Access URL**: Secure admin portal route
- **Default Email**: `innovtrix30@gmail.com`
- **Default Password**: `@Innovtrix30`
*(Note: These credentials are seeded automatically inside the database on startup and support local offline review simulation)*

## Local Installation
1. Navigate to the project directory:
   ```bash
   cd innovtrix-admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or local port) in your browser.

## Vercel Deployment Instructions
1. Push the code to your GitHub/GitLab repository.
2. Open your Vercel Dashboard, select **Add New Project**, and import the admin repo.
3. Keep default build and build output configurations.
4. Click **Deploy**.
