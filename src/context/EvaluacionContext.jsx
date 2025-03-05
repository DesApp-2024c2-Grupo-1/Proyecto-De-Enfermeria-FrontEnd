import { createContext, useState, useContext, useEffect } from "react";

const EvaluacionContext = createContext();

export const EvaluacionProvider = ({ children }) => {
    const [evaluacionContext, setEvaluacionContext] = useState(() => {
        const storedEvaluacion = localStorage.getItem("evaluacion");
        return storedEvaluacion ? JSON.parse(storedEvaluacion) : null;
    });

    useEffect(() => {
        // Guardar en localStorage cuando el Evaluacion cambie
        if (evaluacionContext) {
            localStorage.setItem("evaluacion", JSON.stringify(evaluacionContext));
        } else {
            localStorage.removeItem("evaluacion"); // Limpiar cuando sea null
        }
    }, [evaluacionContext]);

    return (
        <EvaluacionContext.Provider value={{ evaluacionContext, setEvaluacionContext }}>
            {children}
        </EvaluacionContext.Provider>
    );
};

export const useEvaluacion = () => {
    return useContext(EvaluacionContext);
};
