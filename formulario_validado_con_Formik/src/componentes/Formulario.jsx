// Formulario.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Resultado from './Resultado'; 

const Formulario = () => {
    const [formData, setFormData] = useState(null);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .required('El nombre es requerido'),
        lastName: Yup.string()
            .min(2, 'El apellido debe tener al menos 2 caracteres')
            .required('El apellido es requerido'),
        email: Yup.string()
            .min(5, 'El correo debe tener al menos 5 caracteres')
            .email('Correo no válido')
            .required('El correo es requerido'),
        password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('La contraseña es requerida'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required('Confirmar contraseña es requerida')
    });

    return (
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // Actualiza el estado con los datos del formulario
                    setFormData(values);
                    // Indica que el envío del formulario se ha completado
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='formulario' >
                        <label htmlFor="firstName">Nombre</label>
                        <Field type="text" name="firstName" placeholder="First Name" />
                        <ErrorMessage name="firstName" component="div" className="error-message" style={{ color: 'red' }} />

                        <label htmlFor="lastName">Apellido</label>
                        <Field type="text" name="lastName" placeholder="Last Name" />
                        <ErrorMessage name="lastName" component="div" className="error-message" style={{ color: 'red' }} />

                        <label htmlFor="email">Correo</label>
                        <Field type="text" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="error-message" style={{ color: 'red' }} />

                        <label htmlFor="password">Contraseña</label>
                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" className="error-message" style={{ color: 'red' }} />

                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                        <ErrorMessage name="confirmPassword" component="div" className="error-message" style={{ color: 'red' }} />

                        <button type="submit" disabled={isSubmitting}>Enviar</button>
                    </Form>
                )}
            </Formik>
            {/* Renderizar el componente Resultado con los datos del formulario */}
            {formData && <Resultado data={formData} />}
        </div>
    );
}

export default Formulario;
