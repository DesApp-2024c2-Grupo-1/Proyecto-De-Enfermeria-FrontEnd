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
            <img
              src={
                isFocused
                  ? "assets/busqueda-focused.png"
                  : "assets/busqueda.png"
              }
              alt="busqueda-icon"
              style={{ width: 25, height: 25 }}
            />
          </InputAdornment>
        ),
      }}
      sx={{
        width: width || "200px",
        height: height || "50px",
        margin: margin || "0",
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          "&.Mui-focused fieldset": {
            borderColor: "#77C4A0",
          },
        },
      }}
    />
  );
};

export default Busqueda;
