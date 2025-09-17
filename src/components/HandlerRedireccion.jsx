import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDocente } from '../context/DocenteContext';

const HandlerRedireccion = () => {
    const { docenteContext } = useDocente();
    const navigate = useNavigate();
    const location = useLocation();

    const rutasPublicas = [
        '/',
        '/login',
        '/register', 
        '/registerAlumnos',
        '/registroAlumnoExitoso',
        '/registroDocenteExitoso',
        '/401'
    ];

    useEffect(() => {
        if (!docenteContext && 
            !rutasPublicas.includes(location.pathname) && 
            location.pathname !== '/401') {
            navigate('/401', { replace: true });
        }
    }, [docenteContext, navigate, location.pathname]);

    return null;
};

export default HandlerRedireccion;