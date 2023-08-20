import { Request, Response } from 'express'

import { getEmergencyContact } from "../services/EmergencyContact.service"

const getEmergencyContactRequest = async (req: Request, res: Response) => {
    console.log("Hello")

    try {
        const country = req.query.country;
        console.log(country)
        const response = await getEmergencyContact(country as string)
        res.status(200).json({detail: response})

    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = {
    getEmergencyContactRequest
}