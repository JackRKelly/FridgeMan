import React, { useState } from 'react';
import "./styles.scss";

const AddStock = () => {

    const [ name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ quantity, setQuantity ] = useState("");
    const [ expiration, setExpiration ] = useState("");

    const addStock = async (e) => {
        e.preventDefault();
        try {
            const body = { name, location, quantity, expiration }
            const addItem = await fetch('http://localhost:5000/stocks', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <form className="add" onSubmit={(e) => {addStock(e)}} >
            <input type="text" placeholder="Stock Name" value={name} onChange={e => {setName(e.target.value)}}/>
            <input type="text" placeholder="Stock Location" value={location} onChange={e => {setLocation(e.target.value)}}/>
            <input type="text" placeholder="Stock Quantity" value={quantity} onChange={e => {setQuantity(e.target.value)}}/>
            <input type="date" value={expiration} onChange={e => {setExpiration(e.target.value)}}/>
            <button>Add Stock</button>
        </form>
    );
}

export default AddStock;
