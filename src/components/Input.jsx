import { TextField, Typography } from "@mui/material";



export function Input({ disabled, placeholder, texto, titulo, width, helperText }) {


  return (
    <div>
      <h2>{titulo}</h2>
      <TextField
        sx={{
          width: width,
          backgroundColor: "#DDF0E7",

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#429870",
            },
            "&:hover fieldset": {
              borderColor: "#429870",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#429870",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#429870",
            "&.Mui-focused": {
              color: "#429870",
            },
          },
        }}
        disabled={disabled}
        id={texto}
        label={placeholder}
        variant="outlined"
      
      
      />
      {!disabled && helperText && ( 
        <Typography sx={{ marginTop: "8px", color: "#429870" }}>
          {helperText}
        </Typography>
      )}
    </div>
  );
}
