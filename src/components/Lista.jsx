import ListItem from "./ListItem";

function Lista({ titulo, lista, keys, buttonOnClick, className }) {
  return (
    <div className={className}>
      <h2>{titulo}</h2>
      {lista.map((item) => (
        <ListItem
          textos={keys.map((key) => item[key])}
          buttonOnClick={() => buttonOnClick(item.dni)}
        />
      ))}
    </div>
  );
}

export default Lista;
