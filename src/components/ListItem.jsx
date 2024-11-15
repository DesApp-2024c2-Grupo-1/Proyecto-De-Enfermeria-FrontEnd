import React from "react";

function ListItem({ textoUno, textoDos, textoTres, buttonOnClick}) {
  return (
    <div className="listItem">
      <div className="listItemTextos">
        <p>{textoUno}</p>
        <p>{textoDos}</p>
        <p>{textoTres}</p>
      </div>
      <div>
        <button className="botonVerde" onClick={buttonOnClick}>
          Ver
        </button>
      </div>
    </div>
  );
}

export default ListItem;
