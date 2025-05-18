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
    console.log("Evaluación deshabilitada");
    window.location.reload();
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#31614b",
          color: "white",
          borderRadius: "100%",
          minHeight: 0,
          minWidth: 0,
          height: "30px",
          width: "30px",

          "&:hover": {
            backgroundColor: "#3e7d5d",
          },
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <i className="fa-solid fa-gear"></i>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
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
        <MenuItem>
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
          "& .MuiDialog-paper": { padding: "5rem" },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {"Estás seguro de eliminar la evaluación?"}
        </DialogTitle>
        <DialogContent>
          Al eliminar la evaluación, se eliminarán todas las preguntas y
          respuestas asociadas a ella. Esta acción no se puede deshacer.
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 2rem 2rem 2rem",
          }}
        >
          <Button color="error" onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <Button color="success" onClick={handleDeshabilitar} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditButton;
