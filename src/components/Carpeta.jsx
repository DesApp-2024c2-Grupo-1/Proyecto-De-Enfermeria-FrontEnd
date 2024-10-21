import Button from "../components/Button";

function Carpeta({ titulo }) {
  return (
    <div className="carpeta">
      <div className="carpetaFondo">
        <div className="carpetaPestaña"></div>
        <h2>{titulo}</h2>
        <div className="botonesContainer">
          <Button text="Evaluar" className="botonClaro" />
          <Button text="Ver" className="botonClaro" />
        </div>
      </div>
    </div>
  );
}

export default Carpeta;
