//Variables
const port = 5000;
const cookieExpire = 1000 * 60 * 60 * 2;

//Requirements
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

//Routes
const stocks = require("./routes/stocks");
const locations = require("./routes/locations");
const auth = require("./routes/auth");
const index = require("./routes/index");

//Middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      secure: false,
      maxAge: cookieExpire,
      sameSite: true,
    },
  })
);

//Add Route Listeners
app.use("/api/stocks", stocks);
app.use("/api/locations", locations);
app.use("/api/auth", auth);
app.use("/", index);

//App Listener
app.listen(port, () => {
  console.log(`App is now listening on port ${port}`);
});
