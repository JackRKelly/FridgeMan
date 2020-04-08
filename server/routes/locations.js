// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");

/*********************
 ***LOCATION ROUTES***
 *********************/

//Get all locations
router.get("/", async (req, res) => {
  const allLocations = await pool.query(
    "SELECT * FROM location WHERE email = $1",
    [req.session.email]
  );
  res.send(allLocations.rows);
});

//Delete a certain location with an id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    await pool.query(
      "DELETE FROM location WHERE location_id = $1 RETURNING *",
      [id]
    )
  );
});

//Get location with a certain ID
router.get("/getid/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    await pool.query("SELECT * FROM location WHERE location_id = $1", [id])
  );
});

//Update a location with a certain id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  res.send(
    await pool.query("UPDATE location SET name = $1 WHERE location_id = $2", [
      name,
      id,
    ])
  );
});

//Add a location
router.post("/", async (req, res) => {
  const { name } = req.body;
  res.send(
    (
      await pool.query(
        "INSERT INTO location (name, email) values ($1, $2) RETURNING *",
        [name, req.session.email]
      )
    ).rows
  );
});

module.exports = router;
