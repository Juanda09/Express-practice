const HouseSchema = require('../models/House');
const { validationResult } = require('express-validator');

function generarCodigo() {
    // Genera tres letras aleatorias en mayúsculas
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';
    for (let i = 0; i < 3; i++) {
        codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }

    // Genera tres números aleatorios
    for (let i = 0; i < 3; i++) {
        codigo += Math.floor(Math.random() * 10);
    }

    return codigo;
}

exports.createHouse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const codigo = generarCodigo();
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
        const house = await HouseSchema.findOne({ codigo: req.params.codigo });
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
        const house = await HouseSchema.findOneAndUpdate({ codigo: req.params.codigo }, req.body, { new: true });
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
        const house = await HouseSchema.findOneAndDelete({ codigo: req.params.codigo });
        if (!house) {
            return res.status(404).json({ message: "No existe la casa con ese código" });
        }
        res.status(200).json(house);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar la casa");
    }
}