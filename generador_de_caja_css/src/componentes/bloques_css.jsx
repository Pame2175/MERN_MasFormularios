import React, { useState } from 'react';

const BoxGenerator = () => {
  const [color, setColor] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  // Función para traducir los nombres de color del español al inglés
  const translateColor = (colorName) => {
    const spanishColors = {
      rojo: 'red',
      azul: 'blue',
      verde: 'green',
      amarillo: 'yellow',
      negro: 'black',
      blanco: 'white',
    };

    // Verificar si el color está en español
    if (spanishColors.hasOwnProperty(colorName.toLowerCase())) {
      return spanishColors[colorName.toLowerCase()];
    }
    
    // Si no está en español, devolver el nombre original
    return colorName;
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeWidth = (event) => {
    setWidth(event.target.value);
  };

  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validColor = translateColor(color.trim());
    if (validColor) {
      setBoxes([...boxes, { color: validColor, width, height }]);
      setColor('');
      setWidth('');
      setHeight('');
    } else {
      alert('El color ingresado no es válido.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={handleChangeColor}
        />
        <label htmlFor="width">Ancho:</label>
        <input
          type="number"
          id="width"
          value={width}
          onChange={handleChangeWidth}
        />
        <label htmlFor="height">Alto:</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleChangeHeight}
        />
        <button type="submit">Agregar Cuadro</button>
      </form>
      <div>
        {boxes.map((box, index) => (
          <div
            key={index}
            style={{
              backgroundColor: box.color,
              width: `${box.width}px`,
              height: `${box.height}px`,
              margin: '5px',
              display: 'inline-block',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BoxGenerator;
