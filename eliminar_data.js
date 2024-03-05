const mongoose = require('mongoose');
const xlsx = require('xlsx');
const User = require('./models/user');
require('dotenv').config();
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);

(async () =>  {
  const workbook = xlsx.readFile('./User.xlsx');
  const sheetNameList = workbook.SheetNames;
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

  try {
    let totalEliminados = 0;
    for(const record of data) {
      const user = await User.findOne({email: record.email});
      if(user) {
        await User.deleteOne({email: record.email});
        totalEliminados++;
        console.log(`Usuario con correo electrónico '${record.email}' eliminado.`);
      } else {
        console.log(`No se encontró usuario con correo electrónico '${record.email}'.`);
      }
    }
    console.log(`Se eliminaron ${totalEliminados} usuarios.`);
  } catch (error) {
    console.error('Error al eliminar usuarios:', error);
  } finally {
    mongoose.disconnect(); // Desconectar después de eliminar
  }
})();
