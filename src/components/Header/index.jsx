import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import Logo from '../../assets/pokedex-logo.png';
import PokeModal from '../PokeModal';
import './Header.scss';

function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div className="header-container">
            <div className="container">
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="header-brand">
                        <img src={Logo} alt="brand" />
                        <h1>POKEDEX</h1>
                    </NavbarBrand>
                    <div onClick={toggle} className="nav-item--list">list pokemon</div>
                    <NavbarToggler className="navbar-toggler" onClick={toggleNavbar} />
                    <Collapse isOpen={!collapsed} navbar align="right">
                        <Nav navbar>
                            <NavItem>
                                <div onClick={toggle}>list pokemon</div>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <PokeModal open={modal} toggle={toggle} />
                </Navbar>
            </div>
        </div>
    );
}

export default Header;