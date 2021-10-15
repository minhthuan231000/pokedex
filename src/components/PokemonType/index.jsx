import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PokemonType.scss'
import { toFirstCharUppercase } from '../../constants';
PokemonType.propTypes = {
    PokemonType: PropTypes.string,
};

function PokemonType(props) {
    const { PokemonType } = props;
    const [color, setColor] = useState();
    useEffect(() => {
        switch (PokemonType) {
            case "bug":
                setColor("#5ac15b");
                break;
            case "electric":
                setColor("#ffc566");
                break;
            case "fire":
                setColor("#c00000");
                break;
            case "grass":
                setColor("#228b22");
                break;
            case "normal":
                setColor("#bacaba");
                break;
            case "rock":
                setColor("#b4802d");
                break;
            case "dark":
                setColor("#323232");
                break;
            case "fairy":
                setColor("#ff80ed");
                break;
            case "flying":
                setColor("#9fc5e8");
                break;
            case "ground":
                setColor("#ac7216");
                break;
            case "poison":
                setColor("#800080");
                break;
            case "steel":
                setColor("#bcbcbc");
                break;
            case "dragon":
                setColor("#565287");
                break;
            case "fighting":
                setColor("#990000");
                break;
            case "ghost":
                setColor("#716e9c");
                break;
            case "ice":
                setColor("#91c4f2");
                break;
            case "psychic":
                setColor("#f7347a");
                break;
            case "water":
                setColor("#3299ff");
                break;
            default:
                break;
        }
    }, [PokemonType]);
    return (
        <span
            style={{ backgroundColor: color }}
            className="pokemon-type__item"
        >{toFirstCharUppercase(PokemonType)}</span>
    );
}

export default PokemonType;