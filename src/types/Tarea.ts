export type Prioridad = 'baja' | 'media' | 'alta'

export type Tarea = {
  _id: string
  titulo: string
  descripcion: string
  completada: boolean
  prioridad: Prioridad
  fechaLimite: string
}

export type DatosTarea = Omit<Tarea, '_id' | 'completada'>
