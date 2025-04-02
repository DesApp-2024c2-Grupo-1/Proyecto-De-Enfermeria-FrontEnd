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
}) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <div className={className}>
        {titulo && <h1>{titulo}</h1>}
        {lista.map((item, index) => {
          const textos = keys.map((key) => item[key]);
          return dropdown ? (
            <ListItemConDropdown
              key={index}
              textos={textos}
              contenidoDropdown={contenidoDropdown}
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
