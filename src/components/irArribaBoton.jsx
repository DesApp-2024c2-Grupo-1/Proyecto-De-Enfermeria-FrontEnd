import { Fab, Zoom } from "@mui/material";
import { useScrollTrigger } from "@mui/material";

function IrArribaBoton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        size="small"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: "#31614b",
          color: "white"
        }}
      >
        <i class="fa fa-angle-up" aria-hidden="true"></i>
      </Fab>
    </Zoom>
  );
}

export default IrArribaBoton;
