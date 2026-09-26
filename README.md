# Doubt Solver - AI-Powered Learning Platform

A modern, responsive educational platform that helps students solve doubts with AI-powered tutoring, step-by-step explanations, and interactive practice sessions.

## Features

- 🎯 **AI Tutor**: Get personalized, step-by-step guidance
- 📸 **Multiple Upload Methods**: Photo, image upload, or text input
- 💬 **Interactive Discussions**: Chat with AI for deeper understanding
- 📚 **Concept Library**: Comprehensive learning resources
- 🏆 **Gamification**: Achievements, streaks, and progress tracking
- 🎨 **Beautiful UI**: Modern, clean interface with smooth animations
- 🌓 **Dark/Light Theme**: Fully functional theme switching
- 📱 **Responsive Design**: Works seamlessly across all devices

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── app/              # App configuration and providers
├── components/
│   ├── layout/      # Layout components (Sidebar, TopBar, etc.)
│   └── ui/          # Reusable UI components
├── pages/           # Page components (Home, Upload, Discuss, etc.)
├── state/           # State management (Zustand stores)
├── styles/          # Global styles and design tokens
├── types/           # TypeScript type definitions
└── hooks/           # Custom React hooks
```

## Routes

- `/home` - Dashboard with stats and recent activity
- `/solve/upload` - Upload problem image or text
- `/solve/analyzing` - AI analysis in progress
- `/solve/understanding` - Problem breakdown
- `/solve/discuss` - Interactive chat with AI tutor
- `/solve/practice` - Practice questions
- `/solve/review` - Results and achievements
- `/history` - Learning history
- `/concepts` - Concept library
- `/profile` - User profile
- `/profile/learning-journey` - Detailed learning timeline

## Design System

### Colors
- **Primary Accent**: Orange (#FF6B35)
- **Typography**: Inter font family
- **Spacing**: 8px grid system

### Animations
All animations are built with Framer Motion and respect `prefers-reduced-motion`.

## Features Implemented

✅ Complete routing system
✅ Dark/Light theme with persistence
✅ Responsive layout
✅ Smooth page transitions
✅ Interactive UI components
✅ Upload functionality simulation
✅ Real-time chat interface
✅ Practice questions with feedback
✅ Progress tracking
✅ Achievement system
✅ Learning journey timeline
✅ Concept library with progress
✅ History tracking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
