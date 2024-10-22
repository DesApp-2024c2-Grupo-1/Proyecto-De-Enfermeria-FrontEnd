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
      <div>Login</div>
      <FormInput
        type="email"
        placeholder="nombre@apellido.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-email"
      />
      <FormInput
        type="password"
        placeholder="contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-password"
      />
      <Button text="Iniciar sesión" onClick={handleLogin} className="login" />
      <p>¿No tenés cuenta?</p>
      <Button text="Registrate" onClick={handleRegister} />
    </>
  );
}
