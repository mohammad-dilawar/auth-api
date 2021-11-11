const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
require("dotenv").config();

//register route
router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("email already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  //create user
  const createUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
  });
  try {
    //save user
    const saveUser = await createUser.save();
    const isuser = {
      id: saveUser._id,
      name: saveUser.name,
      email: saveUser.email,
    };

    res.send(isuser);
  } catch (err) {
    //err
    console.log(err);
    res.send(err);
  }
});

//login route
router.post("/login", async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (!userExists) {
    return res.status(400).send("email  or password is not vaild.");
  }
  console.log(userExists);
  // session = req.session;

  req.session.userid = userExists.email;
  console.log("this is session", req.session);
  const vaildPassword = await bcrypt.compare(
    req.body.password,
    userExists.password
  );
  if (!vaildPassword) {
    return res.status(400).send("not vaild password");
  }
  console.log("hit", process.env.TOKEN_SECRET);
  const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});
//router changepassword
router.post("/changepassword", verify, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    let newpassword = {
      password: hashedpassword,
    };
    const userExists = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: newpassword },
      { new: true }
    );
    const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  }
});
//logout
router.post("/logout", verify, async (req, res) => {
  if (!req.body.logged) {
    return res.status(400).send("failed to logout user.");
  }
  if (req.body.logged == true) {
    req.session.destroy();
    res.send({ logged: false });
  }
});
module.exports = router;
