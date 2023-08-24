import { Request, Response } from 'express'
import { validateExample } from '../services/example.service'
import { getExchangeRateWithAUD } from '../services/CurrencyConversion.service'

/**
 * 
 * Handling and returning http request
 * uses services to perfome business logic
 * handle errors
 */

const currencyRequest = async (req: Request, res: Response) => {
    const countryName = req.body.countryName as string;
    try {
      const exchangeData = await getExchangeRateWithAUD(countryName);
      
      if (exchangeData !== null) {
        const { forexRate, currencyCode } = exchangeData;
        res.status(201).json({ forexRate, currencyCode }); 
      } else {
        res.status(400).json({ message: 'failure' });
      }
    } catch (error) {
      console.error('Eror processing currency request:', error);
      res.status(500).json({ message: 'error' });
    }
  };
  
  module.exports = {
    currencyRequest
  };