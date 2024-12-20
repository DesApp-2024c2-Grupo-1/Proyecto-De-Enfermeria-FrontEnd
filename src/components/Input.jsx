import { TextField, Typography,Box } from "@mui/material";

export function Input({
  disabled,
  placeholder,
  texto,
  titulo,
  width,
  helperText,
  helperTextColor,
  backgroundColor,
  color,
  onChange,
  helperTextWidth,
  value

}) {
  return (
    <div>
      <h2>{titulo}</h2>
      <TextField
        sx={{
          width: width,
          backgroundColor: backgroundColor,

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
            color: "color",
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
          <Typography sx={{ color: helperTextColor, width: helperTextWidth }}>
            {helperText || " "}
          </Typography>
        )}
      </Box>
    </div>
  );
}
