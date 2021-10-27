import PropTypes from 'prop-types';
import React from 'react';
import {
    Button, ListGroup, ListGroupItem,
    Modal, ModalBody, ModalFooter, ModalHeader, Toast,
} from 'reactstrap';
import { toFirstCharUppercase } from '../../constants';
import './PokeModal.scss';
import { delClick } from '../../redux/AddList/addlist.action';
import { useDispatch, useSelector } from 'react-redux';
PokeModal.propTypes = {
    open: PropTypes.bool,
    toggler: PropTypes.bool,
}

function PokeModal(props) {
    const products = useSelector(state => state.addlist.list);
    const dispatch = useDispatch();
    // redux - action
    const dispatchDelClick = (item) => dispatch(delClick(item))
    const { open, toggle } = props;
    function btnDelClick(e) {
        dispatchDelClick(e.target.getAttribute("data"))
    }
    return (
        <Modal isOpen={open} toggle={toggle} >
            <ModalHeader>
                List favorite pokemon
                <Button color="danger" onClick={toggle}>X</Button>
            </ModalHeader>
            <ModalBody>
                <ListGroup>
                    {
                        products.length === 0 ? <Toast className="text-dark bg-warning">Try clicking ♥ for some pokemon</Toast> :
                            products.map((item, index) => {

                                return <ListGroupItem key={index}>
                                    {toFirstCharUppercase(item)}
                                    <Button data={item} onClick={btnDelClick} color="warning" style={{ float: 'right' }}>X</Button>
                                </ListGroupItem>
                            })
                    }
                </ListGroup>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Modal>
    );
}

export default PokeModal;