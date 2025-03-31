import { Stack, Button, Box, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";

function ListItem({ textos, buttonOnClick, dropdown }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const [openItemDropdown, setOpenItemDropdown] = useState(false);

  const handleDropdownItemToggle = () => {
    setOpenItemDropdown(!openItemDropdown);
    console.log("Dropdown toggled for item");
  }

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
            {textos.map((texto, index) => (
              <div key={index}>
                <p>{texto}</p>
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
              onClick={buttonOnClick}
            >
              <i
                class="fa-solid fa-chevron-right"
                style={{ color: "white" }}
              ></i>
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
              onClick={{ dropdown } ? handleDropdownItemToggle : buttonOnClick}
            >
              Ver
            </Button>
          )}
        </Stack>
        {openItemDropdown && (
          <Box
            sx={{
              backgroundColor: "#BBE2D0",
              my: "20px",
              px: "20px",
              py: { xs: "10px", sm: "0px" },
              borderRadius: { xs: "15px", sm: "100px" },
              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            <p>Contenido del dropdown</p>
          </Box>
        )}
      </Stack>
    </>
  );
}

export default ListItem;
