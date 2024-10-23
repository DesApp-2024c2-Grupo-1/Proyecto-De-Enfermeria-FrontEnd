import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import FormInput from '../components/FormInput'

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login Attempt", { email, password });
    navigate("home");
  };

  const handleRegister = () => {
    navigate("register");
  };

  return (
    <>
    <div className="alineacion">
    <img src="../assets/profile.png" className="bordePerfil"/> 
      <div className="recuadroTexto">
      <FormInput
        type="email"
        placeholder="nombre@apellido.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="recuadroInputs"
      />
      <FormInput
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="recuadroInputs"
      />
      <Button text="Iniciar sesión" onClick={handleLogin} className="botonClaro" />
      
      <div className="">
      <p>¿No tenés cuenta?</p>
      <Button text="Registrate" onClick={handleRegister} className="botonClaro"/>
      </div>
      
    </div>

    <div>
    <img src="../assets/unahur-logo-figma-sf.png" className="unahur-logo" alt="Logo UNAHUR"/> 
    </div>
  </div>
    </>
  );
}
