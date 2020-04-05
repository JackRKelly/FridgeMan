//Variables
const port = 5000;
//Requirements
const express = require("express");
const app = express();
const cors = require("cors");

//Routes
const stocks = require('./routes/stocks');
const locations = require('./routes/locations');
const auth = require('./routes/auth');

//Middleware
app.use(cors());
app.use(express.json());

//Add Route Listeners
app.use('/stocks', stocks);
app.use('/locations', locations);
app.use('/auth', auth);

//App Listener
app.listen(port, () => {
  console.log(`App is now listening on port ${port}`);
});
