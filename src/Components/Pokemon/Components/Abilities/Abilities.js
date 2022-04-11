import axios from "axios";
import { useEffect, useState } from "react";
import "./Abilities.css";

const Ability = (props) => {
  const { name } = props;
  const [desc, setDesc] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/ability/${name}`)
      .then((d) => {
        setDesc(
          d.data.effect_entries.filter((a) => a.language.name === "en")[0]
            .effect
        );
      })
      .catch(console.error);
  });

  return (
    <div className="poke-ability">
      <div className="ability-name">
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
      </div>
      <div className="abilit-desc">{desc}</div>
    </div>
  );
};

const Abilities = (props) => (
  <div className="poke-abilities">
    <h1>Abilities</h1>
    <div className="list">
      {props.list.map((a, index) => (
        <Ability key={index} name={a.ability.name} />
      ))}
    </div>
  </div>
);

export default Abilities;
