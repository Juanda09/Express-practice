const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const { validateUserCreate, validateUserUpdate, validateLogin } = require("../middlewares/userMiddleware");

// Importación de los controladores y middlewares necesarios

// Rutas para la gestión de usuarios

// Obtener todos los usuarios
router.get('/user', UserController.getAllUsers);

// Crear un nuevo usuario con validación de entrada
router.post('/user', validateUserCreate, UserController.createUser);

// Obtener un usuario por su ID
router.get('/user/:id', UserController.getUserById);

// Actualizar un usuario por su ID con validación de entrada
router.put('/user/:id', validateUserUpdate, UserController.updateUserById);

// Eliminar un usuario por su ID
router.delete('/user/:id', UserController.deleteUserById);

//Login para el usuario
router.post("/login",validateLogin, UserController.login)

// Exportación del enrutador para su uso en la aplicación principal
module.exports = router;
