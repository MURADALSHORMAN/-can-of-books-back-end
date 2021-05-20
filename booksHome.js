const userModel = require("./models/user");



function booksPage(req, res) {
  const { email } = req.query;
  userModel.find({ email: email }, "books", function (error, userData) {
    if (error) res.send("Something went wrong!");

    // console.log(userData[0].books);
    res.send(userData[0].books);
  });
}

module.exports= booksPage;