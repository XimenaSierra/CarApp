import axios from "axios";

const API_URL = "http://localhost:3001/api/appointments";

// Obtener todas las citas
export const getAllAppointments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener una cita por ID
export const getAppointmentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear una nueva cita
export const createAppointment = async (appointment) => {
  const response = await axios.post(API_URL, appointment);
  return response.data;
};

// Actualizar una cita
export const updateAppointment = async (id, appointment) => {
  const response = await axios.put(`${API_URL}/${id}`, appointment);
  return response.data;
};

// Cancelar una cita
export const cancelAppointment = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/cancel`);
  return response.data;
};

// Eliminar una cita
export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};