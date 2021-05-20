// require packages

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const booksPage = require('./booksHome');
const createbook = require('./createBook');
const deletebookForOwner = require('./deleteBook');
// const updateBook = require("./updateBook");

// initialize our server

const app = express();
const port = process.env.PORT || 3839;
app.use(cors());
app.use(express.json());

// connect express to mongo db

mongoose.connect('mongodb://localhost:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// require & create schema for our collection
const userModel = require("./models/user");
console.log(userModel);

// creating collection for each person
function yousefSeed() {
  const yousef = new userModel({
    email: "ammar.mostafa13579@gmail.com",
    books: [
      {
        name: "Fluids",
        description: "fluid dynamics",
      },
      {
        name: "The Power of Habit",
        description:
          "explain why habits exist and how they can be changed. With penetrating intelligence and an ability to distill vast amounts of information into engrossing narratives, Duhigg brings to life a whole new understanding of human nature and its potential for transformation.",
      },
      {
        name: "Heat Transfer",
        description: "How heat transfer between objects",
      },
    ],
  });

  yousef.save();
}

// yousefSeed();

function muradSeed() {
  const murad = new userModel({
    email: "muradalshorman@gmail.com",
    books: [
      {
        name: "HVAC",
        description: "heating, ventilation, and air conditioning",
      },
      {
        name: "Creo3D",
        description: "Engineering drawing",
      },
      {
        name: "Mechanical Design",
        description: "Design of mechanical parts",
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

/////////////////////////////////////////////////////////////////
// Endpoint for retrieving books data
app.get("/books", booksPage);
////////////////////////////////////////////////////////////
// new route for deleting the book by its ID
app.delete("/books/:index", deletebookForOwner);
////////////////////////////////////////////////////////////
// new route for creating the new book data
app.post("/books", createbook);
///////////////////////////////////////////////////////////
// new route for updating a book
app.put("/books/:index",updateBook);
function updateBook(req,res){
  const index = Number(req.params.index)
  const {email, name, description} = req.body;
  userModel.find({email:email}, (err, userData)=>{
    userData[0].books[index].name = name;
    userData[0].books[index].description = description;
    userData[0].save();
    console.log(userData[0]);
    res.send(userData[0].books);
  });

}
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
