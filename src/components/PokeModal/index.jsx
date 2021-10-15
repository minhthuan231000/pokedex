import React from 'react';
import { Card, CardBody, CardImg, CardLink, CardTitle } from 'reactstrap';
import './PokeModal.scss';

function PokeModal(props) {
    const { PokemonFound } = props;
    return (
        <CardLink
            style={{ textDecoration: 'none' }}
            href={`https://www.pokemon.com/us/pokedex/${PokemonFound.name}`}
        >
            <Card className="pokeball-modal">
                <CardTitle>
                    {
                        PokemonFound.types.map((value, index) =>
                            <span key={index}>{value.type.name}</span>
                        )
                    }
                </CardTitle>{/*  */}
                <CardBody className="pokeball-body" >
                    <CardImg
                        src={PokemonFound.sprites.other['official-artwork'].front_default}
                    />
                </CardBody>
            </Card>
        </CardLink>
    );
}

export default PokeModal;