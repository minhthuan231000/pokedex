import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { useEffect } from 'react';

StatsProcessBar.propTypes = {
    base_stat: PropTypes.number,
    name_stat: PropTypes.string
};

function StatsProcessBar(props) {
    const { base_stat, name_stat } = props;
    const [colorType, setColorType] = useState();
    const [stripe, setStripe] = useState(false);
    useEffect(() => {
        switch (name_stat) {
            case "hp":
                setColorType("success");
                setStripe(true);
                break;
            case "attack":
                setColorType("danger");
                break;
            case "defense":
                setColorType("info");
                break;
            case "special-attack":
                setColorType("danger");
                setStripe(true);
                break;
            case "special-defense":
                setColorType("info");
                setStripe(true);
                break;
            case "speed":
                setColorType("warning");
                setStripe(true);
                break;
            default:
                break;
        }
    }, [name_stat])
    return (
        <Progress max={130} animated={stripe} color={colorType} height="60px" value={base_stat}>{base_stat}</Progress>
    );
}

export default StatsProcessBar;