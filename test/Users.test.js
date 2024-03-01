const request = require('supertest');
const app = require('../index');



describe('GET /', () => {
    it('responds with status 200', async () => {
        // Realizar la solicitud GET a la ruta principal
        const response = await request(app).get('/');

        // Verificar que la respuesta tenga un estado 200
        expect(response.status).toBe(200);
    });

    it('responds with text indicating API running', async () => {
        // Realizar la solicitud GET a la ruta principal
        const response = await request(app).get('/');

        // Verificar que la respuesta contenga un mensaje indicando que la API está en funcionamiento
        expect(response.text).toContain('API RESTful');
    });
    
});
describe('GET /user',() => {
    it('responds with status 200', async () => {
        // Realizar la solicitud GET a la ruta principal
        const response = await request(app).get('/user');
        // Verificar que la respuesta tenga un estado 200
        expect(response.status).toBe(200);
    });
    it('responds with object indicating successful get user', async () => {
        const response = await request(app).get('/user');
        const userObject = {
            "_id": "65de8dcf19f1a0cad0d80fa8",
            "age": 29,
            "email": "juanhuertas@gmail.com",
            "last_name": "Huertas",
            "name": "Juan",
            "password": "$2a$10$ngLB9BrKDH5EGHGrCXJUMeMmZfrsQOksdlTAlWBqkyD/8c4PMQQx6",
            "__v": 0
        };
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(userObject);
    });
});
describe("GET /user/:id", () => {
    it('responds with status 200', async () => {
        const response = await request(app).get('/user/65de8dcf19f1a0cad0d80fa8');
        expect(response.status).toBe(200);
    });

    it('responds with object indicating successful get user', async () => {
        const response = await request(app).get('/user/65de8dcf19f1a0cad0d80fa8');
        const userObject = {
            "_id": "65de8dcf19f1a0cad0d80fa8",
            "age": 29,
            "email": "juanhuertas@gmail.com",
            "last_name": "Huertas",
            "name": "Juan",
            "password": "$2a$10$ngLB9BrKDH5EGHGrCXJUMeMmZfrsQOksdlTAlWBqkyD/8c4PMQQx6",
            "__v": 0
        };
        expect(typeof response.body === 'object').toBe(true);
        expect(response.body).toStrictEqual(userObject);
    });
});

describe("POST /login", () => {
    it('responds with status 200', async () => {
        // Realizar la solicitud POST a la ruta principal
        const response = await request(app).post('/login').send({
            "email": "juanhuertas@gmail.com",
            "password": "Noviembre__133"
        });
        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('token')
    });
});
describe('POST /delete', () => {
    it('Success delete with _id', async () => {
        const id = "65cebc5119cdafb5a4f59639"

        const response = await request(app).delete('/user/'+id)

        expect(response.statusCode).toBe(200)
    })
})