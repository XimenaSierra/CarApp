import { useState, useEffect } from "react";
import { useCars } from "../context/CarContext";

const servicios = [
  "Cambio de aceite",
  "Revisión de frenos",
  "Alineación y balanceo",
  "Cambio de llantas",
  "Revisión general",
  "Revisión de suspensión",
  "Diagnóstico general",
  "Cambio de pastillas",
  "Cambio de filtros",
  "Revisión eléctrica",
];

const CarForm = ({ appointmentToEdit, onCancel }) => {
  const { addAppointment, editAppointment } = useCars();

  const [formData, setFormData] = useState({
    cliente: "",
    telefono: "",
    marca: "",
    modelo: "",
    año: "",
    servicio: "",
    fecha: "",
    hora: "",
    estado: "Pendiente",
  });

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData(appointmentToEdit);
    }
  }, [appointmentToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (appointmentToEdit) {
      await editAppointment(appointmentToEdit.id, formData);
    } else {
      await addAppointment(formData);
    }
    setFormData({
      cliente: "",
      telefono: "",
      marca: "",
      modelo: "",
      año: "",
      servicio: "",
      fecha: "",
      hora: "",
      estado: "Pendiente",
    });
    onCancel();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {appointmentToEdit ? "✏️ Editar Cita" : "📅 Nueva Cita"}
      </h2>
      <div style={styles.form}>
        {/* Datos del cliente */}
        <p style={styles.sectionTitle}>👤 Datos del cliente</p>
        <div style={styles.row}>
          <input
            style={styles.input}
            type="text"
            name="cliente"
            placeholder="Nombre del cliente"
            value={formData.cliente}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        {/* Datos del carro */}
        <p style={styles.sectionTitle}>🚗 Datos del vehículo</p>
        <div style={styles.row}>
          <input
            style={styles.input}
            type="text"
            name="marca"
            placeholder="Marca"
            value={formData.marca}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="number"
            name="año"
            placeholder="Año"
            value={formData.año}
            onChange={handleChange}
          />
        </div>

        {/* Datos de la cita */}
        <p style={styles.sectionTitle}>🔧 Datos de la cita</p>
        <div style={styles.row}>
          <select
            style={styles.input}
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            style={styles.input}
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
          />
        </div>

        {/* Estado */}
        <p style={styles.sectionTitle}>📋 Estado de la cita</p>
        <select
          style={styles.input}
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Completada">Completada</option>
          <option value="Cancelada">Cancelada</option>
        </select>

        {/* Botones */}
        <div style={styles.buttons}>
          <button style={styles.submitBtn} onClick={handleSubmit}>
            {appointmentToEdit ? "💾 Guardar cambios" : "➕ Agendar cita"}
          </button>
          <button style={styles.cancelBtn} onClick={onCancel}>
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1e1e2e",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "30px",
    border: "1px solid #313244",
  },
  title: {
    color: "#cdd6f4",
    marginBottom: "20px",
  },
  sectionTitle: {
    color: "#89b4fa",
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "8px",
    marginTop: "4px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "150px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #313244",
    backgroundColor: "#313244",
    color: "#cdd6f4",
    fontSize: "14px",
    outline: "none",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },
  submitBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#a6e3a1",
    color: "#1e1e2e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  cancelBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#f38ba8",
    color: "#1e1e2e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
};

export default CarForm;