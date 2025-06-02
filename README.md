# Course-Spill

A full-stack course-selling platform built with Node.js, Express, and MongoDB. Course-Spill allows two types of users—**sellers** (admins/instructors) and **buyers** (end-users)—to register, log in, and interact with a marketplace of online courses. Sellers can create, update, and delete courses; Buyers can browse, purchase, and view their purchased courses.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Folder Structure](#folder-structure)  
5. [Environment Variables](#environment-variables)   
6. [Sample `.env` File](#sample-env-file)  



---

## Features

- **Role-Based Authentication**  
  - **Sellers (Admins/Instructors)**  
    - Register & log in  
    - Create, update, and delete courses  
    - View all orders (purchases) made by buyers  
  - **Buyers (End-Users)**  
    - Register & log in  
    - Browse all available courses  
    - Purchase courses and view their purchased courses  

- **Course Management**  
  - CRUD operations (Create, Read, Update, Delete) for course listings  
  - Course metadata: title, description, price, category, thumbnail, etc.  

- **Purchase & Order Tracking**  
  - Buyers can buy a course  
  - Each purchase is recorded in a `purchases` collection  
  - Sellers can see which users bought which courses  

- **Session-Based Authentication**  
  - Uses `express-session` with separate configuration for users and admins  
  - Middleware to protect routes & enforce role-based access  

- **Modular Codebase**  
  - Organized into `controllers/`, `routes/`, `models/`, `middleware/`, `config/`  

---

## Tech Stack

- **Runtime & Frameworks**  
  - Node.js (v14+ recommended)  
  - Express.js  

- **Database & ODM**  
  - MongoDB (hosted locally or via a cloud provider)  
  - Mongoose (object data modeling for MongoDB/Node.js)  

- **Authentication & Sessions**  
  - express-session  
  - Connect-Mongo (optional, if sessions are stored in MongoDB)  

- **Linting & Formatting**  
  - ESLint (optional)  
  - Prettier (optional)  

- **Miscellaneous**  
  - dotenv (for environment variables)  
  - bcrypt (for password hashing)  
  - body-parser (JSON parsing is built into Express ≥4.16)  

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)  
- **npm** or **Yarn**  
- **MongoDB** (local instance or MongoDB Atlas)  

---

## Folder Structure

course-spill/
├── config/
│ ├── sessionConfig.js # session settings for users & admins
│ └── config.js # other environment config (e.g., .env loader)
├── controllers/
│ ├── adminController.js # admin-specific business logic
│ ├── courseController.js # course-related business logic
│ └── userController.js # user-related business logic
├── middleware/
│ ├── adminMiddleware.js # checks admin permissions
│ ├── userMiddleware.js # checks user permissions
│ ├── adminSessionMiddleware.js # express-session for admins
│ └── userSessionMiddleware.js # express-session for users
├── models/
│ ├── adminModel.js # Mongoose schema for admins
│ ├── userModel.js # Mongoose schema for users (buyers)
│ ├── courseModel.js # Mongoose schema for courses
│ └── purchaseModel.js # Mongoose schema for purchase records
├── routes/
│ ├── admin.js # admin-only routes (course CRUD, view orders)
│ ├── course.js # public or user routes related to courses
│ └── user.js # user authentication & profile routes
├── index.js # entry point (Express app initialization)
├── db.js # MongoDB connection logic (via Mongoose)
├── .env.example # example environment variables
├── README.md # this file
└── package.json # project manifest & dependencies


## Environment Variables

Create a `.env` file in the root directory. Required variables include:

```text
# MongoDB connection string (use your own cluster URI or local MongoDB URI)
MONGODB_URL=mongodb://localhost:27017/course-spill

# Session secrets (use a long, random string for each)
USER_SESSION_SECRET=your_user_session_secret_here
ADMIN_SESSION_SECRET=your_admin_session_secret_here

# Port on which the server will run (default: 3000)
PORT=3000

1. Auth & User Management
Base URL: /api/v1/user

| Method | Endpoint    | Description                             | Access        | Request Body                | Response                                   |
| ------ | ----------- | --------------------------------------- | ------------- | --------------------------- | ------------------------------------------ |
| POST   | `/register` | Register a new buyer (user)             | Public        | `{ name, email, password }` | `{ success: true, user: { … } }`           |
| POST   | `/login`    | Log in as buyer; creates user session   | Public        | `{ email, password }`       | `{ success: true, user: { … } }`           |
| POST   | `/logout`   | Log out current buyer; destroys session | Authenticated | *None*                      | `{ success: true, message: "Logged out" }` |
| GET    | `/me`       | Get current logged-in buyer’s profile   | Authenticated | *None*                      | `{ success: true, user: { … } }`           |

2. Course Catalog & Purchases
Base URL: /api/v1/course
| Method | Endpoint      | Description                           | Access        | Request Body   | Response                             |
| ------ | ------------- | ------------------------------------- | ------------- | -------------- | ------------------------------------ |
| GET    | `/preview`    | List all available courses (public)   | Public        | *None*         | `[{ course1 }, { course2 }, …]`      |
| POST   | `/purchase`   | Purchase a course (creates purchase)  | Authenticated | `{ courseId }` | `{ success: true, purchase: { … } }` |
| GET    | `/my-courses` | Get all courses purchased by the user | Authenticated | *None*         | `[{ purchasedCourse1 }, …]`          |

3. Admin (Seller) Routes
Base URL: /api/v1/admin
All routes protected by admin session.

| Method | Endpoint             | Description                               | Access        | Request Body                                                    | Response                                   |
| ------ | -------------------- | ----------------------------------------- | ------------- | --------------------------------------------------------------- | ------------------------------------------ |
| POST   | `/register`          | Register a new admin/seller               | Public        | `{ name, email, password }`                                     | `{ success: true, admin: { … } }`          |
| POST   | `/login`             | Log in as admin; creates admin session    | Public        | `{ email, password }`                                           | `{ success: true, admin: { … } }`          |
| POST   | `/logout`            | Log out current admin; destroys session   | Authenticated | *None*                                                          | `{ success: true, message: "Logged out" }` |
| GET    | `/me`                | Get current logged-in admin profile       | Authenticated | *None*                                                          | `{ success: true, admin: { … } }`          |
| POST   | `/courses`           | Create/Add a new course                   | Authenticated | `{ title, description, price, category, thumbnailURL, … }`      | `{ success: true, course: { … } }`         |
| PUT    | `/courses/:courseId` | Update an existing course                 | Authenticated | `{ title?, description?, price?, category?, thumbnailURL?, … }` | `{ success: true, course: { … } }`         |
| DELETE | `/courses/:courseId` | Delete a course by ID                     | Authenticated | *None*                                                          | `{ success: true, message: "Deleted" }`    |
| GET    | `/courses`           | List all courses (with full details)      | Authenticated | *None*                                                          | `[{ course1 }, { course2 }, …]`            |
| GET    | `/orders`            | List all purchase orders across all users | Authenticated | *None*                                                          | `[{ order1 }, { order2 }, …]`              |

Authentication & Sessions
Sessions are managed via express-session.

userSessionMiddleware loads the session for buyers (users).

adminSessionMiddleware loads the session for sellers (admins).

Each middleware checks for a valid session cookie. If the user/admin is not logged in, protected routes will return a 401 Unauthorized response.

Sample .env File
PORT=
JWT_ADMIN_PASSWORD=
JWT_USER_PASSWORD=
MONGODB_URL= 
SESSION_ADMIN_SECRET=
SESSION_USER_SECRET=