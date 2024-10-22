import ListItem from "./ListItem";

function Lista({ lista, keys, buttonOnClick }) {
  return (
    <div>
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
