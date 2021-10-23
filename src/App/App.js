import './App.scss';
import Header from '../components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Pokedex from '../pages/Pokedex/Pokedex';
import Pokemon from '../pages/Pokemon/Pokemon';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { itemClick } from '../redux/AddList/addlist.action';
function App() {
  const products = useSelector(state => state.addlist.list);
  const dispatch = useDispatch();
  const dispatchItemClick = (item) => dispatch(itemClick(item))
  useEffect(() => {
    var pokemons = [];
    localStorage.setItem('listPkm', JSON.stringify(pokemons))
    console.log('render - app');
  }, [])

  const handleLikedPokemonClick = (data) => dispatchItemClick(data);
  return (
    <div>
      <Header listPokemons={products} />
      <Router>
        <Switch>
          <Route
            exact path="/"
            render={(props) => <Pokedex {...props} />} />
          <Route
            path="/:pokemonName/:pokemonId"
            render={(props) => <Pokemon {...props} handleLikedPokemonClick={handleLikedPokemonClick} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
