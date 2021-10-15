import PropTypes from 'prop-types';
import React from 'react';
import {
    Button,
    Input, InputGroup,
    InputGroupAddon
} from 'reactstrap';
import './SearchForm.scss'
SearchForm.propTypes = {
    handleSearchChange: PropTypes.func
};
SearchForm.defaultProps = {
    handleSearchChange: null,
};
function SearchForm(props) {
    const { handleSearchChange } = props;
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend" >
                <Button style={{ borderRadius: '30px 0 0 30px' }} color="info">Search</Button>
            </InputGroupAddon>
            <Input
                style={{ borderRadius: '0 30px 30px 0' }}
                autoFocus
                placeholder="Try with a character ... ?"
                onChange={handleSearchChange}
            />
        </InputGroup>
    );
}

export default SearchForm;