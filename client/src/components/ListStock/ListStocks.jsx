import React, { useEffect } from 'react';
import EditStock from '../EditStock'
import "./styles.scss";

const ListStocks = (props) => {

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/stocks');
            const jsonResponse = await response.json();
            props.setStocks(jsonResponse);
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteStock = async (id) => {
        try {
            await fetch(`http://localhost:5000/stocks/${id}`, {
                method: 'DELETE'
            })
            
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className="stocks">
            {props.stocks.map(stock => {
                let today = new Date();
                let expDate = new Date(stock.expiration);
                let difDay = Math.round((expDate - today)/(1000 * 3600 * 24));
                let expStr = (difDay <= 0) ? `Expired ${difDay*-1} days ago.` : `Expires in ${difDay} days.`;

                return (
                    <div key={stock.stock_id}>
                        <p>{stock.quantity}x {stock.name}, Located in the {stock.location}, {expStr}</p>
                        <EditStock stock={stock}/>
                        <button onClick={() => {deleteStock(stock.stock_id)}}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default ListStocks;
