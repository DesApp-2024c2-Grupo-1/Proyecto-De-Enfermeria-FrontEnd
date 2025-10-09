import { Stack, Box, Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const opciones = [
  { label: "Campo Práctico", value: 1 },
  { label: "Centro de Simulación", value: 2 },
];

export function Lugar({ disabled, selected, onChange, movil }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const selectedOption = opciones.find((op) => op.value === selected);
    setValue(selectedOption || null);
    console.log("selectedOption", selectedOption);
  }, [selected]);

  console.log("value", value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange && newValue) {
      onChange(newValue.value);
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "100%", textAlign: "center" }}>
        <p>¿Dónde fue realizada esta práctica?</p>
      </Box>
      <Autocomplete
        disabled={disabled}
        value={value}
        onChange={handleChange}
        options={opciones}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{
          width: movil == "true" ? "100%" : 300,
          pb: movil == "true" ? 3.5 : 0,
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#429870",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#429870",
            },
          },
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
