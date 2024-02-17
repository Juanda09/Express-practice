// Importación de módulos necesarios
const express = require("express"); // Framework web
const mongoose = require("mongoose"); // ODM para MongoDB
require('dotenv').config();

// Creación de la aplicación Express
const app = express();
const DB_URL = process.env.DB_URL || ''
// Importación de las rutas definidas para los usuarios
const routes = require("./Routes/UserRoutes.js");

// Puerto en el que se ejecutará el servidor
const port = 3000;

// Conexión a la base de datos MongoDB
mongoose.connect(DB_URL);

// Middleware para procesar datos codificados en URL y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send(
        `API RESTful de Usuarios <br> ${new Date()}`
    );
});

// Uso de las rutas definidas para la gestión de usuarios
app.use("/", routes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra el error en la consola
    res.status(500).send('Something broke!'); // Devuelve un error genérico
});

// Inicio del servidor
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}/`); // Muestra un mensaje en la consola indicando que el servidor está en funcionamiento
});
