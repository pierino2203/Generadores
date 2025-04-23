import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (
        <Container className="mt-4">
            <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary text-white">
                    <h2 className="mb-0">Generación de Números Pseudoaleatorios</h2>
                </Card.Header>
                <Card.Body>
                    <h3 className="mb-3">Elija el método de Generación:</h3>
                    <div className="home-buttons">
                        <Button as={NavLink} to="/central" variant="primary" className="mb-2">
                            Parte Central Cuadrado
                        </Button>
                        <Button as={NavLink} to="/lehmer" variant="primary" className="mb-2">
                            Lehmer
                        </Button>
                        <Button as={NavLink} to="/multiplicativo" variant="primary" className="mb-2">
                            Congruencial Multiplicativo
                        </Button>
                        <Button as={NavLink} to="/mixto" variant="primary" className="mb-2">
                            Congruencial Mixto
                        </Button>
                        <Button as={NavLink} to="/aditivo" variant="primary" className="mb-2">
                            Congruencial Aditivo
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h2 className="mb-0">Pruebas Estadísticas</h2>
                </Card.Header>
                <Card.Body>
                    <h3 className="mb-3">Elija el tipo de prueba</h3>
                    <div className="home-buttons">
                        <Button as={NavLink} to="/promedios" variant="primary" className="mb-2">
                            Prueba de Promedios
                        </Button>
                        <Button as={NavLink} to="/frecuencia" variant="primary" className="mb-2">
                            Prueba de Frecuencias
                        </Button>
                        <Button as={NavLink} to="/serie" variant="primary" className="mb-2">
                            Prueba de Series
                        </Button>
                        <Button as={NavLink} to="/ks" variant="primary" className="mb-2">
                            Prueba K-S
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}