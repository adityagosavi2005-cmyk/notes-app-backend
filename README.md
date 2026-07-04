# Notes App Backend

A secure RESTful Notes API built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. The application allows users to register, log in, manage personal notes, and securely access protected resources using HTTP-only cookies.

---

## Features

### Authentication

- User Registration
- User Login
- User Logout
- JWT Authentication
- Password Hashing using bcrypt
- HTTP-only Cookie Authentication

### Authorization

- Protected Routes
- Users can only access their own notes
- Ownership verification before updating or deleting notes

### Notes

- Create Note
- Get All Notes
- Update Note
- Delete Note

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- dotenv

---

## Project Structure

```
notes-app/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   └── noteController.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── userRoutes.js
│   └── noteRoutes.js
│
├── .env.example
├── .gitignore
├── app.js
├── server.js
└── package.json
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login user |
| POST | `/api/users/logout` | Logout user |
| GET | `/api/users/profile` | Get logged-in user's profile |

### Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/notes` | Create Note |
| GET | `/api/notes` | Get All Notes |
| PUT | `/api/notes/:id` | Update Note |
| DELETE | `/api/notes/:id` | Delete Note |

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/notes-app-backend.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the server

```bash
npm run dev
```

or

```bash
node server.js
```

---

## Security Features

- Passwords are hashed using bcrypt.
- JWT-based authentication.
- HTTP-only cookies prevent JavaScript access to authentication tokens.
- Protected routes using authentication middleware.
- Ownership verification before updating or deleting notes.

---

## Future Improvements

- Pagination
- Search Notes
- Note Categories
- File Uploads
- Swagger API Documentation
- Docker Support
- Frontend Integration (React)

---

## Author

**Aditya Gosavi**