# DevPulse API

A collaborative platform for software teams to report bugs, suggest features, and manage issue resolutions.

---

# 🌍 Live URL

[Live Server](https://assignment-2-gspic5lyj-rafi-ahmmeds-projects.vercel.app/)

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
/api/issues?sort=newest or oldest
/api/issues?type=bug or feature_request
/api/issues?status=open or in_progress or resolved

```
