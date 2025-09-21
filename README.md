# TEO - Architectural Design Portfolio

A modern, responsive portfolio website for TEO architectural design company built with React and Vite.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, professional design with smooth animations
- **Project Gallery**: Interactive project showcase with filtering and modal views
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **GitHub Pages Ready**: Configured for easy deployment

## Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - High-performance animations
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run deploy` - Build and deploy to GitHub Pages

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── projects/       # Project-specific components
│   └── ...
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── data/              # Static data and content
├── assets/            # Images and static assets
└── constants/         # Application constants
```

## Deployment

The project is configured for GitHub Pages deployment:

1. Build the project: `npm run build`
2. Deploy: `npm run deploy`

## License

This project is private and proprietary to TEO.
