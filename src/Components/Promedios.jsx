import React, { useState } from "react";
import { Container, Form, Button, Modal, Table, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Promedios() {
    const [n, setN] = useState("");
    const [za, setZa] = useState("");
    const [numbers, setNumbers] = useState("");
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convertir la cadena de números en un array
        const numberArray = numbers.split(',').map(num => parseFloat(num.trim()));
        
        // Calcular el promedio
        const promedio = numberArray.reduce((a, b) => a + b, 0) / numberArray.length;
        
        // Calcular Z0
        const z0 = (promedio - 0.5) / (1 / Math.sqrt(12 * numberArray.length));
        
        // Comparar |Z0| con Za
        const conclusion = Math.abs(z0) <= parseFloat(za) 
            ? "No se rechaza la hipótesis de que los números están distribuidos uniformemente."
            : "Se rechaza la hipótesis de que los números están distribuidos uniformemente.";

        setResult({
            numbers: numberArray,
            promedio,
            z0,
            conclusion
        });
        setShowModal(true);
    };

    return (
        <Container className="mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Prueba de Promedios</h2>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tamaño de la muestra (n):</Form.Label>
                            <Form.Control
                                type="number"
                                value={n}
                                onChange={(e) => setN(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor de Za:</Form.Label>
                            <Form.Control
                                type="number"
                                value={za}
                                onChange={(e) => setZa(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Números (separados por comas):</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={numbers}
                                onChange={(e) => setNumbers(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary">Calcular</Button>
                    </Form>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Resultados de la Prueba de Promedios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {result && (
                        <>
                            <h4>Datos de entrada:</h4>
                            <p>Tamaño de la muestra (n): {n}</p>
                            <p>Valor de Za: {za}</p>

                            <h4>Números ingresados:</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Número</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.numbers.map((num, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{num}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <h4>Resultados:</h4>
                            <p>Promedio: {result.promedio.toFixed(4)}</p>
                            <p>Z0: {result.z0.toFixed(4)}</p>

                            <Alert variant={Math.abs(result.z0) <= parseFloat(za) ? "success" : "danger"}>
                                {result.conclusion}
                            </Alert>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}