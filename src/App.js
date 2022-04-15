import "./App.css";
import { Component } from "react";
import axios from "axios";
import Pokemon from "./Components/Pokemon/Pokemon";
import Filters from "./Components/Filters/Filters";
import Footer from "./Components/Footer/Footer";

class App extends Component {
  state = {
    filters: {
      prevPage: "",
      nextPage: "",
      limit: 20,
      orderBy: "pokedexup",
      searchByName: "",
    },
    activePokemon: "",
    pokemons: [],
  };
  componentDidMount = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=9999")
      .then((d) => {
        const pokemons = d.data.results;
        pokemons.forEach((p, index) => (p.id = index));
        this.setState({
          pokemons,
        });
      })
      .catch(console.error);
  };
  searchByName = (name) => {
    this.setState((prev) => {
      prev.filters.searchByName = name;
      return prev;
    });
  };
  setOrder = (order) => {
    this.setState((prev) => {
      prev.filters.orderBy = order;
      return prev;
    });
  };
  setActive = (id) => {
    this.setState({
      activePokemon: id,
    });
  };
  render() {
    return (
      <>
        <Filters
          filters={this.state.filters}
          searchByName={this.searchByName}
          setOrder={this.setOrder}
        />
        <div className="pokemons">
          {this.state.pokemons
            .filter((p) =>
              p.name
                .toLowerCase()
                .includes(this.state.filters.searchByName.toLowerCase())
            )
            .sort((a, b) => {
              const { orderBy } = this.state.filters;
              let sort = a.id - b.id;
              if (orderBy === "pokedexup") sort = a.id - b.id;
              else if (orderBy === "pokedexdown") sort = b.id - a.id;
              else if (orderBy === "nameup") sort = a.name - b.name;
              else if (orderBy === "namedown") sort = b.name - a.name;
              return sort;
            })
            .map((p) => {
              return (
                <Pokemon
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  active={this.state.activePokemon === p.id}
                  setActive={this.setActive}
                />
              );
            })}
        </div>
        <Footer />
      </>
    );
  }
}
export default App;
