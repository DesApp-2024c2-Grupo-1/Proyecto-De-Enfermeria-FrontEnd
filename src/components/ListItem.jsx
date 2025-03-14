import { Stack, Button, Box } from "@mui/material";

function ListItem({ textos, buttonOnClick }) {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{sx: 1, sm: 3}}
        sx={{
          backgroundColor: "#BBE2D0",
          my: "20px",
          px: "20px",
          py: {xs: "10px", sm: "0px"},
          borderRadius: "100px",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction={"row"} spacing={4}>
          {textos.map((texto, index) => (
            <div>
              <p key={index}>{texto}</p>
            </div>
          ))}
        </Stack>
        <Button
          sx={{
            px: { xs: "80px", sm: "20px", md: "50px" },
            borderRadius: "100px",
            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
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
      </Stack>
    </>
  );
}

export default ListItem;
