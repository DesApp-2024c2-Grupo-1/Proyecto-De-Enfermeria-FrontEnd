import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput"
import Button from "../components/Button"

export function RegisterPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigate("register");
  };

    return <>
    <div className="alineacion">
    <img src="../assets/profile.png" className="bordePerfil"/> 
      <div className="recuadroTexto2">
      <FormInput
        type="name"
        placeholder="Ingrese su nombre"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="recuadroInputs"
        icono="user"
      />
      <FormInput
        type="apellido"
        placeholder="Ingrese su apellido"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="recuadroInputs"
        icono="user" 
      />
      <FormInput
        type="dni"
        placeholder="Ingrese su DNI"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <FormInput
        type="password"
        placeholder="Ingrese su contraseña"
        value={email}
        onChange={(e) => setPassword(e.target.value)}
        className="recuadroInputs"
        icono="lock"
      />
      <FormInput
        type="password"
        placeholder="Repita su contraseña"
        value={email}
        onChange={(e) => setPassword(e.target.value)}
        className="recuadroInputs"
        icono="lock"
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