// App.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import Vistas from './componentes/vistas'; 
import VistaInicio from './componentes/vista_inicio'; 
import VistaFormulario from './componentes/vista_formulario'; 
import VistaTabla from './componentes/vista_tabla'; 

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    animateTabChange(); // Llama a la función para la animación de cambio de pestaña
  };

  const animateTabChange = () => {
    // Agrega aquí tu animación de cambio de pestaña con JavaScript
    // Por ejemplo, puedes utilizar librerías de animación como GSAP o implementar una animación personalizada con CSS
  };

  return (
    <div className="app-container">
      <div className="tabs-container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${selectedTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>Inicio</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${selectedTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>Formulario</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${selectedTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>Tabla</a>
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedTab === 0 && <VistaInicio />}
        {selectedTab === 1 && <VistaFormulario />}
        {selectedTab === 2 && <VistaTabla />}
      </div>
    </div>
  );
};

export default App;
