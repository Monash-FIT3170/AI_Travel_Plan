import express from 'express';
const heathCheck = express.Router();

/**
* @openapi
* /api/healthCheck:
*  get:
*     tags:
*     - Healthcheck
*     description: Responds if the app is up and running
*     responses:
*       200:
*         description: App is up and running

*/
heathCheck.route('/').get((req, res) => {
    res.status(200)
    res.json({ message: 'success' })
})

module.exports = heathCheck;