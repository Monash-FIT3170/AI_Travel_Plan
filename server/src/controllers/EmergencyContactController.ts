import { Request, Response } from 'express'

import { getEmergencyContact } from "../services/EmergencyContact.service"

const getEmergencyContactRequest = async (req: Request, res: Response) => {

    try {

        const response = await getEmergencyContact(req.body.country)
        console.log(response.policeNumber)
        res.status(201).json(response.policeNumber)

    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = {
    getEmergencyContactRequest
}