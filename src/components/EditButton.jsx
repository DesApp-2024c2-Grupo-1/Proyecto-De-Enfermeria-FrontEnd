import { Fab, Zoom, Button } from "@mui/material";
import { useScrollTrigger } from "@mui/material";

function EditButton() {
  return (
    <>
      <Button
        sx={{
          minHeight: 0,
          minWidth: 0,
          height: "30px",
          width: "30px",
          marginTop: "1px",
          borderRadius: "100%",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#31614b",
          "&:hover": {
            backgroundColor: "#234637",
          },
        }}
      >
        <i class="fa-solid fa-gear" style={{ color: "white" }}></i>
      </Button>
    </>
  );
}

export default EditButton;
