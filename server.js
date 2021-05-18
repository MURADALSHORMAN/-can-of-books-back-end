// require packages

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// initialize our server

const app = express();
const port = process.env.PORT || 3839;
app.use(cors());

// connect express to mongo db

mongoose.connect('mongodb://localhost:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// require & create schema for our collection
const userModel = require('./user');
console.log(userModel);


// creating collection for each person
function yousefSeed() {
  const yousef = new userModel({
    email: 'ammar.mostafa13579@gmail.com',
    books: [
      {
        name: 'Fluids',
        description: 'fluids dynamics',
      },
      {
        name: 'The Power of Habit',
        description:
          'explain why habits exist and how they can be changed. With penetrating intelligence and an ability to distill vast amounts of information into engrossing narratives, Duhigg brings to life a whole new understanding of human nature and its potential for transformation.',
      },
      {
        name: 'AutoCad',
        description: 'drawing',
      },
    ],
  });

  yousef.save();

}

// yousefSeed();

function muradSeed() {
  const murad = new userModel({
    email: 'muradalshorman@gmail.com',
    books: [
      {
        name: 'data analysis',
        description: 'computer data anylisis',
      },
      {
        name: 'forex',
        description: 'analysis and trading forex market',
      },
      {
        name: 'computer maintinance',
        description: '*********************',
      },
    ],
  });
  murad.save();
}
// muradSeed();

app.get("/", homePage);

function homePage(req, res) {
  res.send("This is my Home Page");
}


// Endpoint for retrieving books data
app.get("/books", booksPage);

function booksPage(req, res) {
  const { email } = req.query;
  userModel.find({ email: email }, "books", function (error, userData) {
    if (error) res.send("Something went wrong!");
    console.log(userData);
    res.send(userData);
  });
}

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
