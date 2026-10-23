import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './PaginaInicio.css'
import './PaginaInicio.css'

const PaginaInicio = () => {
  return (
    <Container className="inicio-container py-5">
      <Row className="align-items-center g-5">
        <Col lg={7}>
          <span className="inicio-etiqueta">ORGANIZA TU DÍA</span>
          <h1 className="inicio-titulo mt-3">Una tarea a la vez.</h1>
          <p className="inicio-descripcion">
            Anota lo que tienes pendiente, elige una prioridad y marca cada tarea
            cuando la termines.
          </p>
          <Link to="/tareas" className="btn btn-primary btn-lg">
            Ir a mis tareas
            <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
          </Link>
        </Col>
        <Col lg={5}>
          <div className="inicio-ilustracion" aria-hidden="true">
            <div className="inicio-hoja">
              <div className="inicio-hoja-cabecera">
                <i className="bi bi-check2-square" />
                <span>Mi lista</span>
              </div>
              <div className="inicio-linea inicio-linea-lista">
                <i className="bi bi-check-circle-fill" />
                <span />
              </div>
              <div className="inicio-linea inicio-linea-lista">
                <i className="bi bi-circle" />
                <span />
              </div>
              <div className="inicio-linea inicio-linea-lista">
                <i className="bi bi-circle" />
                <span />
              </div>
              <div className="inicio-hoja-nota">
                <i className="bi bi-calendar3 me-2" />
                Fecha límite
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PaginaInicio
