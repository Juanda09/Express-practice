const HouseSchema = require('../models/House');
const { validationResult } = require('express-validator');
const ciudadesPorDepartamento = require('../Colombia_data');


async function generarCodigo() {
    // Genera tres letras aleatorias en mayúsculas
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let codigo = '';
    for (let i = 0; i < 4; i++) {
        codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }

    // Genera tres números aleatorios
    for (let i = 0; i < 4; i++) {
        codigo += Math.floor(Math.random() * 10);
    }
    const codigoexistente = await HouseSchema.findOne({ code: codigo });
    if (codigoexistente) {
        return generarCodigo();
    }
    else{
        return codigo;
    }
}

exports.createHouse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const casa_existente = await HouseSchema.findOne({ address: req.body.address }); 
        if (casa_existente) {
            return res.status(400).json({ message: 'La casa ya existe.' });
        }
        const codigo = await generarCodigo();
        const allowedTypes = ['house', 'apartment'];
        if (!allowedTypes.includes(req.body.type)) {
            return res.status(400).json({ message: 'Tipo de propiedad no válido. Debe ser "house" o "apartment".' });
        }
        // Validación de la ciudad perteneciente al departamento
        const departamento = req.body.state.toLowerCase();
        const ciudad = req.body.city.toLowerCase();        
        const ciudadesDepartamento = ciudadesPorDepartamento[departamento];
        if (!ciudadesDepartamento || !ciudadesDepartamento.includes(ciudad)) {
            return res.status(400).json({ message: 'La ciudad no pertenece al departamento especificado.' });
        }

        const house = new HouseSchema({
            code: codigo,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            size: req.body.size,
            type: req.body.type,
            zip_code: req.body.zip_code,
            rooms: req.body.rooms,
            bathrooms: req.body.bathrooms,
            parking: req.body.parking,
            price: req.body.price,
        });
        const savedHouse = await house.save();
        res.status(200).json(savedHouse);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear la casa");
    }
}



exports.getHouses = async (req, res) => {
    try {
        const houses = await HouseSchema.find();
        res.status(200).json(houses);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener las casas");
    }
}

exports.getHouseByCodigo = async (req, res) => {
    try {
        const house = await HouseSchema.findOne({ code: req.params.codigo });
        if (!house) {
            return res.status(404).json({ message: "No existe la casa con ese código" });
        }
        res.status(200).json(house);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener la casa");
    }
}

exports.updateHouseByCodigo = async (req, res) => {
    try {
        const allowedTypes = ['house', 'apartment'];
        if (!allowedTypes.includes(req.body.type)) {
            return res.status(400).json({ message: 'Tipo de propiedad no válido. Debe ser "house" o "apartment".' });
        }
        // Validación de la ciudad perteneciente al departamento
        const departamento = req.body.state.toLowerCase();
        const ciudad = req.body.city.toLowerCase();
                
        const ciudadesDepartamento = ciudadesPorDepartamento[departamento];
        if (!ciudadesDepartamento || !ciudadesDepartamento.includes(ciudad)) {
            return res.status(400).json({ message: 'La ciudad no pertenece al departamento especificado.' });
        }

        const house = await HouseSchema.findOneAndUpdate({ code: req.params.codigo }, req.body, { new: true });
        if (!house) {
            return res.status(404).json({ message: "No existe la casa con ese código" });
        }
        res.status(200).json(house);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar la casa");
    }
}


exports.deleteHouseByCodigo = async (req,res)=>{
    try {
        const house = await HouseSchema.findOneAndDelete({ code: req.params.codigo });
        if (!house) {
            return res.status(404).json({ message: "No existe la casa con ese código" });
        }
        res.status(200).json(house);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar la casa");
    }
}
exports.upload= async (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            message: "No file uploaded"
        });
    }
    try {
        const house = await HouseSchema.findOne({code: req.params.codigo});
        if (!house) {
            return res.status(404).json({ message: "No existe la casa con ese codigo" });
        }
        house.image = req.file.path;
        await house.save(); // Espera a que se complete la operación de guardar antes de enviar la respuesta
        res.status(200).json(house);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error al procesar la solicitud");
    }
}