import { Badge, Button, Card } from 'react-bootstrap'
import type { Tarea } from '../../types/Tarea'
import './TarjetaTarea.css'

type TarjetaTareaProps = {
  tarea: Tarea
  onEditar: (tarea: Tarea) => void
  onCompletar: (tarea: Tarea) => void
  onEliminar: (tarea: Tarea) => void
}

const coloresPrioridad = {
  baja: 'success',
  media: 'warning',
  alta: 'danger',
} as const

const TarjetaTarea = ({
  tarea,
  onEditar,
  onCompletar,
  onEliminar,
}: TarjetaTareaProps) => {
  const fecha = new Date(`${tarea.fechaLimite.slice(0, 10)}T00:00:00`)
  const fechaFormateada = new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(fecha)

  return (
    <Card className={`tarea-card h-100 ${tarea.completada ? 'tarea-card-completada' : ''}`}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
          <Card.Title className="tarea-card-titulo mb-0">{tarea.titulo}</Card.Title>
          <Badge bg={coloresPrioridad[tarea.prioridad]} className="text-capitalize">
            {tarea.prioridad}
          </Badge>
        </div>
        <Card.Text className="text-secondary flex-grow-1">
          {tarea.descripcion}
        </Card.Text>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
          <span className="tarea-fecha text-secondary">
            <i className="bi bi-calendar3 me-2" aria-hidden="true" />
            {fechaFormateada}
          </span>
          <div className="d-flex gap-2">
            <Button
              variant={tarea.completada ? 'outline-success' : 'success'}
              size="sm"
              onClick={() => onCompletar(tarea)}
              aria-label={tarea.completada ? 'Marcar pendiente' : 'Completar tarea'}
              title={tarea.completada ? 'Marcar pendiente' : 'Completar tarea'}
            >
              <i
                className={`bi ${tarea.completada ? 'bi-arrow-counterclockwise' : 'bi-check-lg'}`}
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEditar(tarea)}
              aria-label={`Editar ${tarea.titulo}`}
              title="Editar tarea"
            >
              <i className="bi bi-pencil" aria-hidden="true" />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onEliminar(tarea)}
              aria-label={`Eliminar ${tarea.titulo}`}
              title="Eliminar tarea"
            >
              <i className="bi bi-trash" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <Badge bg={tarea.completada ? 'success' : 'secondary'}>
            {tarea.completada ? 'Completada' : 'Pendiente'}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TarjetaTarea
