import React, { useState } from 'react'


export default function ParteCentralCuadrado() {
    const [input, setInput] = useState({
        semilla: 0,
        n: 0,
        cantidad: 0
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
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
        if (input.semilla > 0 || input.n > 0 || input.cantidad > 0) {
            var resultados = [];
            while (input.cantidad > 0) {
                var x = input.semilla ** 2;
                const digitos = x.toString().length
                if (digitos < input.n) {
                    console.log("La cantidad de digitos en mayor que n, no se puede seguir calculando")
                    break;
                }
                if ((digitos - input.n) % 2 == 0) {
                    const res = obtenerCentrales(x, input.n);

                    resultados.push({
                        x: x,
                        Ndigitos: digitos,
                        paridad: "PAR",
                        semillaN: res,
                        u: Number((res / Math.pow(10, input.n)).toFixed(input.n))
                    })
                    input.semilla = res;
                } else {
                    x = x * 10
                    const res = obtenerCentrales(x, input.n)
                    resultados.push({
                        x: x,
                        Ndigitos: digitos,
                        paridad: "IMPAR",
                        semillaN: res,
                        u: Number((res / Math.pow(10, input.n)).toFixed(input.n))
                    })
                    input.semilla = res;
                }
                input.cantidad--;
            }
            console.log(resultados)
            setInput({
                semilla: 0,
                n: 0,
                cantidad: 0
            }
            )
        } else {
            console.log("Ingrese los datos Requeridos")
        }
    }
    return (
        <div className='container'>

            <h1>Parte Central del Cuadrado</h1>
            <h2>Ingrese los datos</h2>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <label htmlFor="">Ingrese la semilla (M):</label>
                    <div className="col">
                        <input type="number" name="semilla" value={input.semilla} onChange={handleChange} />
                    </div>
                    <label htmlFor="">Ingrese Numeros de digitos deseados (N):</label>
                    <div className="col">
                        <input type="number" name="n" value={input.n} onChange={handleChange} />
                    </div>
                    <label htmlFor="">Ingrese Numeros a generar (u):</label>
                    <div className="col">
                        <input type='number' name="cantidad" value={input.cantidad} onChange={handleChange} />
                    </div>
                    
                </div>
                <button className='bg-primary'>Calcular</button>
            </form>
        </div>
    )
}
