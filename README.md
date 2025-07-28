# Star Wars Battle ⚔️

A modern fullstack application that allows users to battle Star Wars characters and starships. Built with Next.js, TypeScript, GraphQL, and comprehensive testing.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd star-wars

# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Features

### Core Functionality
- **Battle System**: Random battles between Star Wars characters or starships
- **Smart Comparison**: People fight by mass, starships by crew size
- **Score Tracking**: Persistent win counters during session
- **Resource Browser**: Explore all characters and starships independently

### Technical Highlights
- **Frontend**: Next.js 15 + React 19 + TypeScript + Material-UI
- **Backend**: GraphQL API + Server Actions + SQLite + Drizzle ORM
- **Performance**: Optimized with useCallback, useMemo, stable layouts
- **Responsive**: Mobile-first design with full cross-device support
- **Testing**: Comprehensive unit + E2E test coverage

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19** with TypeScript
- **Material-UI** for components
- **TanStack Query** for state management
- **Tailwind CSS** for styling

### Backend
- **GraphQL** (Apollo Server) for queries
- **Server Actions** for mutations
- **Drizzle ORM** with SQLite
- **TypeScript** end-to-end

### Testing & Quality
- **Jest** + React Testing Library (unit tests)
- **Cypress** for E2E testing
- **ESLint** + TypeScript for code quality
- **CI/CD** with GitHub Actions

## 📋 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

### Database
```bash
npm run db:generate  # Generate database schema
npm run db:migrate   # Run migrations
npm run db:seed      # Seed with Star Wars data
```

### Testing
```bash
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage
npm run cypress:open      # Open Cypress UI
npm run cypress:run       # Run Cypress headless
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/graphql/     # GraphQL API endpoint
│   ├── layout.tsx       # App layout
│   └── page.tsx         # Main page
├── components/          # React components
│   ├── AddResourceForm.tsx
│   ├── ResourceDetails.tsx
│   └── ResourceList.tsx
├── db/                  # Database config & schema
├── graphql/             # GraphQL resolvers & schema
├── lib/                 # Utilities & business logic
│   ├── actions.ts       # Server Actions
│   └── battle-logic.ts  # Core battle logic
└── types/               # TypeScript definitions
```

## 🎮 How to Use

1. **Start a Battle**: Choose between "People" or "Starships" battle type
2. **Play**: Click "Play Again" to generate random matchups
3. **Watch Results**: See winner determination based on mass (people) or crew (starships)
4. **Track Score**: Monitor wins for left vs right side
5. **Browse Resources**: Explore all characters and starships in the database

## 🧪 Testing

The application includes comprehensive testing:

### Unit Tests (Jest)
- Battle logic functions (100% coverage)
- Component rendering and behavior
- Server Actions and utilities

### E2E Tests (Cypress)
- Complete user workflows
- Battle system functionality
- Mobile responsiveness
- Error handling and edge cases

```bash
# Run specific test suites
npm run test -- --testPathPattern=battle-logic
npm run cypress:run
```

## 🏗️ Architecture

### Data Flow
1. **GraphQL Queries**: Read operations via Apollo Server
2. **Server Actions**: Write operations (CRUD) via Next.js
3. **Database**: SQLite with Drizzle ORM for type safety
4. **State**: TanStack Query for caching and synchronization

### Performance Optimizations
- React optimizations (useCallback, useMemo)
- Stable layouts preventing content shift
- Efficient data fetching with proper caching
- Mobile-optimized responsive design

## 📱 Mobile Support

Fully responsive design with:
- Touch-friendly interface elements
- Adaptive layouts for all screen sizes
- Optimized typography and spacing
- Cross-device compatibility

## 🚀 Production Ready

- TypeScript for type safety
- Comprehensive error handling
- Production build optimization
- CI/CD pipeline with automated testing
- Professional code structure and documentation

## 📄 License

This project is created for recruitment purposes and demonstrates modern fullstack development practices.

---

**Built with ❤️ for Star Wars fans and code enthusiasts**
