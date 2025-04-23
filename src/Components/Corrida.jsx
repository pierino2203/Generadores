import React, { useState } from "react";
import { Container, Form, Button, Modal, Table, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Corrida() {
  const [n, setN] = useState("");
  const [values, setValues] = useState([]);
  const [xa, setXa] = useState("");
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

  const handleXaChange = (e) => {
    const value = e.target.value;
    setXa(value);
    
    // Validar que el valor sea mayor que 0
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      setErrors({...errors, xa: "El valor debe ser mayor que 0"});
    } else {
      const newErrors = {...errors};
      delete newErrors.xa;
      setErrors(newErrors);
    }
  };

  const obtenerFrecuenciasDeRachas = (secuencia) => {
    const frecuencias = {};
    let longitud = 1;
    for (let i = 1; i < secuencia.length; i++) {
      if (secuencia[i] === secuencia[i - 1]) {
        longitud++;
      } else {
        frecuencias[longitud] = (frecuencias[longitud] || 0) + 1;
        longitud = 1;
      }
    }
    frecuencias[longitud] = (frecuencias[longitud] || 0) + 1;
    return frecuencias;
  };

  const calcularFrecuenciaEsperada = (n, i) => {
    return (n - i + 3) / Math.pow(2, i + 1);
  };

  const calcularChiCuadrado = (fo, n) => {
    let chi2 = 0;
    const fePorLongitud = {};
    Object.keys(fo).forEach((key) => {
      const i = parseInt(key);
      const fei = calcularFrecuenciaEsperada(n, i);
      fePorLongitud[i] = fei;
      chi2 += Math.pow(fo[i] - fei, 2) / fei;
    });
    return { chi2, fePorLongitud };
  };

  const compareValues = () => {
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
    
    // Validar que xa sea un número mayor que 0
    const xaNum = parseFloat(xa);
    if (isNaN(xaNum) || xaNum <= 0) {
      setErrors({...errors, xa: "El valor de χ²ₐ debe ser mayor que 0"});
      return;
    }
    
    const binaria = numeros.map(v => (v > 0.5 ? 1 : 0));
    const fo = obtenerFrecuenciasDeRachas(binaria);
    const { chi2, fePorLongitud } = calcularChiCuadrado(fo, numeros.length);

    setResult({ binaria, fo, fePorLongitud, chi2 });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header>
          <h2 className="mb-0 text-center">Prueba de Corrida</h2>
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
                        <Form.Label>u {index + 1}:</Form.Label>
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
              <Form.Label><h4>Ingrese χ²ₐ:</h4></Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="any"
                value={xa}
                onChange={handleXaChange}
                isInvalid={!!errors.xa}
              />
              {errors.xa && (
                <Form.Control.Feedback type="invalid">
                  {errors.xa}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="text-center">
              <Button 
                variant="primary" 
                onClick={compareValues}
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
          <Modal.Title className="text-center w-100">Resultados de la Prueba de Corrida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && (
            <>
              <h4>Datos ingresados:</h4>
              <p><strong>Tamaño de la muestra (n):</strong> {n}</p>
              <p><strong>Valor de χ²ₐ:</strong> {xa}</p>
              
              <h4 className="mt-3">Secuencia binaria:</h4>
              <p>{result.binaria.join(" ")}</p>
              
              <h4 className="mt-3">Frecuencias de rachas:</h4>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Longitud de Racha</th>
                    <th>Frecuencia Observada (FO)</th>
                    <th>Frecuencia Esperada (FE)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(result.fo).map((longitud, i) => (
                    <tr key={i}>
                      <td>{longitud}</td>
                      <td>{result.fo[longitud]}</td>
                      <td>{result.fePorLongitud[longitud].toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              <h4 className="mt-3">Resultados:</h4>
              <p><strong>Estadístico χ²:</strong> {result.chi2.toFixed(4)}</p>
              
              <Alert variant={result.chi2 < parseFloat(xa) ? "success" : "danger"} className="mt-3">
                <strong>Conclusión:</strong><br />
                {result.chi2 < parseFloat(xa)
                  ? "No se rechaza H₀ (distribución aleatoria)"
                  : "Se rechaza H₀ (no aleatoria)"}
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
