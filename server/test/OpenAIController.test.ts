import { postMessageRequest, convertToStructuredResponse, parseResponse } from '../src/controllers/ChatMessageController';
import { Request, Response } from 'express'; // or wherever you import Request and Response from

// Mocking the asynchronous functions
jest.mock('../src/services/OpenAIChat.service', () => ({
    sendOpenAIChat: jest.fn(),
    textToJSON: jest.fn()
}));

const { sendOpenAIChat, textToJSON } = require('../src/services/OpenAIChat.service');

describe('API Functions', () => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const responseSend = jest.fn();
    const responseStatus = jest.fn();

    beforeEach(() => {
        mockRequest = {
            body: {}
        };
        mockResponse = {
            status: responseStatus,
            json: responseSend
        };
        responseStatus.mockReturnValue(mockResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('postMessageRequest', () => {
        it('handles valid response from sendOpenAIChat', async () => {
            sendOpenAIChat.mockResolvedValueOnce([{ message: { content: 'some content' } }]);

            await postMessageRequest(mockRequest as Request, mockResponse as Response);

            expect(responseStatus).toHaveBeenCalledWith(201);
            expect(responseSend).toHaveBeenCalledWith(expect.any(Object)); // adjust as needed
        });

        it('handles error from sendOpenAIChat', async () => {
            sendOpenAIChat.mockRejectedValueOnce(new Error('Some error'));

            await postMessageRequest(mockRequest as Request, mockResponse as Response);

            expect(responseStatus).toHaveBeenCalledWith(400);
            expect(responseSend).toHaveBeenCalledWith({ message: new Error('Some error') });
        });
    });

    describe('convertToStructuredResponse', () => {
        it('handles valid response from textToJSON', async () => {
            textToJSON.mockResolvedValueOnce([{ message: { content: 'some content' } }]);

            await convertToStructuredResponse(mockRequest as Request, mockResponse as Response);

            expect(responseStatus).toHaveBeenCalledWith(201);
            expect(responseSend).toHaveBeenCalledWith(expect.any(Object)); // adjust as needed
        });

        it('handles error from textToJSON', async () => {
            textToJSON.mockRejectedValueOnce(new Error('Some error'));

            await convertToStructuredResponse(mockRequest as Request, mockResponse as Response);

            expect(responseStatus).toHaveBeenCalledWith(400);
            expect(responseSend).toHaveBeenCalledWith({ message: new Error('Some error') });
        });
    });

    describe('parseResponse', () => {
        it('parses valid JSON from string', () => {
            const response = 'Hello { "chatResponse": "world" }!';
            const result = parseResponse(response);
            expect(result).toEqual({ chatResponse: 'world' });
        });

        it('returns entire string if no JSON found', () => {
            const response = 'Hello world!';
            const result = parseResponse(response);
            expect(result).toEqual({ chatResponse: 'Hello world!' });
        });
    });
});
