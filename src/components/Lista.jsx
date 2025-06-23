import ListItem from "./ListItem";
import ListItemConDropdown from "./ListItemConDropdown";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery, Grow, Box } from "@mui/material";

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
    <div className={className}>
      {titulo && <h1 style={{ textAlign: "left" }}>{titulo}</h1>}
      {lista.map((item, index) => {
        const textos = keys.map((key) => ({ key, value: item[key] }));
        const delay = index * 300;

        const contenidoLista = dropdown ? (
          <ListItemConDropdown
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
                  Ocurrió un error al intentar mostrar las evaluaciones de el o
                  la estudiante. Por favor, contactá a un administrador.
                </p>
              ) // Lo pongo así porque si aparece este ListItem quiere decir que el o la estudiante tomó evaluaciones, pero por alguna razón no le llega el contenido al dropdown.
            }
          />
        ) : (
          <ListItem
            textos={textos}
            buttonOnClick={() => buttonOnClick(item[paramOnClick])}
          />
        );

        return (
          <Grow
            key={index}
            in={true}
            timeout={{
              enter: 200 + delay,
            }}
          >
            <Box sx={{ width: "100%" }}>{contenidoLista}</Box>
          </Grow>
        );
      })}
    </div>
  );
}

export default Lista;
