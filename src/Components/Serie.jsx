import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
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

    pairs.forEach((pair, index) => {
      if (!validateNumber(pair.first)) {
        newErrors[`pair${index}first`] = "El valor debe ser un número entre 0 y 1";
        hasErrors = true;
      }
      if (!validateNumber(pair.second)) {
        newErrors[`pair${index}second`] = "El valor debe ser un número entre 0 y 1";
        hasErrors = true;
      }
    });

    if (x !== "" && !validateX(x)) {
      newErrors.x = "El valor de x debe ser un entero positivo";
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
      <h1>Prueba de Series</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Número de pares (n):</label>
          <input type="number" className="form-control" value={n} onChange={handleNChange} min="1" />
        </div>

        {n > 0 && (
          <div>
            <h5>Pares (x, y):</h5>
            {pairs.map((pair, index) => (
              <div className="row mb-2" key={index}>
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${errors[`pair${index}first`] ? 'is-invalid' : ''}`}
                    placeholder={`u${index + 1}.x`}
                    value={pair.first}
                    onChange={(e) => handlePairChange(index, 'first', e.target.value)}
                    step="any"
                    min="0"
                    max="1"
                  />
                  {errors[`pair${index}first`] && (
                    <div className="invalid-feedback">{errors[`pair${index}first`]}</div>
                  )}
                </div>
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${errors[`pair${index}second`] ? 'is-invalid' : ''}`}
                    placeholder={`u${index + 1}.y`}
                    value={pair.second}
                    onChange={(e) => handlePairChange(index, 'second', e.target.value)}
                    step="any"
                    min="0"
                    max="1"
                  />
                  {errors[`pair${index}second`] && (
                    <div className="invalid-feedback">{errors[`pair${index}second`]}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Valor de x (entero positivo):</label>
          <input type="number" className={`form-control ${errors.x ? 'is-invalid' : ''}`} value={x} onChange={handleXChange} min="1" step="1" />
          {errors.x && <div className="invalid-feedback">{errors.x}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Valor de χ²ₐ (opcional):</label>
          <input 
            type="number" 
            className={`form-control ${errors.x2a ? 'is-invalid' : ''}`} 
            value={x2a} 
            onChange={handleX2aChange} 
            step="any" 
            min="0.01" 
          />
          {errors.x2a && <div className="invalid-feedback">{errors.x2a}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Calcular</button>
      </form>

      {/* Modal para mostrar resultados */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resultados de la Prueba de Series</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && (
            <div>
              <h5>Datos ingresados:</h5>
              <p><strong>Número de pares (n):</strong> {result.pairs.length}</p>
              <p><strong>Valor de x:</strong> {result.x}</p>
              {result.x2a && <p><strong>Valor de χ²ₐ:</strong> {result.x2a}</p>}
              
              <h5 className="mt-3">Pares ingresados:</h5>
              <Table striped bordered hover size="sm">
                <thead>
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
              
              <h5 className="mt-3">Resultados:</h5>
              <p><strong>Fe (esperado por celda):</strong> {result.fe.toFixed(3)}</p>
              <p><strong>Chi-cuadrado (χ²):</strong> {result.chiCuadrado.toFixed(3)}</p>
              {result.x2a && (
                <p><strong>χ² crítico:</strong> {result.x2a} → {result.chiCuadrado > result.x2a ? "Se rechaza H₀" : "No se rechaza H₀"}</p>
              )}
              
              <h5 className="mt-3">Matriz de Frecuencias Observadas (Fo):</h5>
              <Table striped bordered hover size="sm">
                <tbody>
                  {result.fo.map((row, i) => (
                    <tr key={i}>
                      {row.map((val, j) => (
                        <td key={j} className="text-center">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
