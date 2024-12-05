import { TextField, Typography,Box } from "@mui/material";

export function Input({
  disabled,
  placeholder,
  texto,
  titulo,
  width,
  helperText,
  helperTextColor,
  onChange,
  value
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
        value={value}
        id={texto}
        label={placeholder}
        variant="outlined"
        onChange={onChange}
      />
      <Box sx={{ minHeight: "1.5em", marginTop: "8px" }}>
        {!disabled && (
          <Typography sx={{ color: helperTextColor }}>
            {helperText || " "}
          </Typography>
        )}
      </Box>
    </div>
  );
}
