import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDocente } from "../context/DocenteContext";

function PerfilMenuButton() {
  const { docenteContext, setDocenteContext } = useDocente();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVerPerfil = () => {
    handleClose();
    navigate("/perfilDocente");
  };

  const handleCerrarSesion = () => {
    handleClose();
    setDocenteContext(null);
    navigate("/");
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        sx={{
          color: "#1A3D2D",
          textTransform: "none",
          fontWeight: 500,
        }}
        onClick={handleClick}
        endIcon={
          <i
            className="fa-solid fa-user"
            style={{ fontSize: "20px", color: "#1A3D2D" }}
          ></i>
        }
      >
        {docenteContext?.nombre} {docenteContext?.apellido}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "perfil-menu-button",
        }}
      >
        <MenuItem onClick={handleVerPerfil}>
          <ListItemIcon>
            <i className="fa-solid fa-id-badge"></i>
          </ListItemIcon>
          <ListItemText>Ver Perfil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenDialog}>
          <ListItemIcon>
            <i className="fa-solid fa-right-from-bracket"></i>
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            paddingLeft: "2.35rem",
            paddingRight: "2.35rem",
            paddingBottom: "1.35rem",
            paddingTop: "1.35rem",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"¿Cerrar sesión?"}</DialogTitle>

        <DialogActions>
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
            onClick={handleCloseDialog}
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
            onClick={handleCerrarSesion}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PerfilMenuButton;
