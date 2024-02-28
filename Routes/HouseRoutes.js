const express = require("express");
const router = express.Router();
const HouseController = require("../Controllers/HouseController");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/houses");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
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

router.post("/upload/:codigo/house", upload.single('file'), HouseController.upload);

// Rutas para la gestión de casas
router.get("/house", HouseController.getHouses); // Mostrar todas las casas

router.get("/house/:codigo", HouseController.getHouseByCodigo); // Mostrar una casa por su código

router.put("/house/:codigo", HouseController.updateHouseByCodigo); // Actualizar una casa por su código

router.post("/house", HouseController.createHouse);//Agregar una casa

router.delete("/house/:codigo", HouseController.deleteHouseByCodigo); // Eliminar una casa por su código

module.exports = router;