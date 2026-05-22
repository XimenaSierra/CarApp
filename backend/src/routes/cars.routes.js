const express = require("express");
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/cars.controller");

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API para gestión de carros
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Obtener todos los carros
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Lista de carros
 */
router.get("/", getAllCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Obtener un carro por ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carro encontrado
 *       404:
 *         description: Carro no encontrado
 */
router.get("/:id", getCarById);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Crear un nuevo carro
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Carro creado
 */
router.post("/", createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Actualizar un carro
 *     tags: [Cars]
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
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carro actualizado
 *       404:
 *         description: Carro no encontrado
 */
router.put("/:id", updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Eliminar un carro
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carro eliminado
 *       404:
 *         description: Carro no encontrado
 */
router.delete("/:id", deleteCar);

module.exports = router;