import React, { useState } from "react";
import { Modal, Button, Table, Form, Row, Col, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Serie() {
  const [n, setN] = useState(0);
  const [pairs, setPairs] = useState([]);
  const [x, setX] = useState("");
  const [x2a, setX2a] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setN(value);
    setPairs(value > 0 ? Array(value).fill().map(() => ({ first: "", second: "" })) : []);
    setErrors({});
    setResult(null);
  };

  const validateNumber = (value) => {
    if (value === "") return true;
    
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 1;
  };

  const validateX = (value) => {
    if (value === "") return true;
    
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && Number.isInteger(num);
  };

  const validateX2a = (value) => {
    if (value === "") return true;
    
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  };

  const handlePairChange = (index, field, value) => {
    const newPairs = [...pairs];
    newPairs[index][field] = value;
    setPairs(newPairs);
    
    const newErrors = { ...errors };
    if (!validateNumber(value)) {
      newErrors[`pair${index}${field}`] = "El valor debe ser un número entre 0 y 1";
    } else {
      delete newErrors[`pair${index}${field}`];
    }
    setErrors(newErrors);
  };

  const handleXChange = (e) => {
    const value = e.target.value;
    setX(value);
    
    const newErrors = { ...errors };
    if (value !== "" && !validateX(value)) {
      newErrors.x = "El valor de x debe ser un entero positivo";
    } else {
      delete newErrors.x;
    }
    setErrors(newErrors);
  };

  const handleX2aChange = (e) => {
    const value = e.target.value;
    setX2a(value);
    
    const newErrors = { ...errors };
    if (value !== "" && !validateX2a(value)) {
      newErrors.x2a = "Debe ser positivo";
    } else {
      delete newErrors.x2a;
    }
    setErrors(newErrors);
  };

  const generarFrecuenciasObservadas = (pares, x) => {
    const fo = Array.from({ length: x }, () => Array(x).fill(0));
    pares.forEach(({ first, second }) => {
      const i = Math.min(Math.floor(first * x), x - 1);
      const j = Math.min(Math.floor(second * x), x - 1);
      fo[i][j]++;
    });
    return fo;
  };

  const calcularChiCuadrado = (fo, n, x) => {
    const fe = n / (x * x);
    let chiCuadrado = 0;
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < x; j++) {
        const diferencia = fo[i][j] - fe;
        chiCuadrado += (diferencia * diferencia) / fe;
      }
    }
    return { fe, chiCuadrado };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasErrors = false;

    // Validar que todos los pares tengan valores
    pairs.forEach((pair, index) => {
      if (pair.first === "" || pair.second === "") {
        newErrors[`pair${index}empty`] = "Ambos valores son requeridos";
        hasErrors = true;
      } else if (!validateNumber(pair.first)) {
        newErrors[`pair${index}first`] = "El valor debe ser un número entre 0 y 1";
        hasErrors = true;
      } else if (!validateNumber(pair.second)) {
        newErrors[`pair${index}second`] = "El valor debe ser un número entre 0 y 1";
        hasErrors = true;
      }
    });

    if (x === "") {
      newErrors.x = "El valor de x es requerido";
      hasErrors = true;
    } else if (!validateX(x)) {
      newErrors.x = "El valor de x debe ser un entero positivo";
      hasErrors = true;
    }

    if (x2a !== "" && !validateX2a(x2a)) {
      newErrors.x2a = "Debe ser positivo";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return;

    const processedPairs = pairs.map(pair => ({
      first: parseFloat(pair.first),
      second: parseFloat(pair.second)
    }));
    const processedX = parseInt(x);
    const fo = generarFrecuenciasObservadas(processedPairs, processedX);
    const { fe, chiCuadrado } = calcularChiCuadrado(fo, n, processedX);

    setResult({ fo, fe, chiCuadrado, pairs: processedPairs, x: processedX, x2a: x2a ? parseFloat(x2a) : null });
    setShowModal(true);
    
    // Limpiar los inputs después de mostrar el modal
    setN(0);
    setPairs([]);
    setX("");
    setX2a("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Header className="">
          <h2 className="mb-0">Prueba de Series</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Número de pares (n):</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={n} 
                    onChange={handleNChange} 
                    min="1"
                    className="form-control-sm"
                  />
                </Form.Group>
              </Col>
            </Row>

            {n > 0 && (
              <Card className="mb-3">
                <Card.Header className="bg-light">Pares (x, y):</Card.Header>
                <Card.Body>
                  {pairs.map((pair, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <span className="me-2 fw-bold">Par {index + 1}:</span>
                      </div>
                      <Row>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Valor x:</Form.Label>
                            <Form.Control
                              type="number"
                              className={`form-control-sm ${errors[`pair${index}first`] || errors[`pair${index}empty`] ? 'is-invalid' : ''}`}
                              placeholder="Ingrese valor x"
                              value={pair.first}
                              onChange={(e) => handlePairChange(index, 'first', e.target.value)}
                              step="any"
                              min="0"
                              max="1"
                            />
                            {(errors[`pair${index}first`] || errors[`pair${index}empty`]) && (
                              <div className="invalid-feedback">
                                {errors[`pair${index}empty`] || errors[`pair${index}first`]}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Valor y:</Form.Label>
                            <Form.Control
                              type="number"
                              className={`form-control-sm ${errors[`pair${index}second`] || errors[`pair${index}empty`] ? 'is-invalid' : ''}`}
                              placeholder="Ingrese valor y"
                              value={pair.second}
                              onChange={(e) => handlePairChange(index, 'second', e.target.value)}
                              step="any"
                              min="0"
                              max="1"
                            />
                            {(errors[`pair${index}second`] || errors[`pair${index}empty`]) && (
                              <div className="invalid-feedback">
                                {errors[`pair${index}empty`] || errors[`pair${index}second`]}
                              </div>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Valor de x (entero positivo):</Form.Label>
                  <Form.Control 
                    type="number" 
                    className={`form-control-sm ${errors.x ? 'is-invalid' : ''}`} 
                    value={x} 
                    onChange={handleXChange} 
                    min="1" 
                    step="1" 
                  />
                  {errors.x && <div className="invalid-feedback">{errors.x}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Valor de χ²ₐ (opcional):</Form.Label>
                  <Form.Control 
                    type="number" 
                    className={`form-control-sm ${errors.x2a ? 'is-invalid' : ''}`} 
                    value={x2a} 
                    onChange={handleX2aChange} 
                    step="any" 
                    min="0.01" 
                  />
                  {errors.x2a && <div className="invalid-feedback">{errors.x2a}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Button type="submit" variant="primary" className="w-100">
                Calcular
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal para mostrar resultados */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Resultados de la Prueba de Series</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && (
            <div>
              <h5 className="border-bottom pb-2">Datos ingresados:</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Número de pares (n):</strong> {result.pairs.length}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Valor de x:</strong> {result.x}</p>
                </Col>
              </Row>
              {result.x2a && (
                <p><strong>Valor de χ²ₐ:</strong> {result.x2a}</p>
              )}
              
              <h5 className="border-bottom pb-2 mt-3">Pares ingresados:</h5>
              <div className="table-responsive">
                <Table striped bordered hover size="sm" className="mb-3">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>u<sub>i</sub>.x</th>
                      <th>u<sub>i</sub>.y</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.pairs.map((pair, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{pair.first.toFixed(4)}</td>
                        <td>{pair.second.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              
              <h5 className="border-bottom pb-2">Resultados:</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Fe (esperado por celda):</strong> {result.fe.toFixed(3)}</p>
                </Col>
                <Col md={6}>
                  <p><strong>χ²:</strong> {result.chiCuadrado.toFixed(3)}</p>
                </Col>
              </Row>
              
              {result.x2a && (
                <Alert variant={result.chiCuadrado > result.x2a ? "danger" : "success"}>
                  <strong>Conclusión:</strong> {result.chiCuadrado > result.x2a ? `${result.chiCuadrado}>${result.x2a} Se rechaza H₀` : `${result.chiCuadrado}<${result.x2a} No se rechaza H₀`}
                </Alert>
              )}
              
              <h5 className="border-bottom pb-2 mt-3">Matriz de Frecuencias Observadas (Fo):</h5>
              <div className="table-responsive">
                <Table striped bordered hover size="sm">
                  <thead className="table-primary">
                    <tr>
                      <th>i\j</th>
                      {Array.from({ length: result.x }, (_, i) => (
                        <th key={i}>{i+1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.fo.map((row, i) => (
                      <tr key={i}>
                        <th>{i+1}</th>
                        {row.map((val, j) => (
                          <td key={j} className="text-center">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
