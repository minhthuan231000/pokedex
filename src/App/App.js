import './App.scss';
import Header from '../components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Pokedex from '../pages/Pokedex/Pokedex';
import Pokemon from '../pages/Pokemon/Pokemon';


function App() {
  return (
    <div>
      <Header />
      <Router >
        <Switch>
          <Route
            exact path="/"
            render={(props) => <Pokedex {...props} />} />
          <Route
            path="/:pokemonName/:pokemonId"
            render={(props) => <Pokemon {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
