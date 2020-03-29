import React from 'react';
import "./styles.scss";

const SearchStock = () => {

    const searchStock = async (e) => {
        e.preventDefault();
        console.log(e);
        try {
            
            const searchResult = await fetch(`http://localhost:5000/stocks/search/`, {//${name}/${location}
                method: 'get'
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <form onSubmit={(e) => {searchStock(e)}}>
            <input type="text" placeholder="Search Name"/>
            <input type="text" placeholder="Search Location"/>
            <button>Search Stock</button>
        </form>
    )
}

export default SearchStock;
