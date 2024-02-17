const mongoose = require("mongoose");

// Definición del esquema de usuario utilizando Mongoose
const userSchema = new mongoose.Schema({
    // Campo del nombre del usuario: tipo String y requerido
    name: {
        type: String,
        required: true
    },
    // Campo del apellido del usuario: tipo String y requerido
    last_name: {
        type: String,
        required: true
    },
    // Campo de la edad del usuario: tipo Number y requerido
    age: {
        type: Number,
        required: true
    },
    // Campo del correo electrónico del usuario: tipo String, requerido y único
    email: {
        type: String,
        required: true,
        unique: true // Asegura que cada correo electrónico sea único en la base de datos
    },
    // Campo de la contraseña del usuario: tipo String y requerido
    password: {
        type: String,
        required: true
    }
});

// Definición del modelo de usuario utilizando el esquema definido
const User = mongoose.model("User", userSchema);

// Exportar el modelo de usuario para que pueda ser utilizado en otras partes de la aplicación
module.exports = User;
