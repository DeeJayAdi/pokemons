import axios from "axios";
import { Component } from "react";
import { CgClose } from "react-icons/cg";
import Abilities from "./Components/Abilities/Abilities";
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
      stats: {
        hp: "",
        defense: "",
        specialDefense: "",
        attack: "",
        specialAttack: "",
      },
      abilities: [],
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
        console.log(d.data.stats);
        this.setState((prev) => ({
          info: {
            ...prev.info,
            stats: {
              hp: d.data.stats.filter((a) => (a.stat.name = "speed"))[0]
                .base_stat,
              defense: d.data.stats.find((a) => (a.stat.name = "defense"))
                .base_stat,
              specialDefense: d.data.stats.find(
                (a) => (a.stat.name = "special-defense")
              ).base_stat,
              attack: d.data.stats.filter((a) => (a.stat.name = "attack"))[0]
                .base_stat,
              specialAttack: d.data.stats.find(
                (a) => (a.stat.name = "special-attack")
              ).base_stat,
              speed: d.data.stats.find((a) => (a.stat.name = "speed"))
                .base_stat,
            },
            abilities: d.data.abilities,
            img: d.data.sprites.other["official-artwork"].front_default,
          },
        }));
      })
      .catch(console.error);
  };
  render() {
    const { name, img } = this.state.info;
    return (
      <div
        className={this.props.active ? "pokemon active" : "pokemon"}
        onClick={() =>
          !this.props.active && this.props.setActive(this.props.id)
        }
      >
        {this.state.settings.loading && (
          <div className="loading">Loading...</div>
        )}
        <div className="close" onClick={() => this.props.setActive("")}>
          <CgClose />
        </div>
        <div className="top">
          {this.props.active && (
            <div className="poke-stats-box">
              <div className="poke-stats">
                Attack {this.state.info.stats.attack}
              </div>
              <div className="poke-stats">
                Special Attack {this.state.info.stats.specialAttack}
              </div>
              <div className="poke-stats">
                Defense {this.state.info.stats.defense}
              </div>
              <div className="poke-stats">
                Special Defense {this.state.info.stats.specialDefense}
              </div>
              <div className="poke-stats">
                Speed {this.state.info.stats.speed}
              </div>
            </div>
          )}
          <div className="poke-name">
            {name.slice(0, 1).toUpperCase() + name.slice(1)}
          </div>
          <div className="poke-stats">HP {this.state.info.stats.hp}</div>
        </div>
        <img
          className="poke-img"
          src={img}
          alt=""
          onLoad={this.handleLoadEnd}
        />
        {this.props.active && (
          <div className="poke-info">
            <Abilities list={this.state.info.abilities} />
          </div>
        )}
      </div>
    );
  }
}

export default Pokemon;
