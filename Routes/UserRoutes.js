const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const { validateUserCreate, validateUserUpdate, validateLogin } = require("../middlewares/userMiddleware");
const multer= require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Filtro para aceptar solo imágenes
const imageFilter = function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF image files are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: imageFilter // Aplicar el filtro de imágenes
});

router.post("/upload/:id/user", upload.single('file'), UserController.upload);

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
