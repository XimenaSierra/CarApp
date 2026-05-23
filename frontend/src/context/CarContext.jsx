import { createContext, useContext, useReducer, useEffect } from "react";
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
} from "../services/carService";

// 1. Crear el contexto
export const CarContext = createContext();

// 2. El reducer
const appointmentReducer = (state, action) => {
  switch (action.type) {
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "ADD_APPOINTMENT":
      return { ...state, appointments: [...state.appointments, action.payload] };
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case "CANCEL_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter((a) => a.id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// 3. Estado inicial
const initialState = {
  appointments: [],
  loading: false,
};

// 4. El proveedor
export const CarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const data = await getAllAppointments();
    dispatch({ type: "SET_APPOINTMENTS", payload: data });
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const addAppointment = async (appointment) => {
    const newAppointment = await createAppointment(appointment);
    dispatch({ type: "ADD_APPOINTMENT", payload: newAppointment });
  };

  const editAppointment = async (id, appointment) => {
    const updated = await updateAppointment(id, appointment);
    dispatch({ type: "UPDATE_APPOINTMENT", payload: updated });
  };

  const cancelAppointmentById = async (id) => {
    const cancelled = await cancelAppointment(id);
    dispatch({ type: "CANCEL_APPOINTMENT", payload: cancelled.appointment });
  };

  const removeAppointment = async (id) => {
    await deleteAppointment(id);
    dispatch({ type: "DELETE_APPOINTMENT", payload: id });
  };

  return (
    <CarContext.Provider
      value={{ state, addAppointment, editAppointment, cancelAppointmentById, removeAppointment }}
    >
      {children}
    </CarContext.Provider>
  );
};

// 5. Hook personalizado
export const useCars = () => useContext(CarContext);