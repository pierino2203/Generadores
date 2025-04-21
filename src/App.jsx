import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import ParteCentralCuadrado from './Components/ParteCentralCuadrado'
import GenMultiplicativo from './Components/GenMultiplicativo'
import GenCongruencialMixto from './Components/GenCongruencialMixto'
import GenAditivo from './Components/GenAditivo'
import './App.css'
import Lehmer from './Components/Lehmer'
import Promedios from './Components/Promedios'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lehmer" element={<Lehmer />} />
        <Route path="/central" element={<ParteCentralCuadrado />} />
        <Route path='/aditivo' element={<GenAditivo/>} />
        <Route path="/multiplicativo" element={<GenMultiplicativo />} />
        <Route path="/mixto" element={<GenCongruencialMixto />} />
        <Route path="/promedios" element={<Promedios/>}/>
      </Routes>
    </Router>
  )
}

export default App
