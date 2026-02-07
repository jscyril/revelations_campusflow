# CampusFlow - Events from the Upside Down ⚡

A modular, theme-agnostic platform for decentralized campus events, built for the "Revelations" Hackathon.

## 🚀 Key Features

### 1. Unified Discovery & Participation
- **Events Feed**: Centralized hub to browse all campus events (`/events`).
- **Interactive Event Pages**: Detailed briefs with registration forms, countdown timers, and live slot tracking.
- **One-Click Registration**: Seamless sign-up process with instant feedback.
- **Cancel Registration**: Flexibility to opt-out if plans change.

### 2. Gamification System 🎮
- **XP Rewards**: Earn XP for every interaction (Registering: +50 XP).
- **Leveling**: Accumulate XP to level up your `Party Member` status.
- **Badges**: Unlock achievements like "First Steps", "Night Owl", and more.

### 3. Decentralized Publishing (Organizer Dashboard)
- **Role-Based Access**: Dedicated dashboard for Organizers (`/dashboard`).
- **Command Center**: View aggregate stats (Total Events, Registrations, Check-ins).
- **Event Management**: List of all organized events with status indicators (DRAFT/PUBLISHED).
- **Attendee Tracking**: Real-time view of registered attendees for each event.

## 🛠 Tech Stack
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: SQLite
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Language**: TypeScript

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation
1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Setup Database**:
    ```bash
    npx prisma db push
    # Seed data (creates test accounts and events)
    npx prisma db seed
    ```
4.  **Run Development Server**:
    ```bash
    pnpm dev
    ```
5.  **Access the App**: Open [http://localhost:3000](http://localhost:3000)

## 🔑 Test Credentials
Use these accounts to explore different roles:

| Role | Email | Password | Features |
| :--- | :--- | :--- | :--- |
| **Organizer** | `organizer@campushub.edu` | `organizer123` | Create events, View Stats, Manage Attendees |
| **Student** | `mike@campushub.edu` | `student123` | Register, Earn XP, View Student Dashboard |
| **Admin** | `admin@campushub.edu` | `admin123` | Full Access |

## 📦 Project Structure
- `app/api/`: Backend API routes (Events, Auth, Organizer stats).
- `app/components/`: Reusable UI components (Dashboard, Forms, Navbar).
- `app/dashboard/`: Role-based dashboard logic.
- `prisma/schema.prisma`: Database model definition.

---
*Verified & Maintained by the CampusFlow Team.*
