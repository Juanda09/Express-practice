const express = require("express");
const router = express.Router();
const HouseController = require("../Controllers/HouseController");

// Rutas para la gestión de casas
router.get("/house", HouseController.getHouses); // Mostrar todas las casas

router.get("/house/:codigo", HouseController.getHouseByCodigo); // Mostrar una casa por su código

router.put("/house/:codigo", HouseController.updateHouseByCodigo); // Actualizar una casa por su código

router.post("/house", HouseController.createHouse);//Agregar una casa

router.delete("/house/:codigo", HouseController.deleteHouseByCodigo); // Eliminar una casa por su código

module.exports = router;