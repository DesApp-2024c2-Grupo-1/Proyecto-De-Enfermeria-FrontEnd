import {
  Button,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deshabilitarEvaluacion } from "../services/EvaluacionService";

function EditButton({ id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogExito, setOpenDialogExito] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeshabilitar = async () => {
    deshabilitarEvaluacion(id);
    handleClose();
    setOpenDialog(false);
    setOpenDialogExito(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: "transparent",
          color: "white",
          borderRadius: "100%",
          minHeight: 0,
          minWidth: 0,
          height: "30px",
          width: "30px",
          paddingTop: 2.5,
          paddingRight: 2.5
        }}

        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <i style={{fontSize: 20}}className="fa-solid fa-gear"></i>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        disableScrollLock
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate(`/editarEvaluacion/${id}`)}>
          <ListItemIcon>
            <i className="fa-solid fa-edit"></i>
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate(`/historialEvaluacion/${id}`)}>
          <ListItemIcon>
            <i className="fa-solid fa-clock"></i>
          </ListItemIcon>
          <ListItemText>Historial</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setOpenDialog(true)}>
          <ListItemIcon>
            <i className="fa-solid fa-trash"></i>
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": { padding: "1.75rem", borderRadius: "20px" },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {"¿Estás seguro/a de eliminar la evaluación?"}
        </DialogTitle>
        <DialogContent>
          Al eliminar la evaluación, se eliminarán todas las preguntas y
          respuestas asociadas a ella. Esta acción no se puede deshacer.
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 1rem 1rem 1rem",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#1A3D2D",
              borderRadius: "10px",
              borderColor: "#1A3D2D",
              "&:hover": {
                backgroundColor: "#FFFFFF",
                color: "#1A3D2D",
                borderColor: "#FFFFFF",
              },
              width: "100px",
            }}
            onClick={() => setOpenDialog(false)}
          >
            Cancelar
          </Button>
          <Button
            sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#1A3D2D",
                  borderColor: "#1A3D2D",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                    color: "#1A3D2D",
                    borderColor: "#FFFFFF",
                  },
                  width: "100px",
                }}
            onClick={handleDeshabilitar}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogExito}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": { padding: "1.75rem", borderRadius: "20px" },
        }}
      >
        <DialogTitle
          id="alert-dialog-exito"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <dotlottie-wc
            src="https://lottie.host/182b34ff-8146-4be2-9cc9-e1ea97d6a04d/u56gM45ANy.lottie"
            style={{ width: "300px", height: "300px", margin: "-50px" }}
            autoplay
          ></dotlottie-wc>
        </DialogTitle>
        <DialogContent>
          <p style={{ textAlign: "center" }}>
            El modelo de evaluación fue eliminado correctamente.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditButton;
