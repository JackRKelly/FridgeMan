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
  res
    .status(200)
    .send({ response: req.session.isAuthenticated, email: req.session.email });
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
    req.session.email = email;
    res.redirect("/");
  } else {
    res.send("Not logged in.");
  }
  res.end();
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = hashPassword(password);

  const uppercaseCheck = RegExp("(?=.*[A-Z])");
  const numberCheck = RegExp("(?=.*[0-9])");
  const lowercaseCheck = RegExp("(?=.*[a-z])");

  if (email.length === 0) {
    res.status(409).send({ error: "Email cannot be left blank." });
  } else if (password.length < 8) {
    res
      .status(409)
      .send({ error: "Password must contain more than 8 characters." });
  } else if (!uppercaseCheck.test(password)) {
    res
      .status(409)
      .send({ error: "Password must contain at least 1 capitol character." });
  } else if (!numberCheck.test(password)) {
    res.status(409).send({ error: "Password must contain at least 1 number." });
  } else if (!lowercaseCheck.test(password)) {
    res
      .status(409)
      .send({ error: "Password must contain at least 1 lowercase character." });
  } else {
    await pool
      .query("INSERT INTO users (email, password) values ($1, $2)", [
        email,
        hashedPassword,
      ])
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err.detail);
        res.status(409).send({ error: err.detail });
      });
  }
});

module.exports = router;
