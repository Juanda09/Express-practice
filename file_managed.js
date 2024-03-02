const fs = require('fs');
const express = require('express');
const router = express.Router();
const houseSchema = require('./models/House');

router.get('/departament', (req, res) => {
    fs.readFile('colombia_data.json', 'utf-8', (error, data) => {
        if (error) {
            res.status(404).send(error);
        } else {
            ciudad = JSON.parse(data);
            res.status(200).send(ciudad);
        }
    });
});

router.post('/add-data', (req, res) => {
    const newData = req.body;
    try {
        // Leer el archivo existente
        const existingData = JSON.parse(fs.readFileSync('colombia_data.json', 'utf-8'));
        // Agregar los nuevos datos
        Object.assign(existingData, newData);
        // Escribir los datos actualizados de vuelta al archivo
        fs.writeFileSync('colombia_data.json', JSON.stringify(existingData, null, 2), 'utf-8');
        res.status(200).json({ message: 'Datos agregados exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar datos.' });
    }
});
router.post('/add-municipio', (req, res) => {
    const { departamento, municipio } = req.body;
    try {
        // Leer el archivo existente
        const existingData = JSON.parse(fs.readFileSync('colombia_data.json', 'utf-8'));
        // Verificar si el departamento existe
        if (existingData.hasOwnProperty(departamento)) {
            // Agregar el nuevo municipio al array de municipios del departamento
            existingData[departamento].push(municipio);
            // Escribir los datos actualizados de vuelta al archivo
            fs.writeFileSync('colombia_data.json', JSON.stringify(existingData, null, 2), 'utf-8');
            res.status(200).json({ message: 'Municipio agregado exitosamente.' });
        } else {
            res.status(404).json({ message: 'El departamento especificado no existe.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar municipio.' });
    }
});

module.exports = router;

