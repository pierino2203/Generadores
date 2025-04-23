import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, Modal, Table, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Ks() {
    const [n, setN] = useState('')
    const [numeros, setNumeros] = useState([])
    const [d, setD] = useState('')
    const [result, setResult] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => setShowModal(false)

    const handleNChange = (e) => {
        const value = parseInt(e.target.value)
        if (value > 0) {
            setN(value)
            // Inicializar array de números con el tamaño especificado
            setNumeros(new Array(value).fill(''))
        } else {
            setN('')
            setNumeros([])
        }
    }

    const handleNumeroChange = (index, value) => {
        const newNumeros = [...numeros]
        newNumeros[index] = value
        setNumeros(newNumeros)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Calcular la prueba K-S
        const numerosSort = numeros.map(num => parseFloat(num)).sort((a, b) => a - b)
        const frecuenciaA = []
        const resultado = []
        
        // Calcular frecuencias acumuladas teóricas
        for (let i = 1; i <= parseInt(n); i++) {
            frecuenciaA.push(i / parseInt(n))
        }
        
        // Calcular diferencias
        for (let i = 0; i < frecuenciaA.length; i++) {
            resultado.push(frecuenciaA[i] - numerosSort[i])
        }
        
        // Encontrar el máximo valor absoluto
        const res = Math.max(...resultado)
        
        // Determinar conclusión
        const conclusion = res < parseFloat(d)
            ? "No se rechaza la hipótesis de que los números están distribuidos uniformemente."
            : "Se rechaza la hipótesis de que los números están distribuidos uniformemente."
        
        // Guardar resultados para mostrar en el modal
        setResult({
            numeros: numerosSort,
            frecuenciaA,
            resultado,
            maxDiferencia: res,
            d: parseFloat(d),
            conclusion
        })
        
        // Mostrar el modal
        setShowModal(true)
    }

    return (
        <Container className="mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Prueba K-S</h2>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ingrese el número de datos (n):</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={n}
                                        onChange={handleNChange}
                                        min="1"
                                        required
                                    />
                                </Form.Group>

                                {n > 0 && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ingrese los {n} números (entre 0 y 1):</Form.Label>
                                        <div className="row">
                                            {numeros.map((numero, index) => (
                                                <Col md={4} key={index} className="mb-2">
                                                    <Form.Label>u{index+1}</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={numero}
                                                        onChange={(e) => handleNumeroChange(index, e.target.value)}
                                                        min="0"
                                                        max="1"
                                                        step="any"
                                                        required
                                                    />
                                                </Col>
                                            ))}
                                        </div>
                                    </Form.Group>
                                )}

                                <Form.Group className="mb-3">
                                    <Form.Label>Ingrese el estadístico D (entre 0 y 1):</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={d}
                                        onChange={(e) => setD(e.target.value)}
                                        min="0"
                                        max="1"
                                        step="any"
                                        required
                                    />
                                </Form.Group>

                                <div className="text-center">
                                    <Button variant="primary" type="submit" size="lg">
                                        Calcular
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

            {/* Modal para mostrar resultados */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Resultados de la Prueba K-S</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {result && (
                        <>
                            <h4>Datos de entrada:</h4>
                            <p>Número de datos (n): {n}</p>
                            <p>Estadístico D: {d}</p>

                            <h4 className="mt-3">Números ordenados:</h4>
                            <Table striped bordered hover size="sm" className="mb-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Número</th>
                                        <th>Frecuencia Acumulada Teórica</th>
                                        <th>Diferencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.numeros.map((num, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{num.toFixed(4)}</td>
                                            <td>{result.frecuenciaA[index].toFixed(4)}</td>
                                            <td>{result.resultado[index].toFixed(4)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <h4>Resultados:</h4>
                            <p>Máxima diferencia (D): {result.maxDiferencia.toFixed(4)}</p>
                            <p>Estadístico D crítico: {result.d.toFixed(4)}</p>

                            <Alert variant={result.maxDiferencia < result.d ? "success" : "danger"} className="mt-3">
                                <strong>Conclusión:</strong> {result.conclusion}
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
    )
}