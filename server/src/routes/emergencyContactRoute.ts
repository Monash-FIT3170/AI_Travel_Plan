import express from 'express';
const router1 = express.Router();

/**
* @openapi
* /api/emergencyContact:
*  get:
*     tags:
*     - EmergencyContact
*     description: Get Emergency Contact details for a country
*     parameters:
*     - in: query
*       name: country
*       schema:
*         type: string
*       required: true
*     responses:
*        200:
*         description: Emergency Contact details for a country
*        404:
*           description: No data for this country
*        429:
*           description: Too many requests

*/
router1.get('/', require('../controllers/EmergencyContactController').getEmergencyContactRequest)

module.exports = router1;