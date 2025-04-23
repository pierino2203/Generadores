import React, { useState } from "react";
import { Container, Form, Button, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Corrida() {
  const [n, setN] = useState("");
  const [values, setValues] = useState([]);
  const [xa, setXa] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setN(value);
      setValues(new Array(value).fill(""));
      setResult(null);
    }
  };

  const handleValueChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleXaChange = (e) => {
    setXa(e.target.value);
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
    const numeros = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
    if (numeros.length !== parseInt(n)) return;

    const binaria = numeros.map(v => (v > 0.5 ? 1 : 0));
    const fo = obtenerFrecuenciasDeRachas(binaria);
    const { chi2, fePorLongitud } = calcularChiCuadrado(fo, numeros.length);

    setResult({ binaria, fo, fePorLongitud, chi2 });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Prueba de corrida (arriba y abajo de la media)</h1>

      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Ingrese un número entero positivo (n):</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={n}
            onChange={handleNChange}
          />
        </Form.Group>

        {n > 0 && (
          <div className="mb-3">
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
                    />
                  </Form.Group>
                </div>
              ))}
            </div>
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Ingrese un valor crítico χ²ₐ:</Form.Label>
          <Form.Control
            type="number"
            min="0"
            step="any"
            value={xa}
            onChange={handleXaChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={compareValues}>
          Calcular
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resultados de la Prueba de Corrida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && (
            <>
              <Table striped bordered>
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
              <p><strong>Secuencia binaria:</strong> {result.binaria.join(" ")}</p>
              <p><strong>Estadístico χ²:</strong> {result.chi2.toFixed(4)}</p>
              {xa && (
                <p>
                  <strong>χ² crítico (Xa):</strong> {xa} → {result.chi2 < parseFloat(xa)
                    ? "No se rechaza H₀ (distribución aleatoria)"
                    : "Se rechaza H₀ (no aleatoria)"}
                </p>
              )}
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
