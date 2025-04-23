import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, Modal, Table, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Frecuencias() {
    const [n, setN] = useState('')
    const [numeros, setNumeros] = useState([])
    const [x, setX] = useState('')
    const [x2a, setX2a] = useState('')
    const [intervalos, setIntervalos] = useState([])
    const [frecuencias, setFrecuencias] = useState([])
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
        // Calcular el tamaño de cada intervalo
        const tamanoIntervalo = 1 / parseInt(x)
        const nuevosIntervalos = []
        
        // Crear los intervalos
        for (let i = 0; i < parseInt(x); i++) {
            const inicio = i * tamanoIntervalo
            const fin = (i + 1) * tamanoIntervalo
            nuevosIntervalos.push({
                inicio: Number(inicio.toFixed(4)),
                fin: Number(fin.toFixed(4)),
                frecuencia: 0
            })
        }

        // Calcular frecuencias
        const numerosConvertidos = numeros.map(num => parseFloat(num))
        const nuevasFrecuencias = nuevosIntervalos.map(intervalo => {
            const frecuencia = numerosConvertidos.filter(num => 
                num >= intervalo.inicio && num < intervalo.fin
            ).length
            return {
                ...intervalo,
                frecuencia
            }
        })

        setIntervalos(nuevasFrecuencias)
        
        // Calcular estadístico chi-cuadrado
        const Fe = parseInt(n)/parseInt(x)
        const sum = nuevasFrecuencias.map((e) => {
            const s = (e.frecuencia - Fe)**2
            return s
        })
        const X2 = (parseInt(x)/parseInt(n))*(sum.reduce((total, current) => total + current, 0))
        const comp = parseFloat(x2a)
        
        // Determinar conclusión
        const conclusion = X2 < comp
            ? "No se rechaza la hipótesis de que los números están distribuidos uniformemente."
            : "Se rechaza la hipótesis de que los números están distribuidos uniformemente."

        // Guardar resultados para mostrar en el modal
        setResult({
            intervalos: nuevasFrecuencias,
            Fe,
            X2,
            x2a: comp,
            conclusion
        })
        
        // Mostrar el modal
        setShowModal(true)
    }

    return (
        <Container className="mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Prueba de Frecuencias</h2>
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
                                                    <Form.Control
                                                        type="number"
                                                        value={numero}
                                                        onChange={(e) => handleNumeroChange(index, e.target.value)}
                                                        min="0"
                                                        max="1"
                                                        step="0.0001"
                                                        required
                                                    />
                                                </Col>
                                            ))}
                                        </div>
                                    </Form.Group>
                                )}

                                <Form.Group className="mb-3">
                                    <Form.Label>Ingrese el número de subintervalos (x):</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={x}
                                        onChange={(e) => setX(e.target.value)}
                                        min="1"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Ingrese X²ₐ (entre 0 y 1):</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={x2a}
                                        onChange={(e) => setX2a(e.target.value)}
                                        min="0"
                                        max="1"
                                        step="0.0001"
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
                    <Modal.Title>Resultados de la Prueba de Frecuencias</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {result && (
                        <>
                            <h4>Datos de entrada:</h4>
                            <p>Número de datos (n): {n}</p>
                            <p>Número de subintervalos (x): {x}</p>
                            <p>Valor de X²ₐ: {x2a}</p>

                            <h4 className="mt-3">Números ingresados:</h4>
                            <Table striped bordered hover size="sm" className="mb-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Número</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {numeros.map((num, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{num}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <h4>Intervalos y Frecuencias:</h4>
                            <Table striped bordered hover size="sm" className="mb-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Intervalo</th>
                                        <th>Frecuencia Observada</th>
                                        <th>Frecuencia Esperada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.intervalos.map((intervalo, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>[{intervalo.inicio.toFixed(4)} ; {intervalo.fin.toFixed(4)})</td>
                                            <td>{intervalo.frecuencia}</td>
                                            <td>{result.Fe.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <h4>Resultados:</h4>
                            <p>Frecuencia Esperada (Fe): {result.Fe.toFixed(4)}</p>
                            <p>Estadístico X²: {result.X2.toFixed(4)}</p>
                            <p>Valor de X²ₐ: {result.x2a.toFixed(4)}</p>

                            <Alert variant={result.X2 < result.x2a ? "success" : "danger"} className="mt-3">
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