const Abilities = (props) => (
  <div className="poke-abilities">
    <h1>Abilities</h1>
    <div className="list">
      {props.list.map((a, index) => (
        <div key={index} className="poke-ability">
          {a.ability.name.slice(0, 1).toUpperCase() + a.ability.name.slice(1)}
        </div>
      ))}
    </div>
  </div>
);

export default Abilities;
