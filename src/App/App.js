import './App.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Pokedex from '../pages/Pokedex/Pokedex';
import Pokemon from '../pages/Pokemon/Pokemon';
import { Provider } from 'react-redux';
import store from '../redux/store';
function App() {
  return (
    <Provider store={store}>
      <Header />
      <Router>
        <Switch>
          <Route
            exact path="/"
            render={(props) => <Pokedex {...props} />} />
          <Route
            path="/:pokemonName/:pokemonId"
            render={(props) => <Pokemon {...props} />} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
