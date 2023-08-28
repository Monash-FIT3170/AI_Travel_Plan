import { Request, Response } from 'express'

import { getEmergencyContact } from "../services/EmergencyContact.service"
import { getCountryCodeFromAPI } from '../services/CurrencyConversion.service';

const getEmergencyContactRequest = async (req: Request, res: Response) => {

    try {
        const country = req.query.country;
        console.log(country)
        const countryCode = await getCountryCodeFromAPI(country as string)
        const response = await getEmergencyContact(countryCode as string)
        res.status(200).json({ detail: response })

    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = {
    getEmergencyContactRequest
}