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
      <div>Register</div>
      <FormInput
        type="name"
        placeholder="Ingrese su nombre"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-email"
      />
      <FormInput
        type="apellido"
        placeholder="Ingrese su apellido"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-email"
      />
      <FormInput
        type="dni"
        placeholder="Ingrese su DNI"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-email"
      />
      <FormInput
        type="email"
        placeholder="nombre@apellido.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-email"
      />
      <FormInput
        type="password"
        placeholder="Ingrese su contraseña"
        value={email}
        onChange={(e) => setPassword(e.target.value)}
        className="input-email"
      />
      <FormInput
        type="password"
        placeholder="Repita su contraseña"
        value={email}
        onChange={(e) => setPassword(e.target.value)}
        className="input-email"
      />
      <Button text="Registrarse" onClick={handleRegister} className="register" />
    </>  
  }