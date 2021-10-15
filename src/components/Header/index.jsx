import React from 'react';
import Logo from '../../assets/pokedex-logo.png';
import './Header.scss';

function Header(props) {
    return (
        <div className="header-container">
            <div className="container">
                <div className="header-brand">
                    <img src={Logo} alt="brand" />
                    <h1>POKEDEX</h1>
                </div>
                <div className="header-search">
                </div>
            </div>
        </div>
    );
}

export default Header;