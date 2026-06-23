# Innovtrix Public Portfolio Website

Premium, high-performance company website for **Innovtrix**, built with modern design principles (Stripe/Vercel styling, glassmorphism, fluid animations). Clients use this site to explore specialized offerings, review past client works, and submit project quote requests.

## Technology Stack
- **Framework**: React 19 + Vite (Fast compilation, modular components)
- **Styling**: Tailwind CSS (Sleek dark themes, glassmorphism cards)
- **Animations**:
  - GSAP (Fluid landing section entrance)
  - Framer Motion (State updates, page changes)
  - AOS (Scroll-triggered reveal animations)
  - Lenis (Momentum-based smooth scrolling)
- **Routing**: React Router DOM (Single Page App routing)
- **Icons**: React Icons (Lucide, Io, Fi packs)

## Local Installation
1. Navigate to the project directory:
   ```bash
   cd innovtrix-portfolio
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Run local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Vercel Deployment Instructions
1. Initialize Git repository and commit files.
2. Push your codebase to a GitHub/GitLab repository.
3. Login to [Vercel](https://vercel.com/) and click **Add New Project**.
4. Import the `innovtrix-portfolio` repository.
5. In **Build & Development Settings**, keep defaults:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click **Deploy**.
