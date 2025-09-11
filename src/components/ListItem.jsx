import { Stack, Button, Box, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";

function ListItem({ textos, buttonOnClick }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Stack
        direction="row"
        spacing={{ sx: 1 }}
        sx={{

          backgroundColor: "#BBE2D0",
          my: "20px",
          px: "20px",
          py: { xs: "10px", sm: "0px" },
          borderRadius: { xs: "10px", sm: "10px" },
          boxShadow: "1.5px 1.5px 3.5px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {xs ? (
          <Stack direction="row" spacing={{ xs: 1, sm: 4 }}>
            {textos.map(({ key, value }, index) => (
              <Box
                sx={{ display: "flex", alignItems: "center", height: "55px" }}
              >
                <Box
                  key={index}
                  sx={{
                    width: key === "titulo" ? "150px" : "100%",
                    overflow: key === "titulo" ? "visible" : "hidden",
                    whiteSpace: key === "titulo" ? "visible" : "hidden",
                  }}
                >
                  <div key={index}>
                    <p style={{ marginLeft: key === "version" ? "25px" : "0px" }}> 
                      {xs && key === "nombre" ? `${value.charAt(0)}.` : value}
                    </p>
                  </div>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <Stack direction="row" spacing={{ xs: 1, sm: 4 }}>
            {textos.map(({ key, value }, index) => (
              <Box
                sx={{ display: "flex", alignItems: "center", height: "55px" }}
              >
                <Box
                  key={index}
                  sx={{
                    width: key === "titulo" ? "200px" : "150px",
                    overflow:  "hidden",
                    whiteSpace: "hidden",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    {xs && key === "nombre" ? `${value.charAt(0)}.` : value}
                  </p>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
        {xs ? (
          <Button
            sx={{
              minHeight: 0,
              minWidth: 0,
              px: { xs: "13px" },
              py: { xs: "10px" },
              borderRadius: "100%",
              backgroundColor: "#31614b",
              "&:hover": {
                backgroundColor: "#234637",
              },
            }}
            variant="contained"
            onClick={buttonOnClick}
          >
            <i class="fa-solid fa-chevron-right" style={{ color: "white" }}></i>
          </Button>
        ) : (
          <Button
            sx={{
              px: { sm: "20px", md: "50px" },
              borderRadius: "10px",
              boxShadow: "1.5px 1.5px 3.5px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#31614b",
              "&:hover": {
                backgroundColor: "#234637",
              },
            }}
            variant="contained"
            onClick={buttonOnClick}
          >
            Ver
          </Button>
        )}
      </Stack>
    </>
  );
}

export default ListItem;
