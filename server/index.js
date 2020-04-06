//Variables
const port = 5000;
const cookieExpire = 1000 * 60 * 60 * 5;

//Requirements
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const session = require("express-session");

//Routes
const stocks = require("./routes/stocks");
const locations = require("./routes/locations");
const auth = require("./routes/auth");

//Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      //secure: true,
      maxAge: cookieExpire,
    },
  })
);

//Add Route Listeners
app.use("/api/stocks", stocks);
app.use("/api/locations", locations);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.type("html");
  fs.readFile("../client/build/index.html", (err, data) => {
    res.send(data.toString());
  });
});

app.get("/static/:folder/:filename", (req, res) => {
  console.log(req.params);

  const { folder, filename } = req.params;

  fs.readFile(`../client/build/static/${folder}/${filename}`, (err, data) => {
    if (folder === "media") {
    } else {
      res.type(folder);
    }
    res.send(data);
  });
});

app.get("/:path", (req, res) => {
  const { path } = req.params;

  if (path === "manifest.json") {
    res.type("json");
    fs.readFile("../client/build/manifest.json", (err, data) => {
      res.send(data);
    });
  } else if (path.endsWith(".png")) {
    res.type("png");
    fs.readFile(`../client/build/${path}`, (err, data) => {
      res.send(data);
    });
  } else if (path.endsWith(".ico")) {
    res.type("ico");
    fs.readFile(`../client/build/${path}`, (err, data) => {
      res.send(data);
    });
  } else {
    res.type("html");
    fs.readFile("../client/build/index.html", (err, data) => {
      res.send(data);
    });
  }
});

//App Listener
app.listen(port, () => {
  console.log(`App is now listening on port ${port}`);
});
