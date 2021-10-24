import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Container
} from 'reactstrap';
import PokemonCard from '../../components/PokemonCard';
import { toFirstCharUppercase } from '../../constants';
import LoadMore from '../features/LoadMore';
import SearchForm from '../features/SearchForm';
import './PokeContainer.scss';
Pokedex.propTypes = {

};

function Pokedex(props) {

    const { history } = props;
    const [pokemonData, setPokemonData] = useState([])
    const [loadMore, setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${0}`);
    const [filter, setFilter] = useState("");
    function handleSearchChange(e) {
        let search = e.target.value;
        search = search.toLowerCase();
        setFilter(search)
    }
    async function getPokemon() {
        axios
            .get(loadMore)
            .then(async response => {
                const { data } = response;
                const { results, next } = data;
                setLoadMore(next)
                async function createPokemonObject(results) {
                    results.forEach(async pokemon => {
                        await axios
                            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                            .then(async response => {
                                const { data } = response;
                                setPokemonData(currentList => [...currentList.sort((a, b) => a.id - b.id), data])
                            })

                    })
                }
                await createPokemonObject(results)
            });
    }
    useEffect(() => {
        getPokemon();
    }, []);

    function getPokemonCard(pokemonId) {
        const { id, name, sprites } = pokemonData[pokemonId];
        return <PokemonCard
            key={pokemonId}
            idPokemon={id}
            namePokemon={toFirstCharUppercase(name)}
            spritesPokemon={sprites.other['official-artwork'].front_default}

            handleCardClick={() => history.push(`/${name}/${id}`)}
        />
    }
    return (
        <Container>
            <SearchForm
                handleSearchChange={handleSearchChange}
            />
            <div className="pokemon-container">
                {pokemonData ? (
                    <div className="poke-thumballs">
                        {Object.keys(pokemonData).map(
                            (pokemonId) =>
                                pokemonData[pokemonId].name.includes(filter) &&
                                getPokemonCard(pokemonId)
                        )}
                        <LoadMore
                            handleClickLoadMore={() => getPokemon()}
                        />
                    </div>
                ) : <h3>Loading</h3>
                }

            </div>
        </Container>
    );
}

export default Pokedex;