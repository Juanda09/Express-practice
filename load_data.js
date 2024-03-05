const bcrypt = require('bcryptjs');
const validator = require('validator');
const xlsx = require('xlsx');
const User = require('./models/user');
const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);

const saltRounds = 10; // Número de rondas de encriptación

(async () => {
  const workbook = xlsx.readFile('./User.xlsx');
  const sheetNameList = workbook.SheetNames;
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

  try {
    // Insertar cada registro en la base de datos
    for (const record of data) {
      // Validar el formato del correo electrónico
      if (!validator.isEmail(record.email)) {
        console.error(`El correo electrónico '${record.email}' no es válido.`);
        continue; // Saltar este registro y continuar con el siguiente
      }

      // Verificar si el correo electrónico ya existe en la base de datos
      const userExists = await User.findOne({ email: record.email });
      if (userExists) {
        console.error(`El correo electrónico '${record.email}' ya está registrado.`);
        continue; // Saltar este registro y continuar con el siguiente
      }

      // Validar la contraseña (aquí puedes agregar más criterios según tus necesidades)
      if (record.password.length < 8) {
        console.error(`La contraseña para '${record.email}' debe tener al menos 8 caracteres.`);
        continue; // Saltar este registro y continuar con el siguiente
      }

      // Encriptar la contraseña antes de insertarla
      const hashedPassword = await bcrypt.hash(record.password, saltRounds);
      record.password = hashedPassword;

      // Si todas las validaciones pasaron, insertar el registro en la base de datos
      await User.create(record);
    }
    console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    mongoose.disconnect(); // Desconectar después de insertar
  }
})();
