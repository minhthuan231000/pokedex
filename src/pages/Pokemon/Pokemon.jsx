import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem, Button, Col, Container, Row, Spinner,
    Toast, ToastBody,
} from 'reactstrap';
import PokemonType from '../../components/PokemonType';
import {
    convertHeight,
    convertWeight, toFirstCharUppercase
} from '../../constants/index';
import './Pokemon.scss';
import { itemClick } from '../../redux/AddList/addlist.action';
import { useDispatch, useSelector } from 'react-redux';
import StatsProcessBar from '../../components/StatsProcessBar';

function Pokemon(props) {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId, pokemonName } = params;
    const [pokemon, setPokemon] = useState(undefined)
    //  redux - action
    const listFavorite = useSelector(state => state.addlist.list);
    const dispatch = useDispatch();
    const dispatchItemClick = (item) => dispatch(itemClick(item))

    const [favorite, setFavorite] = useState(() => listFavorite.includes(pokemonName))
    const [show, setShow] = useState(false);

    const [idCurrent, setPokemonCurrent] = useState(pokemonId);

    const [pokemonNext, setPokemonNext] = useState(parseInt(idCurrent) + 1);
    const [dataNext, setDataNext] = useState(undefined)

    const [pokemonPrev, setPokemonPrev] = useState(parseInt(idCurrent) - 1);
    const [dataPrev, setDataPrev] = useState(undefined)
    // logic for animation click like pokemon
    useEffect(() => {
        setFavorite(listFavorite.includes(pokemonName))
        listFavorite.includes(pokemonName) && setShow(listFavorite.includes(pokemonName));
    }, [listFavorite, pokemonName])
    // get pokemon first time
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(async response => {
                const { data } = response;
                setPokemon(data);
            })
            .catch((error) => {
                console.log("Get pokemon failure: ", error);
                setPokemon(false)
            })
    }, [pokemonId, pokemonName])
    const [disable, setDisable] = useState(false)
    // get pokemon Next and pokemon Prev after render
    useEffect(() => {
        window.scrollTo(0, 0);
        if (idCurrent > 1) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${pokemonPrev}`)
                .then(async response => {
                    const { data } = response;
                    await setDataPrev(data);
                    await setPokemonPrev(parseInt(idCurrent) - 1);
                })
                .catch((error) => {
                    console.log("Get pokemon failure: ", error);
                    setDataPrev(false)
                })
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${idCurrent}`)
                .then(async response => {
                    const { data } = response;
                    await setPokemon(data);
                    const { id, name } = data;
                    history.push(`/${name}/${id}`)
                })
                .catch((error) => {
                    console.log("Get pokemon failure: ", error);
                    setPokemon(false)
                })
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${pokemonNext}`)
                .then(async response => {
                    const { data } = response;
                    await setDataNext(data);
                    await setPokemonNext(parseInt(idCurrent) + 1);
                })
                .catch((error) => {
                    console.log("Get pokemon failure: ", error);
                    setDataNext(false)
                })
            setDisable(false)
        } else {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${idCurrent}`)
                .then(async response => {
                    const { data } = response;
                    setPokemon(data);
                    const { id, name } = data;
                    history.push(`/${name}/${id}`)
                })
                .catch((error) => {
                    console.log("Get pokemon failure: ", error);
                    setPokemon(false)
                })
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${pokemonNext}`)
                .then(async response => {
                    const { data } = response;
                    setDataNext(data);
                    setPokemonNext(parseInt(idCurrent) + 1);
                })
                .catch((error) => {
                    console.log("Get pokemon failure: ", error);
                    setDataNext(false)
                })
            setDisable(true)
        }


    }, [pokemonPrev, idCurrent, pokemonNext, history])

    function RenderPokemon() {
        const { id, abilities, height, weight, types, stats } = pokemon;
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        const handleLoveClick = () => {
            setFavorite(!favorite)
            setShow(true);
            setTimeout(() => setShow(false), 2000);
            dispatchItemClick(pokemonName);
        }

        const handleNextClick = () => {
            setPokemonCurrent(prev => parseInt(prev) + 1);
            setTimeout(() => setShow(false), 2000);
        }
        const handlePrevClick = () => {
            setPokemonCurrent(prev => parseInt(prev) - 1);
            setTimeout(() => setShow(false), 2000);
        }
        console.log(dataPrev);
        return (
            <>
                {
                    dataNext && dataPrev !== undefined && <div className="navbar-control">
                        <Row>
                            <Col xs={6} md={4} lg={4}>
                                <Button disabled={disable} onClick={handlePrevClick} style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)', paddingLeft: '24px' }}>
                                    {idCurrent > 1 ? `#${dataPrev.id} ${toFirstCharUppercase(dataPrev.name)}` : `###`}
                                </Button>
                            </Col>
                            <Col md={4} lg={4} className="name-pc">
                                #{id}. {toFirstCharUppercase(pokemonName)}
                                {
                                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        onClick={handleLoveClick}
                                        className="bi bi-heart-fill text-danger" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        onClick={handleLoveClick}
                                        className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg>
                                }
                            </Col>
                            <Col xs={6} md={4} lg={4}>
                                <Button onClick={handleNextClick} style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)', paddingRight: '24px', float: 'right' }}>
                                    #{dataNext.id} {toFirstCharUppercase(dataNext.name)}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                }
                <div className="name-pc">
                    #{id}. {toFirstCharUppercase(pokemonName)}
                    {
                        favorite ? <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            onClick={handleLoveClick}
                            className="bi bi-heart-fill text-danger" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            onClick={handleLoveClick}
                            className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    }
                </div>
                <Toast isOpen={show}
                    className={!favorite ? "text-light bg-danger" : "text-dark bg-info"}
                    fade>
                    <ToastBody tag="h5">
                        {!favorite ? `Deleted ${pokemonName} from your list` : `Added ${pokemonName} to your list`}
                    </ToastBody>
                </Toast>
                <Row>
                    <Col xs="auto">
                        <div className="pokemon-info__img fade_in">
                            <img src={fullImageUrl} alt="" />
                        </div>
                    </Col>
                    <Col >
                        <Row className="pokemon-info__box fade_right">
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
                        <Row className="pokemon-stats__box fade_left">
                            STATS:
                            {
                                stats.map((statsInfo) => {
                                    const { base_stat, stat } = statsInfo;
                                    const { name } = stat;
                                    return <Row key={name}>
                                        <span>{toFirstCharUppercase(name)}:</span>
                                        <StatsProcessBar base_stat={base_stat} name_stat={name} />
                                    </Row>
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
    function RenderBreadcrumb() {
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
    function Loading() {
        return <>
            <Spinner children="" color="primary" />
            <Spinner children="" color="secondary" />
            <Spinner children="" color="primary" />
        </>
    }
    return <Container fluid className="pokemon-info__container">
        <Container>
            {pokemon === undefined && <Loading />}
            {pokemon !== undefined && pokemon && <RenderBreadcrumb />}
            {pokemon !== undefined && pokemon && <RenderPokemon />}
            {pokemon === false && <h1>Page not Found</h1>}
        </Container>
    </Container>
}

export default Pokemon;