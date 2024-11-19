import React from "react";
import { useNavigate } from "react-router-dom";


export function RegistroDocenteExitoso() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home');               //seria para volver al inicio...home o perfil docente
  }
    return (
        <>
        <div className="alineacion">
        <img src="../assets/profile.png" className="bordePerfil"/>
        <div className="recuadroTexto">
        <h1>¡Docente registrado con éxito!</h1>
        <button className="botonClaro" onClick={handleRedirect}>Volver al Inicio</button>
        </div>
        <div><img src="../assets/unahur-logo-figma-sf.png" className="unahur-logo" alt="Logo UNAHUR"/> </div>
        </div>
        </>
      );
}