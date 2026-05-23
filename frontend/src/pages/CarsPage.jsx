import { useState } from "react";
import { useCars } from "../context/CarContext";
import CarCard from "../components/CarCard";
import CarForm from "../components/CarForm";

const CarsPage = () => {
  const { state } = useCars();
  const [showForm, setShowForm] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const handleEdit = (appointment) => {
    setAppointmentToEdit(appointment);
    setShowForm(true);
  };

  const handleCancel = () => {
    setAppointmentToEdit(null);
    setShowForm(false);
  };

  const citasFiltradas = filtroEstado === "Todos"
    ? state.appointments
    : state.appointments.filter((a) => a.estado === filtroEstado);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔧 CarApp</h1>
        <p style={styles.subtitle}>Taller Mecánico — Gestión de Citas</p>

        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statNum}>{state.appointments.length}</span>
            <span style={styles.statLabel}>Total</span>
          </div>
          <div style={styles.stat}>
            <span style={{ ...styles.statNum, color: "#fab387" }}>
              {state.appointments.filter((a) => a.estado === "Pendiente").length}
            </span>
            <span style={styles.statLabel}>Pendientes</span>
          </div>
          <div style={styles.stat}>
            <span style={{ ...styles.statNum, color: "#89b4fa" }}>
              {state.appointments.filter((a) => a.estado === "En proceso").length}
            </span>
            <span style={styles.statLabel}>En proceso</span>
          </div>
          <div style={styles.stat}>
            <span style={{ ...styles.statNum, color: "#a6e3a1" }}>
              {state.appointments.filter((a) => a.estado === "Completada").length}
            </span>
            <span style={styles.statLabel}>Completadas</span>
          </div>
          <div style={styles.stat}>
            <span style={{ ...styles.statNum, color: "#f38ba8" }}>
              {state.appointments.filter((a) => a.estado === "Cancelada").length}
            </span>
            <span style={styles.statLabel}>Canceladas</span>
          </div>
        </div>

        <div style={styles.filtros}>
          {["Todos", "Pendiente", "En proceso", "Completada", "Cancelada"].map((f) => (
            <button
              key={f}
              style={{
                ...styles.filtroBtn,
                backgroundColor: filtroEstado === f ? "#89b4fa" : "#313244",
                color: filtroEstado === f ? "#1e1e2e" : "#cdd6f4",
              }}
              onClick={() => setFiltroEstado(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          style={styles.addBtn}
          onClick={() => {
            setAppointmentToEdit(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "❌ Cerrar" : "📅 Nueva Cita"}
        </button>
      </div>

      {showForm && (
        <CarForm
          appointmentToEdit={appointmentToEdit}
          onCancel={handleCancel}
        />
      )}

      {state.loading ? (
        <p style={styles.loading}>⏳ Cargando citas...</p>
      ) : citasFiltradas.length === 0 ? (
        <p style={styles.loading}>
          No hay citas {filtroEstado !== "Todos" ? `con estado "${filtroEstado}"` : "registradas"}
        </p>
      ) : (
        <div style={styles.grid}>
          {citasFiltradas.map((appointment) => (
            <CarCard
              key={appointment.id}
              appointment={appointment}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    color: "#e8e8e8",
    fontSize: "48px",
    margin: 0,
    textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
    letterSpacing: "2px",
    fontWeight: "900",
  },
  subtitle: {
    color: "#b0b0b0",
    fontSize: "16px",
    marginBottom: "24px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  stat: {
    background: "linear-gradient(135deg, rgba(40,40,40,0.9), rgba(20,20,20,0.9))",
    borderRadius: "10px",
    padding: "12px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "90px",
    border: "1px solid #444",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  },
  statNum: {
    color: "#e8e8e8",
    fontSize: "26px",
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
    fontSize: "11px",
    marginTop: "4px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  filtros: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filtroBtn: {
    padding: "8px 18px",
    border: "1px solid #555",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    backdropFilter: "blur(5px)",
    transition: "all 0.2s",
  },
  addBtn: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #c0392b, #e74c3c)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 4px 15px rgba(231,76,60,0.4)",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
  },
  loading: {
    color: "#b0b0b0",
    textAlign: "center",
    fontSize: "18px",
    marginTop: "40px",
  },
};

export default CarsPage;