const userModel = require("./models/user");


function deletebookForOwner(req, res) {
  const index = Number(req.params.index);

  const { email } = req.query;

  userModel.find({ email: email }, (err, userData) => {
    const newBooksArr = userData[0].books.filter((book, idx) => {
      return idx !== index;
    });
    userData[0].books = newBooksArr;
    userData[0].save();
    res.send(" book deleted");
  });
}

module.exports= deletebookForOwner;