const request = require('supertest'); // Importar la biblioteca supertest para realizar solicitudes HTTP
const app = require('../index'); // Importar la aplicación Express desde el archivo index.js

const Objecttest = {
    "name": "Juan",
    "last_name": "Huertas",
    "age": 29,
    "email": "wewerewedsa@gmail.com",
    "password": "Noviembre_342"
};

let id; // Variable para almacenar el ID de usuario

// Suite de pruebas para la ruta GET /
describe('GET /', () => {
    // Prueba para verificar el estado 200 y el texto indicando que la API está en funcionamiento
    it('responds with status 200 and API running text', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('API RESTful');
    });
});

// Suite de pruebas para la ruta POST /user
describe("POST /user", () => {
    // Prueba para verificar el estado 200 al crear un usuario
    it('responds with status 200 when creating a user', async () => {
        const response = await request(app).post('/user').send(Objecttest);
        expect(response.status).toBe(200);
    });

    // Prueba para verificar el estado 400 al enviar datos no válidos
    it('responds with status 400 when sending invalid data', async () => {
        const response = await request(app).post('/user').send({ invalidObject: Objecttest });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

// Suite de pruebas para la ruta GET /user
describe('GET /user',() => {
    // Prueba para verificar el estado 200 y un array de usuarios
    it('responds with status 200 and an array of users', async () => {
        const response = await request(app).get('/user');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Prueba para verificar que la respuesta contenga el usuario de prueba
    it('responds with an array containing the test user', async () => {
        const response = await request(app).get('/user');
        expect(response.body).toContainEqual(Objecttest);
    });
});

// Suite de pruebas para la ruta GET /user/:id
describe("GET /user/:id", () => {
    // Configuración previa a todas las pruebas para establecer un ID de usuario de prueba
    beforeAll(() => {
        id = "65de8dcf19f1a0cad0d80fa8"; // Establecer un ID de usuario de prueba
    });

    // Prueba para verificar el estado 200 y el objeto de usuario
    it('responds with status 200 and the user object', async () => {
        const response = await request(app).get('/user/' + id);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body).toEqual(Objecttest);
    });

    // Prueba para verificar el estado 404 al intentar obtener un usuario que no existe
    it('responds with status 404 when trying to get a non-existing user', async () => {
        const response = await request(app).get('/user/' + 'nonexistentid');
        expect(response.status).toBe(404);
    });
});

// Suite de pruebas para la ruta POST /login
describe("POST /login", () => {
    // Prueba para verificar el estado 200 y un token al iniciar sesión con credenciales válidas
    it('responds with status 200 and a token when logging in with valid credentials', async () => {
        const response = await request(app).post('/login').send(Objecttest);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // Prueba para verificar el estado 400 al iniciar sesión con credenciales inválidas
    it('responds with status 400 when logging in with invalid credentials', async () => {
        const response = await request(app).post('/login').send({ "email": "juanhuertas@gmail.com", "password": "<PASSWORD>" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

// Suite de pruebas para la ruta POST /delete
describe('POST /delete', () => {
    // Prueba para verificar el estado 200 al eliminar un usuario con un ID válido
    it('responds with status 200 when deleting a user with a valid id', async () => {
        id = "65de8dcf19f1a0cad0d80fa8"; // Establecer un ID de usuario de prueba
        const response = await request(app).delete('/user/' + id);
        expect(response.status).toBe(200);
    });

    // Prueba para verificar el estado 404 al intentar eliminar un usuario que no existe
    it('responds with status 404 when trying to delete a non-existing user', async () => {
        const response = await request(app).delete('/user/' + 'nonexistentid');
        expect(response.status).toBe(404);
    });
});
