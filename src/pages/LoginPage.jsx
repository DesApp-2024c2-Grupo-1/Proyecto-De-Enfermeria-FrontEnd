import {  useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import FormInput from '../components/FormInput'
import "../index.css"
import { getDocenteByDni } from "../services/DocenteService";
import { useDocente } from "../context/DocenteContext";

export function LoginPage() {
  const navigate = useNavigate();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { setDocenteContext } = useDocente()
  const [loading, setLoading] = useState(false);  // Estado para carga
  const [error, setError] = useState(""); // Estado para manejo de errores

  const [docente, setDocente] = useState(null)
  

  const fetchDocente = async (dni) => {
    try {
      setLoading(true);
      setError(""); // Resetear errores previos
      const data = await getDocenteByDni(Number(dni));
      setDocente(data);
    } catch (err) {
      setError("Docente no encontrado.");
    }  finally {
      setLoading(false);
  }
  };
  
  useEffect(() => {
    if (dni.length === 8) { 
      fetchDocente(dni);
    }
    }, [dni]);

  const handleLogin = async () => {
    if (!docente) {
      setError("Docente no encontrado.");
      return;
    }

    if (password === docente.password) {
      setDocenteContext(docente); // Establecer docente en contexto
      navigate("home");
    } else {
      setError("Contraseña incorrecta.");
    }
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
        placeholder="Ingrese su DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        className="recuadroInputs"
        icono="address-card"
      />
      <FormInput
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="recuadroInputs"
        icono="lock"
      />
      <Button
        text={loading ? "Cargando..." : "Iniciar sesión"}
        onClick={handleLogin}
        className="botonClaro"
        disabled={loading} // Deshabilitar botón mientras se carga
      />
      
      {error && <p className="error-message">{error}</p>}  {/* Mostrar el mensaje de error */}


      <div className="alineacion-texto">
        <p className="texto">
          <a className="texto" href="https://ar.pinterest.com/pin/369084131975098694/" target="_blank">¿Olvidaste la contraseña?</a>
        </p>
        <p id="espacio">¿No tenés cuenta?</p>
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
