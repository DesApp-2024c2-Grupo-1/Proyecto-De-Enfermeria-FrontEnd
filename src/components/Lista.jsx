import ListItem from "./ListItem";

function Lista({ titulo,  lista, keys, buttonOnClick }) {
  return (
    <div className="lista">
      <h2>{titulo}</h2>
      {lista.map((item, index) => (
        <ListItem
          key={index}
          textoUno={item[keys[0]]} 
          textoDos={item[keys[1]]} 
          buttonOnClick={buttonOnClick}
        />
      ))}
    </div>
  );
}

export default Lista;
