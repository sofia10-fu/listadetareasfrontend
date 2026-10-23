import { Route, Routes } from 'react-router-dom'
import BarraNavegacion from './components/BarraNavegacion/BarraNavegacion'
import PaginaInicio from './pages/PaginaInicio/PaginaInicio'
import PaginaTareas from './pages/PaginaTareas/PaginaTareas'
import './App.css'

function App() {
  return (
    <>
      <BarraNavegacion />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/tareas" element={<PaginaTareas />} />
        </Routes>
      </main>
    </>
  )
}

export default App
