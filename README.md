# GloryX Digital Agency

[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-f472b6?logo=bun)](https://bun.sh/)

> **Full-service digital marketing and automation. We don't just play the game. We rewrite the code.**

A premium, high-performance digital agency website built with Next.js 14, featuring cutting-edge design inspired by Rockstar Games' aesthetic with a focus on dark themes, smooth animations, and responsive user experiences.

---

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Lightning Fast**: Powered by Bun runtime for 3-4x faster package installation and development
- **Premium UI/UX**: Dark theme with custom green/orange accent colors and glassmorphism effects
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Server-side rendering with Next.js for excellent SEO performance
- **Custom Typography**: Professional fonts (Oswald for headers, Roboto for body text)
- **Interactive Components**: Smooth animations, hover effects, and parallax scrolling
- **Type-Safe**: Full TypeScript support for better developer experience

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **Bun** 1.0 or higher (recommended) or npm/yarn
- **Git** for version control

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd gloryx
```

### 2. Install dependencies

Using Bun (recommended):

```bash
bun install
```

Or using npm:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server

Using Bun:

```bash
bun run dev
```

Or using npm:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

---

## 📁 Project Structure

```
gloryx/
├── app/                        # Next.js App Router
│   ├── globals.css            # Global styles and Tailwind directives
│   ├── layout.tsx             # Root layout with fonts and metadata
│   └── page.tsx               # Homepage component
├── components/                 # React components
│   ├── Navbar.tsx             # Sticky navigation with scroll effects
│   ├── Hero.tsx               # Hero section with gradient background
│   ├── ServicesGrid.tsx       # Interactive service cards grid
│   ├── InfoSection.tsx        # Features showcase section
│   └── Footer.tsx             # Multi-column footer with newsletter
├── constants.tsx              # Application data and constants
├── types.ts                   # TypeScript type definitions
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

---

## 🎨 Design System

### Color Palette

| Color           | Hex Code  | Usage                |
|----------------|-----------|----------------------|
| GX Black       | `#0a0a0a` | Primary background   |
| GX Dark        | `#161616` | Secondary background |
| GX Green       | `#79c043` | Primary accent       |
| GX Orange      | `#f58220` | Secondary accent     |
| GX Blue        | `#0f2b5c` | Tertiary accent      |
| GX Gray        | `#2a2a2a` | Borders & subtle UI  |

### Typography

- **Display**: Oswald (300, 400, 500, 700) - Headers and display text
- **Body**: Roboto (300, 400, 500, 700) - Body text and UI elements

### Custom Features

- **Clip Corner Effects**: Angled button and card designs
- **Grid Pattern**: Subtle background texture
- **Custom Scrollbar**: Branded scrollbar with green accent on hover
- **Smooth Animations**: Optimized CSS transitions and transforms

---

## 🏗️ Available Scripts

| Command          | Description                                    |
|-----------------|------------------------------------------------|
| `bun run dev`   | Start development server (with hot reload)     |
| `bun run build` | Build production-ready application             |
| `bun run start` | Start production server                        |
| `bun run lint`  | Run ESLint for code quality checks             |

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy your Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure environment variables
4. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

```bash
# Build the application
bun run build

# Start the production server
bun run start
```

---

## 🔧 Configuration

### Next.js Configuration (`next.config.mjs`)

- Image optimization for external URLs (Unsplash)
- Environment variable configuration
- SWC minification enabled

### Tailwind Configuration (`tailwind.config.ts`)

- Custom color palette
- Font variable references
- Custom animations and background patterns
- Content paths for component scanning

---

## 📦 Tech Stack

### Core Framework

- **Next.js 15.5.9** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5.8.3** - Type-safe development

### Styling & UI

- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS transformations
- **Autoprefixer 10.4.23** - Vendor prefix automation

### UI Component Libraries (Ready for Integration)

- **Chakra UI 2.10.9** - Accessible component library
- **Material UI 6.5.0** - Production-ready components
- **DaisyUI 4.12.24** - Tailwind CSS component library
- **Bulma 1.0.4** - Modern CSS framework
- **Framer Motion 11.18.2** - Animation library

### Icons & Assets

- **Lucide React 0.563.0** - Beautiful icon library

### Development Tools

- **ESLint** - Code quality and consistency
- **Bun** - Fast JavaScript runtime and package manager

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is proprietary and confidential. All rights reserved.

---

## 📧 Contact

**GloryX Digital Agency**

- Website: [https://gloryx.com](https://gloryx.com)
- Email: <contact@gloryx.com>
- Twitter: [@GloryXAgency](https://twitter.com/GloryXAgency)

---

## 🙏 Acknowledgments

- Design inspiration from [Rockstar Games](https://www.rockstargames.com)
- Built with ❤️ using [Next.js](https://nextjs.org)
- Powered by [Bun](https://bun.sh)

---

<div align="center">
  <strong>Dominate The Matrix</strong>
  <br />
  <em>We don't just play the game. We rewrite the code.</em>
</div>
