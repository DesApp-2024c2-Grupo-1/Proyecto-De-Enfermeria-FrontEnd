import { useState } from "react";
import { Input } from "../components/Input";
import { Box, Stack } from "@mui/material";
import { useDocente } from "../context/DocenteContext";
import { modificarDocente } from "../services/DocenteService";
import { useNavigate } from "react-router-dom";

export function PerfilDocentePage() {
  const [editando, setEditando] = useState(true);
  const { docenteContext, setDocenteContext } = useDocente();
  const [nombre, setNombre] = useState(docenteContext.nombre)
  const [apellido, setApellido] = useState(docenteContext.apellido)
  const navigate = useNavigate();



  const docenteData = docenteContext
    ? {
        ...docenteContext,
        email: docenteContext.email,
        modificable: true,
      }
    : null;


  const handleClick = async () => {
    if (!docenteContext?.id) return;

    const updatedData = { nombre, apellido };
    try {
      if(editando){
        setEditando(!editando)
      }
      else{
        console.log(docenteContext)
        const updatedDocente = await modificarDocente(docenteContext.id, updatedData);      
        setDocenteContext(updatedDocente);
        setEditando(!editando)
        navigate("/")
      }
    } catch (error) {
      console.error("Error al actualizar el perfil del docente:", error);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        sx={{ display: "flex", alignItems: "center", my: "2rem" }}
      >
        <Box className="perfilCirculo">
          {docenteData?.nombre?.charAt(0)}
          {docenteData?.apellido?.charAt(0)}
        </Box>

        <Input
          key="nombre"
          width="25rem"
          backgroundColor={"#DDF0E7"}
          disabled={editando} 
          placeholder={docenteContext?.nombre}
          value={nombre}
          onChange={(e) => setNombre(e.target.value) }
          titulo="Nombre"
          
        />

        <Input
          key="apellido"
          width="25rem"
          backgroundColor={"#DDF0E7"}
          disabled={editando} 
          placeholder={docenteContext?.apellido}
          value={apellido}
          onChange={(e) => setApellido(e.target.value) }
          titulo="Apellido"
        />

        <Input
          width="25rem"
          backgroundColor={"#DDF0E7"}
          key="email"
          disabled={true}
          placeholder={docenteContext?.email || "Email no definido"}
          titulo="Email"
        />

        <button className="botonVerde" onClick={handleClick}>
          {editando ? "Editar" : "Guardar"}
        </button>
      </Stack>
    </>
  );
}
