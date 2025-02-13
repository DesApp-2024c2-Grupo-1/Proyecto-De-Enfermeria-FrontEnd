import { Stack, Box } from "@mui/material";

export function Pregunta({ pregunta, puntaje, respuesta, disabled, onChange }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        my: "1rem",
        borderBottom: "1px solid black",
      }}
    >
      <Box sx={{ maxWidth: "60%", textAlign: "center" }}>
        <p className="alineacionIzquierda">{pregunta}</p>
      </Box>

      <Stack direction={"row"} spacing={2.5}>
        <p style={{ marginRight: 50 }}>{puntaje}</p>

        <input
          type="radio"
          id={`si-${pregunta}`}
          name={`respuesta-${pregunta}`}
          value="Si"
          disabled={disabled}
          checked={respuesta === true}
          onChange={() => onChange(true)}
          style={{ display: "none" }}
        />
        <label
          htmlFor={`si-${pregunta}`}
          style={{
            display: "inline-block",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            border: "2px solid black",
            textAlign: "center",
            lineHeight: "23px",
            cursor: disabled ? "not-allowed" : "pointer",
            backgroundColor: respuesta === true ? "black" : "transparent",
            color: respuesta === true ? "white" : "black",
          }}
        >
          ✓
        </label>

        <input
          type="radio"
          id={`no-${pregunta}`}
          name={`respuesta-${pregunta}`}
          value="No"
          disabled={disabled}
          checked={respuesta === false}
          onChange={() => onChange(false)}
          style={{ display: "none" }}
        />
        <label
          htmlFor={`no-${pregunta}`}
          style={{
            display: "inline-block",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            border: "2px solid black",
            textAlign: "center",
            lineHeight: "23px",
            cursor: disabled ? "not-allowed" : "pointer",
            backgroundColor: respuesta === false ? "black" : "transparent",
            color: respuesta === false ? "white" : "black",
          }}
        >
          ✗
        </label>
      </Stack>
    </Stack>
  );
}


/* contexto de porq los estilos están aca y no en una clase css: 
inicialmente lo arranqué como clase css, pero como lo encare x el lado de basarme en la respuesta (o sea si está checked) para q cambiara de color, tuve q hacerlo 
acá individualmente para cada uno ya q las condiciones de "checked" son distintas.


el display none del input esconde el input incial de html. dps con html for y la id q le pusimos, se sobrepone la label con su estilo.

lo del cursor "not allowed" lo puse para q sea mas intuitivo cuando una evaluación está cerrada, que no te deja interactuar con las respuestas. igual si crees
q está demas le pones "default" donde dice not allowed y queda normal al hovear sobre el input, el tema es q el ternario tendría q estar para q si el input
no está disabled se convierta en "pointer" dándote a entender q podés clickear.
*/