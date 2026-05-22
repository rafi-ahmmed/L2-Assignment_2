# DevPulse API

A collaborative platform for software teams to report bugs, suggest features, and manage issue resolutions.

---

# 🌍 Live URL

[Live Server](https://devpulse-a2-eta-sandy.vercel.app/)

# 🚀 Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Neon Database
- Raw SQL (`pool.query`)
- JWT Authentication
- bcrypt

---

# ✨ Features

- User authentication with JWT
- Secure password hashing using bcrypt
- Role-based authorization (Contributor & Maintainer)
- Create, update, delete, and manage issues
- Filter and sort issues with query parameters
- PostgreSQL relational database integration
- Modular and scalable backend architecture
- Environment variable based configuration

---

# 🌐 API Endpoints

## 🔐 Authentication

| Method | Endpoint           | Access | Description                  |
| ------ | ------------------ | ------ | ---------------------------- |
| POST   | `/api/auth/signup` | Public | Register a new user          |
| POST   | `/api/auth/login`  | Public | Login user and get JWT token |

---

## 🐞 Issues

| Method | Endpoint          | Access          | Description        |
| ------ | ----------------- | --------------- | ------------------ |
| POST   | `/api/issues`     | Private         | Create a new issue |
| GET    | `/api/issues`     | Public          | Get all issues     |
| GET    | `/api/issues/:id` | Public          | Get single issue   |
| PATCH  | `/api/issues/:id` | Private         | Update issue       |
| DELETE | `/api/issues/:id` | Maintainer Only | Delete issue       |

---

## 🧪 API Query Examples

```bash
/api/issues?sort=newest
/api/issues?sort=oldest

/api/issues?type=bug
/api/issues?type=feature_request

/api/issues?status=open
/api/issues?status=in_progress
/api/issues?status=resolved

```

# ⚙️ Setup Instructions

## 1️⃣ Clone the repository

```bash
git clone <https://github.com/rafi-ahmmed/L2-Assignment_2.git>
cd devpulse-api
```

---

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Create `.env` file

Create a `.env` file in the root directory and add:

```env
PORT=5000
CONNECTION_STRING=your_postgresql_connection_string
JWT_SECRET=your_access_secret

```

---

# 🗄️ Database Schema Summary

## users

| Column        | Type      | Description              |
| ------------- | --------- | ------------------------ |
| id            | SERIAL    | Primary key              |
| name          | VARCHAR   | User full name           |
| email         | VARCHAR   | Unique email address     |
| password      | TEXT      | Encrypted password       |
| role          | VARCHAR   | contributor / maintainer |
| created_at    | TIMESTAMP | Account creation time    |
| updated_at    | TIMESTAMP | Account update time time |

---

## issues

| Column      | Type      | Description                        |
| ----------- | --------- | ---------------------------------- |
| id          | SERIAL    | Primary key                        |
| title       | VARCHAR   | Issue title                        |
| description | TEXT      | Detailed issue description         |
| type        | VARCHAR   | bug / feature_request              |
| status      | VARCHAR   | open / in_progress / resolved      |
| reporter_id | INTEGER   | not null but add from jwt payload  |
| created_at  | TIMESTAMP | Issue creation time                |
| updated_at  | TIMESTAMP | Issue update time                  |

---

## 5️⃣ Start development server

```bash
npm run dev
```
