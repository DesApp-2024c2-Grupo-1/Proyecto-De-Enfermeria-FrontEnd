import ListItem from "./ListItem";

function Lista({ titulo,  lista, keys, buttonOnClick, className}) {
  return (
    <div className={className}>
      <h2>{titulo}</h2>
      {lista.map((item, index) => (
        <ListItem
          key={index}
          textoUno={item[keys[0]]} 
          textoDos={item[keys[1]]} 
          textoTres={item[keys[2]]} 
          buttonOnClick={() => buttonOnClick(item.dni)} 
        />
      ))} 
    </div>
  );
}

export default Lista;
