import { Stack, Button, Box, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FiEye } from "react-icons/fi"; 

function ListItem({ textos, buttonOnClick }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        backgroundColor: "#E9F5EE",
        my: 2,
        px: 3,
        py: xs ? 1.5 : 2,
        borderRadius: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Stack
        direction={xs ? "column" : "row"}
        spacing={xs ? 0.5 : 3}
        sx={{ flexGrow: 1 }}
      >
        {textos.map(({ key, value }, index) => (
          <Box key={index} sx={{ minWidth: xs ? "auto" : "160px" }}>
            <p
              style={{
                margin: 0,
                fontWeight: key === "nombre" ? 600 : 400,
                color: "#1C3E33",
                fontSize: xs ? "0.9rem" : "1rem",
              }}
            >
              {value}
            </p>
          </Box>
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={buttonOnClick}
        startIcon={!xs && <FiEye size={18} />}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          background: "#2E7D5D",
          color: "white",
          borderRadius: xs ? "50%" : "10px",
          px: xs ? 1.5 : 3,
          py: xs ? 1 : 1.2,
          minWidth: xs ? "auto" : "90px",
          "&:hover": {
            background: "#275B43",
          },
        }}
      >
        {xs ? <FiEye size={18} /> : "Ver"}
      </Button>
    </Stack>
  );
}

export default ListItem;
