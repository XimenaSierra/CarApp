
const appointments = require("../data/cars.data");

// Obtener todas las citas
const getAllAppointments = (req, res) => {
  res.json(appointments);
};

// Obtener una cita por ID
const getAppointmentById = (req, res) => {
  const appointment = appointments.find((a) => a.id === parseInt(req.params.id));
  if (!appointment) {
    return res.status(404).json({ message: "Cita no encontrada" });
  }
  res.json(appointment);
};

// Crear una nueva cita
const createAppointment = (req, res) => {
  const { cliente, telefono, marca, modelo, año, servicio, fecha, hora, estado } = req.body;
  const newAppointment = {
    id: appointments.length + 1,
    cliente,
    telefono,
    marca,
    modelo,
    año,
    servicio,
    fecha,
    hora,
    estado: estado || "Pendiente",
  };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
};

// Actualizar una cita
const updateAppointment = (req, res) => {
  const index = appointments.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Cita no encontrada" });
  }
  appointments[index] = { ...appointments[index], ...req.body };
  res.json(appointments[index]);
};

// Cancelar una cita
const cancelAppointment = (req, res) => {
  const index = appointments.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Cita no encontrada" });
  }
  appointments[index].estado = "Cancelada";
  res.json({ message: "Cita cancelada", appointment: appointments[index] });
};

// Eliminar una cita
const deleteAppointment = (req, res) => {
  const index = appointments.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Cita no encontrada" });
  }
  const deleted = appointments.splice(index, 1);
  res.json({ message: "Cita eliminada", appointment: deleted[0] });
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
};