const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
require("dotenv").config();
const app = new express();

//import database
const db = require("./database/database");
//import routes
const authRoute = require("./routes/auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//router middlewares
// creating 24 hours from milliseconds
var session;
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());
app.use("/api/user", authRoute);
db.onConnect(() => {
  console.log("database connected");
});
app.use((err, req, res, next) => {
  // console.log(err);
  const status = err.status || 500;
  const message = err.message || errors.SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});
// app.use(express.static("index.html"));

app.get("/", (req, res) => {
  // session = req.session;
  // console.log(session);
  res.json({ status: 200, message: "Welcome to auth api. " });
});
// app.listen(3000, () => {
//   console.log(`Listening at http://localhost:3000`);
// });
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at http://localhost:3000`);
});
