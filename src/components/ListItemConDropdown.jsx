import { Stack, Button, Box, useMediaQuery, Collapse } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";

function ListItemConDropdown({ textos, buttonOnClick, contenidoDropdown }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    console.log("Dropdown abierto");
    setOpenDropdown(!openDropdown);
  };

  return (
    <>
      <Stack>
        <Stack
          direction="row"
          spacing={{ sx: 1, sm: 3 }}
          sx={{
            backgroundColor: "#BBE2D0",
            my: "20px",
            px: "20px",
            py: { xs: "10px", sm: "0px" },
            borderRadius: { xs: "15px", sm: "100px" },
            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"} spacing={{ xs: 1, sm: 4 }}>
            {textos.map(({ key, value }, index) => (
              <div key={index}>
                <p>{xs && key === "nombre" ? `${value.charAt(0)}.` : value}</p>
              </div>
            ))}
          </Stack>
          {xs ? (
            <Button
              sx={{
                minHeight: 0,
                minWidth: 0,
                px: { xs: "13px", sm: "20px", md: "50px" },
                py: { xs: "10px" },
                borderRadius: "100%",
                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#31614b",
                "&:hover": {
                  backgroundColor: "#234637",
                },
              }}
              variant="contained"
              onClick={handleOpenDropdown}
            >
              <i className="fa-solid fa-chevron-right" style={{ color: "white" }}></i>
            </Button>
          ) : (
            <Button
              sx={{
                px: { xs: "20px", sm: "20px", md: "50px" },
                borderRadius: "100px",
                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#31614b",
                "&:hover": {
                  backgroundColor: "#234637",
                },
              }}
              variant="contained"
              onClick={handleOpenDropdown}
            >
              Ver
            </Button>
          )}
        </Stack>
        <Collapse in={openDropdown} timeout="auto">
          <Box
            sx={{
              backgroundColor: "#daf2e3",
              mt: 2,
              mb: 2,
              p: 2,
              borderRadius: "30px",
              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            <p>Evaluaciones:</p>
            {contenidoDropdown}
            <Button sx={{ color: "#234637" }} onClick={handleOpenDropdown}>Cerrar</Button>
          </Box>
        </Collapse>
      </Stack>
    </>
  );
}

export default ListItemConDropdown;
