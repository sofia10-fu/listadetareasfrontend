import { Container } from 'react-bootstrap'
import BarraNavegacion from './components/BarraNavegacion/BarraNavegacion'
import './App.css'

function App() {
  return (
    <>
      <BarraNavegacion />
      <main className="app-main">
        <Container className="py-5">
          <h1>Organiza tus tareas</h1>
          <p>Un espacio sencillo para tener presente lo que necesitas hacer.</p>
        </Container>
      </main>
    </>
  )
}

export default App
