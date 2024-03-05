import React, { useState, useEffect } from 'react';

const listaTareas = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = index => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = index => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="container">
      <h1 className="mt-5">Lista de Tareas</h1>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={newTask} 
          onChange={e => setNewTask(e.target.value)} 
          placeholder="Agregar nueva tarea" 
        />
        <button className="btn btn-primary" onClick={addTask}>Agregar</button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(index)} 
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              
              <button className="btn btn-dark ml-2" onClick={() => deleteTask(index)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default listaTareas;
