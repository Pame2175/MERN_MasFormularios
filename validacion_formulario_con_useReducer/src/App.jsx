import React from 'react';
import './App.css';
import Formulario from './componentes/formulario_validado_con_useReducer'; 
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
      <div className='App'>
        <Formulario />
      </div>
    </>
  );
}

export default App;

