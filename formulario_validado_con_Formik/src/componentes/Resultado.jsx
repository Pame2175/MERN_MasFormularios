// Resultado.jsx
import React from 'react';

const Resultado = ({ data }) => {
    if (!data) {
        return null;
    }

    const { firstName, lastName, email, password, confirmPassword } = data;

    return (
        <div>
            <h2>Resultado</h2>
            <p>Nombre: {firstName}</p>
            <p>Apellido: {lastName}</p>
            <p>Email: {email}</p>
            <p>Contraseña: {password}</p>
            <p>Confirmar Contraseña: {confirmPassword}</p>
            {password !== confirmPassword && (
                <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>
            )}
        </div>
    );
}

export default Resultado;
