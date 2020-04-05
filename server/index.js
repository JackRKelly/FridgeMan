//Variables
const variables = {
  port: 5000,
  cookieExpire: 1000 * 60 * 60 * 5,
}

//Requirements
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session")

//Routes
const stocks = require('./routes/stocks');
const locations = require('./routes/locations');
const auth = require('./routes/auth');

//Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    //secure: true,
    maxAge: variables.cookieExpire,
    sameSite: 'none'
   }
}))

//Add Route Listeners
app.use('/stocks', stocks);
app.use('/locations', locations);
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.redirect('http://localhost:3000');
})

//App Listener
app.listen(variables.port, () => {
  console.log(`App is now listening on port ${variables.port}`);
});
