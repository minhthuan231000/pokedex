import React from 'react';
import Logo from '../../assets/pokedex-logo.png';
import NavBar from '../NavBar';
import './Header.scss';

function Header(props) {
    return (
        <div className="header-container">
            <div className="container">
                <NavBar />
            </div>
        </div>
    );
}

export default Header;