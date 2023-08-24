import express from 'express';

const router = express.Router()





/**
 * @openapi
 * /api/exchangeRate:
 *  post:
 *    tags:

 *    - forex exchange
 *    description: currency exchange
 *    requestBody:
 *     description: Example request body
 *     required: true
 *     content:
 *      application/json:
 *          schema:
 *              $ref: '#/components/schemas/Example'
 *    responses:
 *      201:
 *          description: Route is working
 */
router.post('/', require('../controllers/currencyController').currencyRequest

    /**
 * Currently this route only has one CRUD operation, which is the GET request. 
 * It will return a json formatted item.
 * Refer to the 18 min mark in this vid for adding the other operations here: https://www.youtube.com/watch?v=-0exw-9YJBo 
 */

)

module.exports = router

