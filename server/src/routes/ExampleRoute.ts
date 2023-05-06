import express from 'express';

const router = express.Router()




/**
* @openapi
* /api/exampleRoute:
*  get:
*     tags:
*     - Example
*     description: Example route definition
*     responses:
*       200:
*         description: Route is working
*/
router.get('/', require('../controllers/ExampleController').getExampleRequest)
/**
* Currently this route only has one CRUD operation, which is the GET request. 
* It will return a json formatted item.
* Refer to the 18 min mark in this vid for adding the other operations here: https://www.youtube.com/watch?v=-0exw-9YJBo 
*/


/**
 * @openapi
 * /api/exampleRoute:
 *  post:
 *    tags:
 *    - Example
 *    description: Example route definition
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
router.post('/', require('../controllers/ExampleController').postExampleRequest

    /**
 * Currently this route only has one CRUD operation, which is the GET request. 
 * It will return a json formatted item.
 * Refer to the 18 min mark in this vid for adding the other operations here: https://www.youtube.com/watch?v=-0exw-9YJBo 
 */

)


/**
 * @openapi
 * /api/exampleRoute:
 *  put:
 *   tags:
 *      - Example
 *   description: Example route definition
 *   requestBody:
 *    description: Example request body
 */
router.put('/', (req, res) => {
    res.status(200)
})

/**
 * @openapi
 * /api/exampleRoute:
 *  delete:
 *   tags:
 *      - Example
 *   description: Example route definition
 *   requestBody:
 *    description: Example request body
 */
router.delete('/', (req, res) => {
    res.status(200)
})


/**
 * Generally if your operations on this file are complicated, you should separate them to a different function. 
 * This function should be found in a file under controllers
 * The function from the above example is re-written in controllers/ExampleController.ts . Check ExampleController.ts out to see what I mean.
 * the below request performs identical work to the one above, but is preferable if you have complicated code instead of a one-liner or something simple.
 * It's commented out, but you can try it and test it for yourself.
 */
// const {getExampleRequest} = require('../controllers/ExampleController')
// router.get('/', getExampleRequest)

module.exports = router