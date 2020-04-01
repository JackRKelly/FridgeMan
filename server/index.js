//Variables
const port = 5000;
//Requirements
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

//Middleware
app.use(cors());
app.use(express.json());

//
//     STOCK ROUTES
//

//Add a stock
app.post("/stocks", async (req, res) => {
  try {
    const { name, quantity, location, expiration } = req.body;
    const newStock = await pool.query(
      "INSERT INTO stock (name, quantity, location, expiration) values ($1, $2, $3, $4) RETURNING *",
      [name, quantity, location, expiration]
    );

    await res.send(newStock.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all stocks
app.get("/stocks", async (req, res) => {
  try {
    const allStocks = await pool.query("SELECT * FROM stock");
    res.send(allStocks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Search a stock (name, location)
app.get("/stocks/search/", async (req, res) => {
  try {
    const { name, location } = req.query;
    let searchStock;
    if (location == "all-locations" && name.length == 0) {
      searchStock = await pool.query("SELECT * FROM stock");
    } else if (name.length == 0 && location.length > 0) {
      searchStock = await pool.query(
        "SELECT * FROM stock WHERE location ILIKE $1",
        ["%" + location + "%"]
      );
    } else if (location == "all-locations" && name.length > 0) {
      searchStock = await pool.query(
        "SELECT * FROM stock WHERE name ILIKE $1",
        ["%" + name + "%"]
      );
    } else {
      searchStock = await pool.query(
        "SELECT * FROM stock WHERE name ILIKE $1 AND location ILIKE $2",
        ["%" + name + "%", "%" + location + "%"]
      );
    }

    res.send(searchStock.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get stock with a certain ID
app.get("/stocks/getid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getIdStock = await pool.query(
      "SELECT * FROM stock WHERE stock_id = $1",
      [id]
    );

    res.send(getIdStock.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update a stock with a certain id
app.put("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, quantity, expiration } = req.body;
    const updateStock = await pool.query(
      "UPDATE stock SET name = $1, location = $2, quantity = $3, expiration = $4 WHERE stock_id = $5",
      [name, location, quantity, expiration, id]
    );

    res.send(updateStock);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a certain stock with an id
app.delete("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStock = await pool.query(
      "DELETE FROM stock WHERE stock_id = $1 RETURNING *",
      [id]
    );

    res.send(deleteStock);
  } catch (err) {
    console.error(err.message);
  }
});

//
//     LOCATION ROUTES
//

//Get all locations
app.get("/locations", async (req, res) => {
  try {
    const allLocations = await pool.query("SELECT * FROM location");
    res.send(allLocations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a certain location with an id
app.delete("/locations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLocation = await pool.query(
      "DELETE FROM location WHERE location_id = $1 RETURNING *",
      [id]
    );

    res.send(deleteLocation);
  } catch (err) {
    console.error(err.message);
  }
});

//Get location with a certain ID
app.get("/locations/getid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getIdlocation = await pool.query(
      "SELECT * FROM location WHERE location_id = $1",
      [id]
    );

    res.send(getIdlocation.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update a location with a certain id
app.put("/locations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatelocation = await pool.query(
      "UPDATE location SET name = $1 WHERE location_id = $2",
      [name, id]
    );

    res.send(updatelocation);
  } catch (err) {
    console.error(err.message);
  }
});

//Add a location
app.post("/locations", async (req, res) => {
  try {
    const { name } = req.body;
    const newLocation = await pool.query(
      "INSERT INTO location (name) values ($1) RETURNING *",
      [name]
    );

    await res.send(newLocation.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//App Listener
app.listen(port, () => {
  console.log(`App is now listening on port ${port}`);
});
