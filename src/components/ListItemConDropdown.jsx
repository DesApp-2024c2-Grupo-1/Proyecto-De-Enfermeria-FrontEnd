import { Stack, Button, Box, useMediaQuery, Collapse } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function ListItemConDropdown({ textos, buttonOnClick, contenidoDropdown }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          backgroundColor: "#E9F5EE",
          my: 1.5,
          px: 3,
          py: xs ? 1.2 : 1.8,
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
        {/* Datos */}
        <Stack
          direction={xs ? "column" : "row"}
          spacing={xs ? 0.5 : 3}
          sx={{ flexGrow: 1 }}
        >
          {textos.map(({ key, value }, index) => (
            <Box
              key={index}
              sx={{
                minWidth: xs ? "auto" : key === "dni" ? "120px" : "150px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#1C3E33",
                  fontWeight: key === "nombre" ? 600 : 400,
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
          onClick={handleOpenDropdown}
          endIcon={
            openDropdown ? (
              <FiChevronUp size={18} />
            ) : (
              <FiChevronDown size={18} />
            )
          }
          sx={{
            textTransform: "none",
            fontWeight: 600,
            background: "#2E7D5D",
            color: "white",
            borderRadius: "10px",
            px: xs ? 1.5 : 3,
            py: xs ? 1 : 1.2,
            minWidth: xs ? "auto" : "100px",
            "&:hover": {
              background: "#275B43",
            },
          }}
        >
          {xs ? "" : openDropdown ? "Cerrar" : "Ver"}
        </Button>
      </Stack>
      <Collapse in={openDropdown} timeout={400}>
        <Box
          sx={{
            backgroundColor: "#F4FBF7",
            mt: 1,
            mb: 2,
            p: 3,
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderLeft: "4px solid #2E7D5D",
            transition: "all 0.3s ease",
          }}
        >
          <p
            style={{
              marginTop: 0,
              color: "#1C3E33",
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            Evaluaciones:
          </p>
          {contenidoDropdown}
        </Box>
      </Collapse>
    </Stack>
  );
}

export default ListItemConDropdown;
