import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput"
import Button from "../components/Button"
// import { registrarAlumno } from "../services/AlumnoService";

export function RegisterPageAlumnos() {

  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState(null);

const handleRegister = async () => {
  const alumnoData = { nombre, apellido, email, dni, password };
//  await registrarAlumno(alumnoData);
  navigate("/registroAlumnoExitoso");
};

    return <>
    <div className="alineacion">
    <img src="../assets/profile.png" className="bordePerfil"/> 
      <div className="recuadroTexto">
      <FormInput
        type="name"
        placeholder="Ingrese su nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="recuadroInputs"
        icono="user"
      />
      <FormInput
        type="apellido"
        placeholder="Ingrese su apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        className="recuadroInputs"
        icono="user" 
      />
      <FormInput
        type="dni"
        placeholder="Ingrese su DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        className="recuadroInputs"
        icono="address-card"
      />
      <FormInput
        type="email"
        placeholder="nombre@apellido.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="recuadroInputs"
        icono="envelope"        
      />
      <div id="espaciojaja"></div>
      <Button text="Registrarse" onClick={handleRegister} className="botonClaro"/>
      </div>
      
    

    <div>
    <img src="../assets/unahur-logo-figma-sf.png" className="unahur-logo" alt="Logo UNAHUR"/> 
    </div>
    </div>
    </> 
  }