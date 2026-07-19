// const express = require('express');
// let books = require("./booksdb.js");
// let isValid = require("./auth_users.js").isValid;
// let users = require("./auth_users.js").users;
// const public_users = express.Router();


// public_users.post("/register", (req,res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   // Check if the user already exists
//   if (users.find(user => user.username === username)) {
//     return res.status(400).json({message: "User already exists"});
//   }

//   // Add the new user
//   users.push({username, password});
//   return res.status(201).json({message: "User created successfully"});
// });

// // Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   return res.status(200).json(books);
// });
// //get books details using promises
// public_users.get('/booksusingpromises', (req, res) => {
//   // Simulate an API call with a delay
//   setTimeout(() => {
//     res.status(200).json(books);
//   }, 1000);
// });
// //get books details using async-await
// // public_users.get('/booksusingasyncawait', async (req, res) => {
// //   try {
// //     setTimeout(() => {
// //       res.status(200).json(books);
// //     }, 1000);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Internal Server Error' });
// //   }
// // });

// // Get book details based on ISBN
// // public_users.get('/isbn/:isbn',function (req, res) {
// //   let isbn = req.params.isbn;
// //   if(books[isbn]){
// //   return res.status(200).json(books[isbn]);
// //  }
// //  return res.status(404).json({message: "Book not found"});
// // });
// //get book details based on isbn using promises
// public_users.get('/isbn/:isbn', (req, res) => {
//   const isbn = req.params.isbn;
//   setTimeout(() => {
//     if (books[isbn]) {
//       res.status(200).json(books[isbn]);
//     } else {
//       res.status(404).json({message: "Book not found"});
//     }
//   }, 1000);
// });

// // Get book details based on author
// // public_users.get('/author/:author',function (req, res) {
// //   //Write your code here
// //   let author = req.params.author;
// //   let booksByAuthor = [];
// //   for (let isbn in books) {
// //     if (books[isbn].author === author) {
// //       booksByAuthor.push(books[isbn]);
// //     }
// //   }
// //   return res.status(200).json({books: booksByAuthor});
// // });
// //get book details based on author using promises
// public_users.get('/author/:author', (req, res) => {
//   const author = req.params.author;
//   setTimeout(() => {
//     let booksByAuthor = [];
//     for (let isbn in books) {
//       if (books[isbn].author === author) {
//         booksByAuthor.push(books[isbn]);
//       }
//     }
//     if (booksByAuthor.length > 0) {
//       res.status(200).json({books: booksByAuthor});
//     } else {
//       res.status(404).json({message: "No books found for the given author"});
//     }
//   }, 1000);
// });

// // Get all books based on title
// // public_users.get('/title/:title',function (req, res) {
// //   let title = req.params.title;
// //   let booksByTitle = [];
// //   for (let isbn in books) {
// //     if (books[isbn].title === title) {
// //       booksByTitle.push(books[isbn]);
// //     }
// //   }
// //   return res.status(200).json({books: booksByTitle});
// // });
// //get book details based on title using promises
// public_users.get('/title/:title', (req, res) => {
//   const title = req.params.title;
//   setTimeout(() => {
//     let booksByTitle = [];
//     for (let isbn in books) {
//       if (books[isbn].title === title) {
//         booksByTitle.push(books[isbn]);
//       }
//     }
//     if (booksByTitle.length > 0) {
//       res.status(200).json({books: booksByTitle});
//     } else {
//       res.status(404).json({message: "No books found for the given title"});
//     }
//   }, 1000);
// });

// //  Get book review
// public_users.get('/review/:isbn',function (req, res) {
//   let isbn = req.params.isbn;
//   if(books[isbn]){
//     return res.status(200).json(books[isbn].reviews);
//   }
//   return res.status(404).json({message: "Book not found"});
// });

// module.exports.general = public_users;
const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Base URL for internal API calls — adjust port/host as needed
const BASE_URL = "http://localhost:5000";

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  if (users.find(user => user.username === username)) {
    return res.status(400).json({message: "User already exists"});
  }

  users.push({username, password});
  return res.status(201).json({message: "User created successfully"});
});

// Get the book list available in the shop (using async/await + axios)
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return res.status(200).json(response.data);
  } catch (error) {
    // Fallback in case the axios call fails (e.g. self-referential call issue)
    return res.status(200).json(books);
  }
});

// Get books details using async/await directly (no axios needed here,
// since this route itself IS the data source)
public_users.get('/booksusingasyncawait', async (req, res) => {
  try {
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(books), 1000);
      });
    };
    const allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error"});
  }
});

// Get book details based on ISBN using async/await + axios
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({message: "Book not found"});
    }
    return res.status(500).json({message: "Internal Server Error"});
  }
});

// Get book details based on author using async/await + axios
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({message: "No books found for the given author"});
    }
    return res.status(500).json({message: "Internal Server Error"});
  }
});

// Get book details based on title using async/await + axios
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({message: "No books found for the given title"});
    }
    return res.status(500).json({message: "Internal Server Error"});
  }
});

// Get book review using async/await + axios
public_users.get('/review/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return res.status(200).json(response.data.reviews);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({message: "Book not found"});
    }
    return res.status(500).json({message: "Internal Server Error"});
  }
});

module.exports.general = public_users;