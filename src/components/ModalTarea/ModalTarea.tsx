import { Formik } from 'formik'
import { Button, Form, Modal } from 'react-bootstrap'
import * as Yup from 'yup'
import type { DatosTarea, Prioridad, Tarea } from '../../types/Tarea'
import './ModalTarea.css'

type ValoresFormulario = DatosTarea

type ModalTareaProps = {
  mostrar: boolean
  tarea: Tarea | null
  onOcultar: () => void
  onGuardar: (datos: ValoresFormulario) => Promise<void>
}

const esquemaValidacion = Yup.object({
  titulo: Yup.string().trim().required('Escribe el título de la tarea'),
  descripcion: Yup.string().trim().required('Escribe una descripción'),
  prioridad: Yup.string()
    .oneOf(['baja', 'media', 'alta'])
    .required('Selecciona una prioridad'),
  fechaLimite: Yup.string().required('Selecciona una fecha límite'),
})

const ModalTarea = ({ mostrar, tarea, onOcultar, onGuardar }: ModalTareaProps) => {
  const valoresIniciales: ValoresFormulario = {
    titulo: tarea?.titulo ?? '',
    descripcion: tarea?.descripcion ?? '',
    prioridad: tarea?.prioridad ?? ('media' as Prioridad),
    fechaLimite: tarea?.fechaLimite.slice(0, 10) ?? '',
  }

  return (
    <Modal show={mostrar} onHide={onOcultar} centered>
      <Formik
        initialValues={valoresIniciales}
        validationSchema={esquemaValidacion}
        enableReinitialize
        onSubmit={onGuardar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{tarea ? 'Editar tarea' : 'Nueva tarea'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="titulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  name="titulo"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(touched.titulo && errors.titulo)}
                  placeholder="Ej. Entregar el proyecto"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.titulo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={values.descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(touched.descripcion && errors.descripcion)}
                  placeholder="Agrega algunos detalles"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descripcion}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="row">
                <Form.Group className="col-sm-6 mb-3" controlId="prioridad">
                  <Form.Label>Prioridad</Form.Label>
                  <Form.Select
                    name="prioridad"
                    value={values.prioridad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(touched.prioridad && errors.prioridad)}
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.prioridad}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-sm-6 mb-3" controlId="fechaLimite">
                  <Form.Label>Fecha límite</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaLimite"
                    value={values.fechaLimite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(touched.fechaLimite && errors.fechaLimite)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fechaLimite}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={onOcultar}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar tarea'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ModalTarea
