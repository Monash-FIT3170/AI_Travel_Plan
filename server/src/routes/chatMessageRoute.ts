import express from 'express';

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
router.post('/', require('../controllers/ChatMessageController').postMessageRequest)
module.exports = router