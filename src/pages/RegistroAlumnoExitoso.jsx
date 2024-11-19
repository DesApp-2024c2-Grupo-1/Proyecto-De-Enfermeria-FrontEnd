import React from "react";
import { useNavigate } from "react-router-dom";


export function RegistroAlumnoExitoso() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home');               //seria para volver al inicio
  }
    return (
        <>
        <div className="alineacion">
        <img src="../assets/profile.png" className="bordePerfil"/>
        <div className="recuadroTexto">
        <h1>¡Alumno registrado con éxito!</h1>
        <p>¡Bienvenid@, muchas gracias por registrarte!</p>
        <button className="botonClaro" onClick={handleRedirect}>Volver al Inicio</button>
        </div>
        <div><img src="../assets/unahur-logo-figma-sf.png" className="unahur-logo" alt="Logo UNAHUR"/> </div>
        </div>
        </>
      );
}


