// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");

/******************
 ***STOCK ROUTES***
 ******************/

//Add a stock
router.post("/", async (req, res) => {
  const { name, quantity, location, expiration } = req.body;

  res.send(
    await pool.query(
      "INSERT INTO stock (name, quantity, location, expiration) values ($1, $2, $3, $4) RETURNING *",
      [name, quantity, location, expiration]
    ).rows
  );
});

//Get all stocks
router.get("/", async (req, res) => {
  res.send((await pool.query("SELECT * FROM stock")).rows);
});

//Search a stock (name, location)
router.get("/search/", async (req, res) => {
  const { name, location } = req.query;
  let params;

  switch (`${location == "all-locations"} ${name.length == 0}`) {
    case "true true":
      params = ["SELECT * FROM stock"];
      break;
    case "false true":
      params = [
        "SELECT * FROM stock WHERE location ILIKE $1",
        ["%" + location + "%"],
      ];
      break;
    case "true false":
      params = ["SELECT * FROM stock WHERE name ILIKE $1", ["%" + name + "%"]];
      break;
    default:
      params = [
        "SELECT * FROM stock WHERE name ILIKE $1 AND location ILIKE $2",
        ["%" + name + "%", "%" + location + "%"],
      ];
      break;
  }

  res.send((await pool.query(...params)).rows);
});

//Get stock with a certain ID
router.get("/getid/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    (await pool.query("SELECT * FROM stock WHERE stock_id = $1", [id])).rows
  );
});

//Update a stock with a certain id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location, quantity, expiration } = req.body;
  res.send(
    await pool.query(
      "UPDATE stock SET name = $1, location = $2, quantity = $3, expiration = $4 WHERE stock_id = $5",
      [name, location, quantity, expiration, id]
    )
  );
});

//Delete a certain stock with an id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    await pool.query("DELETE FROM stock WHERE stock_id = $1 RETURNING *", [id])
  );
});

module.exports = router;
