import "./Filters.css";

const orders = [
  { label: "Pokedex up", value: "pokedexup" },
  { label: "Pokedex down", value: "pokedexdown" },
  { label: "Name up", value: "nameup" },
  { label: "Name down", value: "namedown" },
];

const Filters = (props) => (
  <div className="filters">
    <input
      type="search"
      placeholder="Search pokemon..."
      value={props.filters.searchByName}
      onChange={(e) => props.searchByName(e.target.value)}
    />
    <select
      value={props.filters.orderBy}
      onChange={(e) => props.setOrder(e.target.value)}
    >
      {orders.map((o, index) => (
        <option key={index} value={o.value}>
          {o.label}
        </option>
      ))}{" "}
    </select>
  </div>
);

export default Filters;
