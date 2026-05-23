import { useCars } from "../context/CarContext";

const estadoColores = {
  Pendiente: { bg: "#fab387", text: "#1e1e2e" },
  "En proceso": { bg: "#89b4fa", text: "#1e1e2e" },
  Completada: { bg: "#a6e3a1", text: "#1e1e2e" },
  Cancelada: { bg: "#f38ba8", text: "#1e1e2e" },
};

const CarCard = ({ appointment, onEdit }) => {
  const { cancelAppointmentById, removeAppointment } = useCars();
  const colorEstado = estadoColores[appointment.estado] || estadoColores.Pendiente;

  return (
    <div style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <div>
          <h3 style={styles.cliente}>{appointment.cliente}</h3>
          <p style={styles.telefono}>📞 {appointment.telefono}</p>
        </div>
        <span style={{ ...styles.estado, backgroundColor: colorEstado.bg, color: colorEstado.text }}>
          {appointment.estado}
        </span>
      </div>

      {/* Info del carro */}
      <div style={styles.section}>
        <p style={styles.info}>🚗 <strong>{appointment.marca} {appointment.modelo}</strong> — {appointment.año}</p>
      </div>

      {/* Info de la cita */}
      <div style={styles.section}>
        <p style={styles.info}>🔧 <strong>Servicio:</strong> {appointment.servicio}</p>
        <p style={styles.info}>📅 <strong>Fecha:</strong> {appointment.fecha}</p>
        <p style={styles.info}>🕐 <strong>Hora:</strong> {appointment.hora}</p>
      </div>

      {/* Acciones */}
      <div style={styles.actions}>
        <button style={styles.editBtn} onClick={() => onEdit(appointment)}>
          ✏️ Editar
        </button>
        <button
          style={styles.cancelBtn}
          onClick={() => cancelAppointmentById(appointment.id)}
          disabled={appointment.estado === "Cancelada"}
        >
          🚫 Cancelar
        </button>
        <button style={styles.deleteBtn} onClick={() => removeAppointment(appointment.id)}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "linear-gradient(135deg, rgba(35,35,35,0.92), rgba(15,15,15,0.92))",
    borderRadius: "14px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
    border: "1px solid #444",
    backdropFilter: "blur(12px)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },
  cliente: {
    color: "#e8e8e8",
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  },
  telefono: {
    color: "#888",
    margin: "4px 0 0 0",
    fontSize: "13px",
  },
  estado: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "11px",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  section: {
    borderTop: "1px solid #333",
    paddingTop: "10px",
    marginTop: "10px",
  },
  info: {
    color: "#aaa",
    margin: "5px 0",
    fontSize: "13px",
  },
  actions: {
    display: "flex",
    gap: "6px",
    marginTop: "14px",
  },
  editBtn: {
    flex: 1,
    padding: "8px",
    background: "linear-gradient(135deg, #f39c12, #e67e22)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
  },
  cancelBtn: {
    flex: 1,
    padding: "8px",
    background: "linear-gradient(135deg, #2980b9, #3498db)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
  },
  deleteBtn: {
    flex: 1,
    padding: "8px",
    background: "linear-gradient(135deg, #c0392b, #e74c3c)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
  },
};

export default CarCard;