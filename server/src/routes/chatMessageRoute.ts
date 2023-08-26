import express from 'express';
import { postMessageRequest, getMockResponse, convertToStructuredResponse } from '../controllers/ChatMessageController'
const router = express.Router()

/**
 * @openapi
 * /api/chatMessage:
 *  post:
 *    tags:
 *    - ChatMessage
 *    description: Chat message from front end
 *    requestBody:
 *     description: 
 *     required: true
 *     content:
 *      application/json:
 *          schema:
 *              $ref: '#/components/schemas/ChatMessage'
 *    responses:
 *      201:
 *          description: Route is working
 */
router.post('/', postMessageRequest)


/**
 * @openapi
 * /api/chatMessage/confirm:
 *  post:
 *    tags:
 *    - ChatMessage
 *    description: Chat message from front end
 *    requestBody:
 *     description: 
 *     required: true
 *     content:
 *      application/json:
 *          schema:
 *              {
 *                 "chatResponse": "string",}
 *    responses:
 *      201:
 *          description: Route is working
 */
router.post('/confirm', convertToStructuredResponse)

/**
 * @openapi
 * /api/chatMessage:
 *  get:
 *    tags:
 *     - ChatMessage
 *    description: mock travel itinerary response
 *    responses:
 *      201:
 *          description: Route is working
 */
router.get('/', getMockResponse)

module.exports = router