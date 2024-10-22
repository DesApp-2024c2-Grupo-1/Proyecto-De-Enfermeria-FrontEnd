import { Input } from "../components/Input";

export function VerEvaluacionPage() {
  return (
    <>
      <div className="grupoInput">
        <Input
          disabled={true}
          placeholder={"Maria Gonzalez"}
          titulo={"Alumno"}
        ></Input>
        <Input
          disabled={true}
          activo={false}
          placeholder={"Carlos Perez"}
          titulo={"Docente"}
        ></Input>
      </div>
    </>
  );
}
