const express = require("express");
const cors = require("cors");
const carsRoutes = require("./src/routes/cars.routes");
const swaggerDocs = require("./src/swagger");

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/cars", carsRoutes);

// Swagger
swaggerDocs(app);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido a CarApp API! 🚗" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📄 Documentación en: http://localhost:${PORT}/api-docs`);
});
