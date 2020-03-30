import React, { useState } from 'react';

import "./styles.scss";

const EditStock = ({ stock }) => {

    const [ name, setName ] = useState(stock.name);
    const [ location, setLocation ] = useState(stock.location);
    const [ quantity, setQuantity ] = useState(stock.quantity);
    const [ expiration, setExpiration ] = useState(stock.expiration);
    const [ display, setDisplay ] = useState("block");

    const updateStock = async (e) => {
        e.preventDefault();
        try {
            const body = { stock }
            const response = await fetch(`http://localhost:5000/stocks/${stock.stock_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const closeModal = () => {
        setName(stock.name);
        setLocation(stock.location);
        setQuantity(stock.quantity);
        setExpiration(stock.expiration);
        setDisplay("none");
    }

    return (
        <>
            <button type="button" className="btn btn-warning" onClick={() => setDisplay("block")}>Edit</button>

            <div className="modal" style={{display: display}} onClick={() => {closeModal()}}>
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Modal Heading</h4>
                        <button type="button" className="close" onClick={() => {closeModal()}}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <input type="text" className="form-control" value={name} onChange={e => {setName(e.target.value)}} />
                        <input type="text" className="form-control" value={location} onChange={e => {setLocation(e.target.value)}} />
                        <input type="text" className="form-control" value={quantity} onChange={e => {setQuantity(e.target.value)}} />
                        <input type="text" className="form-control" value={expiration} onChange={e => {setExpiration(e.target.value)}} />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={() => {updateStock()}}>Edit</button>
                        <button type="button" className="btn btn-success" onClick={() => {closeModal()}}>Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default EditStock;
