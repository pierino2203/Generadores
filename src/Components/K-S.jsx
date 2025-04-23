import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Frecuencias from './Frecuencias'

export default function Ks() {
    const [n, setN] = useState('')
    const [numeros, setNumeros] = useState([])
    const [d, setD] = useState('')

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
        // Aquí irá la lógica para calcular la prueba K-S
        const numerosSort = numeros.sort();
        const frecuenciaA = []
        const resultado = []
        for (var i = 1; i <= parseInt(n); i++) {
            frecuenciaA.push(i / parseInt(n))
        }
        for (var i = 0; i < frecuenciaA.length; i++) {
            resultado.push(frecuenciaA[i] - numerosSort[i])
        }
        const res = Math.max(...resultado)
        console.log(resultado)
        console.log(frecuenciaA)
        console.log("Numero max:", Math.max(...resultado))
        console.log('Números:', numeros.sort())
        console.log('Estadístico D:', d)
        if (res < parseFloat(d)) {
            console.log(`${res} < ${d}, por lo tanto NO SE RECHAZA la hipotesis de que los numeros provienen de un universo uniformemente distribuido`)
        } else {
            console.log(`${res} < ${d}, por lo tanto SE RECHAZA la hipotesis de que los numeros provienen de un universo uniformemente distribuido`)
        }

    }

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Prueba K-S</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group className="mb-4">
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
                            <Form.Group className="mb-4">
                                <Form.Label>Ingrese los {n} números (entre 0 y 1):</Form.Label>
                                {numeros.map((numero, index) => (
                                    <Form.Control
                                        key={index}
                                        type="number"
                                        value={numero}
                                        onChange={(e) => handleNumeroChange(index, e.target.value)}
                                        className="mb-2"
                                        min="0"
                                        max="1"
                                        step="any"
                                        required
                                    />
                                ))}
                            </Form.Group>
                        )}

                        <Form.Group className="mb-4">
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
        </Container>
    )
}