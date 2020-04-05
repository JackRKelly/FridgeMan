// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

//
//     USER AUTH
//

//Hash a password
const hashPassword = (password) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

//Compare hash to password
const compareHash = async (password, hash) => {
  let result;
  await bcrypt.compare(password, hash).then(async (res, err) => {
    result = await res;
  });
  return result;
};

//Login route
router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:3000');
});

//Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    const loggedIn = await compareHash(password, response.rows[0].password);

    res.send("logged in");
  } catch (err) {
    console.error(err.message);
    //res.send(err.message);
  }
});

//Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = hashPassword(password);

    const response = await pool.query(
      "INSERT INTO users (email, password) values ($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    console.log(response.rows);
    res.send("signed up");
  } catch (err) {
    console.error(err.message);
    //res.send(err.message);
  }
});

module.exports = router;
