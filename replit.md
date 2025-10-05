# SwipeStudy - Flashcard Study App

## Overview

SwipeStudy is a Tinder-inspired flashcard study application that enables students to learn through an engaging, swipe-based interface. The app features gesture-driven card interactions, deck management, and a mobile-first design optimized for both touch and desktop experiences. Built as a full-stack TypeScript application, it combines a React frontend with an Express backend and PostgreSQL database for persistent storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot-module replacement
- Client-side routing via Wouter (lightweight alternative to React Router)
- Component state management with React hooks (useState, useEffect)

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Theme system supporting dark/light modes with CSS variables
- Custom theming based on Tinder-inspired swipe mechanics with purple accent colors

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and automatic refetching
- Local state management through React Context API (ThemeProvider)
- Optimistic UI updates with query invalidation on mutations

**Animation & Interaction**
- Framer Motion for gesture-based animations and swipe mechanics
- Physics-based spring animations for card transitions
- Custom drag handlers for swipe detection with configurable thresholds

**Key Design Patterns**
- Component composition with separate presentational and container components
- Custom hooks for reusable logic (useIsMobile, useToast, useTheme)
- Path aliases (@/, @shared/) for clean imports
- Form validation with React Hook Form and Zod schemas

### Backend Architecture

**Server Framework**
- Express.js for REST API routing and middleware
- TypeScript with ES modules for type safety across the stack
- Middleware for JSON parsing, URL encoding, and request logging

**API Design**
- RESTful endpoints following resource-based conventions
- CRUD operations for decks and flashcards
- Validation using Zod schemas shared between client and server
- Consistent error handling with appropriate HTTP status codes

**Database Layer**
- Drizzle ORM for type-safe database queries and schema management
- PostgreSQL as the primary relational database (via Neon serverless)
- Schema-first design with automatic TypeScript type inference
- Migration support through Drizzle Kit

**Database Schema**
- `decks` table: Stores deck metadata (id, title, description, cardCount)
- `flashcards` table: Stores individual cards (id, deckId, front, back, order)
- Foreign key relationships linking flashcards to decks
- Auto-generated UUIDs for primary keys using PostgreSQL functions

**Data Access Pattern**
- Repository pattern implemented via DatabaseStorage class
- Abstracted storage interface (IStorage) for potential future storage backends
- Automatic card count updates when flashcards are added/removed
- Cascade deletion ensuring flashcards are removed when parent deck is deleted

### Development & Deployment

**Development Setup**
- Separate development and production build processes
- Vite middleware integration for development with HMR
- Static file serving in production mode
- Environment-based configuration via DATABASE_URL

**Build Pipeline**
- Frontend: Vite bundles React app to dist/public
- Backend: esbuild bundles server code to dist/ with external packages
- TypeScript compilation checking without emit
- PostCSS for CSS processing (Tailwind + Autoprefixer)

**Code Quality**
- Strict TypeScript configuration with all checks enabled
- Path resolution for clean imports
- ES module interop for compatibility
- Incremental builds with build info caching

## External Dependencies

### Core Infrastructure
- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL database with WebSocket support for serverless environments
- **Drizzle ORM**: Type-safe ORM with schema management and migration tools

### UI Framework & Styling
- **Radix UI**: Comprehensive collection of accessible, unstyled React components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Production-ready animation library for React

### State & Data Management
- **TanStack Query**: Powerful async state management for server data
- **React Hook Form**: Performant form validation with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type safety

### Development Tools
- **Vite**: Next-generation frontend build tool with fast HMR
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Utilities
- **date-fns**: Modern date utility library
- **clsx & tailwind-merge**: Conditional className utilities
- **class-variance-authority**: Type-safe variant management for components
- **nanoid**: Tiny, secure URL-friendly unique string ID generator

### Design System Integration
- Multiple Radix UI component primitives (Dialog, Dropdown, Popover, Toast, etc.)
- Custom component wrappers following Shadcn UI conventions
- Theme-aware components with CSS variable integration
- Consistent elevation and hover states across all interactive elements