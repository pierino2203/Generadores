import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, Form, Card, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ParteCentralCuadrado() {
    const [input, setInput] = useState({
        semilla: '',
        n: '',
        cantidad: ''
    })
    const [resultados, setResultados] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // Ocultar el mensaje de error cuando el usuario comienza a escribir
        if (showError) {
            setShowError(false)
        }
    }

    function obtenerCentrales(numero, n) {
        const str = numero.toString();
        const len = str.length;

        if (n > len) return null;

        const start = Math.floor((len - n) / 2);
        const end = start + parseInt(n); // asegurarse que sea entero

        return parseInt(str.substring(start, end)); // usamos substring que es más seguro en este caso
    }

    function handleSubmit(e) {
        e.preventDefault(e);

        // Validar que todos los campos estén completos
        if (!input.semilla || !input.n || !input.cantidad) {
            setErrorMessage('Por favor, ingrese todos los datos requeridos')
            setShowError(true)
            return
        }

        // Validar que los valores sean números positivos
        if (parseInt(input.semilla) <= 0 || parseInt(input.n) <= 0 || parseInt(input.cantidad) <= 0) {
            setErrorMessage('Todos los valores deben ser números positivos')
            setShowError(true)
            return
        }

        var resultadosArray = [];
        let semillaActual = parseInt(input.semilla);
        let cantidadRestante = parseInt(input.cantidad);
        let n = parseInt(input.n);

        while (cantidadRestante > 0) {
            var x = semillaActual ** 2;
            console.log(x)
            const digitos = x.toString().length
            if (digitos < n) {
                setErrorMessage('La cantidad de dígitos es menor que N, no se puede seguir calculando')
                setShowError(true)
                break;
            }
            if ((digitos - n) % 2 == 0) {
                const res = obtenerCentrales(x, n);

                resultadosArray.push({
                    x: x,
                    Ndigitos: digitos,
                    n: n,
                    paridad: "PAR",
                    semillaN: res,
                    u: Number((res / Math.pow(10, n)).toFixed(n))
                })
                semillaActual = res;
            } else {
                const res = obtenerCentrales(x * 10, n)
                resultadosArray.push({
                    x: x,
                    Ndigitos: digitos,
                    n: n,
                    paridad: "IMPAR",
                    semillaN: res,
                    u: Number((res / Math.pow(10, n)).toFixed(n))
                })
                semillaActual = res;
            }
            console.log(resultadosArray)
            cantidadRestante--;
        }

        if (resultadosArray.length > 0) {
            setResultados(resultadosArray);
            setShowModal(true);
            setInput({
                semilla: '',
                n: '',
                cantidad: ''
            })
        }
    }

    const handleClose = () => setShowModal(false);

    return (
        <Container className="mt-5 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '800px' }}>
            <h1 className="text-primary text-center mb-4">Parte Central del Cuadrado</h1>
            <h2 className="text-primary text-center mb-4 fs-4">Ingrese los datos</h2>

            {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible className="mb-4">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{errorMessage}</p>
                </Alert>
            )}

            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded">
                <Row className="mb-4 justify-content-center">
                    <Col md={4} className="mb-3">
                        <Form.Group className="text-center">
                            <Form.Label className="text-primary fw-bold">Ingrese la semilla (M):</Form.Label>
                            <Form.Control
                                type="number"
                                name="semilla"
                                value={input.semilla}
                                onChange={handleChange}
                                className="text-center"
                                placeholder="Semilla"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Form.Group className="text-center">
                            <Form.Label className="text-primary fw-bold">Números de dígitos (N):</Form.Label>
                            <Form.Control
                                type="number"
                                name="n"
                                value={input.n}
                                onChange={handleChange}
                                className="text-center"
                                placeholder="N dígitos"
                                required
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
                    <Modal.Title>Resultados - Parte Central del Cuadrado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                        {resultados.map((resultado, index) => (
                            <Card key={index} className="mb-2" style={{ width: '14rem' }}>
                                <Card.Header className="bg-primary text-white text-center py-2">
                                    Número {index + 1}
                                </Card.Header>
                                <Card.Body className="p-2">
                                    <Card.Text className="mb-1">
                                        <strong>X:</strong> {resultado.x}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>N dígitos:</strong> {resultado.Ndigitos}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>{resultado.Ndigitos}-{resultado.n}=:</strong> {resultado.Ndigitos - resultado.n}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>Paridad:</strong> {resultado.paridad}
                                    </Card.Text>
                                    {
                                        resultado.paridad === "IMPAR" ?
                                            <Card.Text className="mb-1">
                                                <strong>{resultado.x}*10=</strong> {resultado.x * 10}
                                            </Card.Text>
                                            : <Card.Text className="mb-1">
                                                <strong>{resultado.x}=</strong> {resultado.x}
                                            </Card.Text>
                                    }
                                    <Card.Text className="mb-1">
                                        <strong>Semilla N:</strong> {resultado.semillaN}
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>U:</strong> {resultado.u}
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
