import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

const ModalCuadrado = ({ show, handleClose, resultados }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Resultados - Parte Central del Cuadrado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>X</th>
              <th>N dígitos</th>
              <th>Paridad</th>
              <th>Semilla N</th>
              <th>U</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{resultado.x}</td>
                <td>{resultado.Ndigitos}</td>
                <td>{resultado.paridad}</td>
                <td>{resultado.semillaN}</td>
                <td>{resultado.u}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCuadrado; 