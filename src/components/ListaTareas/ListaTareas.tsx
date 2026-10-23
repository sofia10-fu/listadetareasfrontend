import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import {
  actualizarTarea,
  completarTarea,
  crearTarea,
  eliminarTarea,
  obtenerTareas,
} from '../../services/tareaService'
import type { DatosTarea, Tarea } from '../../types/Tarea'
import ModalTarea from '../ModalTarea/ModalTarea'
import TarjetaTarea from '../TarjetaTarea/TarjetaTarea'
import './ListaTareas.css'

const ListaTareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null)

  useEffect(() => {
    obtenerTareas()
      .then(setTareas)
      .catch(() =>
        setError('No se pudieron cargar las tareas. Comprueba que la API esté iniciada.'),
      )
      .finally(() => setCargando(false))
  }, [])

  const abrirNuevaTarea = () => {
    setTareaSeleccionada(null)
    setMostrarModal(true)
  }

  const guardarTarea = async (datos: DatosTarea) => {
    setError(null)
    try {
      if (tareaSeleccionada) {
        const actualizada = await actualizarTarea(tareaSeleccionada._id, datos)
        setTareas((anteriores) =>
          anteriores.map((tarea) => (tarea._id === actualizada._id ? actualizada : tarea)),
        )
      } else {
        const nueva = await crearTarea(datos)
        setTareas((anteriores) => [nueva, ...anteriores])
      }
      setMostrarModal(false)
      setTareaSeleccionada(null)
    } catch {
      setError('No se pudo guardar la tarea. Inténtalo de nuevo.')
    }
  }

  const cambiarEstado = async (tarea: Tarea) => {
    setError(null)
    try {
      const actualizada = tarea.completada
        ? await actualizarTarea(tarea._id, { completada: false })
        : await completarTarea(tarea._id)
      setTareas((anteriores) =>
        anteriores.map((elemento) =>
          elemento._id === actualizada._id ? actualizada : elemento,
        ),
      )
    } catch {
      setError('No se pudo actualizar el estado de la tarea.')
    }
  }

  const borrarTarea = async (tarea: Tarea) => {
    if (!window.confirm(`¿Quieres eliminar la tarea "${tarea.titulo}"?`)) return

    setError(null)
    try {
      await eliminarTarea(tarea._id)
      setTareas((anteriores) => anteriores.filter((elemento) => elemento._id !== tarea._id))
    } catch {
      setError('No se pudo eliminar la tarea.')
    }
  }

  const pendientes = tareas.filter((tarea) => !tarea.completada).length

  return (
    <section aria-labelledby="titulo-tareas">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h1 id="titulo-tareas" className="mb-1">Mis tareas</h1>
          <p className="text-secondary mb-0">
            {cargando
              ? 'Cargando tus tareas...'
              : error && tareas.length === 0
                ? 'Verifica la conexión con la API.'
                : tareas.length === 0
              ? 'Agrega una tarea para comenzar.'
              : `${pendientes} pendientes de ${tareas.length} tareas`}
          </p>
        </div>
        <Button variant="primary" onClick={abrirNuevaTarea}>
          <i className="bi bi-plus-lg me-2" aria-hidden="true" />
          Nueva tarea
        </Button>
      </div>

      {error && tareas.length > 0 && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {cargando ? (
        <div className="text-center py-5" role="status">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-secondary">Cargando tareas...</p>
        </div>
      ) : error ? (
        <Card className="tareas-vacio text-center">
          <Card.Body className="py-5">
            <i className="bi bi-cloud-slash tareas-vacio-icono" aria-hidden="true" />
            <h2 className="h5 mt-3">No se pudieron cargar las tareas</h2>
            <p className="text-secondary">Comprueba que la API esté iniciada e inténtalo otra vez.</p>
            <Button variant="outline-primary" onClick={() => window.location.reload()}>
              Volver a intentar
            </Button>
          </Card.Body>
        </Card>
      ) : tareas.length === 0 ? (
        <Card className="tareas-vacio text-center">
          <Card.Body className="py-5">
            <i className="bi bi-check2-square tareas-vacio-icono" aria-hidden="true" />
            <h2 className="h5 mt-3">Todavía no hay tareas</h2>
            <p className="text-secondary">Crea tu primera tarea para verla aquí.</p>
            <Button variant="outline-primary" onClick={abrirNuevaTarea}>
              Crear tarea
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-3">
          {tareas.map((tarea) => (
            <Col key={tarea._id} xs={12} md={6}>
              <TarjetaTarea
                tarea={tarea}
                onEditar={(seleccionada) => {
                  setTareaSeleccionada(seleccionada)
                  setMostrarModal(true)
                }}
                onCompletar={cambiarEstado}
                onEliminar={borrarTarea}
              />
            </Col>
          ))}
        </Row>
      )}

      <ModalTarea
        mostrar={mostrarModal}
        tarea={tareaSeleccionada}
        onOcultar={() => setMostrarModal(false)}
        onGuardar={guardarTarea}
      />
    </section>
  )
}

export default ListaTareas
