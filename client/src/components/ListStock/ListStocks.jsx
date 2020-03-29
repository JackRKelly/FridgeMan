import React, { useState } from 'react';
import "./styles.scss";
import { useEffect } from 'react';

const ListStocks = () => {

    const [stocks, setStocks] = useState([])

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/stocks');
            const jsonResponse = await response.json();
            setStocks(jsonResponse);
            console.log(jsonResponse);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className="stocks">
            {stocks.map(stock => {
                let today = new Date();
                let expDate = new Date(stock.expiration);
                let difDay = Math.round((expDate - today)/(1000 * 3600 * 24));
                let expStr = (difDay <= 0) ? `Expired ${difDay*-1} days ago.` : `Expires in ${difDay} days.`;

                console.log(difDay + " " + expDate);
                return (
                    <p key={stock.stock_id}>{stock.quantity}x {stock.name}, Located in the {stock.location}, {expStr}</p>
                )
            })}
        </div>
    );
}

export default ListStocks;
