// Dependencies

const express = require('express');
const router = express.Router();
const pool = require("../db"); 

//
//     STOCK ROUTES
//

//Add a stock
router.post("/", async (req, res) => {
  try {
    const { name, quantity, location, expiration } = req.body;
    const newStock = await pool.query(
      "INSERT INTO stock (name, quantity, location, expiration) values ($1, $2, $3, $4) RETURNING *",
      [name, quantity, location, expiration]
    );

    res.send(newStock.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all stocks
router.get("/", async (req, res) => {
  try {
    const allStocks = await pool.query("SELECT * FROM stock");
    res.send(allStocks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Search a stock (name, location)
router.get("/search/", async (req, res) => {
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
router.get("/getid/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;