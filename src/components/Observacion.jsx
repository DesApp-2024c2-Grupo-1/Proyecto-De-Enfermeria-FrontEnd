import { Input } from "../components/Input";
import { useRef, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import "../index.css";

const theme = createMuiTheme({
  palette: {
    text: {
      disabled: "grey",
    },
  },
});

export function Observacion({
  disabled,
  onObservacionChange,
  onPuntajeChange,
  modificacionPuntajeValue,
  observacionValue,
}) {
  const editableDivRef = useRef(null);

  useEffect(() => {
    if (editableDivRef.current && !editableDivRef.current.textContent) {
      editableDivRef.current.textContent = observacionValue || "";
    }
  }, [observacionValue]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Input
          titulo="Modificación de puntaje"
          disabled={disabled}
          backgroundColor={"#DDF0E7"}
          placeholder={
            disabled ? modificacionPuntajeValue : "Escribe un número aquí..."
          }
          onChange={(e) => onPuntajeChange(parseInt(e.target.value) || 0)}
        />
        <h2>Observaciones</h2>
        <div style={{ position: "relative", width: "100%" }}>
          <div
            ref={editableDivRef}
            contentEditable={!disabled}
            suppressContentEditableWarning={true}
            style={{
              width: "100%",
              minHeight: "10rem",
              padding: "1rem",
              backgroundColor: "#DDF0E7",
              border: "1px solid #c4c4c4",
              borderRadius: "4px",
              color: disabled ? "grey" : "black",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onInput={(e) => onObservacionChange(e.currentTarget.textContent)}
            onFocus={(e) => {
              if (!disabled) {
                e.currentTarget.style.borderColor = "#429870";
                e.currentTarget.style.boxShadow =
                  "0 0 0 2px rgba(66, 152, 112, 0.2)";
              }
            }}
            onBlur={(e) => {
              if (!disabled) {
                e.currentTarget.style.borderColor = "#c4c4c4";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          />
          {!observacionValue && !disabled && (
            <span
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                color: "grey",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              Escribe tu texto aquí...
            </span>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
