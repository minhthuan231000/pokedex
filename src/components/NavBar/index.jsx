import React, { useState } from 'react';
import Logo from '../../assets/pokedex-logo.png';
import PropTypes from 'prop-types';
import './NavBar.scss'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroupItem, ListGroup } from 'reactstrap';
NavBar.propTypes = {

};

function NavBar(props) {
    const [collapsed, setCollapsed] = useState(true);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <>
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto header-brand">
                    <img src={Logo} alt="brand" />
                    <h1>POKEDEX</h1>
                </NavbarBrand>
                <h2 onClick={toggle}>List pokemon</h2>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader>
                        List favorite pokemon
                        <Button color="danger" onClick={toggle}>X</Button>
                    </ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            <ListGroupItem>1</ListGroupItem>
                            <ListGroupItem>1</ListGroupItem>
                            <ListGroupItem>1</ListGroupItem>
                            <ListGroupItem>1</ListGroupItem>
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar align="right" className="bg-danger">
                        <NavItem tag="h3">
                            List Pokemon
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;