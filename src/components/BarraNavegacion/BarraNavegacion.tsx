import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './BarraNavegacion.css'

const BarraNavegacion = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mis tareas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-tareas" />
        <Navbar.Collapse id="navbar-tareas">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/tareas">
              Tareas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BarraNavegacion
