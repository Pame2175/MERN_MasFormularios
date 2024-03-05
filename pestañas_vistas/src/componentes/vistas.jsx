import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    // Ejecutar la devolución de llamada si está presente
    if (tabs[index].onClick) {
      tabs[index].onClick();
    }
  };

  return (
    <div className="tabs-container">
      <ul className="nav nav-tabs">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link ${index === activeTab ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
