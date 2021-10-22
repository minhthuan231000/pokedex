import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem, Col, Container, Row, Spinner,
    Progress,
    Toast, ToastBody,
} from 'reactstrap';
import PokemonType from '../../components/PokemonType';
import {
    convertHeight,
    convertWeight, toFirstCharUppercase
} from '../../constants/index';
import './Pokemon.scss';


function Pokemon(props) {
    const { history, match, handleLikedPokemonClick } = props;
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
    const listFavoritePokemon = localStorage.getItem('listPkm');
    const list = JSON.parse(listFavoritePokemon);

    const [favorite, setFavorite] = useState(() => list.includes(pokemonName))

    const [show, setShow] = useState(false);
    function renderPokemon() {
        const { id, abilities, height, weight, types, stats } = pokemon;
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        const handleLoveClick = () => {
            setFavorite(!favorite)
            setShow(true);
            setTimeout(() => setShow(false), 5000);
            if (!list.includes(pokemonName)) {
                list.push(pokemonName)
                handleLikedPokemonClick(pokemonName);
            } else {
                const findIndex = list.findIndex(item => item === pokemonName)
                list.splice(findIndex, 1)
            }
            localStorage.setItem('listPkm', JSON.stringify(list))

        }

        return (
            <>
                <h1>
                    {id}. {toFirstCharUppercase(pokemonName)}
                    {
                        favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                            onClick={handleLoveClick}
                            className="bi bi-heart-fill text-danger" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                            onClick={handleLoveClick}
                            className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    }
                </h1>
                <Toast isOpen={show}
                    className={!list.includes(pokemonName) ? "text-light bg-danger" : "text-dark bg-info"}
                    fade>
                    <ToastBody tag="h5">
                        {
                            !list.includes(pokemonName) ? `Deleted ${pokemonName} from your list` : `Added ${pokemonName} to your list`
                        }
                    </ToastBody>
                </Toast>
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