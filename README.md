

# Expense Tracker V2

A Next.js expense tracking application with transaction management, recurring expense support, budgeting, AI chat assistant, and user settings.

## Features

- **Transaction tracking:** add, edit, delete transactions per tracker.
- **Recurring expenses:** manage recurring expense schedules, select recurring items to auto-fill transactions.
- **Budgeting page:** budgeting UI scaffold with provider state and clear controls.
- **AI assistant:** chat interface for expense-related questions backed by `/api/assistant`.
- **Insights:** monthly spending analytics and summary cards.
- **User management:** login, registration, profile settings, and password reset UI.
- **Responsive layout:** mobile/adaptive rendering using `useIsMobile`.

## Pages

### `/`
- Summary/dashboard page with insights and monthly spending chart.

### `/login`
- Login form, validation, and registration modal.

### `/manage-expense`
- Tracker management landing page.
- Uses `TrackerProvider` and tracker-related CRUD flows.

### `/manage-expense/[id]`
- Detailed tracker view and transaction history.
- Includes transaction add/edit/delete, balance cards, tables, and recurring selection.

### `/recurring`
- Recurring expense management page.
- Supports list display, edit modal, delete, and pagination.

### `/budgeting`
- Budgeting page with state provider and clear controls.

### `/assistant`
- AI-powered expense assistant chat interface.

### `/insights`
- Insights page fetching analytics from `/api/insights`.

### `/user-settings`
- User profile and settings management.

## Core Components

- `src/components/shared/menu-bar.jsx` — main app shell with sidebar and page layout.
- `src/components/shared/comboboxx.jsx` — custom combobox with custom item rendering and value callbacks.
- `src/components/shared/monthly-chart.jsx` — bar chart for monthly spending.
- `src/components/shared/recourring/*` — recurring data table, pagination, edit modal, and combobox.
- `src/components/ui/*` — reusable UI primitives (`button`, `input`, `card`, `select`, `dialog`, `spinner`, etc.).

## Data Model

Defined in `prisma/schema.prisma`:

- `User` — authentication and related trackers/histories/recurring expenses.
- `Tracker` — expense tracker container linked to a user.
- `Histories` — transaction records with category, type, amount, and date.
- `ReOccuringExpenses` — recurring expense rules with schedule metadata.

## API Usage

The app uses client-side fetch for:

- `/api/auth`
- `/api/user`
- `/api/tracker`
- `/api/histories/[id]`
- `/api/reocurring`
- `/api/assistant`
- `/api/insights`
- `/api/analytics/monthly-spending`
- `/api/logout`

## Tech Stack

- Next.js 16
- React 19
- Prisma + MongoDB
- `@base-ui/react`
- `react-hook-form` + `zod`
- `sonner` for notifications
- `recharts` for charts
- `lucide-react` icons
- `zustand` state management in some areas

## Local Setup

```bash
npm install
npm run dev
```

## Prisma Notes

```bash
npm install prisma --save-dev
npx prisma init
npx prisma generate
npx prisma db push
# or
npx prisma migrate dev --name init
```

If using MongoDB locally with replica set support:

```bash
brew services stop mongodb-community
mongod --dbpath /usr/local/var/mongodb --replSet rs0
```
