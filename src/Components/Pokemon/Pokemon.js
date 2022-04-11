import axios from "axios";
import { Component } from "react";
import "./Pokemon.css";

class Pokemon extends Component {
  state = {
    settings: {
      loading: true,
    },
    info: {
      id: this.props.id,
      name: this.props.name,
      img: "",
    },
  };
  componentDidMount() {
    this.loadPokeInfo();
  }
  handleLoadEnd = () => {
    this.setState((prev) => ({
      settings: { ...prev.settings, loading: false },
    }));
  };
  loadPokeInfo = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.info.name}`)
      .then((d) => {
        this.setState((prev) => ({
          info: {
            ...prev.info,
            img: d.data.sprites.other["official-artwork"].front_default,
          },
        }));
      })
      .catch(console.error);
  };
  render() {
    const { name, img } = this.state.info;
    return (
      <div className="pokemon">
        {this.state.settings.loading && (
          <div className="loading">Loading...</div>
        )}
        <div className="poke-name">
          {name.slice(0, 1).toUpperCase() + name.slice(1)}
        </div>
        <img
          className="poke-img"
          src={img}
          alt=""
          onLoad={this.handleLoadEnd}
        />
      </div>
    );
  }
}

export default Pokemon;
