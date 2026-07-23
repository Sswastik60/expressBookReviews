📚 Express Book Reviews API

A RESTful Book Review API built with Node.js and Express.js as part of the IBM Backend Development course. This project demonstrates REST API development, user authentication, session management, and asynchronous programming using Promises and Async/Await.

✨ Features

- 📖 View all available books
- 🔍 Search books by ISBN, Author, and Title
- 📝 View book reviews
- 👤 User registration
- 🔐 User login with JWT & Express Session
- ✍️ Add, update, and delete reviews (authenticated users)
- ⚡ Async implementations using Promises and Async/Await

🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript (ES6)
- JSON
- JWT (JSON Web Token)
- Express Session

📁 Project Structure

expressBookReviews/
├── router/
│   ├── auth_users.js
│   ├── general.js
│   └── booksdb.js
├── index.js
├── package.json
└── README.md

🚀 Getting Started

Clone the repository

git clone https://github.com/Sswastik60/expressBookReviews.git
cd expressBookReviews

Install dependencies

npm install

Start the server

npm start

Server runs on:

http://localhost:5000

📌 API Endpoints

Public Routes

Method| Endpoint| Description
GET| "/"| Get all books
GET| "/isbn/:isbn"| Search by ISBN
GET| "/author/:author"| Search by author
GET| "/title/:title"| Search by title
GET| "/review/:isbn"| Get book reviews
POST| "/register"| Register a new user

Protected Routes

Method| Endpoint| Description
POST| "/customer/login"| Login user
PUT| "/customer/auth/review/:isbn"| Add or update a review
DELETE| "/customer/auth/review/:isbn"| Delete your review

📚 Concepts Covered

- RESTful API Development
- Express Routing
- Authentication & Authorization
- JWT
- Express Session
- CRUD Operations
- Middleware
- Error Handling
- Promises
- Async/Await

🎓 Course

Developed as part of the IBM Backend Development course.

👨‍💻 Author

Swastik Sharma

⭐ If you found this project useful, consider starring the repository!
