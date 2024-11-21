import { createContext, useState, useContext, useEffect } from "react";

const DocenteContext = createContext();

export const DocenteProvider = ({ children }) => {
    const [docenteContext, setDocenteContext] = useState(() => {
        const storedDocente = localStorage.getItem("docente");
        return storedDocente ? JSON.parse(storedDocente) : null;
    });

    useEffect(() => {
        // Guardar en localStorage cuando el docente cambie
        if (docenteContext) {
            localStorage.setItem("docente", JSON.stringify(docenteContext));
        } else {
            localStorage.removeItem("docente"); // Limpiar cuando sea null
        }
    }, [docenteContext]);

    return (
        <DocenteContext.Provider value={{ docenteContext, setDocenteContext }}>
            {children}
        </DocenteContext.Provider>
    );
};

export const useDocente = () => {
    return useContext(DocenteContext);
};
