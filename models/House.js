// Importar Mongoose
const mongoose = require('mongoose');

// Definir el esquema para la propiedad inmobiliaria
const HouseSchema = new mongoose.Schema({
    address: { type: String,unique:true, required: true },
    city: { type: String, required: true},
    state: { type: String, required: true}, 
    size: { type: Number, required: true},
    type: { type: String, required: true},
    zip_code: { type: String,required: true},
    rooms: {type:Number, required: true},
    bathrooms: {type:Number,required:true},
    parking: {  type: Boolean, required: true},
    price: { type: Number,required: true},
    code: {
        type: String,
        unique: true // Para asegurar que cada propiedad tenga un código único
    },
    image: { type:String}
});

// Definir el modelo basado en el esquema
const house = mongoose.model('House', HouseSchema);

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = house;
