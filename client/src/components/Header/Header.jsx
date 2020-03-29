import React from 'react';
import AddStock from '../AddStock';
import SearchStock from '../SearchStock';
import "./styles.scss";

const Header = () => {

    return (
        <nav>
            <AddStock/>
            <SearchStock/>
        </nav>
    );
}

export default Header;
