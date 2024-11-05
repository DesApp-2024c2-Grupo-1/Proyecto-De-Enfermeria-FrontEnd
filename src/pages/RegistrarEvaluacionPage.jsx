import { Input } from "../components/Input";
import { ListaPreguntas } from "../components/ListaPreguntas";

const preguntas = [
  { pregunta: "Lorem ipsum dolor sit amet?" },
  { pregunta: "Consectetur adipiscing elit?" },
  { pregunta: "Sed do eiusmod tempor incididunt?" },
  { pregunta: "Ut labore et dolore magna aliqua?" },
  { pregunta: "Ut enim ad minim veniam?" },
  { pregunta: "Duis aute irure dolor in reprehenderit?" },
  {
    pregunta: "Excepteur sint occaecat cupidatat non proident?",
  },
  {
    pregunta: "Sunt in culpa qui officia deserunt mollit anim id est laborum?",
  },
];

export function RegistrarEvaluacionPage() {
  return (
    <>
      <div className="grupoInput">
        <Input
          disabled={false}
          placeholder={"Ingresar DNI:"}
          titulo={"Alumno"}
        ></Input>
        <Input
          disabled={true}
          activo={false}
          placeholder={"Carlos Perez"}
          titulo={"Docente"}
        ></Input>
      </div>
      <div>
        <ListaPreguntas preguntas={preguntas} />
      </div>
    </>
  );
}
