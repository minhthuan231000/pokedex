import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem, Col, Container, Row, Spinner,
    Progress
} from 'reactstrap';
import PokemonType from '../../components/PokemonType';
import {
    convertHeight,
    convertWeight, toFirstCharUppercase
} from '../../constants/index';
import './Pokemon.scss';

function Pokemon(props) {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId, pokemonName } = params;
    const [pokemon, setPokemon] = useState(undefined)
    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(async response => {
                const { data } = response;
                setPokemon(data);
            })
            .catch((error) => setPokemon(false))
    }, [pokemonId, pokemonName])

    function renderPokemon() {
        const { id, abilities, height, weight, types, stats } = pokemon;
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return (
            <>
                <h1>{id}. {toFirstCharUppercase(pokemonName)}</h1>
                <Row>
                    <Col xs="auto">
                        <div className="pokemon-info__img">
                            <img src={fullImageUrl} alt="" />
                        </div>
                    </Col>
                    <Col >
                        <Row className="pokemon-info__box">
                            <Row className="row-flex">
                                <Col xs="auto" style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
                                    <Row>Height:</Row>
                                    <Row className="text-dark">{convertHeight(height)}</Row>
                                    <Row>Weight:</Row>
                                    <Row className="text-dark">{convertWeight(weight)}</Row>
                                </Col>
                                <Col xs="auto">
                                    <Row>Abilities:
                                    </Row>
                                    <Row>
                                        {abilities.map(abilityInfo => {
                                            const { ability } = abilityInfo;
                                            const { name } = ability;
                                            return <Row key={name} className="text-dark">
                                                {toFirstCharUppercase(name)}
                                            </Row>
                                        })}
                                    </Row>
                                </Col>
                                <Col xs="auto">
                                    <Row>Types:</Row>
                                    <Row>
                                        {types.map(typeInfo => {
                                            const { type } = typeInfo;
                                            const { name } = type;
                                            return <Col key={name} xs="auto" style={{ marginTop: '12px' }}>
                                                <PokemonType key={name} PokemonType={name} />
                                            </Col>
                                        })}
                                    </Row>
                                </Col>
                            </Row>
                        </Row>
                        <Row className="pokemon-stats__box">
                            STATS:
                            {
                                stats.map((statsInfo, index) => {
                                    const { base_stat, stat } = statsInfo;
                                    const { name } = stat;
                                    return <Row key={name}>
                                        <span>{toFirstCharUppercase(name)}:</span>
                                        <Progress color={index % 2 === 0 ? "info" : "danger"} value={base_stat}>{base_stat}</Progress>
                                    </Row>
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
    function renderBreadcrumb() {
        return (
            <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem onClick={() => history.push("/")}>
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    {toFirstCharUppercase(pokemonName)}
                </BreadcrumbItem>
            </Breadcrumb>
        )
    }

    return <Container fluid className="pokemon-info__container">
        <Container>
            {
                pokemon === undefined && <div>
                    <Spinner children="" color="primary" />
                    <Spinner children="" color="secondary" />
                    <Spinner children="" color="primary" />
                </div>
            }
            {
                pokemon !== undefined && pokemon &&
                renderBreadcrumb()
            }
            {
                pokemon !== undefined && pokemon &&
                renderPokemon()
            }
            {pokemon === false && <h1>Page not Found</h1>}
        </Container>
    </Container>
}

export default Pokemon;