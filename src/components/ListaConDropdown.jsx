import ListItem from "./ListItem";
import ListItemConDropdown from "./ListItemConDropdown";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import Lista from "./Lista";

function ListaConDropdown({
  titulo,
  lista,
  keys,
  parametroLista,
  buttonOnClick,
  className,
  paramOnClick,
  dropdown,
  contenidoDropdown,
}) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

 

  return (
    <>
      <div className={className}>
        {titulo && <h1>{titulo}</h1>}
        {lista.map((item, index) => {
          const textos = keys.map((key) => item[key]);
          return (
            <ListItemConDropdown
              key={index}
              textos={textos}
              contenidoDropdown={Array.isArray(contenidoDropdown) ? (
                
                <Lista lista={contenidoDropdown[index]} keys={["nombre"]}/> 
              ) : (
                <p>{contenidoDropdown}</p>
              )}
            />
          );
        })}
      </div>
    </>
  );
}

export default ListaConDropdown;
