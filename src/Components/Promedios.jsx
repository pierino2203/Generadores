import React, { useState } from "react";

export default function Promedios(){
    const [sampleSize, setSampleSize] = useState(0);
    const [numbers, setNumbers] = useState([]);
    const [za, setZa] = useState("");
    const [errors, setErrors] = useState({});
    
    const handleSampleSizeChange = (e) => {
        const size = parseInt(e.target.value) || 0;
        setSampleSize(size);
        
        // Initialize or reset the numbers array based on the new size
        if (size > 0) {
            setNumbers(Array(size).fill(""));
        } else {
            setNumbers([]);
        }
        
        // Clear errors when sample size changes
        setErrors({});
    };
    
    const validateNumber = (value) => {
        if (value === "") return true;
        
        const num = parseFloat(value);
        return !isNaN(num);
    };
    
    const validateZa = (value) => {
        if (value === "") return true;
        
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
    };
    
    const handleNumberChange = (index, value) => {
        const newNumbers = [...numbers];
        newNumbers[index] = value;
        setNumbers(newNumbers);
        
        // Validate the input
        const newErrors = { ...errors };
        if (!validateNumber(value)) {
            newErrors[`number${index}`] = "El valor debe ser un número válido";
        } else {
            delete newErrors[`number${index}`];
        }
        setErrors(newErrors);
    };
    
    const handleZaChange = (e) => {
        const value = e.target.value;
        setZa(value);
        
        // Validate Za
        const newErrors = { ...errors };
        if (value !== "" && !validateZa(value)) {
            newErrors.za = "El valor de Za debe ser un número mayor que 0";
        } else {
            delete newErrors.za;
        }
        setErrors(newErrors);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all inputs before submission
        const newErrors = {};
        let hasErrors = false;
        
        // Check if all numbers are valid
        numbers.forEach((num, index) => {
            if (!validateNumber(num)) {
                newErrors[`number${index}`] = "El valor debe ser un número válido";
                hasErrors = true;
            }
        });
        
        // Check if Za is valid
        if (za !== "" && !validateZa(za)) {
            newErrors.za = "El valor de Za debe ser un número mayor que 0";
            hasErrors = true;
        }
        
        setErrors(newErrors);
        
        if (hasErrors) {
            return; // Don't proceed if there are errors
        }
        
        // Convert string values to numbers for processing
        const processedNumbers = numbers.map(num => num === "" ? 0 : parseFloat(num));
        const processedZa = za === "" ? 0 : parseFloat(za);
        
        // Calcular la suma de los elementos
        const suma = processedNumbers.reduce((total, current) => total + current, 0);
        const promedio = suma/sampleSize;
        console.log(promedio)
        console.log("Suma de los elementos:", suma);
        const Z0 = ((promedio -0.5)* Math.sqrt(sampleSize))/Math.sqrt(1/12)
        console.log(Z0)
        const Res = Math.abs(Z0)
        if(Res<processedZa){
            console.log(`${Res} < ${processedZa}, por lo tanto NO SE RECHAZA la hipotesis de que los numeros provienen de un universo uniformemente distribuido`)
        }else{
            console.log(`${Res} >= ${processedZa}, por lo tanto  SE RECHAZA la hipotesis de que los numeros provienen de un universo uniformemente distribuido`)
        }
        console.log("Sample size:", sampleSize);
        console.log("Numbers:", processedNumbers);
        console.log("Za:", processedZa);
    };
    
    return(
        <div className="container mt-4">
            <h1>Prueba de los Promedios</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h3>Ingrese tamaño de la muestra (n):</h3>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={sampleSize} 
                        onChange={handleSampleSizeChange}
                        min="1"
                    />
                </div>
                
                {sampleSize > 0 && (
                    <div className="mb-3">
                        <h3>Ingrese los {sampleSize} números:</h3>
                        <div className="row">
                            {Array.from({ length: sampleSize }).map((_, index) => (
                                <div className="col-md-3 mb-2" key={index}>
                                    <input 
                                        type="number" 
                                        className={`form-control ${errors[`number${index}`] ? 'is-invalid' : ''}`}
                                        placeholder={`Número ${index + 1}`}
                                        value={numbers[index] || ""}
                                        onChange={(e) => handleNumberChange(index, e.target.value)}
                                        step="0.01"
                                    />
                                    {errors[`number${index}`] && (
                                        <div className="invalid-feedback">{errors[`number${index}`]}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="mb-3">
                    <h3>Ingrese el valor de Za (mayor que 0):</h3>
                    <input 
                        type="number" 
                        className={`form-control ${errors.za ? 'is-invalid' : ''}`}
                        value={za} 
                        onChange={handleZaChange}
                        step="0.01"
                        min="0.01"
                    />
                    {errors.za && (
                        <div className="invalid-feedback">{errors.za}</div>
                    )}
                </div>
                
                <button type="submit" className="btn btn-primary">Calcular</button>
            </form>
        </div>
    );
}