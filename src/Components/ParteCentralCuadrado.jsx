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
            [e.target.name]: e.target.value
        })
    }
    function obtenerCentrales(numero, n) {
        const str = numero.toString();
        const len = str.length;
      
        if (n > len) return null;
      
        const start = Math.floor((len - n) / 2);
        const end = start + parseInt(n); // asegurarse que sea entero
      
        return str.substring(start, end); // usamos substring que es más seguro en este caso
      }
      
      
      
      
    function handleSubmit(e){
        e.preventDefault(e);
        if(input.semilla > 0 || input.n > 0|| input.cantidad>0 ){
             var resultados = [];
            while(input.cantidad > 0){
                var x = input.semilla**2;
                console.log(x);
                console.log(input.n)
                const digitos = x.toString().length
                console.log(digitos);
                if((digitos - input.n)%2==0){
                    const res =obtenerCentrales(x,input.n);
                    resultados.push(res);
                    input.semilla= res;
                    console.log(res);
                }else{
                    x=x*10;
                    const res = obtenerCentrales(x,input.n)
                    resultados.push(res);
                    input.semilla= res;
                }
                input.cantidad--;
            }
            console.log(resultados)
            setInput({        
                semilla: 0,
                n: 0,
                cantidad: 0}
            )
        }else{
            console.log("Ingrese los datos Requeridos")
        }
    }
    return (
        <div>
            <h1>Parte Central del Cuadrado</h1>
            <h2>Ingrese los datos</h2>
            <form action="" onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="">Ingrese la semilla (M):</label>
                <input type="number" name="semilla" value={input.semilla} onChange={handleChange}/>
                <label htmlFor="">Ingrese Numeros de digitos deseados (N):</label>
                <input type="number" name="n" value={input.n} onChange={handleChange}/>
                <label htmlFor="">Ingrese Numeros a generar (u):</label>
                <input type='number' name="cantidad" value={input.cantidad} onChange={handleChange}/>
                <button>Calcular</button>
            </form>
        </div>
    )
}
