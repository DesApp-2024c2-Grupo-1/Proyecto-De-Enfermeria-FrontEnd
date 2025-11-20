import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IrAtrasBoton = () => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{
        color: "#1A3D2D",
        width: "100px",
        fontSize: "15px",
        marginLeft: "48px"
      }}
      onClick={() => navigate(-1)}
      startIcon={
        <i
          class="fa fa-arrow-left"
          aria-hidden="true"
          style={{ fontSize: "12 px", color: "#1A3D2D" }}
        ></i>
      }
    >
      Atrás
    </Button>
  );
};


export default IrAtrasBoton;
