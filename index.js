// Importación de módulos necesarios
const express = require("express"); // Framework web
const mongoose = require("mongoose"); // ODM para MongoDB
require('dotenv').config(); // Para cargar variables de entorno desde un archivo .env
const UserRoutes = require("./Routes/UserRoutes.js");
const HouseRoutes = require("./Routes/HouseRoutes.js"); // Rutas para la gestión de casas

// Creación de la aplicación Express
const app = express();

// Puerto en el que se ejecutará el servidor
const port = process.env.PORT || 4000;

// Conexión a la base de datos MongoDB
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    console.error("La URL de la base de datos no está configurada en las variables de entorno.");
    process.exit(1); // Salir de la aplicación si no se configura la URL de la base de datos
}
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch(error => console.error("Error al conectar a la base de datos:", error));

// Middleware para procesar datos codificados en URL y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(process.cwd() + "/uploads"));

// Ruta principal
app.get("/", (req, res) => {
    res.send(`API RESTful de Usuarios <br> ${new Date()}`);
});

// Uso de las rutas definidas para la gestión de usuarios y casas
app.use("/user/", UserRoutes);
app.use("/casas/", HouseRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra el error en la consola
    res.status(500).send('Error interno del servidor'); // Devuelve un mensaje de error claro
});

// Inicio del servidor
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}/`); // Muestra un mensaje en la consola indicando que el servidor está en funcionamiento
});
