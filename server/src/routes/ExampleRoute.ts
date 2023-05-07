const express = require('express')
const router = express.Router()


/**
 * Currently this route only has one CRUD operation, which is the GET request. 
 * It will return a json formatted item.
 * Refer to the 18 min mark in this vid for adding the other operations here: https://www.youtube.com/watch?v=-0exw-9YJBo 
 */
router.get('/', (req, res) => {
    res.status(200).json({message: 'I live in the server'})
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