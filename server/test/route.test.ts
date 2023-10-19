import request from 'supertest';
import app from '../src/server';

describe('Express Route Test', () => {
    it('testing get chat message route', async () => {
        const response = await request(app).get('/api/chatMessage');
        expect(response.status).toBe(200);
    });

    // it('testing post chat message route', async () => {
    //     const response = await request(app).post('/api/chatMessage');
    //     expect(response.status).toBe(201);
    // });

    it('testing get chat message route', async () => {
        const response = await request(app).get('/api/chatMessage');
        expect(response.status).toBe(200);
    });
});