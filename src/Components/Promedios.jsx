import React, { useState } from "react";
import { Container, Form, Button, Modal, Table, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Promedios() {
  const [n, setN] = useState("");
  const [values, setValues] = useState([]);
  const [za, setZa] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setN(value);
      setValues(new Array(value).fill(""));
      setResult(null);
      setErrors({});
    } else {
      setN("");
      setValues([]);
      setErrors({ n: "El valor debe ser mayor que 0" });
    }
  };

  const handleValueChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    
    // Validar que el valor esté entre 0 y 1
    const num = parseFloat(value);
    if (isNaN(num) || num < 0 || num > 1) {
      setErrors({...errors, [`value${index}`]: "El valor debe estar entre 0 y 1"});
    } else {
      const newErrors = {...errors};
      delete newErrors[`value${index}`];
      setErrors(newErrors);
    }
  };

  const handleZaChange = (e) => {
    const value = e.target.value;
    setZa(value);
    
    // Validar que el valor sea mayor que 0
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      setErrors({...errors, za: "El valor debe ser mayor que 0"});
    } else {
      const newErrors = {...errors};
      delete newErrors.za;
      setErrors(newErrors);
    }
  };

  const calcularPromedio = () => {
    // Validar que todos los valores estén completos
    if (values.some(v => v === "")) {
      setErrors({...errors, values: "Todos los valores deben estar completos"});
      return;
    }
    
    // Validar que todos los valores estén entre 0 y 1
    const numeros = values.map(v => parseFloat(v));
    if (numeros.some(isNaN) || numeros.some(n => n < 0 || n > 1)) {
      setErrors({...errors, values: "Todos los valores deben estar entre 0 y 1"});
      return;
    }
    
    // Validar que za sea un número mayor que 0
    const zaNum = parseFloat(za);
    if (isNaN(zaNum) || zaNum <= 0) {
      setErrors({...errors, za: "El valor de Za debe ser mayor que 0"});
      return;
    }
    
    const suma = numeros.reduce((a, b) => a + b, 0);
    const promedio = suma / numeros.length;
    const z0 = Math.abs((promedio - 0.5) * Math.sqrt(numeros.length) / Math.sqrt(1/12));
    
    setResult({
      numeros,
      suma,
      promedio,
      z0,
      za: zaNum
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header>
          <h2 className="mb-0 text-center">Prueba de Promedios</h2>
        </Card.Header>
        <Card.Body>
          <h3 className="text-center mb-4">Ingrese los datos</h3>
          
          <Form>
            <Form.Group className="mb-4">
              <Form.Label><h4>Ingrese un número entero positivo (n):</h4></Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={n}
                onChange={handleNChange}
                isInvalid={!!errors.n}
              />
              {errors.n && (
                <Form.Control.Feedback type="invalid">
                  {errors.n}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {n > 0 && (
              <Form.Group className="mb-4">
                <h4>Ingrese {n} valores entre 0 y 1:</h4>
                <div className="row">
                  {values.map((value, index) => (
                    <div key={index} className="col-md-6 mb-2">
                      <Form.Group>
                        <Form.Label>Valor {index + 1}:</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="1"
                          step="any"
                          value={value}
                          onChange={(e) => handleValueChange(index, e.target.value)}
                          isInvalid={!!errors[`value${index}`]}
                        />
                        {errors[`value${index}`] && (
                          <Form.Control.Feedback type="invalid">
                            {errors[`value${index}`]}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </div>
                  ))}
                </div>
                {errors.values && (
                  <Alert variant="danger" className="mt-2">
                    {errors.values}
                  </Alert>
                )}
              </Form.Group>
            )}

            <Form.Group className="mb-4">
              <Form.Label><h4>Ingrese un valor crítico Za:</h4></Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="any"
                value={za}
                onChange={handleZaChange}
                isInvalid={!!errors.za}
              />
              {errors.za && (
                <Form.Control.Feedback type="invalid">
                  {errors.za}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="text-center">
              <Button 
                variant="primary" 
                onClick={calcularPromedio}
                size="lg"
                className="px-4"
              >
                Calcular
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">Resultados de la Prueba de Promedios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && (
            <>
              <h4>Datos ingresados:</h4>
              <p><strong>Tamaño de la muestra (n):</strong> {n}</p>
              <p><strong>Valor de Za:</strong> {result.za.toFixed(4)}</p>
              
              <h4 className="mt-3">Números ingresados:</h4>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {result.numeros.map((num, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{num.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              <h4 className="mt-3">Resultados:</h4>
              <p><strong>Suma de los elementos:</strong> {result.suma.toFixed(4)}</p>
              <p><strong>Promedio:</strong> {result.promedio.toFixed(4)}</p>
              <p><strong>Z₀:</strong> {result.z0.toFixed(4)}</p>
              
              <Alert variant={result.z0 < result.za ? "success" : "danger"} className="mt-3">
                <strong>Conclusión:</strong><br />
                {result.z0 < result.za
                  ? "No se rechaza H₀ (distribución uniforme)"
                  : "Se rechaza H₀ (no uniforme)"}
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}