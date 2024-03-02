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
describe("POST /user", () => {
    it('responds with status 200', async () => {
        // Realizar la solicitud POST a la ruta principal
        const response = await request(app).post('/user').send({Objecttest});
        expect(response.status).toBe(200);
    });
    /*it('responds with status 400', async () => {
        // Realizar la solicitud POST a la ruta principal
        const response = await request(app).post('/user').send({
            Objecttest
        });
        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty('error')
    });*/
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
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(Objecttest);
    });
});


/*describe("GET /user/:id", () => {
    id = "65de8dcf19f1a0cad0d80fa8";
    it('responds with status 200', async () => {

        const response = await request(app).get('/user/'+id);
        expect(response.status).toBe(200);
    });

    it('responds with object indicating successful get user', async () => {
        const response = await request(app).get('/user/'+id);

        expect(typeof response.body === 'object').toBe(true);
        expect(response.body).toStrictEqual(Objecttest);
    });
});

describe("POST /login", () => {
    it('responds with status 200', async () => {
        // Realizar la solicitud POST a la ruta principal
        const response = await request(app).post('/login').send({Objecttest});
        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('token')
    });
    it('responds with status 400', async () => {
        // Realizar la solicitud POST a la ruta principal
        const response = await request(app).post('/login').send({
            "email": "juanhuertas@gmail.com",
            "password": "<PASSWORD>"
        });
        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty('error')
    });
});
describe('POST /delete', () => {
    it('Success delete with _id', async () => {
       id = "65de8dcf19f1a0cad0d80fa8"

        const response = await request(app).delete('/user/'+id)

        expect(response.statusCode).toBe(200)
    })
})*/