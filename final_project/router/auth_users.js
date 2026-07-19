const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
if(users.find(user => user.username === username)){
  return true;
}
return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
if(users.find(user => user.username === username && user.password === password)){
  return true;
}
return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const token = jwt.sign({username}, 'access', {expiresIn: '1h'});

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  else if (!authenticatedUser(username, password)) {
    return res.status(401).json({message: "Invalid username or password"});
  }
  else {
    req.session.authorization = {
      accessToken: token,
      username: username
    }
    return res.status(200).json({message: "User successfully logged in"});
  }
});

// Add a book review
  regd_users.put("/auth/review/:isbn", (req, res) => {
    const username = req.session.authorization.username;
    const isbn = req.params.isbn;
    const review = req.body.review;  
    if (!isbn || !review) {
      return res.status(400).json({message: "ISBN and review are required"});
    }
    else if (!books[isbn]) {
      return res.status(404).json({message: "Book not found"});
    }
    else {
      books[isbn].reviews[username] = review;
    }
    //Write your code here
    return res.status(200).json({message: "Review added successfully"});
  });

  // Delete a book review
  regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.session.authorization.username;
    const isbn = req.params.isbn;
    if (!isbn) {
      return res.status(400).json({message: "ISBN is required"});
    }
    else if (!books[isbn]) {
      return res.status(404).json({message: "Book not found"});
    }
    else if (!books[isbn].reviews[username]) {
      return res.status(404).json({message: "Review not found"});
    }
    else {
      delete books[isbn].reviews[username];
    }
    return res.status(200).json({message: "Review deleted successfully"});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
