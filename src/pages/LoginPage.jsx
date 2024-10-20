import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login");
    navigate("home");
  };

  const handleRegister = () => {
    navigate("register");
  };

  return (
    <>
      <div>Login</div>
      <Button text="Iniciar sesión" onClick={handleLogin} />
      <p>¿No tenés cuenta?</p>
      <Button text="Registrate" onClick={handleRegister} />
    </>
  );
}
