import { Box, Typography, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";

function DividerTexto({ texto }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        mt: 2,
        mb: 2,
      }}
    >
      {xs ? (
        <h4 style={{ color: "#275B43", marginRight: "10px" }}>{texto}</h4>
      ) : (
        <h2 style={{ color: "#275B43", marginRight: "10px" }}>{texto}</h2>
      )}
      <Box
        sx={{
          flexGrow: 1,
          height: "1px",
          backgroundColor: "rgba(39, 91, 67, 0.2)",
        }}
      />
    </Box>
  );
}

export default DividerTexto;
