import request from 'supertest';
import app from './app';

describe('GET /users', () => {
    it('should responde with a list of users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, name: 'Max Mustermann' }]);
    });
});
