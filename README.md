Neural.OS Developer Portfolio

A highly modern, futuristic, premium-quality developer portfolio website built using **Next.js 14/15 (App Router)**, **Tailwind CSS v4**, and **Framer Motion**. Styled with a dark cyberpunk aesthetic featuring electric violet, neon purple, and glowing cyan gradients over deep spatial backdrops.

---

## 🚀 Live Demo & Localhost Setup

Ensure you have Node.js installed on your machine. Follow these steps to build and run the portfolio locally:

### 1. Installation
Clone or navigate to the repository directory and run:
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
This portfolio features a fully interactive contact form powered by **EmailJS**. To receive queries directly in your email inbox, create a `.env.local` file in the root folder and add your credentials:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```
*Note: If these keys are left empty, the contact form will automatically fall back to a mock simulation mode that logs submission payloads to the developer console, allowing local testing without configuration.*

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser to view the portfolio.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/) (TypeScript configuration)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Using direct inline theme directives and spatial utilities)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Scroll-linked paths, count-up hook transitions, float loops)
- **Iconography**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **API Integration**: [EmailJS](https://www.emailjs.com/) (Direct secure SMTP packet transmission)

---

## 🧬 Project Structure

```
Portfolio Site/
├── src/
│   ├── app/
│   │   ├── globals.css          # Theme directives, grids, custom scrollbars, glowing utility classes
│   │   ├── layout.tsx           # Setup document structure, global font variables, root metadata
│   │   └── page.tsx             # Main page, aggregates all portfolio sections in scroll order
│   ├── components/
│   │   ├── Loader.tsx           # Futuristic HUD Boot Sequence loading screen (Startup Animation)
│   │   ├── Navbar.tsx           # Sticky nav with active-link tracker and animated underline
│   │   ├── ParticlesBg.tsx      # Canvas-based floating particle grid and interactive node constellation
│   │   ├── CustomScrollbar.tsx  # Track scroll progress, styled with neon thumb
│   │   ├── Hero.tsx             # Typist/rotating roles, avatar HUD circle, call-to-actions
│   │   ├── About.tsx            # Glassmorphism cards with dynamic numbers counting up on scroll
│   │   ├── Skills.tsx           # Categorized skills with glowing borders and animated progress bars
│   │   ├── Toolkit.tsx          # Floating neon cards of essential dev tools
│   │   ├── Projects.tsx         # 6 interactive project cards with hover glow, tilt, and blueprints
│   │   ├── Experience.tsx       # Vertical timeline with scroll-linked neon tracker path
│   │   ├── GithubStats.tsx      # Futuristic stats panel with mock contributions grid
│   │   ├── Contact.tsx          # Cyberpunk contact form with EmailJS hooks
│   │   └── Footer.tsx           # Network termination footer
│   └── hooks/
│       └── useActiveSection.ts  # Custom IntersectionObserver scroll tracking hook
├── public/                      # Static assets (favicons, icons)
├── package.json                 # Project dependencies & script entries
└── tsconfig.json                # TypeScript project configuration
```

---

## 💎 Features

- **System HUD Startup Loader**: A simulated boot diagnostics diagnostic screen checking vision, NLP, and cloud matrices before granting page access.
- **Interactive Star Constellation Background**: Hardware-accelerated HTML5 Canvas particles that flow slowly and gravitationally attract to the user's cursor coords.
- **3D Parallax Tilt Cards**: Projects card grids calculate mouse entry coordinates to tilt and warp in three dimensions.
- **Micro-Scroll Progress Bar**: A sleek neon gradient indicator at the top tracking window height.
- **Intersection Tracker Navbar**: Sticky navigation menu containing an active-indicator line that slides beneath links matching viewport visibility.
- **Dynamic Counters**: Increments stats dynamically (Commits, GPA, Project counts) using RequestAnimationFrame timers.
- **Scroll-Linked Timeline**: The path of the vertical experience log lights up and fills dynamically as you scroll.
- **Responsive Layout**: Designed mobile-first, compressing dashboards and adding hamburger navigation menus under 768px viewports.

---

## ⚙️ Customization Guide

### Personal Information & Biographies
Open [src/components/About.tsx](file:///f:/Portfolio%20Site/src/components/About.tsx) and [src/components/Hero.tsx](file:///f:/Portfolio%20Site/src/components/Hero.tsx) to adjust name strings, VIT Bhopal academic CGPAs, target roles, or locations.

### Custom Project blue prints
To update the project names, source links, or summaries, edit the project matrix inside [src/components/Projects.tsx](file:///f:/Portfolio%20Site/src/components/Projects.tsx). You can also exchange the mock SVG drawings with images or other custom graphic layers.

---

## 🚢 Future Deployment Instructions

This website compiles to a static, server-optimized Next.js project. It can be easily deployed to:

### Vercel (Recommended)
1. Push your code repository to GitHub.
2. Link your account to [Vercel](https://vercel.com).
3. Import the project and add environment variables for EmailJS inside the project dashboard.
4. Click **Deploy**. Vercel will build and host your site.

### Standalone Build
To generate a production bundle locally:
```bash
npm run build
```
This builds an optimized production build ready for static deployment or Docker containerization.
