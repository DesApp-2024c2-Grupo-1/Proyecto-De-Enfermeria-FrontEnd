import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";


const Busqueda = ({ placeholder, onChange, width, height, margin }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextField
      placeholder={placeholder || "Buscar..."}
      variant="outlined"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
             {/* #e6e6e6 es el gris del logo y del borde cuando no esta focused*/}
            <i className="fa fa-search" style={{ fontSize: "25px", color: isFocused ? "#55B589" : "#e6e6e6" }}></i>
          </InputAdornment>
        ),
      }}
      sx={{
        width: width || "200px",
        height: height || "50px",
        margin: margin || "0",
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          "&.Mui-focused fieldset": {
            borderColor: "#77C4A0",
          },
        },
      }}
    />
  );
};

export default Busqueda;
