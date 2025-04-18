import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <div className="container">
            <h1 className="color-white">Generacion de numeros pseudoaleatorios</h1>
            <h2>Elija el metodo de Generacion:</h2>
            <button><NavLink to={"/central"}>Parte Central Cuadrado</NavLink></button>
            <button><NavLink to={"/lehmer"}>Lehmer</NavLink></button>
            <button><NavLink to={"/multiplicativo"}>Congruencial Multiplicativo</NavLink></button>
            <button><NavLink to={"/mixto"}>Congruencial Mixto</NavLink></button>
            <button><NavLink to={"/aditivo"}>Congruencial Aditivo</NavLink></button>
        </div>
    )
}