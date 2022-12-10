const mongoose = require("mongoose");
const connectdatabase = () => {
  //connecting to mongodb database
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { connectdatabase };
