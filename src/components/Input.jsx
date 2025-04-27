import { TextField, Typography, Box, InputAdornment } from "@mui/material";

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
  value,
  type,
  icon,
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
            color: color,
            "&.Mui-focused": {
              color: "#429870",
            },
          },
          "&:focus-within .fa": {
            color: "#55B589",
          },
        }}
        type={type}
        disabled={disabled}
        value={value}
        id={texto}
        label={placeholder}
        variant="outlined"
        onChange={onChange}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              <i
                className={`fa fa-${icon}`}
                style={{
                  marginRight: "8px",
                }}
              ></i>
            </InputAdornment>
          ) : null,
        }}
      />
      <Box
        sx={{
          minHeight: "1.5em",
          marginTop: "8px",
          maxWidth: "100px",
          whiteSpace: "nowrap",
        }}
      >
        {!disabled && (
          <Typography sx={{ color: helperTextColor }}>
            {helperText || " "}
          </Typography>
        )}
      </Box>
    </div>
  );
}
