const request = require('supertest');
const app = require('../index');


describe('GET /', () => {
    it('responds with status 200', async () => {
        // Realizar la solicitud GET a la ruta principal
        const response = await request(app).get('/');
        
        // Verificar que la respuesta tenga un estado 200
        expect(response.status).toBe(200);
    });
    
    it('responds with text indicating API RESTful', async () => {
        // Realizar la solicitud GET a la ruta principal
        const response = await request(app).get('/');
        
        // Verificar que la respuesta tenga un estado 200
        expect(response.status).toBe(200);
        expect(response.text).toContain('API RESTful');
    });
});

describe('GET /house', () => {
    it('responds with status 200', async () => {
        // Realizar la solicitud GET a la ruta principal
        const response = await request(app).get('/house');
        
        // Verificar que la respuesta tenga un estado 200
        expect(response.status).toBe(200);
    });

});
