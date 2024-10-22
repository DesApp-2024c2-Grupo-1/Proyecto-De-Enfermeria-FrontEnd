import React from "react";

function ListItem({ textoUno, textoDos, buttonOnClick}) {
  return (
    <div className="listItem">
      <div className="listItemTextos">
        <p>{textoUno}</p>
        <p>{textoDos}</p>
      </div>
      <div>
        <button className="boton-negro" onClick={buttonOnClick}>
          Ver
        </button>
      </div>
    </div>
  );
}

export default ListItem;
