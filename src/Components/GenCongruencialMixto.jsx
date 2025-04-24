import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, Form, Card, Alert } from 'react-bootstrap'

export default function GenCongruencialMixto() {
  const [input, setInput] = useState({
    n0: 0,
    a: 0,
    c: 0,
    m: 0,
    digitos: 0,
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
    let resultadosArray = []
    let nAnterior = input.n0
    let nuevaSemilla = 0
    let u = 0
    if (input.n0 > 0 || input.a > 0 || input.c > 0 || input.m > 0 || input.digitos > 0 || input.cantidad > 0) {
      while (input.cantidad > 0) {

        nuevaSemilla = ((input.a * nAnterior) + parseInt(input.c)) % input.m
        u = (nuevaSemilla / input.m)
        resultadosArray.push({
          a: input.a,
          m: input.m,
          c: input.c,
          n: parseInt(nAnterior),
          nuevaSemilla: nuevaSemilla,
          u: parseFloat(u.toString().slice(0, parseInt(input.digitos) + 2))
        })
        nAnterior = nuevaSemilla
        input.cantidad--;
      }
      if (resultadosArray.length > 0) {
        setResultados(resultadosArray)
        setShowModal(true);
        setInput({
          n0: 0,
          a: 0,
          c: 0,
          m: 0,
          digitos: 0,
          cantidad: 0
        })
      }
    } else {
      console.log("Ingrese todos los datos")
    }

  }
  return (
    <div>
      <Container className="mt-5 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '900px' }}>
        <h1 className="text-primary text-center mb-4">Generador Congruencial Mixto</h1>
        <h2 className="text-primary text-center mb-4 fs-4">Ingrese los datos</h2>
        <Form onSubmit={handleSubmit} className="bg-white p-4 rounded">
          <Row className="mb-4 justify-content-center">
            <Col md={4} className="mb-3">
              <Form.Group className="text-center">
                <Form.Label className="text-primary fw-bold">Semilla (n0):</Form.Label>
                <Form.Control
                  type="number"
                  name="n0"
                  value={input.n0}
                  onChange={handleChange}
                  className="text-center"
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group className="text-center">
                <Form.Label className="text-primary fw-bold">a(entero positivo):</Form.Label>
                <Form.Control
                  type="number"
                  name="a"
                  value={input.a}
                  onChange={handleChange}
                  className="text-center"
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group className="text-center">
                <Form.Label className="text-primary fw-bold">m(entero positivo):</Form.Label>
                <Form.Control
                  type="number"
                  name="m"
                  value={input.m}
                  onChange={handleChange}
                  className="text-center"
                  placeholder="m"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group className="text-center">
                <Form.Label className="text-primary fw-bold">c(Constante Aditiva):</Form.Label>
                <Form.Control
                  type="number"
                  name="c"
                  value={input.c}
                  onChange={handleChange}
                  className="text-center"
                  placeholder="Constante Aditiva"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group className="text-center">
                <Form.Label className="text-primary fw-bold">c(digitos de precision):</Form.Label>
                <Form.Control
                  type="number"
                  name="digitos"
                  value={input.digitos}
                  onChange={handleChange}
                  className="text-center"
                  placeholder="cantidad de digitos"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group className="text-center">
                <Form.Label className="text-primary fw-bold">Numeros a generar(u):</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad"
                  value={input.cantidad}
                  onChange={handleChange}
                  className="text-center"
                  placeholder="Numeros a generar(u)"
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
            <Modal.Title className='text-center'>Resultados - Generador Congruencial Mixto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {resultados.map((resultado, index) => (
                <Card key={index} className="mb-2" style={{ width: '15rem' }}>
                  <Card.Header className="bg-primary text-white text-center py-2">
                    i={index}
                  </Card.Header>
                  <Card.Body className="p-2">
                    <Card.Text className="mb-1">
                      <strong>n{index + 1}= </strong>(({resultado.a}*{resultado.n})+({resultado.c}))mod{resultado.m}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>n{index + 1}= </strong>({(resultado.a * resultado.n) + parseInt(resultado.c)})mod{resultado.m}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>n{index + 1}= </strong>{resultado.nuevaSemilla}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>u{index + 1}= </strong>{resultado.u}
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
    </div>
  )
}