import { Request, Response } from 'express'
import { validateExample } from '../services/example.service'
import { getExchangeRateWithAUD } from '../services/CurrencyConversion.service'

/**
 * 
 * Handling and returning http request
 * uses services to perfome business logic
 * handle errors
 */




const currencyRequest = async (req: Request, res: Response)  => {
    const countryName = req.body.countryName as string
    await getExchangeRateWithAUD(countryName) ? res.status(201).json({ message: req.body }) : res.status(400).json({ message: 'failure' })
}

module.exports = {
    currencyRequest
}
