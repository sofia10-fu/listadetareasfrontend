import axios from 'axios'
import type { DatosTarea, Tarea } from '../types/Tarea'

const BASE_URL = '/api/tareas'

export const obtenerTareas = async (): Promise<Tarea[]> => {
  const respuesta = await axios.get<Tarea[]>(BASE_URL)
  return respuesta.data
}

export const crearTarea = async (datos: DatosTarea): Promise<Tarea> => {
  const respuesta = await axios.post<Tarea>(BASE_URL, datos)
  return respuesta.data
}

export const actualizarTarea = async (
  id: string,
  datos: Partial<DatosTarea & Pick<Tarea, 'completada'>>,
): Promise<Tarea> => {
  const respuesta = await axios.put<Tarea>(`${BASE_URL}/${id}`, datos)
  return respuesta.data
}

export const completarTarea = async (id: string): Promise<Tarea> => {
  const respuesta = await axios.put<Tarea>(`${BASE_URL}/${id}/completar`)
  return respuesta.data
}

export const eliminarTarea = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`)
}
