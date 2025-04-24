import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

export default function Aditivo() {
  const [numSemillas, setNumSemillas] = useState();
  const [semillas, setSemillas] = useState([]);
  const [m, setM] = useState();
  const [cantidad, setCantidad] = useState(0);
  const [resultado, setResultado] = useState([]);
  const [k, setK] = useState(null);

  const handleNumSemillasChange = (e) => {
    const n = parseInt(e.target.value);
    if (!isNaN(n) && n > 0) {
      setNumSemillas(n);
      setSemillas(Array(n).fill({ index: "", value: "" }));
      setResultado([]);
      setK(null);
    }
  };

  const handleSeedChange = (i, field, val) => {
    const updated = [...semillas];
    updated[i] = { ...updated[i], [field]: val };
    setSemillas(updated);
  };

  const generar = () => {
    const parsed = semillas
      .map((s) => ({
        index: parseInt(s.index),
        value: parseInt(s.value)
      }))
      .sort((a, b) => a.index - b.index);

    if (parsed.length < 2 || parsed.some(s => isNaN(s.index) || isNaN(s.value) || s.value < 0)) {
      alert("Verifica que todos los subíndices sean enteros y los valores sean enteros positivos.");
      return;
    }

    const indices = parsed.map(s => s.index);
    const valores = parsed.map(s => s.value);
    const todos = [...valores];

    // Calcular k automáticamente
    const kCalculado = Math.abs(Math.min(...indices));
    setK(kCalculado);

    const resultadoGenerado = [];

    for (let i = 0; i < cantidad; i++) {
      const a = todos.length - 1;
      const b = a - kCalculado;

      if (b < 0) {
        alert("No hay suficientes semillas para aplicar el método con el k calculado.");
        return;
      }

      const nuevo = (todos[a] + todos[b]) % m;
      todos.push(nuevo);

      resultadoGenerado.push({
        ni: nuevo,
        ui: (nuevo / m).toFixed(5),
        formula: `(${todos[a]} + ${todos[b]}) mod ${m}`
      });
    }

    setResultado(resultadoGenerado);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Generador Congruencial Aditivo</h1>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Cantidad de semillas:</Form.Label>
          <Form.Control
            type="number"
            min="2"
            value={numSemillas}
            onChange={handleNumSemillasChange}
          />
        </Form.Group>

        {semillas.map((semilla, i) => (
          <div className="row mb-2" key={i}>
            <div className="col-md-4">
              <Form.Control
                type="number"
                placeholder={`Subíndice (ej. -3, -1, 0)`}
                value={semilla.index}
                onChange={(e) => handleSeedChange(i, "index", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <Form.Control
                type="number"
                min="0"
                placeholder="Valor entero positivo"
                value={semilla.value}
                onChange={(e) => handleSeedChange(i, "value", e.target.value)}
              />
            </div>
          </div>
        ))}

        <Form.Group className="mb-3">
          <Form.Label>Valor del módulo m:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={m}
            onChange={(e) => setM(parseInt(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cantidad de números a generar:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
        </Form.Group>

        <Button onClick={generar}>Generar</Button>
      </Form>

      {resultado.length > 0 && (
        <div className="mt-4">
          <h4>Resultados:</h4>
          <p><strong>k calculado automáticamente:</strong> {k}</p>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>nᵢ</th>
                <th>uᵢ = nᵢ / m</th>
                <th>Fórmula aplicada</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((r, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{r.ni}</td>
                  <td>{r.ui}</td>
                  <td>{r.formula}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
