# Sham360 - Premium Digital Presence Platform

**Sham360** is a full-stack web application designed for Syrian businesses, medical clinics, hotels, and brands to build an official digital presence. It includes Google Maps verification, custom web application development, 8K 360° virtual tours, and an AI-powered Local Strategy Lab powered by Google Gemini.

---

## ✨ Features

- **🌐 Full Bilingual Support (Arabic & English)**:
  - Instant live toggle between Arabic (RTL) and English (LTR) layouts with natural typography alignment and directional branding.
- **🤖 AI Strategy Lab (Powered by Google Gemini)**:
  - Input your business category and Syrian city/region to generate tailored Google Maps SEO keywords, marketing hooks, and growth strategies instantly.
- **📍 Google Maps & Street View Verification**:
  - Interactive guides and services for claiming, verifying, and optimizing Google Business Profiles in Damascus, Aleppo, Latakia, and all Syrian governorates.
- **📷 360° Virtual Tour Player**:
  - Interactive panoramic tour viewer showcasing real 8K virtual tours with hotspot popups, auto-rotation, and full-screen controls.
- **🏢 Sham360 Interactive Business Directory**:
  - Filterable directory showcasing top verified Syrian brands, clinics, and businesses with direct WhatsApp and website routing.
- **💬 Direct Lead Routing**:
  - Integrated WhatsApp consultation triggers pre-populated with localized inquiry messages.
- **📱 Fully Responsive & Fast**:
  - Built with React 18, Vite, Tailwind CSS, and Framer Motion for smooth 60fps animations across mobile, tablet, and desktop viewports.

---

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Express.js (Node.js) with Vite Middleware
- **AI Integration**: `@google/genai` (Google Gemini 2.5 Flash API)
- **Build System**: Vite, esbuild, TypeScript compiler

---

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sham360.git
cd sham360
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` and configure your keys:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

---

## 📂 Project Structure

```
├── public/                 # Static assets and icons
├── src/
│   ├── components/        # Reusable UI components (Logo, Business Guide, 360 Viewer, etc.)
│   ├── data.ts            # Localized content data & portfolio items
│   ├── types.ts           # Shared TypeScript interfaces
│   ├── App.tsx            # Main application layout and routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind CSS global styles
├── server.ts              # Express backend & Gemini API proxy
├── .env.example           # Environment variables template
├── metadata.json          # Platform metadata configuration
└── package.json           # Dependencies and scripts
```

---

## 📄 License

This project is proprietary and built for Sham360 Digital Marketing.
