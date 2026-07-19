const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the user already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).json({message: "User already exists"});
  }

  // Add the new user
  users.push({username, password});
  return res.status(201).json({message: "User created successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});
//get books details using promises
public_users.get('/booksusingpromises', (req, res) => {
  // Simulate an API call with a delay
  setTimeout(() => {
    res.status(200).json(books);
  }, 1000);
});
//get books details using async-await
// public_users.get('/booksusingasyncawait', async (req, res) => {
//   try {
//     setTimeout(() => {
//       res.status(200).json(books);
//     }, 1000);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if(books[isbn]){
  return res.status(200).json(books[isbn]);
 }
 return res.status(404).json({message: "Book not found"});
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  let booksByAuthor = [];
  for (let isbn in books) {
    if (books[isbn].author === author) {
      booksByAuthor.push(books[isbn]);
    }
  }
  return res.status(200).json({books: booksByAuthor});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let booksByTitle = [];
  for (let isbn in books) {
    if (books[isbn].title === title) {
      booksByTitle.push(books[isbn]);
    }
  }
  return res.status(200).json({books: booksByTitle});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if(books[isbn]){
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.general = public_users;
