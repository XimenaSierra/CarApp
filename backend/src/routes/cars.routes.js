const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
} = require("../controllers/cars.controller");

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API para gestión de citas del taller mecánico
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Obtener todas las citas
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Lista de citas
 */
router.get("/", getAllAppointments);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Obtener una cita por ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita encontrada
 *       404:
 *         description: Cita no encontrada
 */
router.get("/:id", getAppointmentById);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               telefono:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               año:
 *                 type: integer
 *               servicio:
 *                 type: string
 *               fecha:
 *                 type: string
 *               hora:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cita creada
 */
router.post("/", createAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Actualizar una cita
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               telefono:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               año:
 *                 type: integer
 *               servicio:
 *                 type: string
 *               fecha:
 *                 type: string
 *               hora:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cita actualizada
 *       404:
 *         description: Cita no encontrada
 */
router.put("/:id", updateAppointment);

/**
 * @swagger
 * /api/appointments/{id}/cancel:
 *   patch:
 *     summary: Cancelar una cita
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita cancelada
 *       404:
 *         description: Cita no encontrada
 */
router.patch("/:id/cancel", cancelAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Eliminar una cita
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita eliminada
 *       404:
 *         description: Cita no encontrada
 */
router.delete("/:id", deleteAppointment);

module.exports = router;