import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Modal, Button, Form } from 'react-bootstrap';

const VistaTabla = () => {
  const [data, setData] = useState([
    { id: 1, nombre: 'Elemento 1', cantidad: 10 },
    { id: 2, nombre: 'Elemento 2', cantidad: 15 },
    { id: 3, nombre: 'Elemento 3', cantidad: 20 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newElement, setNewElement] = useState({ nombre: '', cantidad: '' });
  const [editElement, setEditElement] = useState(null);

  const tableRef = useRef();

  useEffect(() => {
    if (tableRef.current) {
      const dataTable = $(tableRef.current).DataTable();

      // Agregar fila
      const addRow = newData => {
        dataTable.row.add([
          newData.id,
          newData.nombre,
          newData.cantidad,
          '<button class="btn btn-primary editBtn">Editar</button><button class="btn btn-danger deleteBtn ml-2">Eliminar</button>'
        ]).draw();
      };

      // Borrar fila
      const deleteRow = rowIndex => {
        dataTable.row(rowIndex).remove().draw();
      };

      // Editar fila
      const editRow = (rowData, rowIndex) => {
        const newData = { ...rowData };
        newData.nombre = 'Elemento Editado';
        setData(prevData => prevData.map((item, index) => index === rowIndex ? newData : item));
        dataTable.row(rowIndex).data([
          newData.id,
          newData.nombre,
          newData.cantidad,
          '<button class="btn btn-primary editBtn">Editar</button><button class="btn btn-danger deleteBtn ml-2">Eliminar</button>'
        ]).draw();
      };

      // Evento click en botón Agregar
      $('#addBtn').on('click', () => {
        setShowModal(true);
      });

      // Evento click en botón Eliminar
      $(tableRef.current).on('click', '.deleteBtn', function () {
        const rowIndex = dataTable.row($(this).closest('tr')).index();
        setShowConfirmModal(true);
        setEditElement(data[rowIndex]);
      });

      // Evento click en botón Editar
      $(tableRef.current).on('click', '.editBtn', function () {
        const rowData = dataTable.row($(this).closest('tr')).data();
        const rowIndex = dataTable.row($(this).closest('tr')).index();
        setEditElement(data[rowIndex]);
        setShowModal(true);
      });
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfirmModal(false);
    setEditElement(null);
  };

  const handleAddElement = () => {
    const newData = { ...newElement, id: data.length + 1 };
    setData(prevData => [...prevData, newData]);
    addRow(newData);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDeleteElement = () => {
    const rowIndex = data.findIndex(item => item === editElement);
    setData(prevData => prevData.filter((_, index) => index !== rowIndex));
    deleteRow(rowIndex);
    setShowConfirmModal(false);
  };

  const handleEditElement = () => {
    const newData = { ...editElement, nombre: 'Elemento Editado' };
    const rowIndex = data.findIndex(item => item === editElement);
    setData(prevData => prevData.map((item, index) => index === rowIndex ? newData : item));
    dataTable.row(rowIndex).data([
      newData.id,
      newData.nombre,
      newData.cantidad,
      '<button class="btn btn-primary editBtn">Editar</button><button class="btn btn-danger deleteBtn ml-2">Eliminar</button>'
    ]).draw();
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewElement(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h2>Tabla de Elementos</h2>
      <button id="addBtn" className="btn btn-primary mb-2">Agregar Fila</button>
      <table ref={tableRef} className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>
                <button className="btn btn-primary editBtn">Editar</button>
                <button className="btn btn-danger deleteBtn ml-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editElement ? 'Editar' : 'Agregar'} Nuevo Elemento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={newElement.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="text" name="cantidad" value={newElement.cantidad} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={editElement ? handleEditElement : handleAddElement}>{editElement ? 'Editar' : 'Agregar'}</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>Elemento eliminado exitosamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          <Button variant="danger" onClick={handleDeleteElement}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VistaTabla;
