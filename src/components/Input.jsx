import { TextField, Typography } from "@mui/material";

export function Input({
  disabled,
  placeholder,
  texto,
  titulo,
  width,
  helperText,
  helperTextColor,
  onChange,
}) {
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
        onChange={onChange}
      />
      {!disabled && helperText && (
        <Typography sx={{ marginTop: "8px", color: `${helperTextColor}` }}>
          {helperText}
        </Typography>
      )}
    </div>
  );
}
