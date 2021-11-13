import PropTypes from 'prop-types';
import React from 'react';
import {
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
            <InputGroupAddon addonType="prepend">
                Search
            </InputGroupAddon>
            <Input
                autoFocus
                placeholder="Try with a character ... ?"
                onChange={handleSearchChange}
            />
        </InputGroup>
    );
}

export default SearchForm;