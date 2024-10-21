import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Carpeta({ titulo }) {
  const navigate = useNavigate();
  return (
    <div className="carpeta">
      <div className="carpetaFondo">
        <div className="carpetaPestaña"></div>
        <h2>{titulo}</h2>
        <div className="botonesContainer">
          <Button
            text="Evaluar"
            className="botonClaro"
            onClick={() => navigate("/registrarEvaluacion")}
          />
          <Button
            text="Ver"
            className="botonClaro"
            onClick={() => navigate("/registroEvaluaciones")}
          />
        </div>
      </div>
    </div>
  );
}

export default Carpeta;
