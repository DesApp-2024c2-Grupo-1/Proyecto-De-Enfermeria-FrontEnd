// components/withAuth.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocente } from '../context/DocenteContext';

export const autenticacion = (Componente) => {
    return (props) => {
        const { docenteContext } = useDocente();
        const navigate = useNavigate();

        useEffect(() => {
            if (!docenteContext && window.location.pathname !== '/401') {
                navigate('/401', { replace: true });
            }
        }, [docenteContext, navigate]);

        if (!docenteContext) {
            return null;
        }

        return <Componente {...props} />;
    };
};