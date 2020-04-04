// Dependencies

const express = require('express');
const router = express.Router();
const pool = require("../db"); 

//
//     LOCATION ROUTES
//

//Get all locations
router.get("/", async (req, res) => {
  try {
    const allLocations = await pool.query("SELECT * FROM location");
    res.send(allLocations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a certain location with an id
router.delete("/:id", async (req, res) => {
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
router.get("/getid/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newLocation = await pool.query(
      "INSERT INTO location (name) values ($1) RETURNING *",
      [name]
    );

    res.send(newLocation.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;