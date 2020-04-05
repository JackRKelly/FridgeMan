// Dependencies

const express = require('express');
const router = express.Router();
const pool = require("../db"); 
const bcrypt = require('bcrypt');
const dotenv = require("dotenv").config();

//
//     USER AUTH
//

//Hash a password
const hashPassword = async (password) => {
    bcrypt.genSalt(process.env.SALT_LENGTH, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash);
        });
    });
}

//$2b$10$gQPacViNJYX/iiscSKsYqOvYd.2AxyVGwpKAK/B/GEqI/73/8wBde
//$2b$10$yC3odlsVwy9v6XjTXQrgE.4kzEUTD2Ve7HKlW98bszGCScHo6blNG

router.get('/test', (req, res) => {
    hashPassword('test');
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = hashPassword(password);

        await pool.query('SELECT * FROM users WHERE email=$1 and password=$2', [email, hashedPassword])
    } catch (err) {
        console.error(err.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = hashPassword(password);

        await pool.query('SELECT * FROM users WHERE email=$1 and password=$2', [email, hashedPassword])
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;