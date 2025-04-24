import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, Form, Card, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Lehmer() {
    const [input, setInput] = useState({
        n: 0,
        t: 0,
        cantidad: 0
    })
    const [resultados, setResultados] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false)
    const handleClose = () => setShowModal(false);
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (input.n > 0 && input.t > 0 && input.cantidad > 0) {
            let resultadosArray = []
            let num = input.n
            let nuevoNumero = 0
            let numero1 = 0
            let numero2 = 0
            let nuevaSemilla = 0


            while (input.cantidad > 0) {
                const k = input.t.toString().length
                nuevoNumero = num * input.t
                numero1 = nuevoNumero.toString().slice(0, k)
                numero2 = nuevoNumero.toString().slice(k)
                nuevaSemilla = parseInt(numero2) - parseInt(numero1)
                resultadosArray.push({
                    n: parseInt(num),
                    t: parseInt(input.t),
                    k: parseInt(k),
                    numero1: parseInt(numero1),
                    numero2: parseInt(numero2),
                    nuevaSemilla: parseInt(nuevaSemilla),
                    u: nuevaSemilla / Math.pow(10, nuevaSemilla.toString().length)

                })
                num = nuevaSemilla
                input.cantidad--
            }
            console.log(resultadosArray)
            if (resultadosArray.length > 0) {
                setResultados(resultadosArray)
                setShowModal(true);
                setInput({
                    n: 0,
                    t: 0,
                    cantidad: 0
                })
            }
        } else {
            console.log("Ingrese todos los datos requeridos")
        }
    }


    return (
        <Container className="mt-5 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '800px' }}>
            <h1 className="text-primary text-center mb-4">Generador Lehmer</h1>
            <h2 className="text-primary text-center mb-4 fs-4">Ingrese los datos</h2>
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded">
                <Row className="mb-4 justify-content-center">
                    <Col md={4} className="mb-3">
                        <Form.Group className="text-center">
                            <Form.Label className="text-primary fw-bold">Semilla (n):</Form.Label>
                            <Form.Control
                                type="number"
                                name="n"
                                value={input.n}
                                onChange={handleChange}
                                className="text-center"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Form.Group className="text-center">
                            <Form.Label className="text-primary fw-bold">Igresar t (t menor que n):</Form.Label>
                            <Form.Control
                                type="number"
                                name="t"
                                value={input.t}
                                onChange={handleChange}
                                className="text-center"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Form.Group className="text-center">
                            <Form.Label className="text-primary fw-bold">Números a generar (u):</Form.Label>
                            <Form.Control
                                type="number"
                                name="cantidad"
                                value={input.cantidad}
                                onChange={handleChange}
                                className="text-center"
                                placeholder="Cantidad"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="px-4"
                    >
                        Calcular
                    </Button>
                </div>
            </Form>
            <Modal show={showModal} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Resultados - Lehmer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                        {resultados.map((resultado, index) => (
                            <Card key={index} className="mb-2" style={{ width: '25rem' }}>
                                <Card.Header className="bg-primary text-white text-center py-2">
                                    Número {index + 1}
                                </Card.Header>
                                <Card.Body className="p-2">
                                    <Card.Text className="mb-1">
                                        <strong>n{index}=</strong>{resultado.n}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>t=</strong>{resultado.t}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>n{index}*k=</strong>{resultado.n}*{resultado.k}={resultado.n*resultado.t}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>Separamos n{index}*t, k={resultados.k} digitos de la izq=</strong> {resultado.numero1}----{resultado.numero2}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>n{index+1}=</strong>{resultado.numero2}-{resultado.numero1}={resultado.nuevaSemilla}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>u{index+1}=</strong> {resultado.u}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}