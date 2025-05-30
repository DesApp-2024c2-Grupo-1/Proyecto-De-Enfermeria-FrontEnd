import ListItem from "./ListItem";
import ListItemConDropdown from "./ListItemConDropdown";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

function Lista({
  titulo,
  lista,
  keys,
  buttonOnClick,
  className,
  paramOnClick,
  dropdown,
  contenidoDropdown,
  keysDropdown,
}) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <div className={className}>
        {titulo && <h1>{titulo}</h1>}
        {lista.map((item, index) => {
          const textos = keys.map((key) => ({ key, value: item[key] }));
          return dropdown ? (
            <ListItemConDropdown
              key={index}
              textos={textos}
              contenidoDropdown={
                Array.isArray(contenidoDropdown) && contenidoDropdown[index] ? (
                  <Lista
                    lista={contenidoDropdown[index]}
                    keys={keysDropdown}
                    buttonOnClick={buttonOnClick}
                    paramOnClick={paramOnClick}
                  />
                ) : (
                  <p>
                    Ocurrió un error al intentar mostrar las evaluaciones de el
                    o la estudiante. Por favor, contactá a un administrador.
                  </p>
                ) // Lo pongo así porque si aparece este ListItem quiere decir que el o la estudiante tomó evaluaciones, pero por alguna razón no le llega el contenido al dropdown.
              }
            />
          ) : (
            <ListItem
              key={index}
              textos={textos}
              buttonOnClick={() => buttonOnClick(item[paramOnClick])}
            />
          );
        })}
      </div>
    </>
  );
}

export default Lista;
