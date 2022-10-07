const db = require("../model");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = db.users;

const addUser = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log("Enter full details!!");
    res.send("Details missing");
  }

  const salt = genSaltSync(10);
  password = hashSync(password, salt);

  const existingUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (existingUser) {
    console.log("Email ID already exists");
    res.send("Use different emailid");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(200).send(user);
    console.log(user);
  }
};

const getUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    console.log("user doesn't exist, please sign up");
    res.send("Failed no user found");
  } else {
    const result = compareSync(req.body.password, user.password);

    if (result) {
      const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
        expiresIn: "1800s",
      });
      console.log("Logged in");
      res.status(200).json({ message: "success", accessToken: token });
    } else {
      console.log("Wrong Password");
      res.send("Enter correct password");
    }
  }
};

module.exports = { addUser, getUser };
