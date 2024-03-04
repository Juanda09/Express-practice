const request = require('supertest');
const app = require('../index');

const Objecttest = {
    "name": "Juan",
    "last_name": "Huertas",
    "age": 29,
    "email": "wewerewedsa@gmail.com",
    "password": "Noviembre_342"
};

let id;

describe('GET /', () => {
    it('responds with status 200 and API running text', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('API RESTful');
    });
});

describe("POST /user", () => {
    it('responds with status 200 when creating a user', async () => {
        const response = await request(app).post('/user').send(Objecttest);
        expect(response.status).toBe(200);
    });

    it('responds with status 400 when sending invalid data', async () => {
        const response = await request(app).post('/user').send({ invalidObject: Objecttest });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('GET /user',() => {
    it('responds with status 200 and an array of users', async () => {
        const response = await request(app).get('/user');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('responds with an array containing the test user', async () => {
        const response = await request(app).get('/user');
        expect(response.body).toContainEqual(Objecttest);
    });
});

describe("GET /user/:id", () => {
    beforeAll(() => {
        id = "65de8dcf19f1a0cad0d80fa8"; // Set up a test user id
    });

    it('responds with status 200 and the user object', async () => {
        const response = await request(app).get('/user/' + id);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body).toEqual(Objecttest);
    });
    it('responds with status 404 when trying to get a non-existing user', async () => {
        const response = await request(app).get('/user/' + 'nonexistentid');
        expect(response.status).toBe(404);
    });
});

describe("POST /login", () => {
    it('responds with status 200 and a token when logging in with valid credentials', async () => {
        const response = await request(app).post('/login').send(Objecttest);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('responds with status 400 when logging in with invalid credentials', async () => {
        const response = await request(app).post('/login').send({ "email": "juanhuertas@gmail.com", "password": "<PASSWORD>" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('POST /delete', () => {
    it('responds with status 200 when deleting a user with a valid id', async () => {
        id = "65de8dcf19f1a0cad0d80fa8"; // Set up a test user id
        const response = await request(app).delete('/user/' + id);
        expect(response.status).toBe(200);
    });
    it('responds with status 404 when trying to delete a non-existing user', async () => {
        const response = await request(app).delete('/user/' + 'nonexistentid');
        expect(response.status).toBe(404);
    });
});
