import React from "react";

export default function Home() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="mb-4">Generación de números pseudoaleatorios</h1>
                    <h2 className="mb-4">Elija el método de Generación:</h2>
                    <div className="d-grid gap-3 col-6 mx-auto">
                        <button className="btn btn-primary">Lineal</button>
                        <button className="btn btn-primary">Cuadrático</button>
                        <button className="btn btn-primary">Multiplicativo</button>
                        <button className="btn btn-primary">Congruencial Mixto</button>
                    </div>
                </div>
            </div>
        </div>
    )
} 