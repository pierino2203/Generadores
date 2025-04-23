import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
export default function Home() {
    return (
        <div className="container">
            <div className="mb-2">
                <h1 className="color-white">Generacion de numeros pseudoaleatorios</h1>
                <h2>Elija el metodo de Generacion:</h2>
                <button type="button" class="btn"><NavLink to={"/central"}>Parte Central Cuadrado</NavLink></button>
                <button><NavLink to={"/lehmer"}>Lehmer</NavLink></button>
                <button><NavLink to={"/multiplicativo"}>Congruencial Multiplicativo</NavLink></button>
                <button><NavLink to={"/mixto"}>Congruencial Mixto</NavLink></button>
                <button><NavLink to={"/aditivo"}>Congruencial Aditivo</NavLink></button>
            </div>
            <div className="mt-5">
                <h1 className="color-white">Pruebas Estadisticas</h1>
                <h2>Elija el tipo de prueba</h2>
                <button><NavLink to={"/promedios"}>Prueba de Promedios</NavLink></button>
                <button><NavLink to={"/frecuencia"}>Prueba de Frecuencias</NavLink></button>
                <button><NavLink to={"/serie"}>Prueba de Series</NavLink></button>
                <button><NavLink to={"/ks"}>Prueba K-S</NavLink></button>
                <button><NavLink to={"/aditivo"}>Congruencial Aditivo</NavLink></button>
            </div>
        </div>
    )
}