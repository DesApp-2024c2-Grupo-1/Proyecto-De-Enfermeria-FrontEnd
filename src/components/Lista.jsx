import ListItem from "./ListItem";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

function Lista({
  titulo,
  lista,
  keys,
  buttonOnClick,
  className,
  paramOnClick,
  dropdown = false,
}) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={className}>
      <h2>{titulo}</h2>
      {lista.map((item, index) => (
        <div>
          <ListItem
            key={item.id || index}
            textos={keys.map((key) => {
              const value = item[key];
              return key === "apellido" && xs ? `${value.charAt(0)}.` : value;
            })}
            buttonOnClick={buttonOnClick ? () => buttonOnClick(item[paramOnClick]) : null}
            dropdown={dropdown}
          />

        </div>
      ))}
    </div>
  );
}

export default Lista;
