import { Stack, Box, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";

function ListHeader({ textos }) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction="row"
      spacing={xs ? 1 : 3}
      sx={{
        background: "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 100%)",
        color: "#13251dff",
        mt: 3,
        mb: -1.5,
        px: xs ? 2 : 3,
        py: xs ? 1.2 : 1.6,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      <Stack
        direction="row"
        spacing={xs ? 1 : 4}
        sx={{
          width: "100%",
          justifyContent: xs ? "space-around" : "flex-start",
          alignItems: "center",
        }}
      >
        {textos.map(({ key, value }, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              width: xs ? "auto" : "150px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              textAlign: xs ? "center" : "left",
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: xs ? "0.85rem" : "1rem",
                opacity: 0.9,
              }}
            >
              {value}
            </p>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default ListHeader;
