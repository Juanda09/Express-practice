// Requerir el esquema de usuario y las herramientas necesarias
const UserSchema = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Importamos JWT para generar tokens
const { validationResult } = require('express-validator');
const env = require('dotenv').config();  // Cargar variables de entorno

// Función para generar un token JWT
const generateToken = (user) => {
    const jwtscret= process.env.JWT_SECRET
    return jwt.sign({ id: user._id, email: user.email },jwtscret, { expiresIn: "1h" }); // Cambia "secreto" por tu propia clave secreta
};
exports.upload = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            message: "No file uploaded"
        });
    }
    try {
        const user = await UserSchema.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "No existe el usuario con ese ID" });
        }
        user.avatar = req.file.path;
        await user.save(); // Espera a que se complete la operación de guardar antes de enviar la respuesta
        res.status(200).json(user);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error al procesar la solicitud");
    }
};

exports.validateToken = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(401).send({ msg: "No hay token proporcionado" });
    }
    let token = bearerHeader.startsWith("Bearer ") ? bearerHeader.slice(7) : bearerHeader;
    jwt.verify(token, "secreto", (err, decoded) => {
        if (err) {
            return res.status(403).send({ msg: "El token no es válido" });
        }
        req._id = decoded._id;
        next();
    });

}
// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        // Buscar y obtener todos los usuarios en la base de datos
        const users = await UserSchema.find();
        res.status(200).json(users); // Enviar una respuesta con los usuarios encontrados
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        res.status(500).send("Error al consultar la base de datos"); // Enviar un error 500 si ocurre un error al consultar la base de datos
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const errors = validationResult(req); // Validar los campos de entrada del usuario
    if (!errors.isEmpty()) { // Si hay errores de validación
        return res.status(400).json({ errors: errors.array() }); // Devolver un error 400 con los errores de validación
    }

    const { name, last_name, age, email, password } = req.body; // Obtener los datos del usuario desde el cuerpo de la solicitud
    try {
        // Verificar si el correo electrónico ya está en uso
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) { // Si el correo electrónico ya está en uso
            return res.status(400).json({ error: "El correo electrónico ya está en uso" }); // Devolver un error 400
        }

        // Generar un hash para la contraseña del usuario
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con los datos proporcionados y la contraseña hasheada
        const newUser = new UserSchema({ name, last_name, age, email, password: hashedPassword });
        await newUser.save(); // Guardar el nuevo usuario en la base de datos

        res.status(201).json(newUser); // Enviar una respuesta con el nuevo usuario creado
    } catch (error) {
        console.error("Error al guardar el usuario en la base de datos:", error);
        res.status(500).send("Error al guardar el usuario en la base de datos"); // Enviar un error 500 si ocurre un error al guardar el usuario en la base de datos
    }
};

// Obtener un usuario por su ID
exports.getUserById = async (req, res) => {
    try {
        // Buscar un usuario por su ID en la base de datos
        const user = await UserSchema.findById(req.params.id);
        if (!user) { // Si no se encuentra un usuario con el ID proporcionado
            return res.status(404).json({ message: "No existe el usuario con ese ID" }); // Devolver un error 404
        }
        res.status(200).json(user); // Enviar una respuesta con el usuario encontrado
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        res.status(500).send("Error al consultar la base de datos"); // Enviar un error 500 si ocurre un error al consultar la base de datos
    }
};

// Actualizar un usuario por su ID
exports.updateUserById = async (req, res) => {
    const errors = validationResult(req); // Validar los campos de entrada del usuario
    if (!errors.isEmpty()) { // Si hay errores de validación
        return res.status(400).json({ errors: errors.array() }); // Devolver un error 400 con los errores de validación
    }

    const { name, last_name, age, email, password } = req.body; // Obtener los datos del usuario desde el cuerpo de la solicitud
    try {
        // Verificar si el correo electrónico ya está en uso por otro usuario
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser && existingUser._id.toString() !== req.params.id) { // Si el correo electrónico ya está en uso por otro usuario
            return res.status(400).json({ error: "El correo electrónico ya está en uso por otro usuario" }); // Devolver un error 400
        }

        const updatedFields = {
            name,
            last_name,
            age,
            email,
        };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10); // Actualizar la contraseña hasheada si se proporciona una nueva contraseña
        }

        // Actualizar los datos del usuario en la base de datos
        const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!updatedUser) { // Si no se encuentra un usuario con el ID proporcionado
            return res.status(404).json({ message: "No existe el usuario con ese ID" }); // Devolver un error 404
        }
        res.status(200).json(updatedUser); // Enviar una respuesta con el usuario actualizado
    } catch (error) {
        console.error("Error al actualizar el usuario en la base de datos:", error);
        res.status(500).send("Error al actualizar el usuario en la base de datos"); // Enviar un error 500 si ocurre un error al actualizar el usuario en la base de datos
    }
};

// Eliminar un usuario por su ID
exports.deleteUserById = async (req, res) => {
    try {
        // Buscar y eliminar un usuario por su ID en la base de datos
        const deletedUser = await UserSchema.findByIdAndDelete(req.params.id);
        if (!deletedUser) { // Si no se encuentra un usuario con el ID proporcionado
            return res.status(404).json({ message: "No existe el usuario con ese ID" }); // Devolver un error 404
        }
        res.status(200).json(deletedUser); // Enviar una respuesta con el usuario eliminado
    } catch (error) {
        console.error("Error al eliminar el usuario de la base de datos:", error);
        res.status(500).send("Error al eliminar el usuario de la base de datos"); // Enviar un error 500 si ocurre un error al eliminar el usuario de la base de datos
    }
};
// Función para manejar el inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validar si el usuario digito el email
        if (!email) {
            return res.status(400).json({ message: 'El correo electrónico es requerido.' })
        }
        // Validar si el usuario digitó la contraseña
        if (!password) {
            return res.status(400).json({ message: 'La contraseña es obligatoria' });
        }

        // Buscar al usuario por su correo electrónico en la base de datos
        const user = await UserSchema.findOne({ email });
        if (!user) { // Si el usuario no existe
            return res.status(400).json({ error: "Usuario no existente" }); // Devolver un error 400
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { // Si la contraseña no es válida
            return res.status(400).json({ error: "Contraseña incorrecta" }); // Devolver un error 400
        }

        // Generar un token JWT y enviarlo en la respuesta
        const token = generateToken(user);
        const message = "Inicio de sesión exitoso"; // Mensaje de inicio de sesión
        res.status(200).json({ message, token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Error al iniciar sesión"); // Enviar un error 500 si ocurre un error al iniciar sesión
    }
};

