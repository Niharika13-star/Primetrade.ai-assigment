# Primetrade Assignment

## Overview
This is a full-stack web application built as an internship assignment for **Primetrade.ai**.  
The project allows users to register, log in, and manage tasks. It demonstrates **secure backend APIs with authentication and role-based access**, a **React.js frontend**, and **Postman API testing**.

---

## Features

### Backend
- Node.js + Express.js server
- MongoDB database for storing users and tasks
- User registration & login with **JWT authentication**
- Password hashing using **bcryptjs**
- CRUD APIs for tasks (create, read, update, delete)
- Role-based access (user/admin)
- API versioning and error handling
- Input validation and sanitization
- Scalable project structure
- API documentation via Postman collection

### Frontend
- Built using **React.js**
- User-friendly interface with forms for registration, login, and task management
- Dashboard displaying tasks in cards
- JWT token-based protected routes
- Axios for API requests
- Bootstrap for styling

### Postman
- Collection includes:
  - Register
  - Login
  - Create Task
  - Get Tasks
  - Update Task
  - Delete Task
- Authorization headers included with JWT token
- Exported JSON file included for testing

---

## Project Structure

primetrade-assignment/
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ └── Task.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── tasks.js
│ ├── middleware/
│ │ └── auth.js
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Register.js
│ │ │ ├── Login.js
│ │ │ └── Dashboard.js
│ │ └── App.js
│ └── package.json
├── PostmanCollection.json
└── README.md



## Installation & Setup

### Backend
1. Navigate to the backend folder:
```bash
cd primetrade-assignment/backend
Install dependencies:


npm install
Create a .env file in backend/ with the following:


MONGO_URI=mongodb+srv://niharikavyas6_db_user:piGDG24qS29zsIcn@cluster0.iiinksa.mongodb.net/
JWT_SECRET=myverystrongsecret123
PORT=5000
Start the backend server:


npm run dev
Frontend
Navigate to the frontend folder:


cd primetrade-assignment/frontend
Install dependencies:


npm install
Start the React app:


npm start
The frontend will run on http://localhost:3000/ 

Usage
Register a new user via frontend or Postman (POST /api/auth/register)

Login to obtain JWT token (POST /api/auth/login)

Access dashboard and perform CRUD operations on tasks

Use Postman collection to test all API endpoints

Postman Collection
Postman collection JSON file is included: PostmanCollection.json

Import it in Postman to test all APIs with Authorization headers

Notes
Ensure MongoDB is running and .env variables are correctly set

JWT tokens are required for protected routes

Passwords are hashed for security

Backend and frontend are separate; ensure both are running simultaneously

Author
Niharika Vyas
Internship Assignment for Primetrade.ai

