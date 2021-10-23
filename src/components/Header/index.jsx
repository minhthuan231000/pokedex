import React from 'react';
import NavBar from '../NavBar';
import './Header.scss';

function Header(props) {
    const { listPokemons } = props
    return (
        <div className="header-container">
            <div className="container">
                <NavBar listPokemons={listPokemons} />
            </div>
        </div>
    );
}

export default Header;