//Variables
const port = 5000;
//Requirements
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js');

//Middleware
app.use(cors());
app.use(express.json());

//Routes
//Add a stock
app.post('/stocks', async (req, res) => {
    try {
        const { name, quantity, location, expiration } = req.body;
        const newTodo = await pool.query("INSERT INTO stock (name, quantity, location, expiration) values ($1, $2, $3, $4) RETURNING *", 
        [name, quantity, location, expiration]); 

        await res.send(newTodo.rows);
    } catch (err) {
        console.error(err.message)
    }
})

//insert into stock (name, quantity, location, expiration) values ('test', 123, 'Location', '12/12/2012')
//Get all stocks
app.get('/stocks', async (req, res) => {
    try {
        const allStocks = await pool.query("SELECT * FROM stock");
        await res.send(allStocks.rows);
    } catch (err) {
        console.error(err.message)
    }
})

//Search a stock (name, location)
app.get('/stocks/search/', async (req, res) => {
    try {
        const { name, location } = req.query;
        let searchStock;
        if (location == 'all-locations' && name.length == 0) {
            searchStock = await pool.query("SELECT * FROM stock");
        } else if (name.length == 0 && location.length > 0) {
            searchStock = await pool.query("SELECT * FROM stock WHERE location ILIKE $1", ['%' + location + '%']);
        } else if (location == 'all-locations' && name.length > 0) {
            searchStock = await pool.query("SELECT * FROM stock WHERE name ILIKE $1", ['%' + name + '%']);
        } else {
            searchStock = await pool.query("SELECT * FROM stock WHERE name ILIKE $1 AND location ILIKE $2", ['%' + name + '%', '%' + location + '%']);
        }

        await res.send(searchStock.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get stock with a certain ID
app.get('/stocks/getid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getIdStock = await pool.query("SELECT * FROM stock WHERE stock_id = $1", [id]);

        await res.send(getIdStock.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a stock with a certain id
app.put('/stocks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, expiration } = req.body;
        const updateStock = await pool.query("UPDATE stock SET name = $1, location = $2, expiration = $3 WHERE stock_id = $4", [name, location, expiration, id]);

        await res.send(updateStock);
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a certain stock with an id
app.delete('/stocks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteStock = await pool.query("DELETE FROM stock WHERE stock_id = $1 RETURNING *", [id])

        await res.send(deleteStock);
    } catch (err) {
        console.error(err.message)
    }
})

//App Listener
app.listen(port, () => {
    console.log(`App is now listening on port ${port}`);
})