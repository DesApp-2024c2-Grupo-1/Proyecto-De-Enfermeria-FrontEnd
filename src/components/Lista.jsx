import ListItem from "./ListItem";

function Lista({
  titulo,
  lista,
  keys,
  buttonOnClick,
  className,
  paramOnClick,
}) {
  return (
    <div className={className}>
      <h2>{titulo}</h2>
      {lista.map((item, index) => (
        <ListItem
          key={item.id || index}
          textos={keys.map((key) => item[key])}
          buttonOnClick={() => buttonOnClick(item[paramOnClick])}
        />
      ))}
    </div>
  );
}

export default Lista;
