const mongoose = require("mongoose");

// connect to mongoose

const uri = process.env.DATABASE_KEY;

// const client = new

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log("an error occurred", err);
    // console.log('database connected');
    connectionCallback();
  }
);

let connectionCallback = () => {};

module.exports.onConnect = (callback) => {
  connectionCallback = callback;
};
