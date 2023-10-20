import request from 'supertest';
import express from 'express';
import { postMessageRequest } from '../src/controllers/ChatMessageController';
const app = express();
app.use(express.json());

// Mock the sendOpenAIChat and parseResponse functions
jest.mock('../src/services/OpenAIChat.service', () => ({
    sendOpenAIChat: jest.fn(),
}));
jest.mock('../src/controllers/ChatMessageController', () => ({
    parseResponse: jest.fn(),
}));

describe('postMessageRequest', () => {
    it('should respond with an error message if sendOpenAIChat throws an error', async () => {
        // Mock sendOpenAIChat to throw an error
        (require('../src/services/OpenAIChat.service').sendOpenAIChat as jest.Mock).mockRejectedValue(new Error('Test error'));

        const requestBody = {
            prompt: 'Sample prompt',
            travelItinerary: {
            },
            chatHistory: [],
            additionalInfo: 'Additional info',
        };

        const response = await request(app)
            .post('/api/chatMessage')
            .send(requestBody);

        expect(response.status).toBe(404);
    });
});