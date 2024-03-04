const request = require('supertest'); // Importar la biblioteca supertest para realizar solicitudes HTTP
const app = require('../index'); // Importar la aplicación Express desde el archivo index.js

// Datos de prueba para crear una casa
const testHouseData = {
    address: '123 Main St',
    city: 'Bogotá',
    state: 'Cundinamarca',
    size: 200,
    type: 'house',
    zip_code: '110111',
    rooms: 4,
    bathrooms: 3,
    parking: true,
    price: 500000
};
let code; // Variable para almacenar el código de la casa

// Suite de pruebas para la ruta POST /house
describe('POST /house', () => {
    it('creates a new house with valid data', async () => {
        // Enviar una solicitud POST para crear una nueva casa con los datos de prueba
        const response = await request(app)
            .post('/house')
            .send(testHouseData);
        expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado 200
    });

    it('returns 400 when creating a house with existing address', async () => {
        // Enviar una solicitud POST para crear una casa con una dirección que ya existe
        const existingHouseData = {
            address: '123 Main St',
            city: 'Bogotá',
            state: 'Cundinamarca',
            size: 200,
            type: 'house',
            zip_code: '110111',
            rooms: 4,
            bathrooms: 3,
            parking: true,
            price: 500000
        };
        const response = await request(app)
            .post('/house')
            .send(existingHouseData);
        expect(response.status).toBe(400); // Verificar que la respuesta tenga un estado 400
    });
});

// Suite de pruebas para la ruta GET /house
describe('GET /house', () => {
    it('returns all houses', async () => {
        // Realizar una solicitud GET para obtener todas las casas
        const response = await request(app).get('/house');
        expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado 200
    });
});

// Suite de pruebas para la ruta GET /house/:codigo
describe('GET /house/:codigo', () => {
    it('returns the house with the specified code', async () => {
        code = "CJDK6747"; // Código de la casa existente
        // Realizar una solicitud GET para obtener una casa por su código
        const response = await request(app).get('/house/' + code);
        expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado 200
    });

    it('returns 404 for non-existing house code', async () => {
        const nonExistingCode = 'nonexistentcode'; // Código de la casa inexistente
        // Realizar una solicitud GET para obtener una casa con un código inexistente
        const response = await request(app).get(`/house/${nonExistingCode}`);
        expect(response.status).toBe(404); // Verificar que la respuesta tenga un estado 404
    });
});

// Suite de pruebas para la ruta PUT /house/:codigo
describe('PUT /house/:codigo', () => {
    it('updates the house with the specified code', async () => {
        code = "CJDK6747"; // Código de la casa existente que se actualizará
        // Datos actualizados de la casa
        const updatedHouseData = {
            address: '456 Elm St',
            city: 'Medellín',
            state: 'Antioquia',
        };
        // Realizar una solicitud PUT para actualizar una casa por su código
        const response = await request(app)
            .put('/house/' + code)
            .send(updatedHouseData);
        expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado 200
    });

    it('returns 404 for non-existing house code', async () => {
        const nonExistingCode = 'nonexistentcode'; // Código de la casa inexistente
        // Realizar una solicitud PUT para actualizar una casa con un código inexistente
        const response = await request(app)
            .put(`/house/${nonExistingCode}`)
            .send({});
        expect(response.status).toBe(404); // Verificar que la respuesta tenga un estado 404
    });
});

// Suite de pruebas para la ruta DELETE /house/:codigo
describe('DELETE /house/:codigo', () => {
    it('deletes the house with the specified code', async () => {
        code = "CJDK6747"; // Código de la casa existente que se eliminará
        // Realizar una solicitud DELETE para eliminar una casa por su código
        const response = await request(app).delete('/house/' + code);
        expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado 200
    });

    it('returns 404 for non-existing house code', async () => {
        const nonExistingCode = 'nonexistentcode'; // Código de la casa inexistente
        // Realizar una solicitud DELETE para eliminar una casa con un código inexistente
        const response = await request(app).delete(`/house/${nonExistingCode}`);
        expect(response.status).toBe(404); // Verificar que la respuesta tenga un estado 404
    });
});
