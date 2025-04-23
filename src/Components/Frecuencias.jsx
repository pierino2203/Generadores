import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Frecuencias() {
    const [n, setN] = useState('')
    const [numeros, setNumeros] = useState([])
    const [x, setX] = useState('')
    const [x2a, setX2a] = useState('')
    const [intervalos, setIntervalos] = useState([])
    const [frecuencias, setFrecuencias] = useState([])

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
        console.log('Intervalos con frecuencias:', nuevasFrecuencias)
        console.log('Números:', numeros)
        console.log('Subintervalos:', x)
        console.log('X2a:', x2a)
        var Fe = parseInt(n)/parseInt(x)
        console.log(Fe)
        var sum = nuevasFrecuencias.map((e)=>  {
            var s = (e.frecuencia - Fe)**2
            return s
          })
        var X2 = (parseInt(x)/parseInt(n))*(sum.reduce((total, current) => total + current, 0))
        console.log(X2)
        const comp = parseFloat(x2a)
        if(X2 < comp){
          console.log(`${X2} < ${comp}, por lo tanto NO SE RECHAZA la hipotesis de que los numeros provienen de un universo uniformemente distribuido`)
        }else{
          console.log( `${X2} > ${comp}, por lo tanto SE RECHAZA la hipotesis de que los numeros provienen de un universo uniformemente distribuido`)
        }


    }

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Prueba de Frecuencias</h1>
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
                          
                                                        <Form.Group className="mb-3">
                                                          <Row>
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
                                        step="0.0001"
                                        required
                                    />
                                ))}
                                </Row>
                            </Form.Group>
                        )}

                        <Form.Group className="mb-4">
                            <Form.Label>Ingrese el número de subintervalos (x):</Form.Label>
                            <Form.Control
                                type="number"
                                value={x}
                                onChange={(e) => setX(e.target.value)}
                                min="1"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Ingrese X2a (entre 0 y 1):</Form.Label>
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

            {intervalos.length > 0 && (
                <Row className="justify-content-center mt-4">
                    <Col md={6}>
                        <h3 className="text-center mb-3">Intervalos y Frecuencias:</h3>
                        <div className="border p-3 rounded">
                            {intervalos.map((intervalo, index) => (
                                <div key={index} className="mb-2">
                                    Intervalo {index + 1}: ({intervalo.inicio} ; {intervalo.fin}) - Frecuencia: {intervalo.frecuencia}
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    )
}