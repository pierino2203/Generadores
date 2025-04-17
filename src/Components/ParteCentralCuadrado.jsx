import React, { useState } from 'react'


export default function ParteCentralCuadrado() {
    const [input,setInput] = useState({
        semilla: 0,
        n: 0,
        cantidad: 0
    })
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.value]: e.target.value
        })
    }
    return (
        <div>
            <h1>Parte Central del Cuadrado</h1>
            <h2>Ingrese los datos</h2>
            <form action="">
                <label htmlFor="">Ingrese la semilla (M):</label>
                <input type="numer" name="" id=""  value={input.semilla}/>
                <label htmlFor="">Ingrese Numeros de digitos deseados (N):</label>
                <input type="number" value={input.n} />
                <label htmlFor="">Ingrese Numeros a generar (u):</label>
                <input type='number' value={input.cantidad}/>
            </form>
        </div>
    )
}
