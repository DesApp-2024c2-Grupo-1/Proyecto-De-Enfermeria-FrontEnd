import Busqueda from "../components/busqueda";
import ListItem from "../components/ListItem";

export function RegistroEvaluacionesPage() {
    return <>
      <div className="registroEvaluacionesContainer">
        <h1>Lavado de manos</h1>
        <div className="registroEvaluaciones">
          <Busqueda />
          <ListItem textoUno={"Maria Gonzalez"} textoDos={"12345369"} />
          <ListItem textoUno={"Maria Gonzalez"} textoDos={"12345369"} /> 
          <ListItem textoUno={"Maria Gonzalez"} textoDos={"12345369"} /> 
          <ListItem textoUno={"Maria Gonzalez"} textoDos={"12345369"} /> 
          <ListItem textoUno={"Maria Gonzalez"} textoDos={"12345369"} /> 
        </div>
        
      </div>
    </>  
}
