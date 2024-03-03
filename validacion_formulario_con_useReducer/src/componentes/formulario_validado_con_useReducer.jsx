import React, { useReducer, useState } from 'react';
import Resultado from './Resultado';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  errors: {
    firstName: '',
    lastName: '',
    email: ''
  }
};

const actionTypes = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  VALIDATE_FIELD: 'VALIDATE_FIELD'
};

const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FIELD:
      return {
        ...state,
        [action.fieldName]: action.value
      };
    case actionTypes.VALIDATE_FIELD:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.fieldName]: action.errorMessage
        }
      };
    default:
      return state;
  }
};

const Formulario = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [showResult, setShowResult] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actionTypes.UPDATE_FIELD, fieldName: name, value });

    if (name === 'firstName') {
      if (value.trim().length < 2) {
        dispatch({ type: actionTypes.VALIDATE_FIELD, fieldName: 'firstName', errorMessage: 'El nombre debe tener al menos 2 caracteres' });
      } else {
        dispatch({ type: actionTypes.VALIDATE_FIELD, fieldName: 'firstName', errorMessage: '' });
      }
    } else if (name === 'lastName') {
      if (value.trim().length < 2) {
        dispatch({ type: actionTypes.VALIDATE_FIELD, fieldName: 'lastName', errorMessage: 'El apellido debe tener al menos 2 caracteres' });
      } else {
        dispatch({ type: actionTypes.VALIDATE_FIELD, fieldName: 'lastName', errorMessage: '' });
      }
    } else if (name === 'email') {
      if (value.trim().length < 5 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        dispatch({ type: actionTypes.VALIDATE_FIELD, fieldName: 'email', errorMessage: 'Correo electrónico inválido' });
      } else {
        dispatch({ type: actionTypes.VALIDATE_FIELD, fieldName: 'email', errorMessage: '' });
      }
    }
    // Actualizar el estado local de formData
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si algún campo está vacío
    if (Object.values(formData).some(value => value === '')) {
      setEmptyFieldsError(true);
      return;
    }
    // Validar que todos los campos estén completos y sin errores
    const isFormValid = Object.values(state.errors).every((error) => error === '');
    if (isFormValid) {
      // Si el formulario es válido, mostrar el componente Resultado
      setShowResult(true);
      setEmptyFieldsError(false);
    } else {
      console.log('Formulario inválido');
    }
  };

  return (
    <div>
      <form className='formulario' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Nombre</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id="firstName"
            name="firstName"
            value={state.firstName}
            onChange={handleChange} />
          {state.errors.firstName && <div style={{ color: 'red' }}>{state.errors.firstName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Apellido</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id="lastName"
            name="lastName"
            value={state.lastName}
            onChange={handleChange} />
          {state.errors.lastName && <div style={{ color: 'red' }}>{state.errors.lastName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange} />
          {state.errors.email && <div style={{ color: 'red' }}>{state.errors.email}</div>}
        </div>
        <button type="submit">Enviar</button>
      </form>
      {emptyFieldsError && <div style={{ color: 'red' }}>Por favor complete todos los campos.</div>}
      {/* Renderizar el componente Resultado si showResult es true */}
      {showResult && <Resultado data={formData} />}
    </div>
  );
};

export default Formulario;
