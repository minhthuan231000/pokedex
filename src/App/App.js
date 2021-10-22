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
import { connect } from "react-redux"

import {
  increaseCounter,
  decreaseCounter,
} from "../redux/Counter/counter.actions"
const mapStateToProps = state => {
  return {
    count: state.counter.count,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),

    decreaseCounter: () => dispatch(decreaseCounter()),
  }
}
function App(props) {
  useEffect(() => {
    var pokemons = [];
    localStorage.setItem('listPkm', JSON.stringify(pokemons))
    console.log('render - app');
  }, [])

  function handleLikedPokemonClick(data) {
    alert(data)
  }
  return (
    <div>
      <Header />
      <div>Count: {props.count}</div>

      <button onClick={() => props.increaseCounter()}>Increase Count</button>

      <button onClick={() => props.decreaseCounter()}>Decrease Count</button>
      <Router >
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
