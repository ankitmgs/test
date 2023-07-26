const mongoose = require("mongoose");
const url = "mongodb+srv://ankitmgs:987654321@cluster0.6o3q9.mongodb.net/TO-DO-List?retryWrites=true&w=majority"

mongoose
  .connect(url)
  .then(() => {
    console.log("database successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;