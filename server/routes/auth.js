// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

/************************
 ***USER AUTH FUNCTIONS***
 *************************/

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const compareHash = async (password, hash) => {
  let result;
  await bcrypt.compare(password, hash).then(async (res, err) => {
    result = await res;
  });
  return result;
};

/*********************
 ***USER AUTH ROUTES***
 *********************/

//Authenticate
router.get("/", (req, res) => {
  res.status(200).send({"response": req.session.isAuthenticated});
  res.end();
});

router.post("/logout", async (req, res) => {
  res.cookie("connect.sid", "", { expires: new Date() });
  res.redirect("/login");
  res.end();
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const response = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  const loggedIn = await compareHash(password, response.rows[0].password);

  if (loggedIn) {
    req.session.isAuthenticated = true;
    res.redirect("/");
  } else {
    res.send("Not logged in.");
  }
  res.end();
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = hashPassword(password);

  await pool.query("INSERT INTO users (email, password) values ($1, $2)", [
    email,
    hashedPassword,
  ]);
  res.send("signed up");
});

module.exports = router;
