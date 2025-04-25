import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditButton( { id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem>
          <ListItemIcon>
            <i className="fa-solid fa-trash"></i>
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default EditButton;
