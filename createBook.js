const userModel = require("./models/user");
const express = require("express");
const app = express();
app.use(express.json());


function createbook(req, res) {
  const { name, email, description } = req.body;
  console.log(req.body);
  userModel.find({ email: email }, (error, userData) => {
    console.log(userData);
    userData[0].books.push({
      name: name,
      description: description,
    });
    userData[0].save();
    res.send(userData[0].books);
  });
}

module.exports = createbook;