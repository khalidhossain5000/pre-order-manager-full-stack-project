# Preorder Manager

A full-stack preorder management application built with **Next.js 16**, **Prisma**, and **SQLite**. Supports creating, updating, filtering, sorting, and paginating preorders — all handled server-side.

---

## 🚀 Quick Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/khalidhossain5000/pre-order-manager-full-stack-project.git
cd pre-order-manager-full-stack-project
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="file:./dev.db"
```

---

### 4. Set Up the Database

Run Prisma migrations to create the SQLite database and apply the schema:

```bash
npx prisma migrate dev --name init
```

> This will create a `dev.db` file inside the `prisma/` folder automatically.

---

### 5. (Optional) Open Prisma Studio

You can use Prisma Studio to manually add sample preorder data:

```bash
npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) in your browser and add records to the `PreOrder` table.

---

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Live Demo

**[https://pre-order-manager-full-stack-project.onrender.com](https://pre-order-manager-full-stack-project.onrender.com)**

> Hosted on [Render](https://render.com). Note: The free tier may take 30–60 seconds to spin up on first load.

---

## 📁 Project Structure

```
pre-order-manager-full-stack-project/
├── app/
│   ├── api/
│   │   └── preorders/          # API route handlers (GET, POST, PATCH, DELETE)
│   ├── preorders/
│   │   └── [id]/               # Dynamic update page
│   ├── create-preorder/        # Create preorder page
|   ├── update-preorder/        # Update Preorder page
│   ├── page.tsx                # Preorder list page (home)
│   └── layout.tsx
├── components/                 # Reusable UI components
├── lib/
│   └── prisma.ts               # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── dev.db                  # SQLite database (auto-generated)
├── public/
├── .env                        # Environment variables (not committed)
├── next.config.ts
└── package.json
```

---

## 🛠 Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Framework  | Next.js 16 (App Router)  |
| Language   | TypeScript               |
| Database   | SQLite (via Prisma ORM)  |
| Styling    | Tailwind CSS             |
| Icons      | Lucide React             |


---

## 🗄 Database Schema

```prisma
model PreOrder {
  id           String       @id @default(uuid())
  name         String
  products     Int
  preOrderWhen PreorderWhen
  status       Status
  startsAt     DateTime
  endsAt       DateTime?
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
}

enum PreorderWhen {
  NOW
  LATER
  // (your actual enum values)
}

enum Status {
  ACTIVE
  INACTIVE
}
```

---

## ✨ Features

- **Preorder List Page** — displays all preorders in a table with:
  - Filter by status: All / Active / Inactive (server-side)
  - Sort by multiple fields (server-side)
  - Pagination (server-side)
  - Row checkboxes and select-all checkbox
- **Create Preorder** — form to add a new preorder record to the database
- **Update Preorder** — pre-filled form to edit an existing preorder
- **Status Toggle** — switch Active/Inactive inline with instant DB update and visual feedback
- **Delete** — remove a preorder from the database, list updates immediately
- **Loading States** — loader shown while saving on create/update page
- **Navigation** — Cancel, Save, and Back buttons all redirect to the list page

---

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma migrate dev --name <name>   # Run a new migration
```

---

## 📝 Notes

- No seed script is included. Use **Prisma Studio** (`npx prisma studio`) to manually add sample data after setup.
- The SQLite `dev.db` file is auto-generated on first migration and is not committed to the repository.
- All filtering, sorting, and pagination logic runs on the **server side** via Next.js API routes — not on the client.