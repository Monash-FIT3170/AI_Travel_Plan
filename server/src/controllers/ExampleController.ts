import { Request, Response } from 'express'
import { validateExample } from '../services/example.service'

/**
 * 
 * Handling and returning http request
 * uses services to perfome business logic
 * handle errors
 */



const getExampleRequest = (req: Request, res: Response) => (res.status(200).json({ message: 'Dummy Data' }))

const postExampleRequest = (req: Request, res: Response) => {
    validateExample(req.body) ? res.status(201).json({ message: req.body }) : res.status(400).json({ message: 'failure' })
}

module.exports = {
    getExampleRequest,
    postExampleRequest
}