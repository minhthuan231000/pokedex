import React, { useState } from 'react';
import {
    Button, ListGroup, ListGroupItem,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Navbar, NavbarBrand
} from 'reactstrap';
import Logo from '../../assets/pokedex-logo.png';
import './NavBar.scss';
NavBar.propTypes = {

};

function NavBar(props) {
    const { listPokemons } = props;
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto header-brand">
                <img src={Logo} alt="brand" />
                <h1>POKEDEX</h1>
            </NavbarBrand>
            <h2 onClick={toggle} className="nav-item--list">list pokemon</h2>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader>
                    List favorite pokemon
                    <Button color="danger" onClick={toggle}>X</Button>
                </ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {listPokemons.map((item, index) => {
                            return <ListGroupItem key={index}>{item}</ListGroupItem>
                        })}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </Navbar>
    );
}

export default NavBar;