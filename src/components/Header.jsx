import { Stack, Button, Box, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";

function ListHeader({ textos }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Stack
        direction="row"
        spacing={{ sx: 1, sm: 3 }}
        sx={{
          backgroundColor: "white",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#31614b",
          my: "22px",
          px: "20px",
          py: { xs: "10px", sm: "0px" },
          mb: "-2px",
          borderRadius: { xs: "10px", sm: "10px" },
          boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
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
                    width: key === "dni" ? "50px" : "75px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div key={index}>
                    <p style={{ margin: 0 }}>{value}</p>
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
                    width: key === "dni" ? "100px" : "125px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div key={index}>
                    <p style={{ margin: 0 }}>{value}</p>
                  </div>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default ListHeader;
