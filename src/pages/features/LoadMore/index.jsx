import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

LoadMore.propTypes = {
    handleClickLoadMore: PropTypes.func,
};
LoadMore.defaaultProps = {
    handleClickLoadMore: null,
}

function LoadMore(props) {
    const { handleClickLoadMore } = props;
    return (
        <Button color="info" className="btnLoadMore" onClick={handleClickLoadMore}>Load More</Button>
    );
}

export default LoadMore;