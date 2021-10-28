import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardBody, CardImg } from 'reactstrap';

PokemonCard.propTypes = {
    idPokemon: PropTypes.number,
    namePokemon: PropTypes.string,
    spritePokemon: PropTypes.string,

    handleCardClick: PropTypes.func
};

function PokemonCard(props) {
    const {
        namePokemon,
        spritesPokemon, // URL image
        handleCardClick
    } = props;
    return (
        <Card className="card-pokeball fade_in" onClick={handleCardClick}>
            <div className="pokeball text-light" data-foo={namePokemon}>
            </div>
            <div className="pokeball__button">
                <CardBody>
                    <CardImg className="card-poke__img" src={spritesPokemon} alt="" />
                </CardBody>
            </div>
        </Card>
    );
}

export default PokemonCard;