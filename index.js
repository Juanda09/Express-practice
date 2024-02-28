// Importación de módulos necesarios
const express = require("express");
const mongoose = require("mongoose"); // ODM para MongoDB
const socket = require("socket.io");

// Para cargar variables de entorno desde un archivo .env
require('dotenv').config();

// Importación de rutas
const UserRoutes = require("./Routes/UserRoutes.js");
const HouseRoutes = require("./Routes/HouseRoutes.js");
const MessageRoutes = require("./Routes/MessageRoutes.js");
const MessageSchema = require("./models/message.js")
const UserSchema = require("./models/user.js");

// Creación de la aplicación Express
const app = express();
const http = require("http").Server(app);
const io = socket(http);

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


// Middleware para servir archivos estáticos
app.use("/uploads", express.static(process.cwd() + "/uploads"));

// Middleware para pasar el objeto 'io' a las rutas
app.use((req, res, next) => {
    res.io = io;
    next();
});

// Ruta principal
app.get("/", (req, res) => {
    res.send(`API RESTful de Usuarios <br> ${new Date()}`);
});

// Uso de las rutas definidas para la gestión de usuarios y casas
app.use("/", UserRoutes);
app.use("/", HouseRoutes);
app.use("/", MessageRoutes);

// Manejo de eventos de socket
// Manejo de eventos de socket
io.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('message', async (data) => {
        try {
            const message = JSON.parse(data);

            // Verificar que los campos 'from' y 'to' estén presentes
            if (!message.from || !message.to) {
                io.emit('message', { "message": "Los campos 'from' y 'to' son obligatorios." });
                return;
            }

            // Suponiendo que tienes algún modelo llamado UserModel para tus usuarios
            // Verificar si los IDs 'from' y 'to' existen en la base de datos
            const userFrom = await UserSchema.findById(message.from);
            const userTo = await UserSchema.findById(message.to);
            if (!userFrom || !userTo) {
                io.emit('message', { "message": "Los IDs 'from' y 'to' no existen en la base de datos." });
                return;
            }

            // Si ambos IDs existen, guardar el mensaje
            const newMessage = new MessageSchema({
                body: message.body,
                from: message.from,
                to: message.to
            });
            await newMessage.save();

            // Enviar el mensaje a todos los clientes conectados al websocket
            io.emit('message-receipt', newMessage);
        } catch (error) {
            console.error(error);
            io.emit('message', { "message": "Error al procesar el mensaje." });
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra el error en la consola
    res.status(500).send('Error interno del servidor'); // Devuelve un mensaje de error claro
});

// Inicio del servidor
http.listen(port, () => {
    console.log(`API running on http://localhost:${port}/`); // Muestra un mensaje en la consola indicando que el servidor está en funcionamiento
});

